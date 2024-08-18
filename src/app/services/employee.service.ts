import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private http:HttpClient) { }
  backendUrl:string = "http://localhost:8080/";

  getEmployee(){
    debugger;
    return this.http.get(this.backendUrl + "token/api");
  }
}
