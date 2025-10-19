import React, { useState } from 'react';
import type { QuizItem } from '../types';

interface QuizModalProps {
  quizItem: QuizItem;
  onClose: () => void;
  onCorrect: () => void;
}

const QuizModal: React.FC<QuizModalProps> = ({ quizItem, onClose, onCorrect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleAnswerSubmit = () => {
    if (selectedAnswer === null) return;

    if (selectedAnswer === quizItem.correctAnswerIndex) {
      setFeedback('correct');
      setTimeout(() => {
        onCorrect();
      }, 1000);
    } else {
      setFeedback('incorrect');
      setTimeout(() => {
        setFeedback(null);
        setSelectedAnswer(null);
      }, 1500);
    }
  };

  const getButtonClass = (index: number) => {
    if (feedback && index === selectedAnswer) {
      return feedback === 'correct' ? 'bg-green-500 text-white' : 'bg-red-500 text-white animate-shake';
    }
    if (selectedAnswer === index) {
      return 'bg-blue-600 text-white';
    }
    return 'bg-gray-100 hover:bg-gray-200';
  }

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-70 z-50 flex justify-center items-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-lg w-full p-6 transform transition-all duration-300 scale-95 animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-lg font-semibold text-gray-800 mb-4">{quizItem.question}</h3>
        <div className="space-y-3 mb-6">
          {quizItem.options.map((option, index) => (
            <button
              key={index}
              onClick={() => !feedback && setSelectedAnswer(index)}
              className={`w-full text-left p-3 rounded-lg transition-colors duration-200 ${getButtonClass(index)}`}
            >
              <span className="font-bold mr-2">{String.fromCharCode(65 + index)}.</span> {option}
            </button>
          ))}
        </div>
        <div className="flex justify-end space-x-3">
          <button onClick={onClose} className="px-4 py-2 text-gray-600 font-semibold rounded-lg hover:bg-gray-100">Đóng</button>
          <button 
            onClick={handleAnswerSubmit} 
            disabled={selectedAnswer === null || !!feedback}
            className="px-6 py-2 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Trả lời
          </button>
        </div>
      </div>
      <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.95) translateY(20px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out forwards;
        }
        @keyframes shake {
          0%, 100% { transform: translateX(0); }
          25% { transform: translateX(-5px); }
          50% { transform: translateX(5px); }
          75% { transform: translateX(-5px); }
        }
        .animate-shake {
          animation: shake 0.4s ease-in-out;
        }
      `}</style>
    </div>
  );
};

export default QuizModal;
