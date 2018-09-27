import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AuthGuardService} from '../auth/auth.service';
import {Observable} from '../../../../node_modules/rxjs/Rx';
import {OperatorDTO} from '../operators/operators-table/operator.data';
import {AppConstants} from '../../constants';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'x-auth-token': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1YWVmNGFlYzdlNDliODJiNzRhNDIxMGYiLCJpYXQiOjE1MjU2MzE3MjR9.tZR5o0VIf0fQ20pFPWwnzLnw_T516xh4B6ukKp1uRgw'
  })
};


@Injectable({
  providedIn: 'root'
})
export class SystemService {

  constructor(private http: HttpClient, private authGuardService: AuthGuardService) {
  }

  sendContactMessage(name, phone, email, message): Observable<OperatorDTO> {
    let contactObj = {
        name: name,
        phone: phone,
        email: email,
        message: message
    };

    if (AppConstants.isDeployed)
      return this.http.post<OperatorDTO>('/api/system/contact', contactObj, this.authGuardService.genHttpHeaders());
    else
      return this.http.post<OperatorDTO>('http://127.0.0.1:3000/api/system/contact', contactObj, httpOptions);
  }
}
