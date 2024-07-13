import { useState } from "react";
import { useUser } from "@auth0/nextjs-auth0/client";
import { useRouter } from "next/router";

export default function CreateNewsletter() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [sampleIssue, setSampleIssue] = useState("");
  const { user, isLoading } = useUser();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch("/api/newsletters", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title,
        description,
        sampleIssue,
        creator: user?.sub,
      }),
    });
    if (res.ok) {
      router.push("/");
    }
  };

  if (isLoading) return <div>Loading...</div>;
  if (!user) router.push("/");

  return (
    <div className="container mx-auto px-4 max-w-2xl">
      <h1 className="text-4xl font-bold mb-8">Create Newsletter</h1>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-2">
            Newsletter Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600"
            required
          />
        </div>
        <div>
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Newsletter Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600"
            rows={4}
            required
          />
        </div>
        <div>
          <label
            htmlFor="sampleIssue"
            className="block text-sm font-medium mb-2"
          >
            Sample Issue
          </label>
          <textarea
            id="sampleIssue"
            value={sampleIssue}
            onChange={(e) => setSampleIssue(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary-light dark:bg-gray-700 dark:border-gray-600"
            rows={8}
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-primary-light hover:bg-primary-dark text-white font-bold py-2 px-4 rounded transition duration-300"
        >
          Create Newsletter
        </button>
      </form>
    </div>
  );
}
