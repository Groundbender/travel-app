export type Postion = {
  lat: number;
  lng: number;
};

export type Cities = {
  cityName: string;
  country: string;
  emoji: string;
  date: Date;
  notes: string;
  position: Postion;
  id: string;
};
