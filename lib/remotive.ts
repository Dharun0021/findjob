export type RemotiveJob = {
  id: number;
  url: string;
  title: string;
  company_name: string;
  company_logo?: string | null;
  category?: string;
  job_type?: string;
  publication_date?: string;
  candidate_required_location?: string;
  salary?: string | null;
  description: string;
};

export type RemotiveResponse = {
  jobs: RemotiveJob[];
};

const BASE = "https://remotive.com/api/remote-jobs";

export async function fetchJobs(query?: string): Promise<RemotiveJob[]> {
  const url = query ? `${BASE}?search=${encodeURIComponent(query)}` : BASE;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch jobs");
  const data = (await res.json()) as RemotiveResponse;
  return data.jobs || [];
}

export type JobSummary = {
  id: number;
  title: string;
  company_name: string;
  company_logo?: string | null;
  candidate_required_location?: string;
  url: string;
};
