import React from 'react';

interface LandingPageProps {
  onStart: () => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ onStart }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gradient-to-br from-red-50 via-gray-50 to-blue-50 text-center p-4 animate-fade-in">
      <div className="mb-4">
        <span className="text-6xl" role="img" aria-label="Vietnam flag">🇻🇳</span>
      </div>
      <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 mb-4 leading-tight">
        Khám Phá Thành Tựu<br />
        <span className="text-red-600">Đổi Mới Việt Nam</span>
      </h1>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-8">
        Tham gia vào một hành trình tương tác, giải những câu đố lịch sử để hé lộ những cột mốc vàng son của dân tộc kể từ năm 1986.
      </p>
      <button
        onClick={onStart}
        className="px-8 py-4 bg-red-600 text-white font-bold rounded-full text-lg shadow-lg hover:bg-red-700 transform hover:scale-105 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-red-300"
      >
        Bắt đầu hành trình
      </button>
       <style>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default LandingPage;