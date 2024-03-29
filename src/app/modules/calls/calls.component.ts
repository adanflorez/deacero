import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { BehaviorSubject, catchError, Subscription, throwError } from 'rxjs';
import FormValid from 'src/app/core/models/form-valid.model';
import { UserService } from 'src/app/core/services/user.service';
import { CallsForm, CallsUseCase } from 'src/app/domain';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnInit, OnDestroy {
  private unsubscribe: Subscription[] = [];
  closeResult: string;
  hideForm$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  infoSubmitted$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  public formDisabled: boolean;

  // Refactor
  public formData: CallsForm;
  public formsStatus: FormValid[];
  public loading: boolean;

  constructor(
    private modalService: NgbModal,
    private userService: UserService,
    // Refactor
    private readonly callsService: CallsUseCase
  ) {
    this.closeResult = '';
    // Refactor
    this.formsStatus = [];
    this.formData = {
      generalProjectData: {},
      location: {},
      projectManager: {},
      projectDevelopment: {},
      period: {},
      objectives: {},
      projectBudget: {},
      rating: {},
      communication: {},
      documents: {},
      otherDocuments: {},
      status: 0,
    };
    this.loading = false;
    this.formDisabled = false;
  }

  public ngOnInit(): void {
    this.userService.OSCstatus().subscribe({
      next: res => {
        if (res.data) {
          this.getApplication();
        } else {
          this.hideForm$.next(true);
        }
      },
      error: error => console.error(error),
    });
  }

  public ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  protected open(content: unknown): void {
    this.modalService
      .open(content, {
        ariaLabelledBy: 'modal-basic-title',
        backdrop: 'static',
      })
      .result.then(
        result => {
          this.closeResult = `Closed with: ${result}`;
        },
        () => {
          throw new Error('reset form');
          // this.form.reset();
        }
      );
  }

  protected save(modal?: unknown, updateAndSave?: boolean) {
    const sub = this.callsService.applyCall(this.formData).subscribe(() => {
      if (updateAndSave) {
        this.saveInFlokzu()?.subscribe({
          next: () => {
            this.infoSubmitted$.next(true);
          },
          error: () => {
            this.infoSubmitted$.next(false);
            this.open(modal);
          },
          complete: () => {
            this.open(modal);
            this.getApplication();
          },
        });
      }
    });
    this.unsubscribe.push(sub);
  }

  private saveInFlokzu() {
    if (this.isInvalidForm) return;
    this.save();
    const sub = this.callsService.saveInFlokzu();
    return sub;
  }
  /**
   * Refactor
   */
  protected get validateIfFormDataIsEmpty(): boolean {
    for (const form in this.formData) {
      return Object.keys(this.formData[form as keyof CallsForm]).length !== 0;
    }
    return false;
  }

  private getApplication() {
    this.callsService
      .get()
      .pipe(catchError(error => throwError(() => Error(error))))
      .subscribe({
        next: (formsData: CallsForm) => {
          this.formData = formsData;
          this.validateFormCompleted();
        },
        error: error => console.error(error),
      });
  }

  private validateFormCompleted(): void {
    setTimeout(() => {
      if (!this.isInvalidForm) {
        this.callsService.status().subscribe({
          next: res => {
            if (res.data) {
              this.formDisabled = true;
              this.infoSaved$.next(true);
            }
          },
        });
      }
    }, 500);
  }

  protected updateData = <T>(form: T, isFormValid: FormValid) => {
    const sectionName = isFormValid.name as keyof CallsForm;
    if (sectionName !== 'status') {
      const sectionBody = {
        ...this.formData[sectionName],
        ...form,
      } as any;
      this.formData[sectionName] = sectionBody;
      this.updateFormStatus(isFormValid);
    }
  };

  private updateFormStatus(formValid: FormValid): void {
    const index = this.formsStatus.findIndex(
      item => item.name === formValid.name
    );
    if (index === -1) {
      this.formsStatus.push(formValid);
    } else {
      this.formsStatus.splice(index, 1);
      this.formsStatus.push(formValid);
    }
  }

  protected get isInvalidForm(): boolean {
    return this.formsStatus.length > 0
      ? this.formsStatus.some(form => !form.valid)
      : true;
  }

  protected get firstFormCompleted(): boolean {
    return this.formData.status === 5;
  }

  protected get bothFormsCompleted(): boolean {
    return this.formData.status === 6;
  }
}
