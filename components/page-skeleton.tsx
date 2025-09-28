import { Skeleton } from "@/components/ui/skeleton";
import { JobCardSkeleton } from "@/components/job-card-skeleton";

export function PageSkeleton() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-4 md:py-8 space-y-4 md:space-y-6">
      {/* Header skeleton */}
      <header className="flex flex-col gap-3 md:gap-4">
        {/* Page title skeleton */}
        <Skeleton className="h-6 sm:h-7 md:h-8 w-40 sm:w-44 md:w-48" />

        {/* Search bar skeleton */}
        <div className="flex gap-2">
          <Skeleton className="h-10 flex-1" />
          <Skeleton className="h-10 w-16 sm:w-20" />
        </div>
      </header>

      {/* Content skeleton */}
      <section className="space-y-4">
        {/* Filters and page size controls skeleton */}
        <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-8 w-20" />
          </div>
        </div>

        {/* Job cards grid skeleton */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, index) => (
            <JobCardSkeleton key={index} />
          ))}
        </div>

        {/* Pagination skeleton */}
        <div className="flex items-center justify-between gap-2 pt-2">
          <Skeleton className="h-4 w-32" />
          <div className="flex items-center gap-1">
            <Skeleton className="h-8 w-16" />
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-8 w-16" />
          </div>
        </div>
      </section>
    </main>
  );
}
