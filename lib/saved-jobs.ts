"use client"

import { useEffect, useMemo, useState } from "react"
import type { JobSummary } from "./remotive"

const STORAGE_KEY = "saved_jobs_v1"
const CHANNEL_NAME = "saved-jobs"

// Read from localStorage
function read(): JobSummary[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : []
  } catch {
    return []
  }
}

// Write to localStorage + broadcast
function write(items: JobSummary[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  if ("BroadcastChannel" in window) {
    const bc = new BroadcastChannel(CHANNEL_NAME)
    bc.postMessage(items)
    bc.close() // immediately close to avoid leaks
  }
}

// Helpers
export const getSaved = () => read()
export const isSaved = (id: number) => read().some((j) => j.id === id)

export function saveJob(job: JobSummary) {
  const jobs = read()
  if (!jobs.find((j) => j.id === job.id)) {
    write([job, ...jobs])
  }
}

export function removeJob(id: number) {
  write(read().filter((j) => j.id !== id))
}

export function toggleJob(job: JobSummary) {
  isSaved(job.id) ? removeJob(job.id) : saveJob(job)
}

// React hook
export function useSavedJobs() {
  const [items, setItems] = useState<JobSummary[]>([])

  useEffect(() => {
    setItems(read())

    const onStorage = (e: StorageEvent) => {
      if (e.key === STORAGE_KEY) setItems(read())
    }

    let bc: BroadcastChannel | null = null
    if ("BroadcastChannel" in window) {
      bc = new BroadcastChannel(CHANNEL_NAME)
      bc.onmessage = (ev) => setItems(ev.data ?? read())
    }

    window.addEventListener("storage", onStorage)

    return () => {
      window.removeEventListener("storage", onStorage)
      bc?.close()
    }
  }, [])

  const ids = useMemo(() => new Set(items.map((j) => j.id)), [items])
  return { items, ids }
}
