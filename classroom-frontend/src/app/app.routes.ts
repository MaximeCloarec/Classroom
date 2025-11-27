import { Routes } from '@angular/router';
import { DashboardAd } from './pages/dashboard-ad/dashboard-ad';
import { Accueil } from './pages/accueil/accueil';
import { Inscription } from './pages/inscription/inscription';

export const routes: Routes = [

   {path: '', component: Accueil},
   { path: 'GestionAdmin', component: DashboardAd },
   {path:'inscription',component:Inscription}
];
