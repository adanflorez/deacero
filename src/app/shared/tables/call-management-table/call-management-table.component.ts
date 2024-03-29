import { DatePipe, formatDate } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { map, Observable, startWith, Subject, takeUntil } from 'rxjs';
import { PAGINATION } from 'src/app/core/constants';
import { AlertType } from 'src/app/shared/alert';

import { Announcement } from './domain';
import { AnnouncementService } from './infrastructure';

type AnnouncementAction = 'Create' | 'Edit' | 'Delete' | 'Confirm';

@Component({
  selector: 'app-call-management-table',
  templateUrl: './call-management-table.component.html',
  styleUrls: ['./call-management-table.component.scss'],
  providers: [DatePipe],
})
export class CallManagementTableComponent implements OnInit, OnDestroy {
  public announcements$: Observable<Announcement[]>;
  public announcements: Announcement[];
  public filter = new FormControl('', { nonNullable: true });
  public modalType: AnnouncementAction;
  public announcementForm: FormGroup;
  public currentAnnouncement: Announcement;
  public showAlert: boolean;
  public alertType: AlertType;
  public alertMessage: string;
  public currentAnnouncementId: string;
  public totalItems: number;
  public page: number;
  public pageSize: number;
  private unSubscribe$: Subject<unknown>;

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
    this.page = PAGINATION.PAGE;
    this.totalItems = PAGINATION.TOTAL;
    this.pageSize = PAGINATION.PER_PAGE;
    this.unSubscribe$ = new Subject();
  }

  ngOnInit(): void {
    this.announcementManagementList();
    this.initAnnouncementForm();
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next(undefined);
    this.unSubscribe$.unsubscribe();
  }

  announcementManagementList(): void {
    this.announcementService
      .get(this.page - 1, this.pageSize)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: data => {
          this.announcements = data.announcements;
          this.totalItems = data.size;
          this.announcements$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.search(text))
          );
        },
      });
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
        'yyyy-MM-dd hh:mm:ss',
        'en'
      ),
      endRegisterDate: formatDate(
        announcement.endRegisterDate as string,
        'yyyy-MM-dd hh:mm:ss',
        'en'
      ),
      // bases: announcement.bases || '',
    });
  }

  save() {
    this.modalService.dismissAll();
    const { startDate, type, endRegisterDate } = this.announcementForm.value;
    if (this.isCreate) {
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
          next: () => {
            this.alertMessage = 'Convocatoria programada';
            this.alertType = AlertType.Success;
            this.showAlert = true;
            this.announcementManagementList();
          },
          error: () => {
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
          next: () => {
            this.alertMessage = 'Convocatoria editada';
            this.alertType = AlertType.Success;
            this.showAlert = true;
            this.announcementManagementList();
          },
          error: () => {
            this.alertMessage = 'No se pudo editar la convocatoria';
            this.alertType = AlertType.Danger;
            this.showAlert = true;
          },
        });
    } else if (this.isDelete) {
      this.announcementService.delete(this.currentAnnouncementId).subscribe({
        next: () => {
          this.alertMessage = 'Convocatoria eliminada';
          this.alertType = AlertType.Success;
          this.showAlert = true;
          this.announcementManagementList();
        },
        error: () => {
          this.alertMessage = 'No se pudo eliminar la convocatoria';
          this.alertType = AlertType.Danger;
          this.showAlert = true;
        },
      });
    }
    this.announcementForm.reset();
  }
}
