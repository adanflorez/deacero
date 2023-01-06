import { Observable, map, startWith, firstValueFrom } from 'rxjs';
import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { CustomValidators } from 'src/app/lib/helpers/custom-validators';
import { PASSWORD_PATERN } from 'src/app/lib/constants';
import UserManagement from 'src/app/lib/models/user-management.model';
import { UserService } from 'src/app/lib/services/user.service';
import { UserStatusPipe } from 'src/app/lib/pipes/user-status.pipe';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.scss'],
  providers: [UserStatusPipe],
})
export class UserManagementTableComponent implements OnInit, AfterViewInit {
  users$: Observable<UserManagement[]>;
  users: UserManagement[];
  filter = new FormControl('', { nonNullable: true });
  showModal: boolean;
  activateDeactivateMessage: string;
  createUserForm: FormGroup;
  showCreateUserModal: boolean;
  passwordFieldType: string;
  confirmPasswordFieldType: string;
  passwordButonnIcon: string;
  confirmPasswordButonnIcon: string;

  constructor(
    private userStatusPipe: UserStatusPipe,
    private userService: UserService
  ) {
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
    this.users = [];
    this.showModal = false;
    this.activateDeactivateMessage = '';
    this.createUserForm = new FormGroup({});
    this.showCreateUserModal = false;
    this.passwordFieldType = 'password';
    this.confirmPasswordFieldType = 'password';
    this.passwordButonnIcon = 'lock';
    this.confirmPasswordButonnIcon = 'lock';
  }

  ngAfterViewInit(): void {
    const tooltipTriggerList = [].slice.call(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(function (tooltipTriggerEl) {
      return new window.bootstrap.Tooltip(tooltipTriggerEl);
    });
  }

  ngOnInit(): void {
    this.initForm();
    this.userManagementList();
  }

  get f() {
    return this.createUserForm.controls;
  }

  get passwordMatchError() {
    return (
      this.createUserForm.getError('mismatch') &&
      this.createUserForm.get('confirmPassword')?.touched
    );
  }

  initForm() {
    this.createUserForm = new FormGroup(
      {
        user: new FormControl('', [Validators.required, Validators.email]),
        password: new FormControl('', [
          Validators.required,
          Validators.pattern(PASSWORD_PATERN),
        ]),
        confirmPassword: new FormControl('', Validators.required),
      },
      [CustomValidators.MatchValidator('password', 'confirmPassword')]
    );
  }

  search(text: string): UserManagement[] {
    return this.users.filter(user => {
      return (
        user.name.toLowerCase().includes(text.toLowerCase()) ||
        user.rfc.toLowerCase().includes(text.toLowerCase()) ||
        user.role.toLowerCase().includes(text.toLowerCase()) ||
        this.userStatusPipe.transform(user.status).toLowerCase().includes(text)
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

  openCreateUserModal() {
    this.showCreateUserModal = true;
  }

  closeCreateUserModal() {
    this.showCreateUserModal = false;
  }

  confirmCreateUserModal() {
    console.log(this.createUserForm.value);
  }

  showHidePassword(field: number): void {
    if (field === 1) {
      if (this.passwordFieldType === 'password') {
        this.passwordFieldType = 'text';
        this.passwordButonnIcon = 'unlock';
        return;
      }
      this.passwordFieldType = 'password';
      this.passwordButonnIcon = 'lock';
    } else {
      if (this.confirmPasswordFieldType === 'password') {
        this.confirmPasswordFieldType = 'text';
        this.confirmPasswordButonnIcon = 'unlock';
        return;
      }
      this.confirmPasswordFieldType = 'password';
      this.confirmPasswordButonnIcon = 'lock';
    }
  }

  async userManagementList(): Promise<void> {
    const data = await firstValueFrom(this.userService.userManagementList());
    this.users = data;
    this.users$ = this.filter.valueChanges.pipe(
      startWith(''),
      map(text => this.search(text))
    );
  }
}
