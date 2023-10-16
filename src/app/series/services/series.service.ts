import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { environments } from 'src/environments/environments';
import { Result, Serie } from '../interfaces/serie.interface';
import { SerieDetail } from '../interfaces/serie-detail.interface';
import { Cast } from '../interfaces/cast.interface';
import { LanguageService } from '../../shared/services/language.service';

@Injectable({
  providedIn: 'root',
})
export class SeriesService {
  private apiUrl: string = 'https://api.themoviedb.org/3';
  public pageNumbers: number[] = [1, 2, 3, 4, 5];

  constructor(
    private _http: HttpClient,
    private _languageService: LanguageService
  ) { }

  private getHeaders(): HttpHeaders {
    const tokenValue = environments.apiToken;
    return new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: `Bearer ${tokenValue}`,
    });
  }

  getPopularSeries(): Observable<Result[]> {
    const headers = this.getHeaders();
    const language = this._languageService.getLanguage()

    const requests = this.pageNumbers.map((pageNumber) =>
      this._http.get<Result>(
        `${this.apiUrl}/tv/popular?language=${language}&page=${pageNumber}`,
        { headers }
      )
    );

    return forkJoin(requests);
  }

  getTopSeries(): Observable<Result[]> {
    const headers = this.getHeaders();
    const language = this._languageService.getLanguage();


    const requests = this.pageNumbers.map((pageNumber) =>
      this._http.get<Result>(
        `${this.apiUrl}/tv/top_rated?language=${language}&page=${pageNumber}`,
        { headers }
      )
    );

    return forkJoin(requests);
  }

  getSerieById(id: number): Observable<SerieDetail> {
    const headers = this.getHeaders();
    const language = this._languageService.getLanguage();

    return this._http.get<SerieDetail>(`${this.apiUrl}/tv/${id}?language=${language}`, { headers });
  }

  getCastMembers(id: number): Observable<Cast> {
    const headers = this.getHeaders();
    return this._http.get<Cast>(`${this.apiUrl}/tv/${id}/credits`, {
      headers,
    });
  }

  searchSeriesByName(query: string): Observable<Result> {
    const headers = this.getHeaders();
    const language = this._languageService.getLanguage();

    return this._http.get<Result>(`${this.apiUrl}/search/tv?query=${query}&language=${language}`, {
      headers,
    });

  }
}
