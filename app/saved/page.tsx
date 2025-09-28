"use client"

import Link from "next/link"
import { useSavedJobs } from "@/lib/saved-jobs"
import { removeJob } from "@/lib/saved-jobs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

export default function SavedJobsPage() {
  const { items } = useSavedJobs()

  return (
    <main className="max-w-5xl mx-auto px-4 py-8 space-y-6">
      <header>
        <h1 className="text-2xl md:text-3xl font-semibold">Saved Jobs</h1>
        <p className="text-muted-foreground">Jobs you’ve saved locally in your browser.</p>
      </header>

      {items.length === 0 ? (
        <div className="text-center space-y-4">
          <p className="text-muted-foreground">No saved jobs yet.</p>
          <Button asChild>
            <Link href="/jobs">Find jobs to save</Link>
          </Button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {items.map((job) => (
            <Card key={job.id} className="h-full flex flex-col">
              <CardHeader>
                <CardTitle className="text-base text-pretty">
                  <Link href={`/jobs/${job.id}`} className="hover:underline">
                    {job.title}
                  </Link>
                </CardTitle>
                <p className="text-sm text-muted-foreground">{job.company_name}</p>
              </CardHeader>
              <CardContent className="mt-auto">
                <div className="flex items-center gap-3">
                  <Button asChild size="sm">
                    <a href={job.url} target="_blank" rel="noopener noreferrer">
                      Apply
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild>
                    <Link href={`/jobs/${job.id}`}>Details</Link>
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => removeJob(job.id)}
                    title="Remove from Saved"
                    aria-label={`Remove ${job.title} from saved`}
                  >
                    Remove
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </main>
  )
}
