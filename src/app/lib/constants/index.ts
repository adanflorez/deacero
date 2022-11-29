export const PASSWORD_PATERN =
  '(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])[A-Za-zd$@$!%*?&].{7,}';
export const ONLY_NUMBERS_PATTERN = '^[0-9]+$';
export const MULTIPLE_EMAIL_PATTERN =
  '(([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+.[A-Za-z]{2,4}(;|,|$)s?))*';
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
