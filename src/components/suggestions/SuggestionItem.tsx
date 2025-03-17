
import React, { useMemo } from 'react';
import { Suggestion } from '@/types';
import { cn } from '@/lib/utils';

interface SuggestionItemProps {
  suggestion: Suggestion;
  onSelect: () => void;
  depth: number;
}

const SuggestionItem: React.FC<SuggestionItemProps> = React.memo(({ suggestion, onSelect, depth }) => {
  const isExplored = !!suggestion.branchId;
  
  const depthStyles = useMemo(() => {
    const baseStyles = "flex-shrink-0 glass-panel py-2 px-4 rounded-full cursor-pointer transition-all duration-300";
    
    switch(depth) {
      case 0:
        return cn(baseStyles, isExplored 
          ? "border-accent/30 bg-accent/5 hover:bg-accent/10" 
          : "hover:bg-void-200 dark:hover:bg-void-800"
        );
      case 1:
        return cn(baseStyles, isExplored 
          ? "border-accent/20 bg-accent/3 hover:bg-accent/7" 
          : "hover:bg-void-100 dark:hover:bg-void-900"
        );
      case 2:
        return cn(baseStyles, isExplored 
          ? "border-accent/10 bg-accent/2 hover:bg-accent/5" 
          : "hover:bg-void-50 dark:hover:bg-void-950"
        );
      default:
        return cn(baseStyles, isExplored 
          ? "border-accent/30 bg-accent/5 hover:bg-accent/10" 
          : "hover:bg-void-200 dark:hover:bg-void-800"
        );
    }
  }, [depth, isExplored]);
  
  return (
    <div
      role="button"
      tabIndex={0}
      onClick={onSelect}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          onSelect();
        }
      }}
      className={depthStyles}
      aria-label={`Select suggestion: ${suggestion.content}`}
    >
      <div className="flex items-center gap-2">
        {isExplored && (
          <div 
            className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" 
            aria-hidden="true"
          />
        )}
        <span className="text-sm whitespace-nowrap text-balance">
          {suggestion.content}
        </span>
      </div>
    </div>
  );
});

SuggestionItem.displayName = 'SuggestionItem';

export default SuggestionItem;
