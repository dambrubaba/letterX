import { Newsletter } from "../types";

export default function NewsletterCard({
  newsletter,
}: {
  newsletter: Newsletter;
}) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 hover:shadow-lg transition duration-300">
      <h2 className="text-2xl font-bold mb-2 text-primary-light dark:text-primary-dark">
        {newsletter.title}
      </h2>
      <p className="text-gray-600 dark:text-gray-300 mb-4">
        {newsletter.description}
      </p>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Subscribers: {newsletter.subscribers.length}
        </span>
        <button className="bg-secondary-light dark:bg-secondary-dark text-white px-4 py-2 rounded hover:bg-opacity-80 transition duration-300">
          Subscribe
        </button>
      </div>
    </div>
  );
}
