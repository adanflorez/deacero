import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { BehaviorSubject, Subscription } from 'rxjs';
import { CallSection } from 'src/app/core/enums/sections.enum';
import FormValid from 'src/app/core/models/form-valid.model';
import Response from 'src/app/core/models/response.model';
import { MultimediaService } from 'src/app/core/services/multimedia.service';
import { AlertType } from 'src/app/shared/alert';

import { OtherDocumentsForm } from './domain';

@Component({
  selector: 'app-other-documents-form',
  templateUrl: './other-documents-form.component.html',
  styleUrls: ['./other-documents-form.component.scss'],
})
export class OtherDocumentsFormComponent
  implements OnInit, OnChanges, OnDestroy
{
  @Input() updateParentModel: (
    part: OtherDocumentsForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: OtherDocumentsForm;
  @Input() allowComments: boolean;
  @Input() disable: boolean;
  form: FormGroup;
  documentsFields!: Array<{
    field: string;
    name: string;
    help: string;
    comment?: string;
  }>;
  atLeastOneComment: boolean;

  alertType: AlertType = AlertType.Warning;

  private unsubscribe: Subscription[] = [];
  tempDocumentUrl: BehaviorSubject<string> = new BehaviorSubject<string>('');

  constructor(private multimediaService: MultimediaService) {
    this.defaultValues = {};
    this.allowComments = false;
    this.form = new FormGroup({});
    this.atLeastOneComment = false;
    this.disable = false;
    this.initDocuments();
    this.initForm();
  }

  ngOnChanges(changes: SimpleChanges): void {
    const { disable } = changes;
    if (disable?.currentValue) {
      this.initForm();
    }
  }

  ngOnInit(): void {
    this.initForm();
    this.updateParentModel({}, this.isValidForm);
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach(sb => sb.unsubscribe());
  }

  get f() {
    return this.form.controls;
  }

  get isValidForm(): FormValid {
    return {
      name: CallSection.DOCUMENTS,
      valid: this.form.valid,
    };
  }

  get keepInCountComments(): boolean {
    return this.allowComments ? this.atLeastOneComment : true;
  }

  initForm() {
    this.updateDocuments();
    this.form = new FormGroup({
      updatedComplianceOpinionDoc: new FormControl(
        this.defaultValues.updatedComplianceOpinionDoc
      ),
      proofOfUpdatedTaxSituationDoc: new FormControl(
        this.defaultValues.proofOfUpdatedTaxSituationDoc
      ),
      bankStatementCoverPageDoc: new FormControl(
        this.defaultValues.bankStatementCoverPageDoc,
        Validators.required
      ),
      letterheadIndicatingTheFullNameDoc: new FormControl(
        this.defaultValues.letterheadIndicatingTheFullNameDoc
      ),
      proofOfAdmissionToThePublicRegistryDoc: new FormControl(
        this.defaultValues.proofOfAdmissionToThePublicRegistryDoc,
        Validators.required
      ),
    });
    this.subscribeToForm();
    this.disable && this.form.disable();
  }

  subscribeToForm() {
    const sub = this.form.valueChanges.subscribe(val => {
      this.updateParentModel(val, this.isValidForm);
    });
    this.unsubscribe.push(sub);
  }

  initDocuments() {
    this.documentsFields = [
      {
        field: 'updatedComplianceOpinionDoc',
        name: 'Opinión de cumplimiento actualizada',
        help: 'PDF legible',
      },
      {
        field: 'proofOfUpdatedTaxSituationDoc',
        name: 'Constancia de situación fiscal actualizada',
        help: 'PDF legible',
      },
      {
        field: 'bankStatementCoverPageDoc',
        name: 'Carátula del estado de cuenta bancaria',
        help: 'PDF legible',
      },
      {
        field: 'letterheadIndicatingTheFullNameDoc',
        name: 'Carta membretada que señale el nombre completo y puesto de la persona responsable de administrar la cuenta bancaria en la OSC (no el ejecutivo bancario).',
        help: 'PDF legible',
      },
      {
        field: 'proofOfAdmissionToThePublicRegistryDoc',
        name: 'Comprobante de ingreso al registro público o bien, el acta ya protocolizada con las reformas fiscales vigentes.',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
    ];
  }

  updateDocuments() {
    Object.keys(this.defaultValues).forEach((key: string) => {
      this.documentsFields.forEach(doc => {
        if (doc.field === key) {
          const keyComment = key as keyof OtherDocumentsForm;
          doc.comment =
            this.defaultValues[
              (keyComment + 'Comment') as keyof OtherDocumentsForm
            ] || '';
          if (doc.comment !== '' && doc.comment !== null) {
            this.atLeastOneComment = true;
          }
        }
      });
    });
  }

  uploadDocument(e: Event, control: string, isImage = false) {
    if (!this.fileValidation(control, isImage)) return;
    const formData = new FormData();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    formData.append('file', (e.target as HTMLInputElement).files![0]);
    this.multimediaService.upload(formData).subscribe({
      next: (res: unknown) => {
        this.tempDocumentUrl.next((res as Response<unknown>).data as string);
      },
      error: error => console.error(error),
      complete: () => {
        const sub = this.tempDocumentUrl.asObservable().subscribe(res => {
          if (!this.f[control].value) {
            this.f[control].setValue(res);
          }
        });
        sub.unsubscribe();
      },
    });
  }

  private fileValidation(inputId: string, isImage?: boolean): boolean {
    let allowedExtensions = /(\.pdf)$/i;
    let message = 'El archivo debe ser de extension .pdf';
    if (isImage) {
      allowedExtensions = /(\.png|\.ai|\.svg|\.pdf|\.jpg|\.jpeg)$/i;
      message = 'El archivo debe ser de extension .jpg, .pdf, .png, .ai o .svg';
    }
    const fileInput = document.getElementById(inputId) as HTMLInputElement;
    const filePath = fileInput?.value;
    if (!allowedExtensions.exec(filePath)) {
      alert(message);
      fileInput.value = '';
      return false;
    }
    return true;
  }
}
