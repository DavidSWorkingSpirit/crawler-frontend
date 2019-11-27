import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InlogComponent } from './inlog/inlog.component';
import { ZoekschermComponent } from './zoekscherm/zoekscherm.component';
import { AdminAutorisatieGuard } from './guards/adminautorisatie.guard';
import { AccountmanagerAutorisatieGuard } from './guards/accountmanagerautorisatie.guard';
import { AdminComponent } from './admin/admin.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { AccountHomeComponent } from './account-manager/account-home/account-home.component';

const routes: Routes = [
  { path: 'inloggen', component: InlogComponent },
  { path: '' , component: AdminComponent, canActivate: [AdminAutorisatieGuard],
      children: [
        { path: 'vacaturezoeken', component: ZoekschermComponent, canActivate: [AdminAutorisatieGuard] },
     ]},
  { path: '', component: AccountManagerComponent, canActivate: [AccountmanagerAutorisatieGuard],
      children: [
        { path: 'accountmanager', component: AccountHomeComponent, canActivate: [AccountmanagerAutorisatieGuard] },

    ]},
  
  { path: '', redirectTo: '/inloggen', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
