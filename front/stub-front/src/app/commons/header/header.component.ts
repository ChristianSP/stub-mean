import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GeneralService } from '../../_services/general.service';
import { AuthenticationService } from '../../_services/authentication.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  options: any;

  constructor(private generalService: GeneralService
    , private authService: AuthenticationService
    , private router: Router) { }

  ngOnInit() {
    this.options = this.generalService.getMenuOptions();
  }

  canShowOption(option) {
    let isLogged = this.authService.isLogged();
    if ((isLogged && option.onlyNotLogged)
      || (!isLogged && option.onlyLogged)) {
      return false;
    }
    return true;
  }

  activateOption(option) {
    this.router.navigate([option.route]);
  }
}
