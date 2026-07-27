import { Component, OnInit, inject } from '@angular/core';
import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-charts-overview',
  templateUrl: './charts-overview.html',
  styleUrl: './charts-overview.scss',
})
export class ChartsOverview implements OnInit {
  private loggedInService = inject(LoggedInService);
  public user = '';

  ngOnInit() {
    this.loggedInService.castUser.subscribe((data) => {
      console.log('ChartsOverview: user name changed to', data);
      this.user = data;
    });
  }
}
