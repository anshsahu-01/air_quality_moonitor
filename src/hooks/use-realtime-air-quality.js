"use client";

import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";
import {
  getPublicFirebaseConfig,
  subscribeToFirebaseNodes,
} from "@/lib/firebase-client";

export function useRealtimeAirQuality(initialData) {
  const [data, setData] = useState(initialData);
  const [isRealtimeActive, setIsRealtimeActive] = useState(false);
  const [source, setSource] = useState(() =>
    getPublicFirebaseConfig() ? "Firebase realtime" : "Server event stream"
  );
  const lastAlertRef = useRef("");

  useEffect(() => {
    const firebaseConfig = getPublicFirebaseConfig();

    if (firebaseConfig) {
      const unsubscribe = subscribeToFirebaseNodes((snapshot) => {
        setData(snapshot);
        setIsRealtimeActive(true);
      });

      return () => unsubscribe?.();
    }

    const eventSource = new EventSource("/api/stream");

    eventSource.onmessage = (event) => {
      const payload = JSON.parse(event.data);
      setData(payload);
      setIsRealtimeActive(true);
    };

    eventSource.onerror = () => {
      setIsRealtimeActive(false);
      setSource("Fallback snapshot");
      eventSource.close();
    };

    return () => eventSource.close();
  }, []);

  useEffect(() => {
    const alertKey = data.alerts.map((alert) => `${alert.nodeId}:${alert.aqi}`).join("|");
    if (alertKey && alertKey !== lastAlertRef.current) {
      lastAlertRef.current = alertKey;
      toast.error("AQI threshold exceeded", {
        description: `${data.alerts[0].location} reached AQI ${data.alerts[0].aqi}.`,
      });
    }
  }, [data.alerts]);

  const toggleDevice = async (nodeId, enabled) => {
    const response = await fetch(`/api/nodes/${nodeId}/control`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ enabled }),
    });

    if (!response.ok) {
      toast.error("Unable to update purifier state");
      return;
    }

    const payload = await response.json();
    setData(payload);
    toast.success(`Purifier ${enabled ? "enabled" : "disabled"} for ${nodeId}`);
  };

  const simulatePulse = async () => {
    const response = await fetch("/api/demo/pulse", { method: "POST" });

    if (!response.ok) {
      toast.error("Demo pulse failed");
      return;
    }

    const payload = await response.json();
    setData(payload);
    toast.success("Live demo reading injected");
  };

  return {
    data,
    isRealtimeActive,
    source,
    lastUpdate: data.summary.lastUpdatedAt,
    toggleDevice,
    simulatePulse,
  };
}
