import {
  GeneralProjectDataForm,
  LocationForm,
  ProjectManagerForm,
} from 'src/app/shared/forms';

export interface CallsForm {
  generalProjectData: GeneralProjectDataForm;
  location: LocationForm;
  projectManager: ProjectManagerForm;
}
