import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
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
    this.loadSites();
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

  loadSites() {
    this.multisiteService.get().subscribe({
      next: response => {
        console.log(response);
      },
      error: err => {
        console.error(err);
      },
    });
  }
}
