import { Beer } from "./types";

const BASE_URL = "https://api.punkapi.com/v2";

export const fetchBeers = async (page?: number) => {
 // I couldnt find in documentation that it supports sort by, so at least sort by will just sort the first page
  const response = await fetch(`${BASE_URL}/beers?per_page=80&page=${page ?? 1}`);
  console.log("response", response)
  const data = await response.json();
  return data;
};

export const fetchBeerById = async (id: string) => {
  const response = await fetch(`${BASE_URL}/beers/${id}`);
  const data = await response.json();
  return data[0];
};

export const addBeer = async (beerData: any) => {
  // Implement the logic to add a new beer
};

export const fetchFilteredBeers = async (filters: Record<string, string>): Promise<Beer[]> => {
  try {
    // Construct the query string based on selected filters
    const queryString = Object.entries(filters)
      .filter(([key, value]) => value !== '')
      .map(([key, value]) => `${key}=${value}`)
      .join('&');

    // Make the API request with the constructed query string
    const response = await fetch(`${BASE_URL}/beers?${queryString}`);
    const data = await response.json();

    return data;
  } catch (error) {
    throw new Error("Error fetching filtered beers");
  }
};