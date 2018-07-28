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
const deployed = true;

@Injectable({
  providedIn: 'root'
})
export class OperatorsService {
  constructor(private http: HttpClient) {
  }

  getOperators(): Observable<OperatorDTO[]> {
    if (deployed)
      return this.http.get<OperatorDTO[]>('/api/operators', httpOptions);
    else
      return this.http.get<OperatorDTO[]>('http://localhost:3000/api/operators', httpOptions);
  };

  deleteOperator(_id): Observable<OperatorDTO> {
    //const deleteOperatorUrl = 'http://localhost:3000/api/operators/' + _id;
    const deleteOperatorUrl = '/api/operators/' + _id;
    return this.http.delete<OperatorDTO>(deleteOperatorUrl, httpOptions);
  }

  createOperator(newOperator: OperatorDTO): Observable<OperatorDTO> {
      //return this.http.post<OperatorDTO>('http://127.0.0.1:3000/api/operators', newOperator, httpOptions);
      return this.http.post<OperatorDTO>('/api/operators', newOperator, httpOptions);
  }

  updateOperator(_id, updateOperator: OperatorDTO): Observable<OperatorDTO> {
    const updateOperatorUrl = 'http://localhost:3000/api/operators/' + _id;
    const updateOperatorStringified = JSON.stringify(updateOperator);
    return this.http.put<OperatorDTO>(updateOperatorUrl, updateOperatorStringified, httpOptions);
  }

  updatePassword(_id, currentPassword, newPassword): Observable<OperatorDTO> {
    //const updatePwUrl = 'http://localhost:3000/api/operators/pw/' + _id;
    const updatePwUrl = '/api/operators/pw/' + _id;
    const updatePassword = {
      currentPassword:  currentPassword ,
      newPassword: newPassword };
    const strUpdatePassword = JSON.stringify(updatePassword);
    return this.http.put<OperatorDTO>(updatePwUrl, strUpdatePassword, httpOptions);
  }

}

