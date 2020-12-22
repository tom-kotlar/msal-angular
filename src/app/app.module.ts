import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from "../app/shared/material/material.module";
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { HomeComponent } from './home/home.component';
import { AlertsComponent } from './alerts/alerts.component';

import { MsalModule } from '@azure/msal-angular';
import { OAuthSettings } from '../oauth';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    HomeComponent,
    AlertsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule, 
    MsalModule.forRoot({
      auth: {
        clientId: OAuthSettings.appId,
        redirectUri: OAuthSettings.redirectUri
      }
    })

  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
