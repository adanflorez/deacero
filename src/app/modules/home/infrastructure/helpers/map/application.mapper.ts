import { Mapper } from 'src/app/base/utils/mapper';
import {
  Donation,
  Member,
  Product,
  Remuneration,
  StrategicAllianceActivity,
} from 'src/app/core/models';

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
    return {
      governingBody: {
        boardRenewalFrequency: param.governingBody?.renewalFrequency as number,
        membersOfTheGoverning: param.governingBody?.members as Array<Member>,
        numberOfMeetingsPerYear: param.governingBody?.meetings as number,
      },
      remunerations: {
        workInYourOrganizationIsPaid: param.remuneration
          ?.remunerationQuestion as boolean,
        tableRemunerations: param.remuneration
          ?.remunerations as Array<Remuneration>,
      },
      generalData: {
        RFC: param.generalData?.rfc as string,
        email: param.generalData?.emails as string,
        razonSocial: param.generalData?.businessname as string,
        position: param.generalData?.position as string,
        nombreComercial: param.generalData?.tradename as string,
        telefono: param.generalData?.phone as string,
        manageTheBankAccount: param.generalData?.accountBankManager as string,
      },
      procuringFunds: {
        celular: param.fundManager?.cellphone as string,
        emailDelResponsable: param.fundManager?.responsibleEmail as string,
        nombre: param.fundManager?.name as string,
      },
      organizationalInformation: {
        direccionGeneral: param.organizationalInformation
          ?.generalManagement as string,
        direccionOperativa: param.organizationalInformation
          ?.operationalManagement as string,
        emailDelRepresentanteLegal: param.organizationalInformation
          ?.legalRepresentativeEmail as string,
        fechaDeConstitucion: param.organizationalInformation
          ?.incorporationsStartDate as string,
        fechaInicioOperaciones: param.organizationalInformation
          ?.operationsStartDate as string,
        fundador: param.organizationalInformation?.founder as string,
        mision: param.organizationalInformation?.mission as string,
        representanteLegal: param.organizationalInformation
          ?.legalRepresentative as string,
        valores: param.organizationalInformation?.ethicalValues as string,
        vision: param.organizationalInformation?.vision as string,
      },
      sustainabilityAndStrategic: {
        donation: param.strategicAlliances?.donations as Array<Donation>,
        product: param.strategicAlliances?.products as Array<Product>,
        recibioUnaDonacion: param.strategicAlliances
          ?.previousDonations as boolean,
        actividadesEspecificasFDA: param.strategicAlliances
          ?.strategicalAlliances as Array<StrategicAllianceActivity>,
        temasAFortalecer: param.strategicAlliances
          ?.issuesToStrengthen as Array<string>,
        temasDescripcion: param.strategicAlliances?.whichTopics as string,
        redDeAlianzas: param.strategicAlliances?.alliances as string,
        listaCursosDeActualizacion: param.strategicAlliances?.courses as string,
      },
      hardWork: {
        porqueTrabajarEnTuOSC: param.decentWork?.whyYourOSC as string,
        crecimientoPersonal: param.decentWork?.personalGrowth as string,
        descripcionOSC: param.decentWork?.whatMakesYouDifferent as string,
        diferenciasDeTuOsc: param.decentWork?.benefitsSystem as string,
      },
    };
  }
}
