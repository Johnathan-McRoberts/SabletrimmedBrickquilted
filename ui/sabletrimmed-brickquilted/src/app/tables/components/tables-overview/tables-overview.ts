import { Component } from '@angular/core';

@Component({
  standalone: false,  // this is now required when using NgModule
  selector: 'app-tables-overview',
  templateUrl: './tables-overview.html',
  styleUrl: './tables-overview.scss',
})
export class TablesOverview {}
