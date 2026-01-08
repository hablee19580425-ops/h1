import React, { useState, useMemo } from 'react';
import { GAMES } from './constants';
import { GameCard } from './components/GameCard';
import { GameForm } from './components/GameForm';
import { Search, SortAsc, SortDesc, LayoutGrid, Settings, Plus, RotateCcw } from 'lucide-react';
import { SortOrder, Game } from './types';

const App: React.FC = () => {
  // Application State
  const [games, setGames] = useState<Game[]>(GAMES);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState<SortOrder>('asc');
  
  // Management State
  const [isManageMode, setIsManageMode] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingGame, setEditingGame] = useState<Game | null>(null);

  // Filter and Sort Logic
  const processedGames = useMemo(() => {
    // 1. Filter
    const filtered = games.filter((game) => {
      const searchLower = searchTerm.toLowerCase();
      return (
        game.titleKo.toLowerCase().includes(searchLower) ||
        game.titleEn.toLowerCase().includes(searchLower)
      );
    });

    // 2. Sort (Korean collation)
    return filtered.sort((a, b) => {
      const comparison = a.titleKo.localeCompare(b.titleKo, 'ko');
      return sortOrder === 'asc' ? comparison : -comparison;
    });
  }, [searchTerm, sortOrder, games]);

  // Handlers
  const toggleSort = () => {
    setSortOrder((prev) => (prev === 'asc' ? 'desc' : 'asc'));
  };

  const handleAddGame = () => {
    setEditingGame(null);
    setIsModalOpen(true);
  };

  const handleEditGame = (game: Game) => {
    setEditingGame(game);
    setIsModalOpen(true);
  };

  const handleDeleteGame = (id: string) => {
    if (window.confirm('정말로 이 게임을 삭제하시겠습니까?')) {
      setGames((prev) => prev.filter((g) => g.id !== id));
    }
  };

  const handleSaveGame = (gameData: Game) => {
    if (editingGame) {
      // Update existing
      setGames((prev) =>
        prev.map((g) => (g.id === gameData.id ? gameData : g))
      );
    } else {
      // Create new
      setGames((prev) => [gameData, ...prev]);
    }
    setIsModalOpen(false);
  };

  const handleResetData = () => {
    if (window.confirm('모든 데이터를 초기 상태로 되돌리시겠습니까? 추가한 데이터가 삭제됩니다.')) {
      setGames(GAMES);
      setIsManageMode(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-900 to-slate-800 text-slate-100">
      {/* Header / Navbar */}
      <header className="sticky top-0 z-50 bg-slate-900/90 backdrop-blur-md border-b border-slate-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Logo / Title */}
            <div className="flex items-center space-x-3 w-full md:w-auto justify-between md:justify-start">
              <div className="flex items-center space-x-3">
                <div className="bg-gradient-to-tr from-yellow-400 to-orange-500 p-2 rounded-lg shadow-lg shadow-orange-500/20">
                  <LayoutGrid className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h1 className="text-2xl font-black tracking-tight text-white">
                    SLOT<span className="text-yellow-400">BUFF</span>
                  </h1>
                  <p className="text-xs text-slate-400 font-medium tracking-wide uppercase">
                    Premium Game Gallery
                  </p>
                </div>
              </div>
              
              {/* Mobile Manage Toggle */}
              <button
                onClick={() => setIsManageMode(!isManageMode)}
                className={`md:hidden p-2 rounded-lg transition-colors ${
                  isManageMode ? 'bg-yellow-500 text-black' : 'bg-slate-800 text-slate-400'
                }`}
              >
                <Settings className="w-5 h-5" />
              </button>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row w-full md:w-auto items-center gap-3">
              {/* Search Bar */}
              <div className="relative w-full sm:w-auto sm:min-w-[280px]">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-slate-500" />
                </div>
                <input
                  type="text"
                  placeholder="게임 검색 (한글/영어)..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="block w-full pl-10 pr-4 py-2.5 bg-slate-800 border border-slate-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-sm placeholder-slate-500 transition-all text-white"
                />
              </div>

              <div className="flex w-full sm:w-auto items-center gap-2">
                {/* Sort Toggle */}
                <button
                  onClick={toggleSort}
                  className="flex-1 sm:flex-none flex items-center justify-center space-x-2 bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-200 px-4 py-2.5 rounded-lg transition-colors"
                >
                  {sortOrder === 'asc' ? (
                    <>
                      <SortAsc className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-bold hidden sm:inline">가나다순</span>
                    </>
                  ) : (
                    <>
                      <SortDesc className="h-5 w-5 text-yellow-500" />
                      <span className="text-sm font-bold hidden sm:inline">역순</span>
                    </>
                  )}
                </button>

                {/* Manage Toggle (Desktop) */}
                <button
                  onClick={() => setIsManageMode(!isManageMode)}
                  className={`hidden md:flex items-center space-x-2 px-4 py-2.5 rounded-lg transition-all border border-transparent ${
                    isManageMode 
                      ? 'bg-yellow-500 text-black shadow-lg shadow-yellow-500/20 font-bold' 
                      : 'bg-slate-800 text-slate-300 border-slate-700 hover:bg-slate-700'
                  }`}
                  title="관리자 모드"
                >
                  <Settings className="w-5 h-5" />
                  <span className="text-sm">{isManageMode ? '관리 종료' : '관리'}</span>
                </button>
              </div>
            </div>
          </div>
          
          {/* Management Toolbar (Visible only in Manage Mode) */}
          {isManageMode && (
            <div className="mt-4 pt-4 border-t border-slate-800 flex items-center justify-between animate-fadeIn">
              <div className="text-sm text-yellow-500 font-medium flex items-center">
                <Settings className="w-4 h-4 mr-2" />
                관리자 모드가 활성화되었습니다.
              </div>
              <div className="flex gap-2">
                 <button
                  onClick={handleResetData}
                  className="flex items-center space-x-2 bg-slate-800 hover:bg-red-900/30 text-slate-300 hover:text-red-400 px-4 py-2 rounded-lg transition-colors border border-slate-700 hover:border-red-900/50 text-sm"
                >
                  <RotateCcw className="w-4 h-4" />
                  <span className="hidden sm:inline">초기화</span>
                </button>
                <button
                  onClick={handleAddGame}
                  className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg transition-colors shadow-lg shadow-blue-600/20 text-sm font-bold"
                >
                  <Plus className="w-5 h-5" />
                  <span>새 게임 추가</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Results Info */}
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-bold text-white flex items-center">
            전체 게임
            <span className="ml-3 px-3 py-1 bg-slate-800 text-yellow-400 text-xs rounded-full border border-slate-700">
              {processedGames.length}
            </span>
          </h2>
        </div>

        {/* Grid */}
        {processedGames.length > 0 ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {processedGames.map((game) => (
              <GameCard 
                key={game.id} 
                game={game} 
                isManageMode={isManageMode}
                onEdit={handleEditGame}
                onDelete={handleDeleteGame}
              />
            ))}
            
            {/* Add Button as a card in Manage Mode */}
            {isManageMode && (
              <button
                onClick={handleAddGame}
                className="group relative bg-slate-800/50 rounded-xl overflow-hidden border-2 border-dashed border-slate-700 hover:border-yellow-500 hover:bg-slate-800 transition-all duration-300 flex flex-col items-center justify-center min-h-[200px] gap-4"
              >
                <div className="p-4 bg-slate-900 rounded-full group-hover:scale-110 transition-transform">
                  <Plus className="w-8 h-8 text-slate-400 group-hover:text-yellow-500" />
                </div>
                <span className="text-slate-400 group-hover:text-yellow-500 font-medium">새 게임 추가하기</span>
              </button>
            )}
          </div>
        ) : (
          /* Empty State */
          <div className="flex flex-col items-center justify-center py-24 text-center">
             {isManageMode ? (
                <>
                  <div className="bg-slate-800 p-6 rounded-full mb-4 cursor-pointer hover:bg-slate-700 transition-colors" onClick={handleAddGame}>
                    <Plus className="w-12 h-12 text-yellow-500" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-2">
                    등록된 게임이 없습니다.
                  </h3>
                  <p className="text-slate-400 cursor-pointer hover:text-white" onClick={handleAddGame}>
                    새로운 게임을 등록해보세요.
                  </p>
                </>
             ) : (
               <>
                <div className="bg-slate-800 p-6 rounded-full mb-4">
                  <Search className="w-12 h-12 text-slate-500" />
                </div>
                <h3 className="text-xl font-bold text-white mb-2">
                  검색 결과가 없습니다.
                </h3>
                <p className="text-slate-400">
                  다른 검색어로 다시 시도해보세요.
                </p>
               </>
             )}
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 border-t border-slate-800 py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-slate-500 text-sm">
            &copy; {new Date().getFullYear()} SlotBuff Gallery. All rights reserved.
          </p>
          <p className="text-slate-600 text-xs mt-2">
            Designed with React & Tailwind CSS
          </p>
        </div>
      </footer>

      {/* Modal Form */}
      <GameForm
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSaveGame}
        initialData={editingGame}
      />
    </div>
  );
};

export default App;