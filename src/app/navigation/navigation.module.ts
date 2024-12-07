import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';
import {
  NbActionsModule, NbAlertModule, NbButtonModule, NbCardModule,
  NbContextMenuModule,
  NbIconModule,
  NbLayoutModule, NbMenuModule,
  NbSelectModule, NbSidebarModule,
  NbUserModule
} from "@nebular/theme";
import {RouterLink, RouterOutlet} from "@angular/router";
import { LoginComponent } from './login/login.component';



@NgModule({
  declarations: [
    ToolbarComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    NbLayoutModule,
    NbIconModule,
    NbSelectModule,
    NbActionsModule,
    NbContextMenuModule,
    NbUserModule,
    NbSidebarModule,
    NbMenuModule,
    RouterOutlet,
    NbAlertModule,
    NbCardModule,
    NbButtonModule,
    RouterLink
  ]
})
export class NavigationModule { }
