import { Component } from '@angular/core';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { appointments } from './appointmentData';

@Component({
  selector: 'app-top-component',
  standalone: true,
  imports: [NzIconModule],
  templateUrl: './top-component.component.html',
  styleUrl: './top-component.component.scss',
})
export class TopComponentComponent {
  appointments = appointments;
}
