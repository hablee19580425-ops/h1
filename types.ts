export interface Game {
  id: string;
  titleEn: string;
  titleKo: string; // Korean title for sorting
  imageUrl: string;
}

export type SortOrder = 'asc' | 'desc';