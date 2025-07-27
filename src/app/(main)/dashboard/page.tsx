import Dashboard from "page/dashboard";
import { getCurrentProgramId } from "entities/program";
import { getAnalytics } from "entities/analitycs";
export const dynamic = 'force-dynamic';

export default async function DashboardPage() {
  const programId = await getCurrentProgramId();
  const analytics = await getAnalytics(programId);

  return <Dashboard data={analytics} />
}
