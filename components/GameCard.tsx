import React from 'react';
import { Pencil, Trash2 } from 'lucide-react';
import { Game } from '../types';

interface GameCardProps {
  game: Game;
  isManageMode?: boolean;
  onEdit?: (game: Game) => void;
  onDelete?: (id: string) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ 
  game, 
  isManageMode = false, 
  onEdit, 
  onDelete 
}) => {
  return (
    <div className="group relative bg-slate-800 rounded-xl overflow-hidden shadow-lg border border-slate-700 hover:border-yellow-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl">
      {/* Image Container with Aspect Ratio */}
      <div className="aspect-[16/9] w-full overflow-hidden bg-slate-900 relative">
        <img
          src={game.imageUrl}
          alt={game.titleEn}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          loading="lazy"
        />
        
        {/* Play Overlay (Only show if NOT in manage mode) */}
        {!isManageMode && (
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
            <div className="bg-yellow-500 text-black font-bold px-6 py-2 rounded-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-300 shadow-lg cursor-pointer">
              PLAY NOW
            </div>
          </div>
        )}

        {/* Management Overlay */}
        {isManageMode && (
          <div className="absolute inset-0 bg-slate-900/60 flex items-center justify-center gap-3 backdrop-blur-[2px]">
            <button
              onClick={() => onEdit?.(game)}
              className="p-3 bg-blue-600 text-white rounded-full hover:bg-blue-500 hover:scale-110 transition-all shadow-lg"
              title="수정"
            >
              <Pencil className="w-5 h-5" />
            </button>
            <button
              onClick={() => onDelete?.(game.id)}
              className="p-3 bg-red-600 text-white rounded-full hover:bg-red-500 hover:scale-110 transition-all shadow-lg"
              title="삭제"
            >
              <Trash2 className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>

      {/* Info Content */}
      <div className="p-4">
        <h3 className="text-lg font-bold text-white mb-1 truncate group-hover:text-yellow-400 transition-colors">
          {game.titleKo}
        </h3>
        <p className="text-xs text-slate-400 truncate font-medium">
          {game.titleEn}
        </p>
      </div>
    </div>
  );
};