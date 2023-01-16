import { Component, OnInit } from '@angular/core';
import { AbstractControl } from '@angular/forms';
import { BehaviorSubject, catchError, throwError } from 'rxjs';

import { AlertType } from 'src/app/core/enums/alert-type';
import { CallService } from 'src/app/core/services/call.service';
import { UserService } from 'src/app/core/services/user.service';
import Response from 'src/app/core/models/response.model';
import { validateRFC } from 'src/app/core/helpers/rfc-validator';
import CallForm from 'src/app/core/models/call-form.model';
import FormValid from 'src/app/core/models/form-valid.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  showAlert = false;
  alertType: AlertType = AlertType.Danger;
  alertMessage = '';
  loading = false;
  infoSaved$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  formData: Partial<CallForm>;
  formsStatus: FormValid[];

  constructor(
    private userService: UserService,
    private callService: CallService
  ) {
    this.formsStatus = [];
    this.formData = {
      generalData: {},
      fundManager: {},
      organizationalInformation: {},
      strategicAlliances: {},
      decentWork: {},
    };
  }

  ngOnInit(): void {
    this.getOSC();
  }

  getOSC() {
    this.loading = true;
    this.userService
      .getOSC()
      .pipe(
        catchError(error => {
          this.showAlert = true;
          this.alertMessage = error.error.message;
          this.alertType = AlertType.Danger;
          return throwError(() => Error(error));
        })
      )
      .subscribe({
        next: (res: any) => {
          this.formData = {
            governingBody: {
              comment: res.data.governingBody.comments,
              renewalFrequency: res.data.governingBody.boardRenewalFrequency,
              members: res.data.governingBody.membersOfTheGoverning,
              meetings: res.data.governingBody.numberOfMeetingsPerYear,
            },
            remuneration: {
              comment: res.data.remunerations.comments,
              remunerationQuestion:
                res.data.remunerations.workInYourOrganizationIsPaid,
              remunerations: res.data.remunerations.tableRemunerations,
            },
            generalData: {
              rfc: res.data.generalData.RFC,
              emails: res.data.generalData.email,
              businessname: res.data.generalData.razonSocial,
              position: res.data.generalData.position,
              tradename: res.data.generalData.nombreComercial,
              phone: res.data.generalData.telefono,
              accountBankManager: res.data.generalData.manageTheBankAccount,
            },
            fundManager: {
              cellphone: res.data.procuringFunds?.celular,
              responsibleEmail: res.data.procuringFunds?.emailDelResponsable,
              name: res.data.procuringFunds?.nombre,
            },
            organizationalInformation: {
              generalManagement:
                res.data.organizationalInformation?.direccionGeneral,
              operationalManagement:
                res.data.organizationalInformation?.direccionOperativa,
              legalRepresentativeEmail:
                res.data.organizationalInformation?.emailDelRepresentanteLegal,
              incorporationsStartDate:
                res.data.organizationalInformation?.fechaDeConstitucion,
              operationsStartDate:
                res.data.organizationalInformation?.fechaInicioOperaciones,
              founder: res.data.organizationalInformation?.fundador,
              mission: res.data.organizationalInformation?.mision,
              legalRepresentative:
                res.data.organizationalInformation?.representanteLegal,
              ethicalValues: res.data.organizationalInformation?.valores,
              vision: res.data.organizationalInformation?.vision,
            },
            strategicAlliances: {
              donations: res.data.sustainabilityAndStrategic?.donation,
              products: res.data.sustainabilityAndStrategic?.product,
              previousDonations:
                res.data.sustainabilityAndStrategic?.recibioUnaDonacion,
              strategicalAlliances:
                res.data.sustainabilityAndStrategic?.actividadesEspecificasFDA,
              issuesToStrengthen:
                res.data.sustainabilityAndStrategic?.temasAFortalecer,
              whichTopics:
                res.data.sustainabilityAndStrategic?.temasDescripcion,
              alliances: res.data.sustainabilityAndStrategic?.redDeAlianzas,
              courses:
                res.data.sustainabilityAndStrategic?.listaCursosDeActualizacion,
            },
            decentWork: {
              whyYourOSC: res.data.hardWork?.porqueTrabajarEnTuOSC,
              personalGrowth: res.data.hardWork?.crecimientoPersonal,
              whatMakesYouDifferent: res.data.hardWork?.descripcionOSC,
              benefitsSystem: res.data.hardWork?.diferenciasDeTuOsc,
            },
          };
        },
        complete: () => {
          this.getCallStatus();
          this.loading = false;
        },
      });
  }

  getCallStatus(): void {
    setTimeout(() => {
      if (!this.isInvalidForm) {
        this.callService.status().subscribe((res: unknown) => {
          if ((res as Response<unknown>).data) {
            this.infoSaved$.next(true);
          }
        });
      }
    }, 500);
  }

  get isInvalidForm(): boolean {
    return this.formsStatus.length > 0
      ? this.formsStatus.some(form => !form.valid)
      : true;
  }

  update() {
    const form = {
      governingBody: {
        boardRenewalFrequency: this.formData.governingBody?.renewalFrequency,
        membersOfTheGoverning: this.formData.governingBody?.members,
        numberOfMeetingsPerYear: this.formData.governingBody?.meetings,
      },
      remunerations: {
        workInYourOrganizationIsPaid:
          this.formData.remuneration?.remunerationQuestion,
        tableRemunerations: this.formData.remuneration?.remunerations,
      },
      generalData: {
        RFC: this.formData.generalData?.rfc,
        email: this.formData.generalData?.emails,
        razonSocial: this.formData.generalData?.businessname,
        position: this.formData.generalData?.position,
        nombreComercial: this.formData.generalData?.tradename,
        telefono: this.formData.generalData?.phone,
        manageTheBankAccount: this.formData.generalData?.accountBankManager,
      },
      procuringFunds: {
        celular: this.formData.fundManager?.cellphone,
        emailDelResponsable: this.formData.fundManager?.responsibleEmail,
        nombre: this.formData.fundManager?.name,
      },
      organizationalInformation: {
        direccionGeneral:
          this.formData.organizationalInformation?.generalManagement,
        direccionOperativa:
          this.formData.organizationalInformation?.operationalManagement,
        emailDelRepresentanteLegal:
          this.formData.organizationalInformation?.legalRepresentativeEmail,
        fechaDeConstitucion:
          this.formData.organizationalInformation?.incorporationsStartDate,
        fechaInicioOperaciones:
          this.formData.organizationalInformation?.operationsStartDate,
        fundador: this.formData.organizationalInformation?.founder,
        mision: this.formData.organizationalInformation?.mission,
        representanteLegal:
          this.formData.organizationalInformation?.legalRepresentative,
        valores: this.formData.organizationalInformation?.ethicalValues,
        vision: this.formData.organizationalInformation?.vision,
      },
      sustainabilityAndStrategic: {
        donation: this.formData.strategicAlliances?.donations,
        product: this.formData.strategicAlliances?.products,
        recibioUnaDonacion: this.formData.strategicAlliances?.previousDonations,
        actividadesEspecificasFDA:
          this.formData.strategicAlliances?.strategicalAlliances,
        temasAFortalecer: this.formData.strategicAlliances?.issuesToStrengthen,
        temasDescripcion: this.formData.strategicAlliances?.whichTopics,
        redDeAlianzas: this.formData.strategicAlliances?.alliances,
        listaCursosDeActualizacion: this.formData.strategicAlliances?.courses,
      },
      hardWork: {
        porqueTrabajarEnTuOSC: this.formData.decentWork?.whyYourOSC,
        crecimientoPersonal: this.formData.decentWork?.personalGrowth,
        descripcionOSC: this.formData.decentWork?.whatMakesYouDifferent,
        diferenciasDeTuOsc: this.formData.decentWork?.benefitsSystem,
      },
    };
    this.userService.updateOSC(form).subscribe({
      next: () => {
        this.showAlert = true;
        this.alertMessage = 'Información de OSC actualizada';
        this.alertType = AlertType.Success;
      },
      error: () => {
        this.showAlert = true;
        this.alertMessage = 'Error al actualizar';
        this.alertType = AlertType.Danger;
      },
      complete: () => this.getOSC(),
    });
  }

  validateRFC(input: Event, control: AbstractControl) {
    validateRFC(input, control);
  }

  updateData = <T>(form: T, isFormValid: FormValid) => {
    const sectionName = isFormValid.name as keyof CallForm;
    const sectionBody = {
      ...this.formData[sectionName],
      ...form,
    } as any;
    this.formData[sectionName] = sectionBody;
    this.updateFormStatus(isFormValid);
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
}
