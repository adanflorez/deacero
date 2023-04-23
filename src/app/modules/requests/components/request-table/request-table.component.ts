import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {
  firstValueFrom,
  map,
  Observable,
  startWith,
  Subject,
  takeUntil,
} from 'rxjs';
import { PAGINATION } from 'src/app/core/constants';

import { Request, RequestUseCase } from '../../domain';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
})
export class RequestTableComponent implements OnInit, OnDestroy {
  public requests$: Observable<Request[]>;
  public requests: Request[];
  public filter = new FormControl('', { nonNullable: true });
  public date: string;
  public currentApplicationId: number | undefined;
  public showAlert: boolean;
  public STATUS: string;
  public page: number;
  public totalItems: number;
  public pageSize: number;
  private unSubscribe$: Subject<unknown>;

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
    this.totalItems = PAGINATION.TOTAL;
    this.pageSize = PAGINATION.PER_PAGE;
    this.STATUS = 'Solicitud no enviada';
    this.unSubscribe$ = new Subject();
  }

  public ngOnInit(): void {
    this.loadRequests();
  }
  ngOnDestroy(): void {
    this.unSubscribe$.next(undefined);
    this.unSubscribe$.unsubscribe();
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

  protected loadRequests(): void {
    this.requestUseCase
      .get(this.page - 1, this.pageSize)
      .pipe(takeUntil(this.unSubscribe$))
      .subscribe({
        next: data => {
          this.requests = data.requests;
          this.totalItems = data.size;
          this.requests$ = this.filter.valueChanges.pipe(
            startWith(''),
            map(text => this.search(text))
          );
        },
      });
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
