import React from 'react';
import { GAMES } from './constants';
import { GameCard } from './components/GameCard';
import { Gamepad2 } from 'lucide-react';

// Sort games alphabetically by Korean title
const sortedGames = [...GAMES].sort((a, b) => a.title.localeCompare(b.title, 'ko'));

const App: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col bg-black relative">
      {/* Subtle gradient accent for depth */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/50 to-black pointer-events-none"></div>

      <div className="relative z-10 container mx-auto px-4 py-6 md:py-8 flex-grow flex flex-col">
        {/* Header - Updated Layout */}
        <header className="mb-10 flex items-center gap-4">
          <div className="inline-flex items-center justify-center p-2 md:p-3 bg-zinc-900 rounded-full border border-zinc-800 shadow-[0_0_15px_rgba(255,255,255,0.05)]">
            <Gamepad2 className="w-6 h-6 md:w-8 md:h-8 text-indigo-500" />
          </div>
          <div className="flex flex-col">
            <div className="flex flex-wrap items-center gap-3 md:gap-4">
              <div className="flex items-baseline gap-2">
                <h1 className="text-3xl md:text-4xl font-bold text-white tracking-tight drop-shadow-[0_0_10px_rgba(255,255,255,0.3)] leading-none">
                  Pragmatic
                </h1>
                <span className="text-lg md:text-xl font-bold text-zinc-500 leading-none">
                  프라그마틱
                </span>
              </div>
              
              {/* Linking Buttons */}
              <div className="flex items-center gap-2 mt-1 md:mt-0">
                {/* Button 1 - Static (No Link, Black) */}
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-black flex items-center justify-center text-white font-bold text-xs md:text-sm border border-zinc-700 shadow-none cursor-default">
                  1
                </div>

                {/* Button 2 - Specific Link */}
                <a
                  href="https://animated-kulfi-55f9a9.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs md:text-sm border border-green-500/30 shadow-[0_0_10px_rgba(22,163,74,0.3)] transition-all duration-300 hover:bg-green-500 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                >
                  2
                </a>

                {/* Button 3 - Specific Link */}
                <a
                  href="https://superb-kulfi-539207.netlify.app/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-green-600 flex items-center justify-center text-white font-bold text-xs md:text-sm border border-green-500/30 shadow-[0_0_10px_rgba(22,163,74,0.3)] transition-all duration-300 hover:bg-green-500 hover:scale-110 hover:-translate-y-0.5 hover:shadow-[0_0_15px_rgba(34,197,94,0.6)]"
                >
                  3
                </a>
              </div>
            </div>
            
            <p className="text-zinc-400 text-sm md:text-base mt-1">
              좋아하는 게임을 바로 시작하세요. <span className="text-zinc-500 ml-2">Jump straight into your favorite games.</span>
            </p>
          </div>
        </header>

        {/* Game Grid - Adjusted to fit 10 cards horizontally on large screens */}
        <main className="flex-grow">
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 lg:grid-cols-10 gap-1">
            {sortedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </div>
        </main>

        {/* Footer */}
        <footer className="mt-16 text-center text-zinc-600 text-sm py-6 border-t border-zinc-900">
          <p>&copy; {new Date().getFullYear()} Pragmatic. All rights reserved.</p>
        </footer>
      </div>
    </div>
  );
};

export default App;