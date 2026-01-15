export interface Game {
  id: number;
  title: string;
  titleEn: string; // Added for English title support
  imageUrl: string;
  url: string;
}

export interface GameCardProps {
  game: Game;
}