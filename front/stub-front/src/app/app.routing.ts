
import { Routes, RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { LoginComponent } from './commons/login/login.component';
import { HomeComponent } from './commons/home/home.component';
import { SignupComponent } from './commons/signup/signup.component';

import { AuthGuard } from './_guards/auth.guard';


const appRoutes: Routes = [

    { path: 'login', component: LoginComponent },
    { path: 'signup', component: SignupComponent },
    { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
    { path: '**', redirectTo: "home" }

];
export const routing = RouterModule.forRoot(appRoutes);
