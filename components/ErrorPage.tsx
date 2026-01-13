import Link from "next/link";
import { AlertCircle } from "lucide-react";

export default function ErrorPage({
  title = "Something went wrong",
  message = "We encountered an error loading this page.",
  action,
}: {
  title?: string;
  message?: string;
  action?: { label: string; href: string };
}) {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
        {/* Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-100 rounded-full p-4">
            <AlertCircle className="w-12 h-12 text-red-600" />
          </div>
        </div>

        {/* Title */}
        <h1 className="text-2xl font-bold text-gray-900 mb-3">{title}</h1>

        {/* Message */}
        <p className="text-gray-600 mb-6">{message}</p>

        {/* Action Buttons */}
        <div className="flex flex-col gap-3">
          {action && (
            <Link
              href={action.href}
              className="bg-primary text-white px-6 py-3 rounded-lg font-semibold hover:bg-opacity-90 transition-colors"
            >
              {action.label}
            </Link>
          )}
          <Link
            href="/"
            className="bg-gray-100 text-gray-700 px-6 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
          >
            Go to Home
          </Link>
        </div>
      </div>
    </main>
  );
}
