
import React, { useRef } from 'react';
import { Suggestion } from '@/types';
import SuggestionItem from './SuggestionItem';
import { useChatStore } from '@/store/chatStore';

interface SuggestionCarouselProps {
  suggestions: Suggestion[];
  mode?: 'explore' | 'focused' | 'compact'; // For future use
}

const SuggestionCarousel: React.FC<SuggestionCarouselProps> = ({ 
  suggestions,
  mode = 'explore' // Default to explore mode which shows all layers
}) => {
  const { selectSuggestion } = useChatStore();
  const carouselRefs = useRef<(HTMLDivElement | null)[]>([]);
  
  const scroll = (direction: 'left' | 'right', index: number) => {
    const currentRef = carouselRefs.current[index];
    if (!currentRef) return;
    
    const scrollAmount = 300;
    if (direction === 'left') {
      currentRef.scrollBy({ left: -scrollAmount, behavior: 'smooth' });
    } else {
      currentRef.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  // Split suggestions into three layers
  const directSuggestions = suggestions.slice(0, 3);
  const branchingSuggestions = suggestions.slice(3, 6);
  const complexSuggestions = suggestions.slice(6, 9);
  
  if (suggestions.length === 0) return null;
  
  return (
    <div className="relative group space-y-2">
      {[directSuggestions, branchingSuggestions, complexSuggestions].map((layerSuggestions, depth) => (
        // Always render in explore mode, conditionally render in other modes
        (mode === 'explore' || (mode === 'focused' && layerSuggestions.length > 0)) && (
          <div key={depth} className="relative group">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 -translate-x-3 z-10">
              <button
                onClick={() => scroll('left', depth)}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Scroll left"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
            </div>
            
            <div 
              ref={el => carouselRefs.current[depth] = el}
              className="flex overflow-x-auto scrollbar-thin gap-2 py-1 px-1 scroll-smooth"
            >
              {layerSuggestions.map(suggestion => (
                <SuggestionItem 
                  key={suggestion.id} 
                  suggestion={suggestion} 
                  onSelect={() => selectSuggestion(suggestion)}
                  depth={depth}
                />
              ))}
            </div>
            
            <div className="absolute right-0 top-1/2 transform -translate-y-1/2 translate-x-3 z-10">
              <button
                onClick={() => scroll('right', depth)}
                className="w-8 h-8 rounded-full glass-panel flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                aria-label="Scroll right"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        )
      ))}
    </div>
  );
};

export default SuggestionCarousel;
