import { Component } from '@angular/core';
import { TranslateService } from './commons/translate/translation.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'app';

  constructor(private translateService: TranslateService) {
    this.translateService.use("en");
  }
}
