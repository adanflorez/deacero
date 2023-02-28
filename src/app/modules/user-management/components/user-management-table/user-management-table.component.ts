import { AfterViewInit, Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {
  catchError,
  firstValueFrom,
  map,
  Observable,
  startWith,
  throwError,
} from 'rxjs';
import { PASSWORD_PATERN } from 'src/app/core/constants';
import { CustomValidators } from 'src/app/core/helpers/custom-validators';
import { UserRolePipe } from 'src/app/core/pipes/user-role.pipe';
import { UserStatusPipe } from 'src/app/core/pipes/user-status.pipe';
import { UserService } from 'src/app/core/services/user.service';
import { UserModel } from 'src/app/domain/models/user.model';
import { AlertType } from 'src/app/shared/alert';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
declare let window: any;

@Component({
  selector: 'app-user-management-table',
  templateUrl: './user-management-table.component.html',
  styleUrls: ['./user-management-table.component.scss'],
  providers: [UserStatusPipe, UserRolePipe],
})
export class UserManagementTableComponent implements OnInit, AfterViewInit {
  users$: Observable<UserModel[]>;
  users: UserModel[];
  filter = new FormControl('', { nonNullable: true });
  showModal: boolean;
  activateDeactivateMessage: string;
  createUserForm: FormGroup;
  showCreateUserModal: boolean;
  passwordFieldType: string;
  confirmPasswordFieldType: string;
  passwordButonnIcon: string;
  confirmPasswordButonnIcon: string;
  showAlert: boolean;
  alertMessage: string;
  alertType: AlertType;
  emailToActivateOrDeactivate: string;
  statusToActivateOrDeactivate: boolean;

  constructor(
    private userStatusPipe: UserStatusPipe,
    private userRolePipe: UserRolePipe,
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
    this.showAlert = false;
    this.alertMessage = '';
    this.alertType = AlertType.Danger;
    this.emailToActivateOrDeactivate = '';
    this.statusToActivateOrDeactivate = false;
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

  search(text: string): UserModel[] {
    return this.users.filter(user => {
      return (
        user.email?.toLowerCase().includes(text.toLowerCase()) ||
        user.name?.toLowerCase().includes(text.toLowerCase()) ||
        user.rfc?.toLowerCase().includes(text.toLowerCase()) ||
        this.userRolePipe
          .transform(user.role)
          .toLowerCase()
          .includes(text.toLowerCase()) ||
        this.userStatusPipe.transform(user.status).toLowerCase().includes(text)
      );
    });
  }

  closeModal() {
    this.showModal = false;
  }

  openModal(email: string, isActivate: boolean) {
    this.emailToActivateOrDeactivate = email;
    this.statusToActivateOrDeactivate = isActivate;
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
    if (this.createUserForm.invalid) return;
    this.userService
      .createUser(this.f['user'].value, this.f['password'].value)
      .pipe(
        catchError(err => {
          this.closeCreateUserModal();
          this.createUserForm.reset();
          this.alertType = AlertType.Danger;
          this.alertMessage = 'No se pudo registrar el usuario';
          this.showAlert = true;
          return throwError(() => new Error(err));
        })
      )
      .subscribe({
        complete: () => {
          this.closeCreateUserModal();
          this.createUserForm.reset();
          this.alertType = AlertType.Success;
          this.alertMessage = 'Usuario registrado correctamente';
          this.showAlert = true;
          this.userManagementList();
        },
      });
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

  activateOrDeactivateUser() {
    if (!this.emailToActivateOrDeactivate) return;
    this.userService
      .activateOrDeactivateUser(
        this.emailToActivateOrDeactivate,
        this.statusToActivateOrDeactivate
      )
      .subscribe({
        error: err => {
          console.error(err);
        },
        complete: () => {
          this.showModal = false;
          this.userManagementList();
        },
      });
  }
}
