import JobDetail from "@/components/job-details";
import { Suspense } from "react";

export default function JobDetailPage({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  return (
    <Suspense fallback={<div>Loading job details...</div>}>
      <JobDetail id={id} />
    </Suspense>
  );
}
