import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';

import { Request } from '../../domain';

@Component({
  selector: 'app-request-table',
  templateUrl: './request-table.component.html',
  styleUrls: ['./request-table.component.scss'],
})
export class RequestTableComponent {
  requests$: Observable<Request[]>;
  requests: Request[];
  filter = new FormControl('', { nonNullable: true });

  constructor() {
    this.requests$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.requests = [];
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
}
