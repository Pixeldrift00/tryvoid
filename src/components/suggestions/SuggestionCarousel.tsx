
import React, { useRef } from 'react';
import { Suggestion } from '@/types';
import SuggestionItem from './SuggestionItem';
import { useChatStore } from '@/store/chatStore';

interface SuggestionCarouselProps {
  suggestions: Suggestion[];
}

const SuggestionCarousel: React.FC<SuggestionCarouselProps> = ({ suggestions }) => {
  const { selectSuggestion } = useChatStore();
  const carouselRef = useRef<HTMLDivElement>(null);
  
  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const scrollAmount = 300;
    if (direction === 'left') {
      carouselRef.current.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      carouselRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };
  
  if (suggestions.length === 0) return null;
  
  return (
    <div className="relative group">
      <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 z-10">
        <button
          onClick={() => scroll('left')}
          className="w-8 h-8 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll left"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m15 18-6-6 6-6" />
          </svg>
        </button>
      </div>
      
      <div 
        ref={carouselRef}
        className="flex overflow-x-auto scrollbar-thin gap-2 py-2 px-1"
      >
        {suggestions.map(suggestion => (
          <SuggestionItem 
            key={suggestion.id} 
            suggestion={suggestion} 
            onSelect={() => selectSuggestion(suggestion)}
          />
        ))}
        
        <div className="flex-shrink-0 glass-panel py-2 px-4 rounded-full flex items-center justify-center cursor-pointer hover:bg-void-200 dark:hover:bg-void-800 transition-colors duration-300">
          <span className="text-sm">+ More</span>
        </div>
      </div>
      
      <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 z-10">
        <button
          onClick={() => scroll('right')}
          className="w-8 h-8 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          aria-label="Scroll right"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="m9 18 6-6-6-6" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SuggestionCarousel;
