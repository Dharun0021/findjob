"use client";

import { useMemo, useState } from "react";
import useSWR from "swr";
import { useSearchParams, useRouter } from "next/navigation";
import { fetchJobs, type RemotiveJob } from "@/lib/remotive";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { JobCard } from "@/components/job-card";
import { JobCardSkeleton } from "@/components/job-card-skeleton";
import { EmptyState } from "@/components/empty-state";

type Filters = {
  category: string;
  jobType: string;
  location: string;
};

const PAGE_SIZE_OPTIONS = [10, 20, 30];
const fetcher = async (query?: string) => fetchJobs(query);

export default function BrowseClient() {
  const searchParams = useSearchParams();
  const router = useRouter();

  // Respect the existing SearchBar parameter key
  const query = searchParams.get("search") || undefined;

  // Function to clear search
  const clearSearch = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete("search");
    router.push(url.pathname);
  };

  const {
    data: jobs = [],
    isLoading,
    error,
  } = useSWR<RemotiveJob[]>(["jobs", query], () => fetcher(query), {
    revalidateOnFocus: false,
  });

  const [filters,] = useState<Filters>({
    category: "All",
    jobType: "All",
    location: "All",
  });

  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(20);

  // const { categories, jobTypes, locations } = useMemo(() => {
  //   const cats = new Set<string>()
  //   const types = new Set<string>()
  //   const locs = new Set<string>()
  //   for (const j of jobs) {
  //     if (j.category) cats.add(j.category)
  //     if (j.job_type) types.add(j.job_type)
  //     if (j.candidate_required_location) locs.add(j.candidate_required_location)
  //   }
  //   return {
  //     categories: ["All", ...Array.from(cats).sort()],
  //     jobTypes: ["All", ...Array.from(types).sort()],
  //     locations: ["All", ...Array.from(locs).sort()],
  //   }
  // }, [jobs])

  const filtered = useMemo(() => {
    return jobs.filter((j) => {
      if (filters.category !== "All" && j.category !== filters.category)
        return false;
      if (filters.jobType !== "All" && j.job_type !== filters.jobType)
        return false;
      if (
        filters.location !== "All" &&
        j.candidate_required_location !== filters.location
      )
        return false;
      return true;
    });
  }, [jobs, filters]);

  const total = filtered.length;
  const totalPages = Math.max(1, Math.ceil(total / pageSize));
  const currentPage = Math.min(page, totalPages);
  const start = (currentPage - 1) * pageSize;
  const end = start + pageSize;
  const pageItems = filtered.slice(start, end);

  const goPage = (p: number) => {
    const next = Math.min(Math.max(1, p), totalPages);
    setPage(next);
  };

  return (
    <section className="space-y-4 md:space-y-6">
      {/* Filters + page-size controls (SearchBar remains in page.tsx header) */}
      <div className="flex flex-col gap-3 md:gap-2 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <label className="text-sm text-muted-foreground" htmlFor="pageSize">
            Per page
          </label>
          <select
            id="pageSize"
            className="min-w-[88px] rounded-md border border-border bg-background px-2 py-1 text-sm"
            value={pageSize}
            onChange={(e) => {
              setPageSize(Number(e.target.value));
              setPage(1);
            }}
          >
            {PAGE_SIZE_OPTIONS.map((n) => (
              <option key={n} value={n}>
                {n}
              </option>
            ))}
          </select>
        </div>
      </div>

      {isLoading && (
        <>
          <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {Array.from({ length: pageSize }).map((_, index) => (
              <JobCardSkeleton key={index} />
            ))}
          </div>

          <div className="flex items-center justify-between gap-2 pt-2">
            <div className="text-xs sm:text-sm text-muted-foreground">
              Loading jobs...
            </div>
          </div>
        </>
      )}

      {error && (
        <div className="text-sm text-destructive-foreground">
          Failed to load jobs. Please try again.
        </div>
      )}

      {!isLoading && !error && (
        <>
          {total === 0 ? (
            <EmptyState query={query} onClearSearch={clearSearch} />
          ) : (
            <>
              <div className="grid grid-cols-1 gap-3 sm:gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {pageItems.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pt-2">
                <div className="text-xs sm:text-sm text-muted-foreground">
                  Showing {Math.min(end, total)} of {total} jobs
                  {query ? ` for "${query}"` : ""}
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goPage(currentPage - 1)}
                    disabled={currentPage <= 1}
                  >
                    <ChevronLeft className="h-4 w-4" />
                    Prev
                  </Button>
                  <div className="px-2 text-sm">
                    Page {currentPage} of {totalPages}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => goPage(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                  >
                    Next
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </>
          )}
        </>
      )}
    </section>
  );
}

// function Select({
//   label,
//   value,
//   onChange,
//   options,
// }: {
//   label: string
//   value: string
//   onChange: (v: string) => void
//   options: string[]
// }) {
//   return (
//     <div className="flex items-center gap-2">
//       <label className="text-sm text-muted-foreground">{label}</label>

//     </div>
//   )
// }
