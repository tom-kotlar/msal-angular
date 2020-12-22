import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  // Is a user logged in?
  get authenticated(): boolean {
    return this.authService.authenticated;
  }
  // The user
  get user(): User {
    return this.authService.user;
  }

  constructor(private authService: AuthService) { }

  ngOnInit() {}

  async signIn(): Promise<void> {
    await this.authService.signIn();

    // Temporary to display the token
    // if (this.authService.authenticated) {
    //   let token = await this.authService.getAccessToken();
    // }
  }
}
