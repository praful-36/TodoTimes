import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="h-screen flex flex-col items-center justify-center gap-4 bg-gray-100 dark:bg-gray-900 text-center animate-fadeIn">
      <h1 className="text-7xl font-extrabold text-blue-500 dark:text-blue-400 mb-4 animate-bounce">
        404
      </h1>
      <h2 className="text-2xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
        Oops! Page Not Found
      </h2>
      <p className="text-gray-500 dark:text-gray-400 mb-6">
        The page you're looking for might have been removed or doesn't exist.
      </p>
      <Link
        to="/"
        className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full shadow-lg transition-all duration-300 transform hover:scale-105"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotFound;
