import { DatePipe, formatDate } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import Announcement from 'src/app/lib/models/announcement.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AlertType } from 'src/app/lib/enums/alert-type';
import { AnnouncementService } from 'src/app/lib/services/announcement.service';

type AnnouncementAction = 'Create' | 'Edit' | 'Delete' | 'Confirm';

@Component({
  selector: 'app-call-management-table',
  templateUrl: './call-management-table.component.html',
  styleUrls: ['./call-management-table.component.scss'],
  providers: [DatePipe],
})
export class CallManagementTableComponent implements OnInit {
  announcements$: Observable<Announcement[]>;
  announcements: Announcement[];
  filter = new FormControl('', { nonNullable: true });
  modalType: AnnouncementAction;
  announcementForm: FormGroup;
  currentAnnouncement: Announcement;
  showAlert: boolean;
  alertType: AlertType;
  alertMessage: string;
  currentAnnouncementId: string;

  constructor(
    private announcementService: AnnouncementService,
    private datePipe: DatePipe,
    private modalService: NgbModal
  ) {
    this.announcements$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.announcements = [];
    this.modalType = 'Create';
    this.announcementForm = new FormGroup({});
    this.currentAnnouncement = {};
    this.showAlert = false;
    this.alertType = AlertType.Success;
    this.alertMessage = '';
    this.currentAnnouncementId = '';
  }

  ngOnInit(): void {
    this.announcementManagementList();
    this.initAnnouncementForm();
  }

  async announcementManagementList(): Promise<void> {
    const data = await firstValueFrom(this.announcementService.get());
    this.announcements = data;
    this.announcements$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  search(text: string): Announcement[] {
    return this.announcements.filter(announcement => {
      return (
        announcement.callId?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.type?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.year?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.number?.toLowerCase().includes(text.toLowerCase()) ||
        this.datePipe
          .transform(announcement.startDate, 'YYYY-MM-dd')
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        this.datePipe
          .transform(announcement.endRegisterDate, 'YYYY-MM-dd')
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        // announcement.bases?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.status?.toLowerCase().includes(text.toLowerCase())
      );
    });
  }

  openModal(content: unknown, type?: AnnouncementAction): void {
    this.modalType = type || this.modalType;
    if (this.isCreate) this.announcementForm.reset();
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        result => {
          // this.closeResult = `Closed with: ${result}`;
        },
        () => {
          // this.form.reset();
        }
      );
  }

  closeModal(modal: any) {
    modal.dismiss();
  }

  initAnnouncementForm() {
    this.announcementForm = new FormGroup({
      type: new FormControl('', Validators.required),
      startDate: new FormControl('', Validators.required),
      endRegisterDate: new FormControl('', Validators.required),
      // bases: new FormControl('', Validators.required),
    });
  }

  get isCreate(): boolean {
    return this.modalType === 'Create';
  }

  get isEdit(): boolean {
    return this.modalType === 'Edit';
  }

  get isDelete(): boolean {
    return this.modalType === 'Delete';
  }

  get modalStructure(): { title: string; confirmationMessage: string } {
    if (this.isCreate) {
      return {
        title: 'Programar',
        confirmationMessage:
          '¿Está seguro que desea programar la convocatoria?',
      };
    } else if (this.isEdit) {
      return {
        title: 'Editar',
        confirmationMessage: '¿Está seguro que desea editar la convocatoria?',
      };
    } else {
      return {
        title: 'Programar',
        confirmationMessage:
          '¿Está seguro que desea eliminar la convocatoria programada?',
      };
    }
  }

  get announcementF() {
    return this.announcementForm?.controls;
  }

  setForm(announcement: Announcement) {
    this.currentAnnouncementId = announcement.id as string;
    this.announcementForm.setValue({
      type: announcement.type,
      startDate: formatDate(
        announcement.startDate as string,
        'yyyy-MM-dd',
        'en'
      ),
      endRegisterDate: formatDate(
        announcement.endRegisterDate as string,
        'yyyy-MM-dd',
        'en'
      ),
      // bases: announcement.bases || '',
    });
  }

  save() {
    this.modalService.dismissAll();
    const { startDate, type, endRegisterDate } = this.announcementForm.value;
    if (this.isCreate && this.announcementForm.valid) {
      this.announcementService
        .create(
          this.datePipe.transform(startDate, 'YYYY-MM-dd hh:mm:ss') as string,
          this.datePipe.transform(
            endRegisterDate,
            'YYYY-MM-dd hh:mm:ss'
          ) as string,
          type
        )
        .subscribe({
          next: response => {
            console.log(response);
            this.alertMessage = 'Convocatoria programada';
            this.alertType = AlertType.Success;
            this.showAlert = true;
            this.announcementManagementList();
          },
          error: err => {
            console.error(err);
            this.alertMessage = 'No se pudo programar la convocatoria';
            this.alertType = AlertType.Danger;
            this.showAlert = true;
          },
        });
    } else if (this.isEdit) {
      this.announcementService
        .edit(
          this.currentAnnouncementId,
          this.datePipe.transform(startDate, 'YYYY-MM-dd hh:mm:ss') as string,
          this.datePipe.transform(
            endRegisterDate,
            'YYYY-MM-dd hh:mm:ss'
          ) as string
        )
        .subscribe({
          next: response => {
            console.log(response);
            this.alertMessage = 'Convocatoria editada';
            this.alertType = AlertType.Success;
            this.showAlert = true;
            this.announcementManagementList();
          },
          error: err => {
            console.error(err);
            this.alertMessage = 'No se pudo editar la convocatoria';
            this.alertType = AlertType.Danger;
            this.showAlert = true;
          },
        });
    }
  }
}
