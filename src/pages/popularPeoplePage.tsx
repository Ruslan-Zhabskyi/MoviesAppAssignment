import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import {getPeople} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import UserFilterUI, {
    nameFilter, popularityFilter, genderFilter
} from "../components/userFilterUI";
import {BasePeopleProps, DiscoverPeople} from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritePeople.tsx";


const nameFiltering = {
    name: "name",
    value: "",
    condition: nameFilter,
};
const popularityFiltering = {
    name: "popularity",
    value: "",
    condition: popularityFilter,
};
const genderFiltering = {
    name: "gender",
    value: "",
    condition: genderFilter,
};

const PopularPeoplePage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>("popular", getPeople);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [nameFiltering, popularityFiltering]
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    const changeFilterValues = (type: string | number, value: string | number) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "name"
                ? [changedFilter, filterValues[1]]
                : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    const people = data ? data.results : [];
    const displayedPeople = filterFunction(people);

    return (
        <>

            <PageTemplate
                name="Popular Actors"
                people={displayedPeople}
                action={(person: BasePeopleProps) => {
                    return <AddToFavouritesIcon {...person} />
                }}
            />
                <UserFilterUI
                onFilterValuesChange={changeFilterValues}
                nameFilter={filterValues[0].value}
                popularityFilter={filterValues[1].value}
            />
        </>
    );
};
export default PopularPeoplePage;