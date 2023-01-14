import { FormControl } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Observable, map, startWith } from 'rxjs';
import { MultisiteService } from 'src/app/lib/services/multisite.service';
import { Multisite } from 'src/app/lib/models/multisite.model';

@Component({
  selector: 'app-multisite-management-table',
  templateUrl: './multisite-management-table.component.html',
  styleUrls: ['./multisite-management-table.component.scss'],
})
export class MultisiteManagementTableComponent implements OnInit {
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
