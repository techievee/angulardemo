import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { User } from './user';
import {environment} from '../environments/environment';


@Injectable({ providedIn: 'root' })
export class ApiService {

  private apiUrl = 'http://localhost:8888/';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/x-www-form-urlencoded' })
  };

  constructor(
    private http: HttpClient,
   ) { }

  /** GET User from the server */
  getUser (): Observable<User[]> {
    return this.http.get<User[]>(`${environment.serverUrl}/user/getall`)
      .pipe(
         catchError(this.handleError<User[]>('getUser', []))
      );
  }


  //////// Save methods //////////

  /** POST: add a new user to the server
  addUser (user: any) {

    return this.http.post<any>(this.apiUrl + "user/insert", body, this.httpOptions)
      .pipe((response => response.json())
      );
  }*/

    addUser(user:any) {
        console.log(user);
        return this.http.post<any>(`${environment.serverUrl}/user/insert`,user,this.httpOptions)
         .pipe(
                catchError(this.handleError<any>('addUser', []))
             );
    }



  /**
   * Handle Http operation that failed.
   * Let the app continue.
   * @param operation - name of the operation that failed
   * @param result - optional value to return as the observable result
   */
  private handleError<T> (operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead


      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

}
