import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {OperatorDTO} from "./operator.data";
import {AppConstants} from '../../../constants';
import {AuthGuardService} from '../../auth/auth.service';

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
  constructor(private http: HttpClient,
              private authGuardService: AuthGuardService) {
  }

  getOperators(): Observable<OperatorDTO[]> {
    if (AppConstants.isDeployed)
      return this.http.get<OperatorDTO[]>('/api/operators', this.authGuardService.genHttpHeaders());
    else
      return this.http.get<OperatorDTO[]>('http://localhost:3000/api/operators', httpOptions);
  };

  deleteOperator(_id): Observable<OperatorDTO> {
    let deleteOperatorUrl = '';
    if (AppConstants.isDeployed) {
      deleteOperatorUrl = '/api/operators/' + _id;
    }
    else {
      deleteOperatorUrl = 'http://localhost:3000/api/operators/' + _id;
    }
    if (AppConstants.isDeployed)
      return this.http.delete<OperatorDTO>(deleteOperatorUrl, this.authGuardService.genHttpHeaders());
    else
      return this.http.delete<OperatorDTO>(deleteOperatorUrl, httpOptions);
  }

  createOperator(newOperator: OperatorDTO): Observable<OperatorDTO> {
    if (AppConstants.isDeployed) {
      return this.http.post<OperatorDTO>('/api/operators', newOperator, this.authGuardService.genHttpHeaders());
    }
    else {
      return this.http.post<OperatorDTO>('http://127.0.0.1:3000/api/operators', newOperator, httpOptions);
    }
  }

  updateOperator(_id, updateOperator: OperatorDTO): Observable<OperatorDTO> {
    let updateOperatorUrl = '';
    if (AppConstants.isDeployed){
      updateOperatorUrl = '/api/operators/' + _id;
    }
    else {
      updateOperatorUrl = 'http://localhost:3000/api/operators/' + _id;
    }
    const updateOperatorStringified = JSON.stringify(updateOperator);
    if (AppConstants.isDeployed)
      return this.http.put<OperatorDTO>(updateOperatorUrl, updateOperatorStringified, this.authGuardService.genHttpHeaders());
    else
      return this.http.put<OperatorDTO>(updateOperatorUrl, updateOperatorStringified, httpOptions);
  }

  updatePassword(_id, currentPassword, newPassword): Observable<OperatorDTO> {
    let updatePwUrl = '';
    if (AppConstants.isDeployed){
      updatePwUrl = '/api/operators/pw/' + _id;
    }
    else {
      updatePwUrl = 'http://localhost:3000/api/operators/pw/' + _id;
    }

    const updatePassword = {
      currentPassword:  currentPassword ,
      newPassword: newPassword };
    const strUpdatePassword = JSON.stringify(updatePassword);
    if (AppConstants.isDeployed)
      return this.http.put<OperatorDTO>(updatePwUrl, strUpdatePassword, this.authGuardService.genHttpHeaders());
    else
      return this.http.put<OperatorDTO>(updatePwUrl, strUpdatePassword, httpOptions);
  }

}

