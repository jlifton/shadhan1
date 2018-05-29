import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs/Rx";
import {LoginResponse} from "./login-response.interface";

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json'}),
  observe: "response" as 'body' // to display the full response & as 'body' for type cast
};

@Injectable({
  providedIn: 'root'
})

//}
export class LoginService {

  constructor(private http:HttpClient) { }

  login(username, password):Observable<HttpResponse<LoginResponse>> {
    var obj = { username: username, password: password};

  // return  this.http.post <HttpResponse<LoginResponse>>('/api/operators/login', obj, httpOptions);
    return  this.http.post <HttpResponse<LoginResponse>>('http://localhost:3000/api/operators/login', obj, httpOptions);

  }
}
