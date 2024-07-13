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
    <div className="container">
      <h1>Create Newsletter</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Newsletter Title"
          required
        />
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Newsletter Description"
          required
        />
        <textarea
          value={sampleIssue}
          onChange={(e) => setSampleIssue(e.target.value)}
          placeholder="Sample Issue"
          required
        />
        <button type="submit">Create Newsletter</button>
      </form>
    </div>
  );
}
