import { UserStatusPipe } from 'src/app/lib/pipes/user-status.pipe';
import { Observable, map, startWith } from 'rxjs';
import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';

interface UserManagement {
  id?: string;
  name: string;
  rfc: string;
  role: string;
  status: string;
}

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.scss'],
  providers: [UserStatusPipe],
})
export class UserManagementTableComponent {
  users$: Observable<UserManagement[]>;
  users: UserManagement[];
  filter = new FormControl('', { nonNullable: true });
  showModal: boolean;
  activateDeactivateMessage: string;

  constructor(private userStatusPipe: UserStatusPipe) {
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.users = [
      {
        rfc: '123',
        role: 'Administrator',
        status: 'Active',
        name: 'Adan Jahir Florez Bermudez',
      },
      {
        rfc: '456',
        role: 'Usuario',
        status: 'Inactive',
        name: 'Josesito el Fulanito de Tal',
      },
    ];
    this.showModal = false;
    this.activateDeactivateMessage = '';
  }

  search(text: string): UserManagement[] {
    return this.users.filter(user => {
      return (
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.rfc.toLowerCase().includes(text.toLowerCase()) ||
        user.role.toLowerCase().includes(text.toLowerCase()) ||
        this.userStatusPipe.transform(user.status).includes(text)
      );
    });
  }

  closeModal() {
    this.showModal = false;
  }

  openModal(isActivate?: boolean) {
    this.activateDeactivateMessage = isActivate
      ? '¿Deseas activar el usuario?'
      : '¿Deseas desactivar el usuario?';
    this.showModal = true;
  }
}
