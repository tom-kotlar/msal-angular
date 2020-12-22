import { Injectable } from '@angular/core';
import { MsalService } from '@azure/msal-angular';
import { AlertsService } from './alerts.service';
import { User } from './models/user';
import { OAuthSettings } from "src/oauth";

import { Client } from '@microsoft/microsoft-graph-client';
import * as MicrosoftGraph from '@microsoft/microsoft-graph-types';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public authenticated: boolean;
  public user: User;

  constructor(
    private msalService: MsalService,
    private alertsService: AlertsService) {

    // this.authenticated = false;
    // this.user = null;
    this.authenticated = this.msalService.getAccount() != null;
    this.getUser().then((user) => {this.user = user});
  }

  // Prompt the user to sign in and
  // grant consent to the requested permission scopes
  async signIn(): Promise<void> {
    let result = await this.msalService.loginPopup(OAuthSettings)
      .catch((reason) => {
        this.alertsService.addError('Login failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      this.authenticated = true;
      // Temporary placeholder
      // this.user = new User();
      // this.user.displayName = 'Adele Vance';
      // this.user.email = 'AdeleV@contoso.com';
      // this.user.avatar = '/assets/no-profile-photo.png';
      this.user = await this.getUser();
    }
  }

  // Sign out
  signOut(): void {
    this.msalService.logout();
    this.user = null;
    this.authenticated = false;
  }

  // Silently request an access token
  async getAccessToken(): Promise<string> {
    let result = await this.msalService.acquireTokenSilent(OAuthSettings)
      .catch((reason) => {
        this.alertsService.addError('Get token failed', JSON.stringify(reason, null, 2));
      });

    if (result) {
      // Temporary to display token in an error box
      // this.alertsService.addSuccess('Token acquired', result.accessToken);
      return result.accessToken;
    }

    // Couldn't get a token
    this.authenticated = false;
    return null;
  }

  private async getUser(): Promise<User> {
    if (!this.authenticated) return null;
  
    let graphClient = Client.init({
      // Initialize the Graph client with an auth
      // provider that requests the token from the
      // auth service
      authProvider: async(done) => {
        let token = await this.getAccessToken()
          .catch((reason) => {
            done(reason, null);
          });
  
        if (token)
        {
          done(null, token);
        } else {
          done("Could not get an access token", null);
        }
      }
    });
  
    // Get the user from Graph (GET /me)
    let graphUser: MicrosoftGraph.User = await graphClient
      .api('/me')
      .select('displayName,mail,mailboxSettings,userPrincipalName')
      .get();
      console.log(graphUser, "-----")
    let user = new User();
    user.displayName = graphUser.displayName;
    // Prefer the mail property, but fall back to userPrincipalName
    user.email = graphUser.mail || graphUser.userPrincipalName;
    user.timeZone = graphUser.mailboxSettings.timeZone;
  
    // Use default avatar
    user.avatar = '/assets/no-profile-photo.png'
    return user;
  }
}
