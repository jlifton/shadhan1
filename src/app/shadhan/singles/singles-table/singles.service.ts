import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {SingleDTO} from "./single.data";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWVmNGFlYzdlNDliODJiNzRhNDIxMGYiLCJpYXQiOjE1MjU2MzE3MjR9.tZR5o0VIf0fQ20pFPWwnzLnw_T516xh4B6ukKp1uRgw'
  })
};
const deployed = true;

@Injectable({
  providedIn: 'root'
})
export class SinglesService {

  constructor(private http: HttpClient) {
  }

  getSingles(): Observable<SingleDTO[]> {

    if (deployed)
      return this.http.get<SingleDTO[]>('/api/singles', httpOptions)
    else
      return this.http.get<SingleDTO[]>('http://localhost:3000/api/singles', httpOptions);
  };

  deleteSingle(_id): Observable<SingleDTO> {
    //const deleteSingleUrl = 'http://localhost:3000/api/singles/' + _id;
    //const deleteSingleUrl = '/api/singles/' + _id;
    if (deployed)
      return this.http.delete<SingleDTO>('/api/singles/' + _id, httpOptions);
    else
      return this.http.delete<SingleDTO>('http://localhost:3000/api/singles/' + _id, httpOptions);
  }

  createSingle(newSingle: SingleDTO): Observable<SingleDTO> {
    //return this.http.post<SingleDTO>('http://127.0.0.1:3000/api/singles', newSingle, httpOptions);
    if (deployed)
      return this.http.post<SingleDTO>('/api/singles', newSingle, httpOptions);
    else
      return this.http.post<SingleDTO>('http://127.0.0.1:3000/api/singles', newSingle, httpOptions);
  }

  updateSingle(_id, updateSingle: SingleDTO): Observable<SingleDTO> {
    //const updateSingleUrl = 'http://localhost:3000/api/singles/' + _id;
    let updateSingleUrl = '';
    if (deployed)
      updateSingleUrl = '/api/singles/' + _id;
    else
      updateSingleUrl = 'http://localhost:3000/api/singles/' + _id;
    const updateSingleStringified = JSON.stringify(updateSingle);
    return this.http.put<SingleDTO>(updateSingleUrl, updateSingleStringified, httpOptions);
  }
}
