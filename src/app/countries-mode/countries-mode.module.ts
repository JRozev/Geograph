import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CountriesModeComponent } from './countries-mode/countries-mode.component';
import {NbButtonModule, NbCardModule, NbFormFieldModule, NbInputModule} from "@nebular/theme";
import {MatTableModule} from "@angular/material/table";
import {FormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    CountriesModeComponent
  ],
  imports: [
    CommonModule,
    NbCardModule,
    NbInputModule,
    NbButtonModule,
    MatTableModule,
    FormsModule,
    NbFormFieldModule
  ]
})
export class CountriesModeModule { }
