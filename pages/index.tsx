import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { Newsletter } from "../types";

export default function Home() {
  const { user, isLoading } = useUser();
  const [newsletters, setNewsletters] = useState<Newsletter[]>([]);

  useEffect(() => {
    fetch("/api/newsletters")
      .then((res) => res.json())
      .then((data) => setNewsletters(data));
  }, []);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div className="container">
      <h1>Newsletter Platform</h1>
      {user ? (
        <>
          <p>Welcome, {user.name}!</p>
          <Link href="/api/auth/logout">Logout</Link>
          <Link href="/create">Create Newsletter</Link>
        </>
      ) : (
        <Link href="/api/auth/login">Login</Link>
      )}
      <h2>Featured Newsletters</h2>
      <ul>
        {newsletters.map((newsletter) => (
          <li key={newsletter._id}>
            <h3>{newsletter.title}</h3>
            <p>{newsletter.description}</p>
            <button onClick={() => handleSubscribe(newsletter._id)}>
              Subscribe
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
