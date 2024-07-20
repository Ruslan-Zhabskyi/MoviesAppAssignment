import React, { useState, useCallback } from "react";
import { BasePeopleProps } from "../types/interfaces";

interface PeopleContextInterface {
    favourites: number[];
    addToFavourites: ((person: BasePeopleProps) => void);
    removeFromFavourites: ((person: BasePeopleProps) => void);
}
const initialContextState: PeopleContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
};

export const PeopleContext = React.createContext<PeopleContextInterface>(initialContextState);

const PeopleContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const addToFavourites = useCallback((person: BasePeopleProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(person.id)) {
                return [...prevFavourites, person.id];
            }
            return prevFavourites;
        });
    }, []);

    const removeFromFavourites = useCallback((person: BasePeopleProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== person.id));
    }, []);

    return (
        <PeopleContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
            }}
        >
            {children}
        </PeopleContext.Provider>
    );
};

export default PeopleContextProvider;