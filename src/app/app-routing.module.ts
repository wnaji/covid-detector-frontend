import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthentificationComponent } from './components/authentification/authentification.component';
import { DoctorComponent } from './components/doctor/doctor.component';
import { EstablishmentComponent } from './components/establishment/establishment.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthentificationGuard } from './guards/authentification/authentification-guard.guard';
import { DoctorGuard } from './guards/doctor/doctorguard.guard';
import { EstablishmentGuard } from './guards/establishment/establishment-guard.guard';

const routes: Routes = [

  { path: '', component: AuthentificationComponent, canActivate: [AuthentificationGuard] },
  { path: 'doctor', component: DoctorComponent, canActivate: [DoctorGuard] },
  { path: 'establishment', component: EstablishmentComponent, canActivate: [EstablishmentGuard] },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthentificationGuard, DoctorGuard, EstablishmentGuard]
})
export class AppRoutingModule { }
