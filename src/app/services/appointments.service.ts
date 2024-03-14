import { Injectable } from '@angular/core';
import { Iappointement } from '../Models/appointement';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment.development';
import { map } from 'rxjs/operators'; 
@Injectable({
  providedIn: 'root',
})
export class AppointmentsService {
  options;
  constructor(private http: HttpClient) {
    this.options = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    };
  }

  getAllAppointements(): Observable<Iappointement[]> {
    return this.http.get<Iappointement[]>(`${environment.baseUrl}/appoiments`);
  }

  addAppointement(appointement: Iappointement): Observable<any> {
    console.log(appointement);
    return this.http.post<any>(
      `${environment.baseUrl}/appoiments`,
      JSON.stringify(appointement),
      this.options
    );
  }
  updateAppointement(appointement: Iappointement) {}
  deleteAppointement(id: number) {
    return this.http.delete(`${environment.baseUrl}/appoiments/${id}`);
  }


  getAppointmentsForDoctorToday(doctorId: number): Observable<any[]> {
    const today = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format
    const url = `${environment.baseUrl}/appoiments?date=${today}&doctorId=${doctorId}`;
    return this.http.get<any[]>(url);
  }
  getTodayAppointments():Observable<any[]>{
  const today = new Date().toISOString().split('T')[0];
  const url = `${environment.baseUrl}/appoiments?date=${today}`;
  return this.http.get<any[]>(url);
  }

  getPatientAppointments(patientId:string){
    const url = `${environment.baseUrl}/appoiments?patientId=${patientId}`;
    return this.http.get<any[]>(url);

  }
  getLastVisit(patientId: string): Observable<any> {
    console.log(patientId)
    const url = `${environment.baseUrl}/appoiments?patientId=${patientId}&_sort=date&_order=desc&_limit=1`;
    return this.http.get<any[]>(url).pipe(
      map(appointments => appointments.length > 0 ? appointments[0] : null)
    );
  }
  getAppointmentsPatientWithDoctor(patientId:string,doctorId:string){
  const url = `${environment.baseUrl}/appoiments?patientId=${patientId}&${doctorId}`;
   }
  getPatient(patientId: string): Observable<any> {
    const url = `http://localhost:1563/patients/${patientId}`; // Replace with your patient API endpoint
    return this.http.get<any>(url);
  }

}
