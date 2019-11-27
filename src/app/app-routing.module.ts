import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { InlogComponent } from './inlog/inlog.component';
import { ZoekschermComponent } from './zoekscherm/zoekscherm.component';
import { AdminAutorisatieGuard } from './guards/adminautorisatie.guard';
import { AccountmanagerAutorisatieGuard } from './guards/accountmanagerautorisatie.guard';
import { AdminComponent } from './admin/admin.component';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { GebruikersComponent } from './admin/gebruikers/gebruikers.component';
import { WebsitesComponent } from './admin/websites/websites.component';

const routes: Routes = [
  { path: 'inloggen', component: InlogComponent },
  { path: '' , component: AdminComponent, canActivate: [AdminAutorisatieGuard],
    children: [
      { path: 'admin', component: AdminHomeComponent, canActivate: [AdminAutorisatieGuard],
        children: [
          { path: 'gebruikers', component: GebruikersComponent },
          { path: 'websites', component: WebsitesComponent }
        ]
      },
    ]
  },
  { path: '', component: AccountManagerComponent, canActivate: [AccountmanagerAutorisatieGuard],
    children: [
      { path: 'vacaturezoeken', component: ZoekschermComponent, canActivate: [AccountmanagerAutorisatieGuard] },
    ]
  },
  
  { path: '', redirectTo: '/inloggen', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
