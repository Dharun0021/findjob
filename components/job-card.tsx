import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { SavedButton } from "@/components/saved-button";
import type { RemotiveJob, JobSummary } from "@/lib/remotive";

export function JobCard({ job }: { job: RemotiveJob }) {
  const summary: JobSummary = {
    id: job.id,
    title: job.title,
    company_name: job.company_name,
    company_logo: job.company_logo,
    candidate_required_location: job.candidate_required_location,
    url: job.url,
  };

  // Debug logging to help identify logo issues
  if (process.env.NODE_ENV === "development") {
    console.log(
      `Job ${job.id} - Company: ${job.company_name}, Logo URL: ${job.company_logo}`
    );
  }

  return (
    <Card className="h-full flex flex-col transition-shadow hover:shadow-sm focus-within:ring-1 focus-within:ring-ring">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3">
          {/* <div className="relative h-12 w-12 rounded-lg overflow-hidden bg-gradient-to-br from-primary/10 to-primary/20 flex items-center justify-center border border-primary/20">
            {job.company_logo &&
            job.company_logo.trim() !== "" &&
            job.company_logo !== "null" ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={job.company_logo}
                alt={`${job.company_name} logo`}
                className="h-full w-full object-cover"
                onError={(e) => {
                  // Hide the image and show fallback if it fails to load
                  const target = e.currentTarget as HTMLImageElement;
                  target.style.display = "none";
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.classList.remove("hidden");
                  }
                }}
                onLoad={(e) => {
                  // Hide fallback when image loads successfully
                  const target = e.currentTarget as HTMLImageElement;
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) {
                    fallback.classList.add("hidden");
                  }
                }}
              />
            ) : null}
            <div
              className={`absolute inset-0 flex items-center justify-center ${
                job.company_logo &&
                job.company_logo.trim() !== "" &&
                job.company_logo !== "null"
                  ? "hidden"
                  : ""
              }`}
            >
              <span className="text-lg font-bold text-primary">
                {job.company_name.charAt(0).toUpperCase()}
              </span>
            </div>
          </div> */}
          <div>
            <CardTitle className="text-sm sm:text-base leading-tight text-pretty">
              <Link
                href={`/jobs/${job.id}`}
                className="hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded"
                aria-label={`View details for ${job.title}`}
              >
                {job.title}
              </Link>
            </CardTitle>
            <p className="text-xs sm:text-sm text-muted-foreground">
              {job.company_name}
            </p>
          </div>
        </div>
        <SavedButton job={summary} />
      </CardHeader>
      <CardContent className="flex-1 flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          {job.candidate_required_location ? (
            <Badge variant="secondary">{job.candidate_required_location}</Badge>
          ) : null}
          {job.job_type ? (
            <Badge variant="outline">{job.job_type}</Badge>
          ) : null}
          {job.category ? (
            <Badge variant="outline">{job.category}</Badge>
          ) : null}
        </div>
        {job.salary ? (
          <p className="text-xs sm:text-sm text-muted-foreground">
            Salary: {job.salary}
          </p>
        ) : null}
        {job.publication_date ? (
          <p className="text-xs text-muted-foreground">
            Posted: {new Date(job.publication_date).toLocaleDateString()}
          </p>
        ) : null}
        <div className="mt-auto pt-2">
          <Link
            href={`/jobs/${job.id}`}
            className="text-primary hover:underline text-xs sm:text-sm"
          >
            View details
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
