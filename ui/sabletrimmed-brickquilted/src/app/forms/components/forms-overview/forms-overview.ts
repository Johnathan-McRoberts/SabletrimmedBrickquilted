import { Component, OnInit, inject } from '@angular/core';
import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-forms-overview',
  templateUrl: './forms-overview.html',
  styleUrl: './forms-overview.scss',
})
export class FormsOverview implements OnInit {
  private loggedInService = inject(LoggedInService);
  public user = '';

  ngOnInit() {
    this.loggedInService.castUser.subscribe((data) => {
      console.log('FormsOverview: user name changed to', data);
      this.user = data;
    });
  }
}
