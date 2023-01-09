import { AnnouncementService } from 'src/app/lib/services/announcement.service';
import { Component, OnInit } from '@angular/core';
import { Observable, firstValueFrom, map, startWith } from 'rxjs';
import Announcement from 'src/app/lib/models/announcement.model';
import { FormControl } from '@angular/forms';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-call-management-table',
  templateUrl: './call-management-table.component.html',
  styleUrls: ['./call-management-table.component.scss'],
  providers: [DatePipe],
})
export class CallManagementTableComponent implements OnInit {
  announcements$: Observable<Announcement[]>;
  announcements: Announcement[];
  filter = new FormControl('', { nonNullable: true });

  constructor(
    private announcementService: AnnouncementService,
    private datePipe: DatePipe
  ) {
    this.announcements$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.announcements = [];
  }

  ngOnInit(): void {
    this.announcementManagementList();
  }

  async announcementManagementList(): Promise<void> {
    const data = await firstValueFrom(this.announcementService.get());
    this.announcements = data;
    this.announcements$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }

  search(text: string): Announcement[] {
    return this.announcements.filter(announcement => {
      return (
        announcement.id?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.type?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.year?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.number?.toLowerCase().includes(text.toLowerCase()) ||
        this.datePipe
          .transform(announcement.startDate, 'dd/MM/YYYY')
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        this.datePipe
          .transform(announcement.endRegisterDate, 'dd/MM/YYYY')
          ?.toLowerCase()
          .includes(text.toLowerCase()) ||
        announcement.bases?.toLowerCase().includes(text.toLowerCase()) ||
        announcement.status?.toLowerCase().includes(text.toLowerCase())
      );
    });
  }
}
