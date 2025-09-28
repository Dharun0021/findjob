import { SearchBar } from "@/components/Searchbar";
import BrowseClient from "@/app/jobs/browse-client";
import { PageSkeleton } from "@/components/page-skeleton";
import { Suspense } from "react";

export default function JobsPage() {
  return (
    <main className="max-w-6xl mx-auto px-4 py-4 md:py-8 space-y-4 md:space-y-6">
      <header className="flex flex-col gap-3 md:gap-4">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-semibold leading-tight">
          Remote Jobs
        </h1>
        <SearchBar />
      </header>
      <Suspense fallback={<PageSkeleton />}>
        <BrowseClient />
      </Suspense>
    </main>
  );
}
