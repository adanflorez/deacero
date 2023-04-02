import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { Multisite } from 'src/app/modules/multisite-management/domain';

import { MultisiteService } from '../../infrastructure';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-management-table',
  templateUrl: './management-table.component.html',
  styleUrls: ['./management-table.component.scss'],
})
export class ManagementTableComponent implements OnInit {
  sites$: Observable<Multisite[]>;
  sites: Multisite[];
  filter = new FormControl('', { nonNullable: true });
  currentSite: string;
  page: number;
  totalSites: number;

  constructor(
    private multisiteService: MultisiteService,
    private modalService: NgbModal
  ) {
    this.sites$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.sites = [];
    this.currentSite = '';
    this.page = 1;
    this.totalSites = 0;
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
    const data = await firstValueFrom(
      this.multisiteService.get(this.page - 1, 10)
    );
    console.log(data);
    this.sites = data.sites;
    this.totalSites = data.total;
    this.sites$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  openCurrentSiteModal(content: unknown, siteId: string) {
    this.openModal(content);
    this.setCurrentSite(siteId);
  }

  setCurrentSite(siteId: string) {
    this.currentSite = siteId;
  }

  openModal(content: unknown): void {
    this.modalService.open(content, {
      ariaLabelledBy: 'modal-basic-title',
      backdrop: 'static',
    });
  }

  closeModal(modal: any) {
    modal.dismiss();
  }

  async allowMultisite(siteId: string, allow: boolean): Promise<void> {
    await firstValueFrom(this.multisiteService.allowMultisite(siteId, allow));
    this.sitesList();
  }
}
