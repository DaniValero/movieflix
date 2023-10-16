import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';
import { AuthService } from './auth.service';
import { Observable, catchError, throwError} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _backendUrl: string = environments.backendUrl;
  private _userId?: number;

  constructor(private _http: HttpClient, private _authService: AuthService) {
    this._authService.authStatus$.subscribe((user) => {
      this._userId = user?.id;
    });
  }

  addMovietoUser(movieIds: number[]): Observable<User> {
    if (!this._userId) {
      return throwError('User is not defined');
    }

    return this._http.patch<User>(`${this._backendUrl}/users/${this._userId}`, {
      favoriteMovies: movieIds,
    });
  }

  removeMovieFromUser(movieIds: number[]): Observable<User> {
    return this._http.patch<User>(
      `${this._backendUrl}/users/${this._userId!}`,
      {
        favoriteMovies: movieIds,
      }
    );
  }

  addSerieToUser(serieIds: number[]): Observable<User> {
    return this._http.patch<User>(
      `${this._backendUrl}/users/${this._userId!}`,
      {
        favoriteSeries: serieIds,
      }
    );
  }

  removeSerieFromUser(serieIds: number[]): Observable<User> {
    return this._http.patch<User>(
      `${this._backendUrl}/users/${this._userId!}`,
      {
        favoriteSeries: serieIds,
      }
    );
  }
}
