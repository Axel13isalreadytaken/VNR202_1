
import React from 'react';
import type { TimelineEvent } from '../types';

interface DetailModalProps {
  event: TimelineEvent | null;
  onClose: () => void;
}

const DetailModal: React.FC<DetailModalProps> = ({ event, onClose }) => {
  if (!event) return null;

  // Simple markdown-like formatter for details
  const formatDetails = (details: string) => {
    return details.split('\n').map((paragraph, index) => {
      if (paragraph.startsWith('- ')) {
        return <li key={index} className="mb-2 list-disc list-inside">{paragraph.substring(2)}</li>;
      }
      return <p key={index} className="mb-4 text-gray-700 leading-relaxed">{paragraph}</p>;
    });
  };

  return (
    <div 
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex justify-center items-center p-4 transition-opacity duration-300"
      onClick={onClose}
    >
      <div 
        className="bg-white rounded-lg shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto transform transition-all duration-300 scale-95 animate-modal-enter"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="sticky top-0 bg-white p-6 border-b border-gray-200 flex justify-between items-center">
          <div>
            <p className="text-sm font-semibold text-red-600">{event.period}</p>
            <h2 className="text-2xl font-bold text-gray-900">{event.title}</h2>
          </div>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-gray-700 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
          </button>
        </div>
        <div className="p-6">
          <img 
            src={event.imageUrl}
            alt={event.title} 
            className="w-full h-64 object-cover rounded-md mb-6 bg-gray-200"
          />
          <div className="prose max-w-none">
            {formatDetails(event.details)}
          </div>
        </div>
      </div>
      <style>{`
        @keyframes modal-enter {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        .animate-modal-enter {
          animation: modal-enter 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default DetailModal;
