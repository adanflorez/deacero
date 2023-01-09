import { AnnouncementService } from 'src/app/lib/services/announcement.service';
import { Component, OnInit } from '@angular/core';
import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import Announcement from 'src/app/lib/models/announcement.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

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
        announcement.id?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.type?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.year?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.number?.toLowerCase().includes(text.toLowerCase()) ||
        this.datePipe
          .transform(announcement.startDate, 'dd/MM/YYYY')
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        this.datePipe
          .transform(announcement.endRegisterDate, 'dd/MM/YYYY')
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        announcement.bases?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.status?.toLowerCase().includes(text.toLowerCase())
      );
    });
  }

  openModal(content: unknown, type?: AnnouncementAction): void {
    this.modalType = type || this.modalType;
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
      bases: new FormControl('', Validators.required),
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
    this.announcementForm.setValue({
      type: announcement.type,
      startDate: announcement.startDate,
      endRegisterDate: announcement.endRegisterDate,
      bases: announcement.bases || '',
    });
  }
}
