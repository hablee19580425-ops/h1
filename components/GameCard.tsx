import React, { useState } from 'react';
import { GameCardProps } from '../types';

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [imageError, setImageError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Fallback image if the primary URL fails
  // Updated to 384x200 to match the aspect ratio of real game thumbnails
  const placeholderSrc = `https://placehold.co/384x200/1e293b/cbd5e1?text=${encodeURIComponent(game.titleEn)}`;

  return (
    <a 
      href={game.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative flex flex-col items-center p-0 transition-all duration-300 ease-out focus:outline-none w-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Background Glow Effect */}
      <div className={`absolute inset-0 bg-indigo-500/20 blur-xl transition-opacity duration-300 ${isHovered ? 'opacity-100' : 'opacity-0'}`} />

      {/* Card Container - Flexible width to fit grid */}
      <div className="relative z-10 flex flex-col items-center bg-black/90 backdrop-blur-sm border border-black shadow-xl group-hover:border-indigo-500/50 group-hover:shadow-indigo-500/20 transition-all duration-300 w-full overflow-hidden">
        
        {/* Image Container */}
        <div className="w-full bg-slate-900 shadow-inner overflow-hidden">
          <img
            src={imageError ? placeholderSrc : game.imageUrl}
            alt={game.title}
            onError={() => setImageError(true)}
            className="w-full h-auto object-cover transition-transform duration-500 group-hover:scale-110 block"
          />
        </div>

        {/* Text Content - Reduced padding and font size for 10-column layout */}
        <div className="text-center w-full px-1 py-1">
          <h3 className="text-white font-light text-xs leading-tight break-keep">
            {game.title}
          </h3>
        </div>
      </div>
    </a>
  );
};