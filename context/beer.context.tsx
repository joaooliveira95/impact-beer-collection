import React, { createContext, useContext, useState, ReactNode } from "react";
import { Beer } from "@/utils/types"; // Adjust the import path as per your project structure

interface BeerContextProps {
  beers: Beer[];
  addBeer: (newBeer: Beer) => void;
  addBeers: (newBeers: Beer[]) => void;
  updateBeers: (newBeers: Beer[]) => void;
}

const BeerContext = createContext<BeerContextProps | undefined>(undefined);

export const BeerProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [beers, setBeers] = useState<Beer[]>([]);

  const addBeers = (newBeers: Beer[]) => {
    setBeers((prevBeers) => [...prevBeers, ...newBeers]);
  };

  const addBeer = (newBeer: Beer) => {
    setBeers((prevBeers) => [...prevBeers, newBeer]);
  };

  const updateBeers = (newBeers: Beer[]) => {
    setBeers(() => [...newBeers]);
  };

  return (
    <BeerContext.Provider value={{ beers, addBeers, addBeer, updateBeers }}>
      {children}
    </BeerContext.Provider>
  );
};

export const useBeerContext = () => {
  const context = useContext(BeerContext);
  if (!context) {
    throw new Error("useBeerContext must be used within a BeerProvider");
  }
  return context;
};
