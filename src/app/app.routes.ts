import { Routes } from '@angular/router';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { SettingsComponent } from './component/settings/settings.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';
import { AppointmentsComponent } from './component/appointments/appointments.component';
import { DoctorsComponent } from './component/doctors/doctors.component';
import { PatientsComponent } from './component/patients/patients.component';
import { StaffComponent } from './component/staff/staff.component';
import { RecordsComponent } from './component/records/records.component';
import { ContactGridComponent } from './component/contact-grid/contact-grid.component';
import { DoctorDashboardComponent } from './component/doctor-dashboard/doctor-dashboard.component';
import { PrescriptionComponent } from './component/prescription/prescription.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: '/welcome' },
  { path: 'welcome', component: WelcomeComponent },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'doctordashboard',
    component: DoctorDashboardComponent,
  },
  {
    path: 'appointments',
    component: AppointmentsComponent,
  },
  {
    path: 'doctors',
    component: DoctorsComponent,
  },
  {
    path: 'patients',
    component: PatientsComponent,
  },
  {
    path: 'prescription/:id',
    component: PrescriptionComponent,
  },
  {
    path: 'staff',
    component: StaffComponent,
  },
  {
    path: 'records',
    component: RecordsComponent,
  },
  {
    path: 'contacts',
    component: ContactGridComponent,
  },
];
