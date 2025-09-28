"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { isSaved, toggleJob } from "@/lib/saved-jobs";
import type { JobSummary } from "@/lib/remotive";
import { useEffect, useState, useTransition } from "react";

export function SavedButton({ job }: { job: JobSummary }) {
  const [saved, setSaved] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setSaved(isSaved(job.id));
    function syncStorage(e: StorageEvent) {
      if (e.key === "saved_jobs_v1") setSaved(isSaved(job.id));
    }
    // listen to custom event for same-tab updates
    function syncCustom(e: Event) {
      setSaved(isSaved(job.id));
    }
    // listen to broadcast channel for cross-tab updates
    let bc: BroadcastChannel | null = null;
    if (typeof window !== "undefined" && "BroadcastChannel" in window) {
      bc = new BroadcastChannel("saved-jobs");
      bc.addEventListener("message", () => setSaved(isSaved(job.id)));
    }

    window.addEventListener("storage", syncStorage);
    window.addEventListener("saved-jobs:changed", syncCustom as EventListener);
    return () => {
      window.removeEventListener("storage", syncStorage);
      window.removeEventListener(
        "saved-jobs:changed",
        syncCustom as EventListener
      );
      bc?.close();
    };
  }, [job.id]);

  function onClick() {
    startTransition(() => {
      toggleJob(job);
      setSaved((s) => !s);
    });
  }

  return (
    <Button
      variant={saved ? "secondary" : "outline"}
      size="sm"
      onClick={onClick}
      aria-pressed={saved}
      aria-label={saved ? "Remove from saved" : "Save job"}
      data-pending={isPending ? "true" : "false"}
      className="cursor-pointer"
    >
      {saved ? (
        <BookmarkCheck className="h-4 w-4 mr-2" />
      ) : (
        <Bookmark className="h-4 w-4 mr-2" />
      )}
      {saved ? "Saved" : "Save"}
    </Button>
  );
}
