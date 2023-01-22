import { Mapper } from 'src/app/base/utils/mapper';

import { HomeForm } from '../../../domain';
import { HomeEntity } from '../../driven-adapters';

export class HomeApplicationImplementationMapper extends Mapper<
  HomeEntity,
  HomeForm
> {
  mapFrom(param: HomeEntity): HomeForm {
    return {
      decentWork: {
        comment: param.hardWork?.comments,
        whyYourOSC: param.hardWork?.porqueTrabajarEnTuOSC,
        personalGrowth: param.hardWork?.crecimientoPersonal,
        whatMakesYouDifferent: param.hardWork?.descripcionOSC,
        benefitsSystem: param.hardWork?.diferenciasDeTuOsc,
      },
      fundManager: {
        cellphone: param.procuringFunds?.celular,
        responsibleEmail: param.procuringFunds?.emailDelResponsable,
        name: param.procuringFunds?.nombre,
        comment: param.procuringFunds?.comments,
      },
      generalData: {
        rfc: param.generalData?.RFC,
        emails: param.generalData?.email,
        businessname: param.generalData?.razonSocial,
        position: param.generalData?.position,
        tradename: param.generalData?.nombreComercial,
        phone: param.generalData?.telefono,
        accountBankManager: param.generalData?.manageTheBankAccount,
        comment: param.generalData?.comments,
      },
      governingBody: {
        comment: param.governingBody?.comments,
        renewalFrequency: param.governingBody?.boardRenewalFrequency,
        members: param.governingBody?.membersOfTheGoverning,
        meetings: param.governingBody?.numberOfMeetingsPerYear,
      },
      organizationalInformation: {
        generalManagement: param.organizationalInformation?.direccionGeneral,
        operationalManagement:
          param.organizationalInformation?.direccionOperativa,
        legalRepresentativeEmail:
          param.organizationalInformation?.emailDelRepresentanteLegal,
        incorporationsStartDate:
          param.organizationalInformation?.fechaDeConstitucion,
        operationsStartDate:
          param.organizationalInformation?.fechaInicioOperaciones,
        founder: param.organizationalInformation?.fundador,
        mission: param.organizationalInformation?.mision,
        legalRepresentative:
          param.organizationalInformation?.representanteLegal,
        ethicalValues: param.organizationalInformation?.valores,
        vision: param.organizationalInformation?.vision,
        comment: param.organizationalInformation?.comments,
      },
      remuneration: {
        comment: param.remunerations?.comments,
        remunerationQuestion: param.remunerations?.workInYourOrganizationIsPaid,
        remunerations: param.remunerations?.tableRemunerations,
      },
      strategicAlliances: {
        donations: param.sustainabilityAndStrategic?.donation,
        products: param.sustainabilityAndStrategic?.product,
        previousDonations: param.sustainabilityAndStrategic?.recibioUnaDonacion,
        strategicalAlliances:
          param.sustainabilityAndStrategic?.actividadesEspecificasFDA,
        issuesToStrengthen: param.sustainabilityAndStrategic?.temasAFortalecer,
        whichTopics: param.sustainabilityAndStrategic?.temasDescripcion,
        alliances: param.sustainabilityAndStrategic?.redDeAlianzas,
        courses: param.sustainabilityAndStrategic?.listaCursosDeActualizacion,
      },
    };
  }
  override mapTo(param: HomeForm): HomeEntity {
    throw new Error('Method not implemented.');
  }
}
