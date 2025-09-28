"use client";

import useSWR from "swr";
import Link from "next/link";
import { fetchJobs, type RemotiveJob } from "@/lib/remotive";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SavedButton } from "./saved-button";
import { JobDetailsSkeleton } from "./job-details-skeleton";

export default function JobDetail({ id }: { id: number }) {
  const { data, error, isLoading } = useSWR<RemotiveJob[]>(
    ["jobs-all-for-detail"],
    () => fetchJobs(),
    {
      revalidateOnFocus: false,
    }
  );

  if (error)
    return <p className="text-destructive-foreground">Failed to load job.</p>;
  if (isLoading || !data) return <JobDetailsSkeleton />;

  const job = data.find((j) => j.id === id);
  if (!job) return <p className="text-muted-foreground">Job not found.</p>;

  const sanitizeHtml = (html: string) => {
    const tmp = document.createElement("div");
    tmp.innerHTML = html;
    tmp
      .querySelectorAll("script, style, iframe, object, embed")
      .forEach((el) => el.remove());
    tmp.querySelectorAll<HTMLElement>("*").forEach((el) => {
      [...el.attributes].forEach((attr) => {
        const name = attr.name.toLowerCase();
        const value = (attr.value || "").trim().toLowerCase();
        if (name.startsWith("on")) el.removeAttribute(attr.name);
        if (name === "srcdoc" || name === "formaction" || name === "style")
          el.removeAttribute(attr.name);
        if (
          (name === "href" || name === "src") &&
          value.startsWith("javascript:")
        )
          el.removeAttribute(attr.name);
      });
    });
    return tmp.innerHTML;
  };
  const descriptionHtml = sanitizeHtml(job.description);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <Card className="shadow-xl border border-border/20 bg-card overflow-hidden">
        <CardHeader className="bg-card border-b border-border/30 px-4 sm:px-8 py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div>
                <CardTitle className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-foreground mb-2 sm:mb-3 leading-tight">
                  {job.title}
                </CardTitle>
                <p className="text-lg sm:text-xl md:text-2xl text-primary font-semibold">
                  {job.company_name}
                </p>
              </div>

              {/* Job Meta Information - Better Aligned */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {job.candidate_required_location && (
                  <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    <span className="font-semibold text-foreground text-xs sm:text-sm">
                      {job.candidate_required_location}
                    </span>
                  </div>
                )}
                {job.job_type && (
                  <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    <span className="font-semibold text-foreground text-xs sm:text-sm">
                      {job.job_type}
                    </span>
                  </div>
                )}
                {job.publication_date && (
                  <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20">
                    <svg
                      className="w-3 h-3 sm:w-4 sm:h-4 text-primary"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-semibold text-foreground text-xs sm:text-sm">
                      Posted:{" "}
                      {new Date(job.publication_date).toLocaleDateString()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            {/* Save Button - Better Positioned */}
            <div className="flex-shrink-0 lg:ml-6 mt-4 lg:mt-0">
              <SavedButton
                job={{
                  id: job.id,
                  title: job.title,
                  company_name: job.company_name,
                  candidate_required_location: job.candidate_required_location,
                  url: job.url,
                }}
              />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 md:p-8">
          {/* Job Description with Enhanced Styling */}
          <div
            className="prose prose-sm sm:prose-base md:prose-lg max-w-none 
            [&_h1]:text-lg sm:[&_h1]:text-xl md:[&_h1]:text-2xl [&_h1]:font-bold [&_h1]:text-foreground [&_h1]:mb-3 sm:[&_h1]:mb-4 [&_h1]:mt-6 sm:[&_h1]:mt-8
            [&_h2]:text-base sm:[&_h2]:text-lg md:[&_h2]:text-xl [&_h2]:font-bold [&_h2]:text-foreground [&_h2]:mb-2 sm:[&_h2]:mb-3 [&_h2]:mt-4 sm:[&_h2]:mt-6
            [&_h3]:text-sm sm:[&_h3]:text-base md:[&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-foreground [&_h3]:mb-2 [&_h3]:mt-3 sm:[&_h3]:mt-4
            [&_p]:text-sm sm:[&_p]:text-base [&_p]:text-foreground [&_p]:leading-relaxed [&_p]:mb-3 sm:[&_p]:mb-4
            [&_ul]:list-none [&_ul]:space-y-1 sm:[&_ul]:space-y-2 [&_ul]:mb-4 sm:[&_ul]:mb-6
            [&_ol]:list-none [&_ol]:space-y-1 sm:[&_ol]:space-y-2 [&_ol]:mb-4 sm:[&_ol]:mb-6
            [&_li]:flex [&_li]:items-start [&_li]:gap-2 sm:[&_li]:gap-3 [&_li]:text-sm sm:[&_li]:text-base [&_li]:text-foreground [&_li]:leading-relaxed
            [&_li]:before:content-['•'] [&_li]:before:text-primary [&_li]:before:font-bold [&_li]:before:text-lg sm:[&_li]:before:text-xl [&_li]:before:flex-shrink-0 [&_li]:before:mt-0.5
            [&_ol_li]:before:content-[counter(li)] [&_ol_li]:before:bg-primary [&_ol_li]:before:text-white [&_ol_li]:before:rounded-full [&_ol_li]:before:w-5 sm:[&_ol_li]:before:w-6 [&_ol_li]:before:h-5 sm:[&_ol_li]:before:h-6 [&_ol_li]:before:flex [&_ol_li]:before:items-center [&_ol_li]:before:justify-center [&_ol_li]:before:text-xs sm:[&_ol_li]:before:text-sm [&_ol_li]:before:font-bold [&_ol_li]:before:mr-2
            [&_strong]:font-bold [&_strong]:text-foreground
            [&_em]:italic [&_em]:text-foreground
            [&_a]:text-primary [&_a]:underline [&_a]:hover:text-primary/80
            [&_code]:bg-muted/50 [&_code]:px-1.5 sm:[&_code]:px-2 [&_code]:py-0.5 sm:[&_code]:py-1 [&_code]:rounded [&_code]:text-xs sm:[&_code]:text-sm [&_code]:font-mono
            [&_pre]:bg-muted/30 [&_pre]:p-2 sm:[&_pre]:p-4 [&_pre]:rounded-lg [&_pre]:overflow-x-auto [&_pre]:border [&_pre]:border-border/50
            [&_blockquote]:border-l-4 [&_blockquote]:border-primary [&_blockquote]:pl-3 sm:[&_blockquote]:pl-4 [&_blockquote]:italic [&_blockquote]:text-muted-foreground
            [&_hr]:border-border [&_hr]:my-6 sm:[&_hr]:my-8"
          >
            <div dangerouslySetInnerHTML={{ __html: descriptionHtml }} />
          </div>

          {/* Call to Action Section */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
            <div className="text-center mb-6 sm:mb-8">
              <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-foreground mb-2">
                Ready to Apply?
              </h3>
              <p className="text-muted-foreground text-sm sm:text-base md:text-lg">
                Take the next step in your career journey
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2.5 sm:py-3"
              >
                <a
                  href={job.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Apply on Remotive"
                >
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5 mr-2"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                    />
                  </svg>
                  Apply Now
                </a>
              </Button>
              <Button
                variant="outline"
                asChild
                size="lg"
                className="w-full sm:w-auto text-sm sm:text-base md:text-lg px-6 sm:px-8 py-2.5 sm:py-3"
              >
                <Link href="/jobs" className="flex items-center gap-2">
                  <svg
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10 19l-7-7m0 0l7-7m-7 7h18"
                    />
                  </svg>
                  Back to Jobs
                </Link>
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
