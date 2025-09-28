import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobCardSkeleton() {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader className="flex flex-row items-start justify-between gap-4">
        <div className="flex items-center gap-3 flex-1">
          {/* Company logo skeleton */}
          <Skeleton className="h-12 w-12 rounded-lg" />

          <div className="flex-1 space-y-2">
            {/* Job title skeleton */}
            <Skeleton className="h-4 sm:h-5 w-3/4" />
            {/* Company name skeleton */}
            <Skeleton className="h-3 sm:h-4 w-1/2" />
          </div>
        </div>

        {/* Save button skeleton */}
        <Skeleton className="h-8 w-8 rounded-md" />
      </CardHeader>

      <CardContent className="flex-1 flex flex-col gap-2">
        {/* Badges skeleton */}
        <div className="flex flex-wrap items-center gap-2">
          <Skeleton className="h-6 w-16 rounded-full" />
          <Skeleton className="h-6 w-20 rounded-full" />
          <Skeleton className="h-6 w-24 rounded-full" />
        </div>

        {/* Salary skeleton */}
        <Skeleton className="h-3 sm:h-4 w-32" />

        {/* Posted date skeleton */}
        <Skeleton className="h-3 w-24" />

        {/* View details link skeleton */}
        <div className="mt-auto pt-2">
          <Skeleton className="h-3 sm:h-4 w-20" />
        </div>
      </CardContent>
    </Card>
  );
}
