import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Briefcase, Filter } from "lucide-react";

interface EmptyStateProps {
  query?: string;
  onClearSearch?: () => void;
}

export function EmptyState({ query, onClearSearch }: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4">
      <Card className="w-full max-w-md text-center">
        <CardContent className="pt-8 pb-8">
          {/* Icon */}
          <div className="mx-auto mb-6 w-16 h-16 bg-muted/50 rounded-full flex items-center justify-center">
            <Search className="w-8 h-8 text-muted-foreground" />
          </div>

          {/* Title */}
          <h3 className="text-xl font-semibold text-foreground mb-2">
            {query ? `No jobs found for "${query}"` : "No jobs available"}
          </h3>

          {/* Description */}
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {query
              ? "We couldn't find any remote positions matching your search. Try adjusting your search terms or browse all available jobs."
              : "There are currently no remote job openings available. Check back later for new opportunities."}
          </p>

          {/* Suggestions */}
          <div className="space-y-3 mb-6">
            <div className="text-sm text-muted-foreground">
              <strong>Try these suggestions:</strong>
            </div>
            <div className="flex flex-wrap gap-2 justify-center">
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                <Briefcase className="w-3 h-3" />
                React Developer
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                <Briefcase className="w-3 h-3" />
                UI Designer
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                <Briefcase className="w-3 h-3" />
                Python Engineer
              </span>
              <span className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary text-sm rounded-full">
                <Briefcase className="w-3 h-3" />
                Marketing Manager
              </span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            {query && onClearSearch && (
              <Button
                variant="outline"
                onClick={onClearSearch}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Clear Search
              </Button>
            )}
            <Button
              variant="default"
              onClick={() => (window.location.href = "/jobs")}
              className="flex items-center gap-2"
            >
              <Search className="w-4 h-4" />
              Browse All Jobs
            </Button>
          </div>

          {/* Additional Help */}
          <div className="mt-6 pt-4 border-t border-border/50">
            <p className="text-xs text-muted-foreground">
              New jobs are added daily. Bookmark this page to stay updated!
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
