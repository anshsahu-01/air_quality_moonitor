import { formatChartLabel } from "@/lib/formatters";

export function calculateAqi({ pm25, co, no2 }) {
  const pmScore = pm25 * 1.8;
  const coScore = co * 10;
  const no2Score = no2 * 2.2;
  return Math.max(0, Math.min(500, Math.round(Math.max(pmScore, coScore, no2Score))));
}

export function getSeverity(aqi) {
  if (aqi <= 50) {
    return { severity: "good", label: "Green" };
  }
  if (aqi <= 100) {
    return { severity: "moderate", label: "Yellow" };
  }
  return { severity: "poor", label: "Red" };
}

export function movingAverage(values, size = 4) {
  const source = values.slice(-size);
  if (!source.length) return 0;
  const total = source.reduce((sum, value) => sum + value, 0);
  return Math.round(total / source.length);
}

export function enrichNode(node) {
  const aqi = calculateAqi(node);
  const { severity, label } = getSeverity(aqi);
  const history = node.history ?? [];
  const predictedAqi = movingAverage(
    history.map((entry) => entry.aqi ?? calculateAqi(entry)).concat(aqi),
    5
  );

  return {
    ...node,
    aqi,
    severity,
    severityLabel: label,
    predictedAqi,
    predictionDelta: predictedAqi - aqi,
  };
}

export function buildDashboardSnapshot(nodes) {
  const enrichedNodes = nodes
    .map((node) => enrichNode(node))
    .sort((a, b) => b.aqi - a.aqi);
  const alerts = enrichedNodes.filter((node) => node.aqi > 100);
  const historyLength = Math.max(
    6,
    ...enrichedNodes.map((node) => (node.history?.length ? node.history.length : 0))
  );

  const chartSeries = Array.from({ length: historyLength }, (_, index) => {
    const points = enrichedNodes.map((node) => {
      const entry = node.history?.[index];
      if (!entry) return null;
      const aqi = entry.aqi ?? calculateAqi(entry);
      return {
        aqi,
        predictedAqi: entry.predictedAqi ?? movingAverage([aqi, node.predictedAqi], 2),
        label: formatChartLabel(entry.timestamp ?? Date.now()),
      };
    });

    const valid = points.filter(Boolean);

    return {
      label:
        valid[0]?.label ??
        formatChartLabel(Date.now() - (historyLength - index - 1) * 15 * 60 * 1000),
      aqi: valid.length
        ? Math.round(valid.reduce((sum, item) => sum + item.aqi, 0) / valid.length)
        : 0,
      predictedAqi: valid.length
        ? Math.round(
            valid.reduce((sum, item) => sum + item.predictedAqi, 0) / valid.length
          )
        : 0,
    };
  });

  const networkAqi = enrichedNodes.length
    ? Math.round(enrichedNodes.reduce((sum, node) => sum + node.aqi, 0) / enrichedNodes.length)
    : 0;
  const predictedNetworkAqi = enrichedNodes.length
    ? Math.round(
        enrichedNodes.reduce((sum, node) => sum + node.predictedAqi, 0) / enrichedNodes.length
      )
    : 0;
  const hottestNode = enrichedNodes[0];
  const { severity: networkSeverity, label: networkSeverityLabel } = getSeverity(networkAqi);
  const trendDirection =
    predictedNetworkAqi > networkAqi
      ? "increase"
      : predictedNetworkAqi < networkAqi
        ? "improve"
        : "remain stable";

  return {
    nodes: enrichedNodes,
    alerts,
    chartSeries,
    summary: {
      totalNodes: enrichedNodes.length,
      onlineNodes: enrichedNodes.length,
      alertCount: alerts.length,
      networkAqi,
      predictedNetworkAqi,
      networkSeverity,
      networkSeverityLabel,
      hottestLocation: hottestNode?.location ?? "N/A",
      predictionMessage: `AQI may ${trendDirection} in the next 1 hour based on the latest moving average window.`,
      lastUpdatedAt:
        enrichedNodes[0]?.updatedAt ??
        new Date().toISOString(),
    },
  };
}
