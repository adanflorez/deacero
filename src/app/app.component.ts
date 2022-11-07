import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LoadingService } from './lib/services/loading.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  constructor(public loadingService: LoadingService) {}
}
