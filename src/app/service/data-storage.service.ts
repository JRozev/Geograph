import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Country} from "../models/countries.model";
import {Injectable} from "@angular/core";

@Injectable({providedIn: "root"})

export class DataStorageService {

  constructor(private http: HttpClient) {
  }

  getCountries(): Observable<Country[]> {
    return this.http.get<Country[]>('assets/data/countries.json');
  }

}
