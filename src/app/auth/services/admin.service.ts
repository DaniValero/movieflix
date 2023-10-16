import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environments } from 'src/environments/environments';
import { User } from '../interfaces/user.interface';

@Injectable({ providedIn: 'root' })
export class AdminService {

  private _backendUrl: string = environments.backendUrl;

  constructor(private _http: HttpClient) { }
  

  getAllUsers(): Observable<User[]> {
    return this._http.get<User[]>(`${this._backendUrl}/users`)
  }

  getUserById(id: number): Observable<User> {
    return this._http.get<User>(`${this._backendUrl}/users/${id}`)
  }

  updateUser(id: number, updatedUser: User): Observable<User> {
    return this._http.put<User>(`${this._backendUrl}/users/${id}`, updatedUser)
  }

  deleteUser(id: number): Observable<User> {
    return this._http.delete<User>(`${this._backendUrl}/users/${id}`)
  }



}