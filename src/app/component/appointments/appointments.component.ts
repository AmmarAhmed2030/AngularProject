import { CommonModule } from '@angular/common';
import {
  Component,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { AppointmentsService } from '../../services/appointments.service';
import { Iappointement } from '../../Models/appointement';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointments',
  standalone: true,
  imports: [
    NzTableModule,
    NzIconModule,
    CommonModule,
    NzModalModule,
    FormsModule,
  ],
  providers: [],
  templateUrl: './appointments.component.html',
  styleUrl: './appointments.component.scss',
})
export class AppointmentsComponent implements OnInit, OnDestroy, OnChanges {
  @ViewChild('form') form!: TemplateRef<any>;
  constructor(
    private message: NzMessageService,
    private modal: NzModalService,
    private appointmentsServ: AppointmentsService
  ) {}
  subscriptions: Subscription[] = [];
  searchText: string = '';
  name: string = '';
  email: string = '';
  date: string = '';
  time: string = '';
  mobile: string = '';
  doctor: string = '';
  inurjy: string = '';
  gender: string = '';

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: readonly Iappointement[] = [];
  listOfData: Iappointement[] = [];
  setOfCheckedId = new Set<number>();
  filteredListOfData: Iappointement[] = [];

  showDeleteConfirm(id: number): void {
    this.modal.confirm({
      nzTitle: 'Are you sure delete this Appointment?',
      nzContent: `<p class ="h5 "> for this user </p>`,
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => this.deleteAppoin(id),
      nzCancelText: 'No',
    });
  }
  deleteAppoin(id: number): void {
    this.appointmentsServ.deleteAppointement(id).subscribe((data) => {
      this.subscriptions.push(this.getAllAppointments());
    });
  }
  showEdit(ele: HTMLElement): void {
    this.name = ele.childNodes[2].textContent!;
    this.email = ele.childNodes[3].textContent!;
    this.gender = ele.childNodes[4].textContent!;
    this.date = ele.childNodes[5].textContent!;
    this.time = ele.childNodes[6].textContent!;
    this.mobile = ele.childNodes[7].textContent!;
    this.doctor = ele.childNodes[8].textContent!;
    this.inurjy = ele.childNodes[9].textContent!;

    this.modal.confirm({
      nzTitle: 'Are you sure delete this Appointment?',
      nzContent: this.form,
      nzOkText: 'Edit',
      nzOkType: 'primary',
      nzOkDanger: true,

      nzCancelText: 'Cancle',
    });
  }

  search(): void {
    let filtered = this.listOfData.filter((item) =>
      item.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
    if (filtered.length > 0) {
      this.filteredListOfData = filtered;
    } else {
      this.filteredListOfData = [];
    }
  }
  delete(): void {
    this.listOfData = this.listOfData.filter(
      (item) => !this.setOfCheckedId.has(item.id)
    );
    this.setOfCheckedId.clear();
    this.checked = false;
  }
  addAppoi(): void {
    this.modal.confirm({
      nzTitle: 'Add New Appointement',
      nzContent: this.form,
      nzOkText: 'Add',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () => {
        let appooiinn: Iappointement = {
          id: this.listOfData.length + 1,
          image: 'imga',
          name: this.name,
          email: this.email,
          date: this.date,
          time: this.time,
          mobile: this.mobile,
          doctor: this.doctor,
          injury: this.inurjy,
          gender: this.gender,
        };

        this.appointmentsServ.addAppointement(appooiinn).subscribe((data) => {
          this.message.create('success', `add success`);
          this.subscriptions.push(this.getAllAppointments());
        });
      },
      nzCancelText: 'Cancle',
    });
  }

  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) =>
      this.updateCheckedSet(item.id, value)
    );
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: readonly Iappointement[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) =>
      this.setOfCheckedId.has(item.id)
    );
    this.indeterminate =
      this.listOfCurrentPageData.some((item) =>
        this.setOfCheckedId.has(item.id)
      ) && !this.checked;
  }
  getAllAppointments(): Subscription {
    return this.appointmentsServ.getAllAppointements().subscribe((data) => {
      this.listOfData = data;
    });
  }
  ngOnInit(): void {
    const subscriptionAllAppoi: Subscription = this.getAllAppointments();
    this.subscriptions.push(subscriptionAllAppoi);
  }
  ngOnChanges(): void {}
  ngOnDestroy(): void {
    this.subscriptions.forEach((sub) => {
      sub.unsubscribe();
    });
  }
}
