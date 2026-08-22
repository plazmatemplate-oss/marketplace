import Link from "next/link";

export default function NotFound() {
  return (
    <div className="bg-white py-20 md:py-28 flex items-center justify-center">
      <div className="container mx-auto">
        <div className="max-w-2xl mx-auto text-center">

          <div className="text-[120px] md:text-[180px] font-extrabold leading-none bg-(image:--theme-background-gradiant) bg-clip-text text-transparent select-none">
            404
          </div>

          <div className="h-0.75 w-16 bg-(image:--theme-background-gradiant) mx-auto rounded-full mt-2 mb-8" />

          <h1 className="text-2xl md:text-3xl font-bold text-theme-dark-blue mb-3">
            Page Not Found
          </h1>

          <p className="text-[15px] text-theme-gray-500 leading-relaxed mb-2">
            The page you are looking for was not found.
          </p>
          <p className="text-[14px] text-theme-gray-400 mb-10">
            Sorry for the inconvenience.
          </p>

          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/"
              className="bg-(image:--theme-background-gradiant) text-white px-8 py-2.5 rounded-sm font-semibold text-sm hover:opacity-90 shadow-md transition-opacity inline-block"
            >
              Go to Homepage
            </Link>
            <Link
              href="/contact"
              className="bg-white text-theme-gray-700 border border-theme-gray-200 px-8 py-2.5 rounded-sm font-semibold text-sm hover:border-theme-gray-300 hover:text-theme-gray-900 transition-colors inline-block"
            >
              Contact Support
            </Link>
          </div>

        </div>
      </div>
    </div>
  );
}

