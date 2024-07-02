import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import {getPeople} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import {BasePeopleProps, DiscoverPeople} from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToWatchListIcon from '../components/cardIcons/addToWatchList';

const titleFiltering = {
    name: "name",
    value: "",
    condition: titleFilter,
};
const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
};

const PopularPeoplePage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>("popular", getPeople);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [titleFiltering, genreFiltering]
    );

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        return <h1>{error.message}</h1>;
    }


    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "title"
                ? [changedFilter, filterValues[1]]
                : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    const people = data ? data.results : [];
    const displayedPeople = filterFunction(people);

    // Redundant, but necessary to avoid app crashing.
    //const favourites = movies.filter(m => m.favourite)
    //localStorage.setItem("favourites", JSON.stringify(favourites));
    //const addToFavourites = (movieId: number) => true;

    return (
        <>
            <PageTemplate
                title="Popular People"
                people={displayedPeople}
                action={(person: BasePeopleProps) => {
                    return <AddToWatchListIcon {...person} />
                }}
            />
            <MovieFilterUI
                onFilterValuesChange={changeFilterValues}
                titleFilter={filterValues[0].value}
                genreFilter={filterValues[1].value}
            />
        </>
    );
};
export default PopularPeoplePage;