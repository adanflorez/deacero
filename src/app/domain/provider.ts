import { CallsGateway } from './gateway';
import { CallsImplementation } from './infrastructure';
import { CallsUseCase } from './usecases';

export const CallsProviders = [
  {
    provide: CallsUseCase,
    useFactory: (callsGateway: CallsGateway) => new CallsUseCase(callsGateway),
    deps: [CallsGateway],
  },
  {
    provide: CallsGateway,
    useClass: CallsImplementation,
  },
];
