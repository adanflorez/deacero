import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';

import { Request, RequestUseCase } from '../../domain';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
})
export class RequestTableComponent implements OnInit {
  requests$: Observable<Request[]>;
  requests: Request[];
  filter = new FormControl('', { nonNullable: true });
  date: string;
  currentApplicationId: string;
  showAlert: boolean;

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
    this.currentApplicationId = '';
    this.showAlert = false;
  }

  ngOnInit(): void {
    this.loadRequests();
  }

  search(text: string): Request[] {
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

  async loadRequests(): Promise<void> {
    try {
      const data = await firstValueFrom(this.requestUseCase.get());
      this.requests = data;
      this.requests$ = this.filter.valueChanges.pipe(
        startWith(''),
        map(text => this.search(text))
      );
    } catch (error) {
      console.error(error);
    }
  }

  openModal(content: unknown, applicationId?: string): void {
    this.currentApplicationId = applicationId as string;
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(() => {
        this.date = '';
        this.currentApplicationId = '';
      });
  }

  openConfirmationModal(modal: unknown) {
    setTimeout(() => {
      this.openModal(modal, this.currentApplicationId);
    }, 200);
  }

  async save() {
    this.showAlert = false;
    try {
      await firstValueFrom(
        this.requestUseCase.update(this.currentApplicationId, this.date)
      );
      this.modalService.dismissAll();
      this.loadRequests();
      this.date = '';
      this.currentApplicationId = '';
    } catch (error) {
      this.modalService.dismissAll();
      this.showAlert = true;
      this.date = '';
      this.currentApplicationId = '';
      console.error(error);
    }
  }
}
