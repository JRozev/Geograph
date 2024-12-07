import {Component, OnInit} from '@angular/core';
import {MatTableDataSource} from "@angular/material/table";
import {Country} from "../../models/countries.model";
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
  countryAlreadyAdded: string | null = null; // Holds the name of a duplicate country
  totalCountries: number = 197; // Total number of countries
  enteredCountriesCount: number = 0; // Counter for entered countries
  showGreenBorder: boolean = false; // Flag to show green border temporarily

  constructor(private dataStorageService: DataStorageService) {}

  ngOnInit(): void {
    // Load the countries data from the JSON file
    this.dataStorageService.getCountriesBg().subscribe((data) => {
      this.countries = data;

      // Initialize table with all 195 rows based on countries-en.json
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
    const trimmedInput = this.currentInput.trim().toLowerCase();
    if (!trimmedInput) return;

    // Find a match in the country name or its alternatives
    const matchedCountry = this.countries.find(country => {
      const countryNames = [country.country.toLowerCase(), ...(country.alternatives?.map(a => a.toLowerCase()) || [])];
      return countryNames.includes(trimmedInput);
    });

    if (matchedCountry) {
      const tableData = this.dataSource.data;

      // Check if the country is already added
      const isAlreadyAdded = tableData.some(row => row.country.toLowerCase() === matchedCountry.country.toLowerCase());

      if (isAlreadyAdded) {
        this.countryAlreadyAdded = matchedCountry.country; // Set the duplicate country message
        this.countryNotFound = false; // Reset the not-found flag
      } else {
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
        this.countryAlreadyAdded = null; // Reset the duplicate country message
        this.countryNotFound = false; // Reset the not-found flag
      }
    } else {
      this.countryNotFound = true; // Set the not-found flag
      this.countryAlreadyAdded = null; // Reset the duplicate country message
    }

    this.currentInput = ''; // Clear input field
  }
}
