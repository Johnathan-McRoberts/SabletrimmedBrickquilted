import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MainToolbar } from './components/main-toolbar/main-toolbar';
import { LoggedInService } from './services/logged-in-service';

@NgModule({
  imports: [CommonModule],
  declarations: [MainToolbar],
  exports:
    [
      MainToolbar
    ],
  providers: [LoggedInService]
})
export class SharedModule {}
