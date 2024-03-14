import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Idoctor } from '../Models/doctor';

@Injectable({
  providedIn: 'root'
})
export class DoctorsService {
  myHeaders = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };
  constructor(private http:HttpClient) {
    
   }
   getAllDoctors():Observable<Idoctor[]>{
    return this.http.get<any[]>("http://localhost:1563/doctors")

   }
   
}
