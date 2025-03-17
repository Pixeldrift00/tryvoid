import React from 'react';
import { cn } from '@/lib/utils';

interface VoidLoaderProps {
  size?: number;
  color?: string;
  className?: string;
}

export const VoidLoader: React.FC<VoidLoaderProps> = ({ 
  size = 40, 
  color = 'currentColor',
  className 
}) => {
  return (
    <div
      className={cn("void-loader", className)}
      style={{
        '--uib-size': `${size}px`,
        '--uib-color': color,
        '--uib-speed': '1.5s',
        width: size,
        height: size,
      } as React.CSSProperties}
    >
      <div></div>
    </div>
  );
};
