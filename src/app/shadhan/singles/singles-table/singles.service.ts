import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {SingleDTO} from "./single.data";
import {AppConstants} from '../../../constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWVmNGFlYzdlNDliODJiNzRhNDIxMGYiLCJpYXQiOjE1MjU2MzE3MjR9.tZR5o0VIf0fQ20pFPWwnzLnw_T516xh4B6ukKp1uRgw'
  })
};

@Injectable({
  providedIn: 'root'
})
export class SinglesService {

  constructor(private http: HttpClient) {
  }

  getSingles(): Observable<SingleDTO[]> {
    if (AppConstants.isDeployed)
      return this.http.get<SingleDTO[]>('/api/singles', httpOptions)
    else
      return this.http.get<SingleDTO[]>('http://localhost:3000/api/singles', httpOptions);
  };

  getArchives(): Observable<SingleDTO[]> {
    if (AppConstants.isDeployed)
      return this.http.get<SingleDTO[]>('/api/archives', httpOptions)
    else
      return this.http.get<SingleDTO[]>('http://localhost:3000/api/archives', httpOptions);
  };

  deleteSingle(_id): Observable<SingleDTO> {
    if (AppConstants.isDeployed)
      return this.http.delete<SingleDTO>('/api/singles/' + _id, httpOptions);
    else
      return this.http.delete<SingleDTO>('http://localhost:3000/api/singles/' + _id, httpOptions);
  }

  deleteArchive(_id): Observable<SingleDTO> {
    if (AppConstants.isDeployed)
      return this.http.delete<SingleDTO>('/api/archives/' + _id, httpOptions);
    else
      return this.http.delete<SingleDTO>('http://localhost:3000/api/archives/' + _id, httpOptions);
  }

  archiveSingle(_id): Observable<SingleDTO> {
    if (AppConstants.isDeployed)
      return this.http.put<SingleDTO>('/api/archives/' + _id, httpOptions);
    else
      return this.http.put<SingleDTO>('http://localhost:3000/api/archives/' + _id, httpOptions);
  }

  createSingle(newSingle: SingleDTO): Observable<SingleDTO> {
    if (AppConstants.isDeployed)
      return this.http.post<SingleDTO>('/api/singles', newSingle, httpOptions);
    else
      return this.http.post<SingleDTO>('http://127.0.0.1:3000/api/singles', newSingle, httpOptions);
  }

  updateSingle(_id, updateSingle: SingleDTO): Observable<SingleDTO> {
    let updateSingleUrl = '';
    if (AppConstants.isDeployed)
      updateSingleUrl = '/api/singles/' + _id;
    else
      updateSingleUrl = 'http://localhost:3000/api/singles/' + _id;
    const updateSingleStringified = JSON.stringify(updateSingle);
    return this.http.put<SingleDTO>(updateSingleUrl, updateSingleStringified, httpOptions);
  }
}
