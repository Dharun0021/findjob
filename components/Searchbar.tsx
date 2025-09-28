"use client";

import type React from "react";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export function SearchBar({ initialQuery = "" }: { initialQuery?: string }) {
  const [q, setQ] = useState(initialQuery);
  const router = useRouter();

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const path = q.trim()
      ? `/jobs?search=${encodeURIComponent(q.trim())}`
      : "/jobs";
    router.push(path);
  }

  return (
    <form
      onSubmit={onSubmit}
      className="w-full max-w-2xl mx-auto flex flex-col sm:flex-row items-stretch sm:items-center gap-2"
      role="search"
      aria-label="Job search"
    >
      <Input
        type="search"
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search remote jobs (e.g., React, Designer, Python)"
        className="flex-1"
        aria-label="Search jobs"
        autoComplete="off"
      />
      <Button type="submit" className="shrink-0 w-full sm:w-auto cursor-pointer">
        Search
      </Button>
    </form>
  );
}
