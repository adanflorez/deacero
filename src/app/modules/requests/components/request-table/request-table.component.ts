import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { PAGINATION } from 'src/app/core/constants';

import { Request, RequestUseCase } from '../../domain';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
})
export class RequestTableComponent implements OnInit {
  public requests$: Observable<Request[]>;
  public requests: Request[];
  public filter = new FormControl('', { nonNullable: true });
  public date: string;
  public currentApplicationId: number | undefined;
  public showAlert: boolean;
  public STATUS: string;
  public page: number;
  public totalSites: number;
  public pageSize: number;

  constructor(
    private requestUseCase: RequestUseCase,
    private modalService: NgbModal
  ) {
    this.requests$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.requests = [];
    this.date = '';
    this.currentApplicationId = undefined;
    this.showAlert = false;
    this.page = PAGINATION.PAGE;
    this.totalSites = PAGINATION.TOTAL;
    this.pageSize = PAGINATION.PER_PAGE;
    this.STATUS = 'Solicitud no enviada';
  }

  public ngOnInit(): void {
    this.loadRequests();
  }

  protected search(text: string): Request[] {
    return this.requests.filter(request => {
      return (
        request.id?.toLowerCase().includes(text.toLowerCase()) ||
        request.callId?.toLowerCase().includes(text.toLowerCase()) ||
        request.businessName?.toLowerCase().includes(text.toLowerCase()) ||
        request.rfc?.toLowerCase().includes(text.toLowerCase())
        // request.status?.toLowerCase().includes(text.toLowerCase())
      );
    });
  }

  protected async loadRequests(): Promise<void> {
    try {
      const data = await firstValueFrom(
        this.requestUseCase.get(this.page - 1, this.pageSize)
      );
      this.requests = data.requests;
      this.totalSites = data.size;
      this.requests$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
    } catch (error) {
      console.error(error);
    }
  }

  protected openModal(content: unknown, applicationId?: number): void {
    this.currentApplicationId = applicationId as number;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(() => {
        this.date = '';
        this.currentApplicationId = undefined;
      });
  }

  protected openConfirmationModal(modal: unknown) {
    setTimeout(() => {
      this.openModal(modal, this.currentApplicationId);
    }, 200);
  }

  protected async save() {
    this.showAlert = false;
    try {
      await firstValueFrom(
        this.requestUseCase.update(
          this.currentApplicationId as number,
          this.date
        )
      );
      this.modalService.dismissAll();
      this.loadRequests();
      this.date = '';
      this.currentApplicationId = undefined;
    } catch (error) {
      this.modalService.dismissAll();
      this.showAlert = true;
      this.date = '';
      this.currentApplicationId = undefined;
      console.error(error);
    }
  }
}
