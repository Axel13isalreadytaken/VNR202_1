import React from 'react';

interface PuzzlePieceProps {
  pieceIndex: number;
  isUnlocked: boolean;
  imageUrl: string;
  onClick: () => void;
}

const PuzzlePiece: React.FC<PuzzlePieceProps> = ({ pieceIndex, isUnlocked, imageUrl, onClick }) => {
  const getBackgroundPosition = () => {
    const x = (pieceIndex % 2) * 100;
    const y = Math.floor(pieceIndex / 2) * 100;
    return `-${x}% -${y}%`;
  };

  if (isUnlocked) {
    return (
      <div
        className="w-full h-full bg-cover transition-opacity duration-700 border-2 border-white"
        style={{
          backgroundImage: `url(${imageUrl})`,
          backgroundSize: '200% 200%',
          backgroundPosition: getBackgroundPosition(),
        }}
        aria-label={`Mảnh ghép ${pieceIndex + 1} đã được mở`}
      ></div>
    );
  }

  return (
    <button
      onClick={onClick}
      className="w-full h-full bg-gray-200 flex items-center justify-center cursor-pointer hover:bg-gray-300 transition-colors group border-2 border-white"
      aria-label={`Mở khóa mảnh ghép ${pieceIndex + 1}`}
    >
      <svg className="w-8 h-8 text-gray-400 group-hover:text-red-500 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
      </svg>
    </button>
  );
};

export default PuzzlePiece;