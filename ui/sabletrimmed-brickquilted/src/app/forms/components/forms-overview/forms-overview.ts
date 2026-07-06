import { Component, OnInit, inject } from '@angular/core';
import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-forms-overview',
  templateUrl: './forms-overview.html',
  styleUrl: './forms-overview.scss',
})
export class FormsOverview implements OnInit {
  //private router = inject(Router);

  private loggedInService = inject(LoggedInService);
  public user: string = '';

  //public get displayUser(): string {
  //  return this.user ? this.user : 'Guest';
  //}

  //public get isNotLoggedIn(): boolean {
  //  return this.user.length === 0 || this.user === 'Undefined';
  //}

  ngOnInit() {
    this.loggedInService.castUser.subscribe((data) => {
      console.log('FormsOverview: user name changed to', data);
      this.user = data;
    });
  }
}
