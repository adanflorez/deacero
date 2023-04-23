export const PASSWORD_PATERN =
  '(?=\\D*\\d)(?=[^a-z]*[a-z])(?=[^A-Z]*[A-Z]).{8,50}';
export const ONLY_NUMBERS_PATTERN = '^[0-9]+$';
export const MULTIPLE_EMAIL_PATTERN =
  '(([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}(;|,|$)s?))*';
export const URL_PATTERN =
  '((http|https)://)(www.)?[a-zA-Z0-9@:%._\\+~#?&//=]{2,256}\\.[a-z]{2,6}\\b([-a-zA-Z0-9@:%._\\+~#?&//=]*)';
export const RFC_PATTERN =
  /^([A-ZÑ&]{3,4}) ?(?:- ?)?(\d{2}(?:0[1-9]|1[0-2])(?:0[1-9]|[12]\d|3[01])) ?(?:- ?)?([A-Z\d]{2})([A\d])$/;
export const ALPHABET = '0123456789ABCDEFGHIJKLMN&OPQRSTUVWXYZ Ñ';
export const RATING = [
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
    title: 'Procesos de sostenibilidad 1 (nada de mejora) a 10 (mucha mejora)',
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

export const OBJECTIVES = [
  '1. Fin de la pobreza',
  '2. Hambre cero',
  '3. Salud y bienestar',
  '4. Educación de calidad',
  '5. Igualdad de género',
  '6. Agua limpia y saneamiento',
  '7. Energía asequible y no contaminante',
  '8. Trabajo decente y crecimiento económico',
  '9. Industria, innovación e infraestructuras',
  '10. Reducción de las desigualdades',
  '11. Ciudades y comunidades sostenibles',
  '12. Producción y consumo responsables',
  '13. Acción por el clima',
  '14. Vida submarina',
  '15. Vida de ecosistemas terrestres',
  '16. Paz, Justicia e instituciones solidas',
  '17. Alianzas para lograr objetivos',
];

export const CATEGORIES = [
  // 'Alimentación',
  // 'Asistencia jurídica',
  // 'Asistencia o rehabilitación médica',
  // 'Atención a grupos sociales con discapacidad',
  'Becas',
  // 'Defensa y promoción de los DH',
  // 'Desarrollo comunidades indígenas.',
  // 'Desarrollo Institucional',
  // 'Desarrollo urbano',
  // 'Detonación de oportunidades para la resiliencia económica.',
  // 'Ecología',
  'Educación',
  // 'Empoderamiento social',
  // 'Equipamiento',
  // 'Fomento educativo',
  // 'Inclusión',
  // 'Infraestructura',
  // 'Medio ambiente',
  // 'Nutrición',
  // 'Orientación social',
  // 'Participación ciudadana.',
  // 'Promoción y difusión cultural',
  // 'Reinserción social',
  // 'Salud mental',
  'Primera infancia', //24
  'Ciencia y tecnología calidad de vida', //25
  'Emprendimiento', //26
];

export const PAGINATION = {
  PAGE: 1,
  TOTAL: 0,
  PER_PAGE: 10,
};
