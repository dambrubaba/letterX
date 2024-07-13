import { useTheme } from "next-themes";
import { useUser } from "@auth0/nextjs-auth0/client";
import Link from "next/link";
import { SunIcon, MoonIcon } from "@heroicons/react/24/solid";

export default function Layout({ children }: { children: React.ReactNode }) {
  const { theme, setTheme } = useTheme();
  const { user, isLoading } = useUser();

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <nav className="bg-white dark:bg-gray-800 shadow-md">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link
            href="/"
            className="text-2xl font-bold text-primary-light dark:text-primary-dark"
          >
            Newsletter Platform
          </Link>
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              className="p-2 rounded-full bg-gray-200 dark:bg-gray-700"
            >
              {theme === "dark" ? (
                <SunIcon className="h-5 w-5 text-yellow-500" />
              ) : (
                <MoonIcon className="h-5 w-5 text-gray-700" />
              )}
            </button>
            {!isLoading &&
              (user ? (
                <div className="flex items-center space-x-4">
                  <Link
                    href="/create"
                    className="text-secondary-light dark:text-secondary-dark hover:underline"
                  >
                    Create Newsletter
                  </Link>
                  <Link
                    href="/api/auth/logout"
                    className="text-primary-light dark:text-primary-dark hover:underline"
                  >
                    Logout
                  </Link>
                </div>
              ) : (
                <Link
                  href="/api/auth/login"
                  className="text-primary-light dark:text-primary-dark hover:underline"
                >
                  Login
                </Link>
              ))}
          </div>
        </div>
      </nav>
      <main className="container mx-auto px-4 py-8">{children}</main>
    </div>
  );
}
