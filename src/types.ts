export interface Location {
  id: string;
  name: string;
  description: string;
  image: string;
  tags: string[];
}

export interface StickyNote {
  id: string;
  text: string;
  color: string;
  rotation: number;
}

export interface HeatmapData {
  [key: string]: number; // "day-time" -> intensity
}
