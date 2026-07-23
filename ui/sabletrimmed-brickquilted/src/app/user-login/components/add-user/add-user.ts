import { Component } from '@angular/core';

@Component({
  standalone: false, // this is now required when using NgModule
  selector: 'app-add-user',
  templateUrl: './add-user.html',
  styleUrl: './add-user.scss',
})
export class AddUser {}
