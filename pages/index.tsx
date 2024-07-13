import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Newsletter } from "../types";
import NewsletterCard from "../components/NewsletterCard";
import Pagination from "../components/Pagination";

export default function Home() {
  const { user, isLoading } = useUser();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    fetchNewsletters(currentPage);
  }, [currentPage]);

  const fetchNewsletters = async (page: number) => {
    const res = await fetch(`/api/newsletters?page=${page}&limit=10`);
    const data = await res.json();
    setNewsletters(data.newsletters);
    setTotalPages(data.totalPages);
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-4xl font-bold mb-8">Featured Newsletters</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {newsletters.map((newsletter) => (
          <NewsletterCard key={newsletter._id} newsletter={newsletter} />
        ))}
      </div>
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={setCurrentPage}
      />
    </div>
  );
}
