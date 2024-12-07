export interface Country {
  id: number;
  country: string;
  capital: string;
  continent: string;
  number?: number; // Add the 'number' property as optional
  alternatives?: string[];
}
