import { GeneralService } from '../../_services/general.service';
import { Component, OnInit } from '@angular/core';
import { TranslateService } from '../translate/translation.service';
@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  languages: any;

  constructor(private generalService: GeneralService, private translateService: TranslateService) { }

  ngOnInit() {
    this.languages = this.generalService.getLanguages();
  }

  changeLang(lang) {
    this.translateService.use(lang);
  }

}
