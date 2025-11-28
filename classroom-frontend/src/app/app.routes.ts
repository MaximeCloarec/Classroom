import { Routes } from '@angular/router';
import { DashboardAd } from './pages/dashboard-ad/dashboard-ad';
import { Inscription } from './pages/inscription/inscription';

import { Home } from './pages/home/home';

export const routes: Routes = [
   { path: '', component: Home },
   { path: 'home', component: Home },
   { path: 'GestionAdmin', component: DashboardAd },
   { path: 'inscription', component: Inscription }

];
