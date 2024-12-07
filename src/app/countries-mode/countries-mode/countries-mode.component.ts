import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from "@angular/material/table";
import { HttpClient } from "@angular/common/http";
import { Country } from "../../models/countries.model";
import {DataStorageService} from "../../service/data-storage.service";

@Component({
  selector: 'app-countries-mode',
  templateUrl: './countries-mode.component.html',
  styleUrls: ['./countries-mode.component.css']
})
export class CountriesModeComponent implements OnInit {

  currentInput: string = ''; // Input value
  dataSource: MatTableDataSource<Country> = new MatTableDataSource<Country>([]); // Table data source
  displayedColumns: string[] = ['id', 'country', 'capital', 'continent']; // Table columns
  countries: Country[] = []; // List of countries from JSON
  countryNotFound: boolean = false;
  totalCountries: number = 195; // Total number of countries
  enteredCountriesCount: number = 0; // Counter for entered countries

  constructor(private http: HttpClient, private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    // Load the countries data from the JSON file
    this.dataStorageService.getCountries().subscribe((data) => {
      this.countries = data;

      // Initialize table with all 195 rows based on countries.json
      const initialData: Country[] = Array.from({ length: this.totalCountries }, (_, i) => ({
        id: i + 1,
        country: '',
        capital: '',
        continent: '',
      }));
      this.dataSource.data = initialData;
    });
  }

  addCountry(): void {
    const trimmedInput = this.currentInput.trim();
    if (!trimmedInput) return;

    const matchedCountry = this.countries.find(country => country.country.toLowerCase() === trimmedInput.toLowerCase());

    if (matchedCountry) {
      const tableData = this.dataSource.data;

      // Find the row by country id (0-based index)
      const rowIndex = matchedCountry.id - 1;

      // Update the corresponding row in the table
      tableData[rowIndex] = {
        id: matchedCountry.id,
        country: matchedCountry.country,
        capital: matchedCountry.capital,
        continent: matchedCountry.continent
      };

      // Update the data source
      this.dataSource.data = [...tableData];

      this.enteredCountriesCount++; // Increment the entered countries counter
      this.countryNotFound = false; // Reset the not-found flag
    } else {
      this.countryNotFound = true; // Set the not-found flag
    }

    this.currentInput = ''; // Clear input field
  }
}
