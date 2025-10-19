import React from 'react';
import type { TimelineEvent } from '../types';
import PuzzlePiece from './PuzzlePiece';

interface TimelineItemProps {
  event: TimelineEvent;
  onSelect: (event: TimelineEvent) => void;
  index: number;
  unlockedState: boolean[];
  onPieceClick: (event: TimelineEvent, pieceIndex: number) => void;
}

const TimelineItem: React.FC<TimelineItemProps> = ({ event, onSelect, index, unlockedState, onPieceClick }) => {
  const isEven = index % 2 === 0;
  const alignmentClass = isEven ? 'md:self-start md:pr-8' : 'md:self-end md:pl-8';
  const textAlignment = isEven ? 'md:text-right' : 'md:text-left';
  const pointerClass = isEven 
    ? 'md:border-r-white md:right-[-8px]' 
    : 'md:border-l-white md:left-[-8px]';
    
  const isFullyUnlocked = unlockedState.every(Boolean);

  return (
    <div className={`relative w-full md:w-1/2 flex justify-center ${alignmentClass}`}>
      <div className={`absolute top-5 h-full w-px bg-red-200 hidden md:block ${isEven ? 'right-0' : 'left-0'}`}></div>
      <div className="absolute top-5 w-4 h-4 bg-white border-2 border-red-500 rounded-full z-10 hidden md:block"></div>
      
      <div className="bg-white rounded-lg shadow-lg p-6 my-4 w-full max-w-md">
        <div className={`absolute w-0 h-0 border-t-8 border-b-8 hidden md:block top-6
          ${pointerClass} ${isEven ? 'border-t-transparent border-b-transparent border-l-[8px] border-l-white' : 'border-t-transparent border-b-transparent border-r-[8px] border-r-white'}`}>
        </div>
        
        <div className="relative mb-4 rounded-md overflow-hidden aspect-video bg-gray-200">
          {/* The completed image, hidden by default */}
          <div 
            className={`absolute inset-0 bg-cover bg-center transition-opacity duration-700 ease-in-out ${isFullyUnlocked ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
            style={{ backgroundImage: `url(${event.imageUrl})` }}
            aria-hidden={!isFullyUnlocked}
          ></div>
          
          {/* The puzzle grid, visible by default */}
          <div className={`grid grid-cols-2 w-full h-full transition-opacity duration-300 ${isFullyUnlocked ? 'opacity-0 pointer-events-none' : 'opacity-100'}`} aria-hidden={isFullyUnlocked}>
            {event.quiz.map((quizItem, i) => (
              <PuzzlePiece
                key={i}
                pieceIndex={i}
                isUnlocked={unlockedState[i]}
                imageUrl={event.imageUrl}
                onClick={() => onPieceClick(event, i)}
              />
            ))}
          </div>
        </div>

        <div className={`transition-all duration-500 ${!isFullyUnlocked ? 'filter blur-sm opacity-50' : ''}`}>
            <div className={textAlignment}>
                <p className="text-sm font-semibold text-red-600 mb-1">{event.period}</p>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{event.title}</h3>
                <p className="text-gray-600 mb-4">{event.summary}</p>
                <button 
                    onClick={() => onSelect(event)}
                    disabled={!isFullyUnlocked}
                    className={`px-4 py-2 bg-red-600 text-white font-semibold rounded-lg transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 ${isEven ? 'md:float-right' : 'md:float-left'} ${isFullyUnlocked ? 'hover:bg-red-700' : 'cursor-not-allowed bg-gray-400'}`}
                >
                    {isFullyUnlocked ? 'Xem chi tiết' : 'Đã khóa'}
                </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default TimelineItem;