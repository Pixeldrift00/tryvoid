
import React from 'react';
import { Suggestion } from '@/types';
import { cn } from '@/lib/utils';

interface SuggestionItemProps {
  suggestion: Suggestion;
  onSelect: () => void;
}

const SuggestionItem: React.FC<SuggestionItemProps> = ({ suggestion, onSelect }) => {
  const isExplored = !!suggestion.branchId;
  
  return (
    <div
      onClick={onSelect}
      className={cn(
        "flex-shrink-0 glass-panel py-2 px-4 rounded-full cursor-pointer transition-all duration-300",
        isExplored 
          ? "border-accent/30 bg-accent/5 hover:bg-accent/10" 
          : "hover:bg-void-200 dark:hover:bg-void-800"
      )}
    >
      <div className="flex items-center gap-2">
        {isExplored && (
          <div className="w-2 h-2 rounded-full bg-accent animate-pulse-subtle" />
        )}
        <span className="text-sm whitespace-nowrap text-balance">
          {suggestion.content}
        </span>
      </div>
    </div>
  );
};

export default SuggestionItem;
