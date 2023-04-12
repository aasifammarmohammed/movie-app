import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MovieDatasService {

  constructor(private http: HttpClient) { }

  getMoviesList(data:any):Observable<any> {
    return this.http.post('https://zincubate.in/api/MovieTicketChecker?action=getAllDetails', data)
  }

  bookMovieSeats(data: any):Observable<any> {
    return this.http.post('https://zincubate.in/api/MovieTicketChecker?action=bookSeats', data)
  }

}
