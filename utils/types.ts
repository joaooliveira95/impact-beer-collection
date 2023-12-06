interface Temp {
    temp: {
      value: number;
      unit: string;
    };
    duration: number;
  }
  
  interface Volume {
    value: number;
    unit: string;
  }
  
  interface Method {
    mash_temp: Temp[];
    fermentation?: {
      temp: {
        value: number;
        unit: string;
      };
    };
    twist?: string;  // Example: Additional flavor twist
  }
  
  interface Ingredients {
    malt: {
      name: string;
      amount: Volume;
    }[];
    hops: {
      name: string;
      amount: Volume;
      add: string;
      attribute: string;
    }[];
    yeast: string;
  }
  
  export interface Beer {
    id: number;
    name: string;
    tagline: string;
    first_brewed: string;
    description: string;
    image_url: string;
    abv: number;
    ibu: number;
    target_fg: number;
    target_og: number;
    ebc: number;
    srm: number;
    ph: number;
    attenuation_level: number;
    volume: Volume;
    boil_volume: Volume;
    method: Method;
    ingredients: Ingredients;
    food_pairing: string[];
    brewers_tips: string;
    contributed_by: string;
  }
  