import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import {Country} from "../../../models/countries.model";

@Component({
  selector: 'app-countries-mode',
  templateUrl: './countries-mode.component.html',
  styleUrls: ['./countries-mode.component.css']
})
export class CountriesModeComponent implements OnInit {

  currentInput: string = ''; // Input value
  dataSource: MatTableDataSource<Country> = new MatTableDataSource<Country>([]); // Table data source
  displayedColumns: string[] = ['number', 'country', 'capital', 'continent']; // Table columns
  countries: Country[] = []; // List of countries from JSON

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    // Load the countries data from the JSON file
    this.http.get<Country[]>('assets/data/countries.json').subscribe((data) => {
      this.countries = data;
    });
  }

  addCountry(): void {
    const trimmedInput = this.currentInput.trim();
    if (!trimmedInput) return;

    const matchedCountry = this.countries.find(country => country.country === trimmedInput);

    if (matchedCountry) {
      const tableData = this.dataSource.data;
      if (!tableData.some(entry => entry.country === matchedCountry.country)) {
        this.dataSource.data = [...tableData, {
          ...matchedCountry,
          number: tableData.length + 1 // Dynamically add 'number'
        }];
      }
    }

    this.currentInput = ''; // Clear input field
  }

}
