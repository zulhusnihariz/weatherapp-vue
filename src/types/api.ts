export type ApiResponse<T> = {
  data: T
  error?: Error
}

export interface OpenWeatherQuery {
  id?: string
  lat?: number
  lon?: number
  q?: string
  units?: 'standard' | 'metric' | 'imperial'
  lang?: string
  cnt?: number
  mode?: 'json' | 'xml'
}

export type RestCountriesResponse = {
  name: {
    common: string;
    official: string;
    nativeName: {
      eng: {
        official: string;
        common: string;
      };
      msa: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    MYR: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  region: string;
  subregion: string;
  languages: {
    eng: string;
    msa: string;
  };
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  latlng: number[];
  landlocked: boolean;
  borders: string[];
  area: number;
  demonyms: {
    eng: {
      f: string;
      m: string;
    };
    fra: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps?: string;
    openStreetMaps?: string;
  };
  population: number;
  gini?: {
    [key: number]: number; // year as key and Gini coefficient as value
  };
  fifa?: string; // FIFA code
  car?: {
    signs?: string[];
    side?: string; // "left" or "right"
  };
  timezones?: string[];
  continents?: string[];
  flags?: {
    png?: string; // PNG URL for flag
    svg?: string; // SVG URL for flag
    alt?: string; // Description of the flag
  };
  coatOfArms?: {
    png?: string; // PNG URL for coat of arms
    svg?: string; // SVG URL for coat of arms
  };
  startOfWeek?: string; // e.g., "sunday"
  capitalInfo?: {
    latlng?: number[];
  };
  postalCode?: {
    format?: string; // e.g., "#####"
    regex?: string; // Regex pattern for postal code
  };
};
