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

import { DocumentsForm } from './domain';

@Component({
  selector: 'app-documents-form',
  templateUrl: './documents-form.component.html',
  styleUrls: ['./documents-form.component.scss'],
})
export class DocumentsFormComponent implements OnInit, OnChanges, OnDestroy {
  @Input() updateParentModel: (
    part: DocumentsForm,
    formValid: FormValid
    // eslint-disable-next-line @typescript-eslint/no-empty-function
  ) => void = () => {};
  @Input() defaultValues: DocumentsForm;
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
    return this.allowComments
      ? this.atLeastOneComment || !!this.defaultValues.logoComment
      : true;
  }

  initForm() {
    this.updateDocuments();
    this.form = new FormGroup({
      ethicalCode: new FormControl(this.defaultValues.ethicalCode),
      governanceManual: new FormControl(this.defaultValues.governanceManual),
      timelineActivities: new FormControl(
        this.defaultValues.timelineActivities,
        Validators.required
      ),
      workWithMinors: new FormControl(this.defaultValues.workWithMinors),
      officialLetterOfAuthorizationOfDonees: new FormControl(
        this.defaultValues.officialLetterOfAuthorizationOfDonees,
        Validators.required
      ),
      publicationInAnnex14OfTheCurrentRMF: new FormControl(
        this.defaultValues.publicationInAnnex14OfTheCurrentRMF,
        Validators.required
      ),
      constituentAct: new FormControl(
        this.defaultValues.constituentAct,
        Validators.required
      ),
      mostRecentMeeting: new FormControl(this.defaultValues.mostRecentMeeting),
      legalRepresentativesPower: new FormControl(
        this.defaultValues.legalRepresentativesPower
      ),
      legalRepresentativesId: new FormControl(
        this.defaultValues.legalRepresentativesId,
        Validators.required
      ),
      oldProofOfAddress: new FormControl(
        this.defaultValues.oldProofOfAddress,
        Validators.required
      ),
      updatedComplianceOpinion: new FormControl(
        this.defaultValues.updatedComplianceOpinion,
        Validators.required
      ),
      proofOfUpdatedTaxSituation: new FormControl(
        this.defaultValues.proofOfUpdatedTaxSituation,
        Validators.required
      ),
      logo: new FormControl(this.defaultValues.logo, Validators.required),
    });
    this.subscribeToForm();
    this.disable && this.form.disable();
    this.form.markAllAsTouched();
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
        field: 'ethicalCode',
        name: 'Código de ética',
        help: 'PDF legible',
      },
      {
        field: 'governanceManual',
        name: 'Manual de gobernanza',
        help: 'PDF legible',
      },
      {
        field: 'timelineActivities',
        name: 'Cronograma de actividades',
        help: 'PDF legible',
      },
      {
        field: 'workWithMinors',
        name: 'En caso de trabajar con menores de edad, adjuntar las políticas, normas, reglamentos o protocolos que aseguren su bienestar',
        help: 'PDF legible',
      },
      {
        field: 'officialLetterOfAuthorizationOfDonees',
        name: 'Oficio de autorización de donatarias SAT (vigente)',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'publicationInAnnex14OfTheCurrentRMF',
        name: 'Publicación en el Anexo-14 de la RMF vigente',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'constituentAct',
        name: 'Acta constitutiva de la organización',
        help: 'PDF legible',
      },
      {
        field: 'mostRecentMeeting',
        name: 'Acta de asamblea más reciente',
        help: 'PDF legible',
      },
      {
        field: 'legalRepresentativesPower',
        name: 'Poder del (los) representante(s) legal(es)',
        help: 'PDF legible',
      },
      {
        field: 'legalRepresentativesId',
        name: 'Identificación oficial del representante legal',
        help: 'PDF legible',
      },
      {
        field: 'oldProofOfAddress',
        name: 'Comprobante de domicilio con antigüedad no mayor a 3 meses (agua, luz, teléfono)',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'updatedComplianceOpinion',
        name: 'Opinión de cumplimiento actualizada',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
      {
        field: 'proofOfUpdatedTaxSituation',
        name: 'Constancia de situación fiscal actualizada',
        help: 'PDF legible (preferentemente el documento digital descargado, no escaneado)',
      },
    ];
  }

  updateDocuments() {
    Object.keys(this.defaultValues).forEach((key: string) => {
      this.documentsFields.forEach(doc => {
        if (doc.field === key) {
          const keyComment = key as keyof DocumentsForm;
          doc.comment =
            this.defaultValues[
              (keyComment + 'Comment') as keyof DocumentsForm
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
