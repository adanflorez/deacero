import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { firstValueFrom, map, Observable, startWith } from 'rxjs';
import { PAGINATION } from 'src/app/core/constants';
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
  currentSite: string;
  page: number;
  totalItems: number;
  pageSize: number;

  constructor(
    private multiSiteService: MultisiteService,
    private modalService: NgbModal
  ) {
    this.sites$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.sites = [];
    this.currentSite = '';
    this.page = PAGINATION.PAGE;
    this.totalItems = PAGINATION.TOTAL;
    this.pageSize = PAGINATION.PER_PAGE;
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
      this.multiSiteService.get(this.page - 1, this.pageSize)
    );
    console.log(data);
    this.sites = data.sites;
    this.totalItems = data.total;
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
    await firstValueFrom(this.multiSiteService.allowMultisite(siteId, allow));
    this.sitesList();
  }
}
