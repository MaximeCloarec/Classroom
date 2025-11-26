import { Routes } from '@angular/router';
import { DashboardAd } from './pages/dashboard-ad/dashboard-ad';
import { Accueil } from './pages/accueil/accueil';
import path from 'path';
export const routes: Routes = [

   {path: '', component: Accueil},
   { path: 'GestionAdmin', component: DashboardAd },
];
