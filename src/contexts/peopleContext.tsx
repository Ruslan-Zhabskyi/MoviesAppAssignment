import React, { useState, useCallback } from "react";
import { BasePeopleProps } from "../types/interfaces";

interface PeopleContextInterface {
    favouritePeople: number[];
    addToFavouritePeople: ((person: BasePeopleProps) => void);
    removeFromFavouritePeople: ((person: BasePeopleProps) => void);
}
const initialContextState: PeopleContextInterface = {
    favouritePeople: [],
    addToFavouritePeople: () => {},
    removeFromFavouritePeople: () => {},
};

export const PeopleContext = React.createContext<PeopleContextInterface>(initialContextState);

const PeopleContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favouritePeople, setFavouritePeople] = useState<number[]>([]);
    const addToFavouritePeople = useCallback((person: BasePeopleProps) => {
        setFavouritePeople((prevFavouritePeople) => {
            if (!prevFavouritePeople.includes(person.id)) {
                return [...prevFavouritePeople, person.id];
            }
            return prevFavouritePeople;
        });
    }, []);

    const removeFromFavouritePeople = useCallback((person: BasePeopleProps) => {
        setFavouritePeople((prevFavouritePeople) => prevFavouritePeople.filter((pId) => pId !== person.id));
    }, []);

    return (
        <PeopleContext.Provider
            value={{
                favouritePeople,
                addToFavouritePeople,
                removeFromFavouritePeople,
            }}
        >
            {children}
        </PeopleContext.Provider>
    );
};

export default PeopleContextProvider;