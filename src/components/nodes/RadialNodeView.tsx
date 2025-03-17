
import React, { useEffect, useState } from 'react';
import { useChatStore } from '@/store/chatStore';
import { ConversationNode } from '@/types';
import { cn } from '@/lib/utils';

const RadialNodeView: React.FC = () => {
  const { rootNode, selectBranch } = useChatStore();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
  }, []);
  
  if (!mounted || !rootNode) {
    return (
      <div className="h-full flex items-center justify-center">
        <div className="text-void-500 animate-pulse">Building visualization...</div>
      </div>
    );
  }
  
  const renderNode = (node: ConversationNode, depth: number = 0, index: number = 0, totalSiblings: number = 1) => {
    const angle = (index / totalSiblings) * Math.PI * 2;
    const distance = 120 + depth * 60;
    const x = Math.cos(angle) * distance;
    const y = Math.sin(angle) * distance;
    
    return (
      <React.Fragment key={node.id}>
        <g
          transform={`translate(${x}, ${y})`}
          onClick={() => selectBranch(node.branchId)}
          className="cursor-pointer transition-transform duration-300 hover:scale-110"
        >
          <circle
            r={node.sender === 'user' ? 10 : 12}
            className={cn(
              "transition-colors duration-300",
              node.sender === 'user'
                ? "fill-accent stroke-white stroke-1"
                : "fill-void-100 dark:fill-void-800 stroke-void-300 dark:stroke-void-600 stroke-1"
            )}
          />
          <title>{node.content}</title>
        </g>
        
        {/* Edges to children */}
        {node.children.map(child => (
          <line
            key={`edge-${node.id}-${child.id}`}
            x1={x}
            y1={y}
            x2={Math.cos((node.children.indexOf(child) / node.children.length) * Math.PI * 2) * (120 + (depth + 1) * 60)}
            y2={Math.sin((node.children.indexOf(child) / node.children.length) * Math.PI * 2) * (120 + (depth + 1) * 60)}
            className="stroke-void-300 dark:stroke-void-700 stroke-1 opacity-40"
          />
        ))}
        
        {/* Render children */}
        {node.children.map((child, idx) => 
          renderNode(child, depth + 1, idx, node.children.length)
        )}
      </React.Fragment>
    );
  };
  
  return (
    <div className="h-full flex items-center justify-center overflow-hidden">
      <svg
        width="100%"
        height="100%"
        viewBox="-300 -300 600 600"
        className="transform transition-all duration-500 ease-out"
      >
        <g transform="translate(0, 0)">
          {renderNode(rootNode)}
        </g>
      </svg>
    </div>
  );
};

export default RadialNodeView;
