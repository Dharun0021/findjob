import Link from "next/link";
import { SearchBar } from "@/components/Searchbar";
import { Button } from "@/components/ui/button";
import { PiBagFill } from "react-icons/pi";
import { FcSearch } from "react-icons/fc";
import { MdSaveAs } from "react-icons/md";
import { FcOvertime } from "react-icons/fc";
import { FcOrganization } from "react-icons/fc";
import { MdOutlineVerifiedUser } from "react-icons/md";

export default function HomePage() {
  return (
    <div className="min-h-screen w-full flex items-center justify-center ">
      <main className="max-w-4xl mx-auto px-4 py-16">
        <section className="text-center space-y-8">
          {/* Hero Section with Primary Color Accent */}
          <div className="space-y-6">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-primary/10 mb-6">
              <div className="w-16 h-16 rounded-full bg-primary/5 flex items-center justify-center">
                <PiBagFill className="w-8 h-8 text-primary" />
              </div>
            </div>

            <h1 className="text-4xl md:text-6xl font-bold text-balance bg-gradient-to-r from-foreground to-primary bg-clip-text text-transparent">
              Find Your Next Remote Job
            </h1>

            <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
              Search thousands of remote-friendly openings from Remotive. Save
              roles you like and apply when you&apos;re ready.
            </p>
          </div>

          {/* Search Section with Enhanced Styling */}
          <div className="space-y-6">
            <div className="relative">
              <SearchBar />
            </div>

            {/* Action Buttons with Primary Color Theme */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Button
                asChild
                variant="outline"
                size="lg"
                className="w-full sm:w-auto hover:bg-primary hover:text-primary-foreground transition-colors"
              >
                <Link href="/jobs" className="flex items-center gap-2">
                  <FcSearch />
                  Browse all jobs
                </Link>
              </Button>
              <Button
                asChild
                size="lg"
                className="w-full sm:w-auto bg-primary hover:bg-primary/90"
              >
                <Link href="/saved" className="flex items-center gap-2">
                  <MdSaveAs />
                  Saved jobs
                </Link>
              </Button>
            </div>
          </div>

          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 pt-8 border-t border-border/50">
            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <FcOvertime className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground">
                Real-time Updates
              </h3>
              <p className="text-sm text-muted-foreground">
                Fresh job listings updated daily from top remote companies
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <FcOrganization className="w-8 h-8" />
              </div>
              <h3 className="font-semibold text-foreground">Save & Organize</h3>
              <p className="text-sm text-muted-foreground">
                Bookmark your favorite positions and track applications
              </p>
            </div>

            <div className="text-center space-y-3">
              <div className="w-16 h-16 rounded-lg bg-primary/10 flex items-center justify-center mx-auto">
                <MdOutlineVerifiedUser className="w-8 h-8 text-primary" />
              </div>
              <h3 className="font-semibold text-foreground">Quality Assured</h3>
              <p className="text-sm text-muted-foreground">
                Curated remote positions from verified companies
              </p>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
