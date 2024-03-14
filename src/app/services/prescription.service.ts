import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class PrescriptionService {

  options;
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }
  getAppointmentById(id:any){
    const url = `${environment.baseUrl}/appoiments?id=${id}`;
   return this.http.get<any>(url)
  }

  getPatientById(id:any){
     const url = `${environment.baseUrl}/patients?id=${id}`;
     return this.http.get<any>(url)
  }
}
