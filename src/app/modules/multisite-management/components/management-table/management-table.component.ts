import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { Multisite } from 'src/app/modules/multisite-management/domain';

import { MultisiteService } from '../../infrastructure';

@Component({
  selector: 'app-management-table',
  templateUrl: './management-table.component.html',
  styleUrls: ['./management-table.component.scss'],
})
export class ManagementTableComponent implements OnInit {
  sites$: Observable<Multisite[]>;
  sites: Multisite[];
  filter = new FormControl('', { nonNullable: true });

  constructor(private multisiteService: MultisiteService) {
    this.sites$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.sites = [];
  }

  ngOnInit(): void {
    this.sitesList();
  }

  search(text: string): Multisite[] {
    return this.sites.filter(site => {
      return (
        site.rfc?.toLowerCase().includes(text.toLowerCase()) ||
        site.businessName?.toLowerCase().includes(text.toLowerCase()) ||
        site.siteName?.toLowerCase().includes(text.toLowerCase()) ||
        site.user?.toLowerCase().includes(text.toLowerCase())
      );
    });
  }

  async sitesList(): Promise<void> {
    const data = await firstValueFrom(this.multisiteService.get(0, 5));
    this.sites = data;
    this.sites$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }
}
