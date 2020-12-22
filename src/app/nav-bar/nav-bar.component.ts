import { Component, OnInit } from '@angular/core';
import { User } from '../models/user';
import { AuthService } from '../auth.service';


@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.scss']
})
export class NavBarComponent implements OnInit {
// Should the collapsed nav show?
showNav: boolean;
// Is a user logged in?
get authenticated(): boolean {
  return this.authService.authenticated;
}
// The user
get user(): User {
  return this.authService.user;
}

constructor(private authService: AuthService) { }

ngOnInit() {
  this.showNav = false;
}

// Used for navbar-toggler button to hide/show
// the nav in a collapsed state
toggleNavBar(): void {
  this.showNav = !this.showNav;
}

async signIn(): Promise<void> {
  await this.authService.signIn();
}

signOut(): void {
  this.authService.signOut();
}

}
