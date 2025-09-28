import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function JobDetailsSkeleton() {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 sm:py-8">
      <Card className="shadow-xl border border-border/20 bg-card overflow-hidden">
        <CardHeader className="bg-card border-b border-border/30 px-4 sm:px-8 py-4 sm:py-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="flex-1 space-y-4">
              <div>
                {/* Job title skeleton */}
                <Skeleton className="h-6 sm:h-7 md:h-8 lg:h-10 w-3/4 mb-2 sm:mb-3" />
                {/* Company name skeleton */}
                <Skeleton className="h-5 sm:h-6 md:h-7 lg:h-8 w-1/2" />
              </div>

              {/* Job Meta Information skeleton */}
              <div className="flex flex-wrap gap-2 sm:gap-3">
                {/* Location badge skeleton */}
                <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20">
                  <Skeleton className="w-3 h-3 sm:w-4 sm:h-4" />
                  <Skeleton className="h-4 sm:h-5 w-20 sm:w-24" />
                </div>

                {/* Job type badge skeleton */}
                <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20">
                  <Skeleton className="w-3 h-3 sm:w-4 sm:h-4" />
                  <Skeleton className="h-4 sm:h-5 w-16 sm:w-20" />
                </div>

                {/* Posted date badge skeleton */}
                <div className="flex items-center gap-1 sm:gap-2 bg-primary/10 px-2 sm:px-3 md:px-4 py-1.5 sm:py-2 rounded-lg border border-primary/20">
                  <Skeleton className="w-3 h-3 sm:w-4 sm:h-4" />
                  <Skeleton className="h-4 sm:h-5 w-28 sm:w-32" />
                </div>
              </div>
            </div>

            {/* Save Button skeleton */}
            <div className="flex-shrink-0 lg:ml-6 mt-4 lg:mt-0">
              <Skeleton className="h-10 w-24 rounded-md" />
            </div>
          </div>
        </CardHeader>

        <CardContent className="p-4 sm:p-6 md:p-8">
          {/* Job Description skeleton */}
          <div className="space-y-4">
            {/* Multiple paragraphs skeleton */}
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
            <div className="h-6" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
            <div className="h-6" />

            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-4/5" />
            <div className="h-6" />

            {/* List items skeleton */}
            <div className="space-y-3">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-3/4" />
            </div>

            <div className="h-6" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-5/6" />
          </div>

          {/* Call to Action Section skeleton */}
          <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-border/50">
            <div className="text-center mb-6 sm:mb-8">
              {/* Ready to Apply title skeleton */}
              <Skeleton className="h-6 sm:h-7 md:h-8 w-40 sm:w-48 mx-auto mb-2" />
              {/* Subtitle skeleton */}
              <Skeleton className="h-4 sm:h-5 w-56 sm:w-64 mx-auto" />
            </div>

            {/* Action buttons skeleton */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
              <Skeleton className="h-10 sm:h-12 w-32 sm:w-40" />
              <Skeleton className="h-10 sm:h-12 w-32 sm:w-36" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
