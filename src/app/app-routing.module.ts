import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./navigation/login/login.component";
import {CountriesModeComponent} from "./countries-mode/countries-mode/countries-mode.component";
import {ToolbarComponent} from "./navigation/toolbar/toolbar.component";

const routes: Routes = [
  {
    path: '',
    component: LoginComponent,
    title: 'Вход'
  },
  {
    path: 'logout',
    component: LoginComponent,
    title: 'Вход'
  },
  {
    path: 'all-countries',
    component: ToolbarComponent,
    children: [
      {
        path: '',
        component: CountriesModeComponent,
        title: 'Всички държави'
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
