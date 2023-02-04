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

  constructor(
    private requestUseCase: RequestUseCase,
    private modalService: NgbModal
  ) {
    this.requests$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.requests = [];
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

  openModal(content: unknown): void {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
    });
  }
}
