import { redirect } from "next/navigation";
import DashboardShell from "@/components/dashboard/dashboard-shell";
import { getSession } from "@/lib/auth";
import { getDashboardSnapshot } from "@/lib/server/data-service";

export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const session = await getSession();

  if (!session) {
    redirect("/login");
  }

  const snapshot = await getDashboardSnapshot();

  return <DashboardShell initialData={snapshot} session={session} />;
}
