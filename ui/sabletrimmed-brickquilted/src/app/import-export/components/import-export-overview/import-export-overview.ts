import { Component, OnInit, inject } from '@angular/core';
import { LoggedInService } from './../../../shared/services/logged-in-service';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-import-export-overview',
  templateUrl: './import-export-overview.html',
  styleUrl: './import-export-overview.scss',
})
export class ImportExportOverview implements OnInit {
  //private router = inject(Router);

  private loggedInService = inject(LoggedInService);
  public user: string = '';

  ngOnInit() {
    this.loggedInService.castUser.subscribe((data) => {
      console.log('ImportExportOverview: user name changed to', data);
      this.user = data;
    });
  }
}
