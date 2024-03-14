import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Idoctor } from '../Models/doctor';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class DoctorService {
  options;
  constructor(private http:HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
   }
   getAllDoctors(): Observable<Idoctor[]> {
    return this.http.get<Idoctor[]>(`${environment.baseUrl}/doctors`);
  }
}
