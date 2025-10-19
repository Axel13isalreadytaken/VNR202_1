
import React from 'react';

const LoadingSpinner: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen text-center">
        <div className="w-16 h-16 border-4 border-dashed rounded-full animate-spin border-red-600"></div>
        <p className="mt-4 text-lg font-semibold text-gray-700">Đang tải dữ liệu từ Gemini...</p>
        <p className="text-sm text-gray-500">Vui lòng đợi trong giây lát.</p>
    </div>
  );
};

export default LoadingSpinner;
