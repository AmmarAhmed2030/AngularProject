import { Component, OnInit } from '@angular/core';
import { Idoctor } from '../../Models/doctor';
import { DoctorService } from '../../services/doctor.service';

@Component({
  selector: 'app-contact-grid',
  standalone: true,
  imports: [],
  templateUrl: './contact-grid.component.html',
  styleUrl: './contact-grid.component.scss',
})
export class ContactGridComponent implements OnInit {

  constructor(private doctorService:DoctorService){

  }
  listOfDoctors :Idoctor[]=[]
  ngOnInit(): void {
   this.getAll();
  }

getAll(){
  this.doctorService.getAllDoctors().subscribe(doctors=>{
    this.listOfDoctors=doctors
  })
}

}
