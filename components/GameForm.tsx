import React, { useState, useRef, useEffect } from 'react';
import { X, Upload, Image as ImageIcon } from 'lucide-react';
import { Game } from '../types';

interface GameFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (game: Game) => void;
  initialData?: Game | null;
}

export const GameForm: React.FC<GameFormProps> = ({ isOpen, onClose, onSave, initialData }) => {
  const [titleKo, setTitleKo] = useState('');
  const [titleEn, setTitleEn] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setTitleKo(initialData.titleKo);
        setTitleEn(initialData.titleEn);
        setImageUrl(initialData.imageUrl);
      } else {
        resetForm();
      }
    }
  }, [isOpen, initialData]);

  const resetForm = () => {
    setTitleKo('');
    setTitleEn('');
    setImageUrl('');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const processFile = (file: File) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setImageUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file && file.type.startsWith('image/')) {
      processFile(file);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!titleKo || !imageUrl) return;

    onSave({
      id: initialData?.id || Date.now().toString(),
      titleKo,
      titleEn: titleEn || titleKo, // Fallback to Korean title if English is empty
      imageUrl,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm">
      <div className="bg-slate-800 rounded-2xl w-full max-w-lg shadow-2xl border border-slate-700 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-slate-700 bg-slate-900/50">
          <h2 className="text-xl font-bold text-white">
            {initialData ? '게임 정보 수정' : '새 게임 등록'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-700 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Image Upload Area */}
          <div className="space-y-2">
            <label className="block text-sm font-medium text-slate-300">
              게임 이미지
            </label>
            <div
              onClick={() => fileInputRef.current?.click()}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              className={`relative group cursor-pointer border-2 border-dashed rounded-xl transition-all duration-200 aspect-video flex flex-col items-center justify-center overflow-hidden ${
                isDragging
                  ? 'border-yellow-500 bg-yellow-500/10'
                  : 'border-slate-600 bg-slate-900/50 hover:border-slate-500 hover:bg-slate-900'
              }`}
            >
              {imageUrl ? (
                <>
                  <img
                    src={imageUrl}
                    alt="Preview"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <p className="text-white font-medium flex items-center gap-2">
                      <ImageIcon className="w-5 h-5" /> 이미지 변경
                    </p>
                  </div>
                </>
              ) : (
                <div className="text-center p-6">
                  <div className="bg-slate-800 p-3 rounded-full inline-flex mb-3">
                    <Upload className="w-6 h-6 text-slate-400" />
                  </div>
                  <p className="text-sm text-slate-300 font-medium">
                    클릭하여 업로드 또는 드래그 앤 드롭
                  </p>
                  <p className="text-xs text-slate-500 mt-1">
                    JPG, PNG, WEBP (최대 5MB)
                  </p>
                </div>
              )}
              <input
                ref={fileInputRef}
                type="file"
                className="hidden"
                accept="image/*"
                onChange={handleFileChange}
              />
            </div>
          </div>

          {/* Inputs */}
          <div className="grid grid-cols-1 gap-4">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                게임 제목 (한글) <span className="text-red-500">*</span>
              </label>
              <input
                type="text"
                required
                value={titleKo}
                onChange={(e) => setTitleKo(e.target.value)}
                placeholder="예: 해머 스톰"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-slate-600"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">
                게임 제목 (영어)
              </label>
              <input
                type="text"
                value={titleEn}
                onChange={(e) => setTitleEn(e.target.value)}
                placeholder="예: Hammer Storm"
                className="w-full px-4 py-2.5 bg-slate-900 border border-slate-700 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent text-white placeholder-slate-600"
              />
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex gap-3 pt-2">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-3 bg-slate-700 text-slate-200 rounded-xl font-medium hover:bg-slate-600 transition-colors"
            >
              취소
            </button>
            <button
              type="submit"
              disabled={!titleKo || !imageUrl}
              className="flex-1 px-4 py-3 bg-yellow-500 text-black rounded-xl font-bold hover:bg-yellow-400 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {initialData ? '수정 완료' : '등록하기'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};