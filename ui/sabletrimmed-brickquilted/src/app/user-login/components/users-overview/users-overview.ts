import { Component } from '@angular/core';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-users-overview',
  templateUrl: './users-overview.html',
  styleUrl: './users-overview.scss',
})
export class UsersOverview {}
