
//Import Angular
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { APP_BASE_HREF } from '@angular/common';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";

//Import components to declarations
import { AppComponent } from './app.component';

//Import services to providers
import { UrlService } from './_services/url.service';
import { AuthenticationService } from './_services/authentication.service';
import { GeneralService } from './_services/general.service';
import { LoginComponent } from './commons/login/login.component';
import { SignupComponent } from './commons/signup/signup.component';
import { HomeComponent } from './commons/home/home.component';
import { AuthGuard } from './_guards/auth.guard';

//Import Translate
import { TranslateService } from './commons/translate/translation.service';
import { TranslatePipe } from './commons/translate/translation.pipe';
import { TranslationClass } from './commons/translate/translation';

//Import routing
import { routing } from './app.routing';
import { HeaderComponent } from './commons/header/header.component';
import { FooterComponent } from './commons/footer/footer.component';
import { LandpageComponent } from './commons/landpage/landpage.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    SignupComponent,
    HomeComponent,
    TranslatePipe,
    HeaderComponent,
    FooterComponent,
    LandpageComponent
  ],
  imports: [
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    BrowserModule,
    routing
  ],
  providers: [
    AuthenticationService,
    GeneralService,
    UrlService,
    TranslateService,
    { provide: TranslationClass.TRANSLATIONS, useValue: TranslationClass.dictionary },
    { provide: APP_BASE_HREF, useValue: "/stub-mean/web" },
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }