export interface User {
  id?: number;
  name: string;
  email: string;
  password: string;
  favoriteMovies?: number[];
  favoriteSeries?: number[];
  isAdmin?: boolean;
}

