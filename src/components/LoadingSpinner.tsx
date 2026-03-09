const LoadingSpinner = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <div className="text-center">
        <div className="relative inline-flex">
          <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
        </div>
        <p className="mt-4 text-slate-600 font-medium">Loading students...</p>
      </div>
    </div>
  );
};

export default LoadingSpinner;
