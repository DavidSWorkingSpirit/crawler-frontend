import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule, MatIconModule, MatToolbarModule, MatButtonModule, MatFormFieldModule, MatInputModule, MatPaginatorModule, MatDialogModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { InlogComponent } from './inlog/inlog.component';
import { ZoekschermComponent } from './zoekscherm/zoekscherm.component';
import { JwtModule, JWT_OPTIONS } from '@auth0/angular-jwt';
import { TokenService } from './services/token.service';
import { environment } from 'src/environments/environment';
import { AutorisatieInterceptor } from './Interceptor/AuthorisatieInterceptor';
import { AccountManagerComponent } from './account-manager/account-manager.component';
import { AdminComponent } from './admin/admin.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { AccountHomeComponent } from './account-manager/account-home/account-home.component';
import { MatSnackBarModule, MatTableModule, MatSelectModule } from '@angular/material';
import { AdminHomeComponent } from './admin/admin-home/admin-home.component';
import { MatTabsModule } from '@angular/material/tabs';
import { GebruikersComponent } from './admin/gebruikers/gebruikers.component';
import { WebsitesComponent } from './admin/websites/websites.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { NieuweVacatureComponent } from './account-manager/nieuwe-vacature/nieuwe-vacature.component';
import { VacatureTabelComponent } from './account-manager/vacature-tabel/vacature-tabel.component';
import { WebsiteDeleteDialogComponent } from './dialog/website-delete-dialog/website-delete-dialog.component';
import { GebruikerDeleteDialogComponent } from './dialog/gebruiker-delete-dialog/gebruiker-delete-dialog.component';
import { ZoektermComponent } from './admin/zoekterm/zoekterm.component';
import { ZoektermDeleteDialogComponent } from './dialog/zoekterm-delete-dialog/zoekterm-delete-dialog.component';


export function jwtOptionsFactory(tokenService: TokenService) {
  return {
    tokenGetter: () => {
      return tokenService.getBearerToken();
    },
    whitelistedDomains: [environment.apiUrl],
    blacklistedRoutes: [environment.apiUrl + '/oauth/token'],
    headerName: 'Authorization',
    authScheme: 'Bearer ',
    throwNoTokenError: true,
    skipWhenExpired: true
  }
}

@NgModule({
  declarations: [
    AppComponent,
    InlogComponent,
    ZoekschermComponent,
    AccountManagerComponent,
    AdminComponent,
    NavBarComponent,
    AccountHomeComponent,
    AdminHomeComponent,
    GebruikersComponent,
    WebsitesComponent,
    NieuweVacatureComponent,
    VacatureTabelComponent,
    WebsiteDeleteDialogComponent,
    GebruikerDeleteDialogComponent,
    ZoektermComponent,
    ZoektermDeleteDialogComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    ReactiveFormsModule,
    MatProgressSpinnerModule,
    HttpClientModule,
    JwtModule.forRoot({
      jwtOptionsProvider: {
        provide: JWT_OPTIONS,
        useFactory: jwtOptionsFactory,
        deps: [TokenService]
      }
    }),
    MatSnackBarModule,
    MatTabsModule,
    MatTableModule,
    FlexLayoutModule,
    MatPaginatorModule,
    MatDialogModule,
    MatSelectModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AutorisatieInterceptor, multi: true },

  ],
  bootstrap: [AppComponent],
  entryComponents: [WebsiteDeleteDialogComponent, GebruikerDeleteDialogComponent, ZoektermDeleteDialogComponent]
})
export class AppModule { }
