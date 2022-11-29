import { Component, OnDestroy } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ONLY_NUMBERS_PATTERN } from 'src/app/lib/constants';
import Member from 'src/app/lib/models/member.model';
import Remuneration from 'src/app/lib/models/remuneration.model';

@Component({
  selector: 'app-calls',
  templateUrl: './calls.component.html',
  styleUrls: ['./calls.component.scss'],
})
export class CallsComponent implements OnDestroy {
  private unsubscribe: Subscription[] = [];
  form: FormGroup;
  members: Member[] = [];
  remunerations: Remuneration[] = [];
  groups: string[] = [];
  rating = [
    {
      title:
        'Mejorar las condiciones de vida 1 (nada de mejora) a 10 (mucha mejora)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'livingConditions',
    },
    {
      title: 'Mejora en la calidad de vida 1 (Poca mejora) a 10 (mucha mejora)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'lifeQuality',
    },
    {
      title:
        'Desarrollo de capacidades para la autogestión 1 (No contribuye) a 10 (Contribuye mucho)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'capacityBuilding',
    },
    {
      title: 'Tipo de apoyo 1 (Necesaria) a 10 (complementaria)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'supportType',
    },
    {
      title: 'Alcance del apoyo 1 (reactivo) a 10 (preventivo)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'supportScope',
    },
    {
      title: 'Desarrollo de resiliencia 1 (nada) a 10 (mucho)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'resilienceBuilding',
    },
    {
      title: 'Rezago social 1 (poca incidencia) a 10 (mucha incidencia)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'socialBackwardness',
    },
    {
      title:
        'Desarrollo de sentido comunitario 1 (No contribuye) a 10 (Contribuye mucho)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'communitySense',
    },
    {
      title:
        'Procesos de sostenibilidad 1 (nada de mejora) a 10 (mucha mejora)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'sustainabilityProcesses',
    },
    {
      title:
        'Mejora en el estado de la organización/población 1 (nada de beneficio) a 10 (mucho beneficio)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'statusImprovement',
    },
    {
      title: 'Desarrollo urbano 1 (nada) a 10 (mucho)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'urbanDevelopment',
    },
    {
      title:
        'Proceso de profesionalización 1 (pocas ventajas) a 10(muchas ventajas)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'professionalizationProcess',
    },
    {
      title:
        'Generación de oportunidades económicas o de desarrollo 1 (nada) a 10 (muchas)',
      items: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
      group: 'opportunityGeneration',
    },
  ];

  constructor() {
    this.form = new FormGroup({
      meetings: new FormControl(null, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      renewalFrequency: new FormControl(null, [
        Validators.required,
        Validators.pattern(ONLY_NUMBERS_PATTERN),
      ]),
      remunerationQuestion: new FormControl(true),
      projectName: new FormControl(null, [Validators.required]),
      category: new FormControl('', Validators.required),
      livingConditions: new FormControl(''),
      lifeQuality: new FormControl(''),
      capacityBuilding: new FormControl(''),
      supportType: new FormControl(''),
      supportScope: new FormControl(''),
      resilienceBuilding: new FormControl(''),
      socialBackwardness: new FormControl(''),
      communitySense: new FormControl(''),
      sustainabilityProcesses: new FormControl(''),
      statusImprovement: new FormControl(''),
      urbanDevelopment: new FormControl(''),
      professionalizationProcess: new FormControl(''),
      opportunityGeneration: new FormControl(''),
    });
    const sub = this.form
      .get('category')
      ?.valueChanges.subscribe(() => this.changeCategory());
    this.unsubscribe.push(sub!);
  }

  get f() {
    return this.form.controls;
  }

  save() {
    console.log(this.form.value);
    console.log(this.members);
    console.log(this.remunerations);
  }

  changeCategory() {
    // Reset previous controls
    this.resetPreviousRatings();
    switch (Number(this.f.category.value)) {
      case 1:
      case 3:
      case 4:
      case 16:
      case 19:
      case 20:
      case 24:
      case 25:
        this.groups = [
          'livingConditions',
          'lifeQuality',
          'capacityBuilding',
          'supportType',
          'supportScope',
          'resilienceBuilding',
        ];
        break;
      case 2:
      case 5:
      case 6:
      case 7:
      case 9:
      case 11:
      case 12:
      case 13:
      case 15:
      case 18:
      case 21:
      case 22:
      case 23:
        this.groups = [
          'socialBackwardness',
          'capacityBuilding',
          'communitySense',
          'sustainabilityProcesses',
        ];
        break;
      case 8:
      case 10:
      case 14:
      case 17:
        this.groups = [
          'statusImprovement',
          'urbanDevelopment',
          'professionalizationProcess',
          'opportunityGeneration',
        ];
        break;
      default:
        this.groups = [];
        break;
    }
    // Set validators to current controls
    this.setValidatorsToRating();
  }

  resetPreviousRatings() {
    this.groups.map((group) => {
      this.form.get(group)?.clearValidators();
      this.form.get(group)?.reset();
    });
  }

  setValidatorsToRating() {
    this.groups.map((group) => {
      this.form.get(group)?.setValidators(Validators.required);
    });
  }

  ngOnDestroy(): void {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }
}
