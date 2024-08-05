import React, { useContext } from "react";
import RemoveFromFavouritePeople from "../components/cardIcons/removeFromFavouritePeople"; // NEED TO ADD FEATURE
import PageTemplate from "../components/templatePeopleListPage";
import { PeopleContext } from "../contexts/peopleContext";
import { useQueries } from "react-query";
import { getPerson } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import UserFilterUI, {
    nameFilter
} from "../components/userFilterUI";
import {LanguageContext} from "../contexts/languageContext.tsx";

const nameFiltering = {
    name: "name",
    value: "",
    condition: nameFilter,
};

const FavouritePeoplePage: React.FC = () => {
    const { language } = useContext(LanguageContext);
    const { favouritePeople: peopleIds } = useContext(PeopleContext);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [nameFiltering]
    );

    // Create an array of queries and run them in parallel.
    const favouritePeopleQueries = useQueries(
        peopleIds.map((personId) => {
            return {
                queryKey: ["person", personId, language],
                queryFn: () => getPerson(personId.toString(), language),
            };
        })
    );

    // Check if any of the parallel queries is still loading.
    const isLoading = favouritePeopleQueries.find((p) => p.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const allFavouritePeople = favouritePeopleQueries.map((q) => q.data);
    const displayedPeople = allFavouritePeople
        ? filterFunction(allFavouritePeople)
        : [];

    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "name"
                ? [changedFilter, filterValues[1]]
                : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    return (
        <>
            <PageTemplate
                name="Favourite Actors"
                people={displayedPeople}
                action={(person) => {
                    return (
                        <>
                            <RemoveFromFavouritePeople {...person} />
                        </>
                    );
                }}
            />
            <UserFilterUI
                onFilterValuesChange={changeFilterValues}
                nameFilter={filterValues[0].value}
            />
        </>
    );
};

export default FavouritePeoplePage;