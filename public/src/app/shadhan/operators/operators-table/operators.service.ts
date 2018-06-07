import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {OperatorDTO} from "./operator.data";

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWVmNGFlYzdlNDliODJiNzRhNDIxMGYiLCJpYXQiOjE1MjU2MzE3MjR9.tZR5o0VIf0fQ20pFPWwnzLnw_T516xh4B6ukKp1uRgw'
  })

};

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {
  constructor(private http: HttpClient) {
  }

  getOperators(): Observable<OperatorDTO[]> {
    return this.http.get<OperatorDTO[]>('http://localhost:3000/api/operators', httpOptions);
  };

  deleteOperator(_id): Observable<OperatorDTO> {
    const deleteOperatorUrl = 'http://localhost:3000/api/operators/' + _id;
    return this.http.delete<OperatorDTO>(deleteOperatorUrl, httpOptions);
  }

}

