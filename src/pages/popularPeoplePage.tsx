import React from "react";
import PageTemplate from "../components/templatePeopleListPage";
import { getPeople } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import UserFilterUI from "../components/userFilterUI";
import { nameFilter, popularityFilter, genderFilter } from "../components/userFilterUI";
import { BasePeopleProps, DiscoverPeople } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritePeople";

const PopularPeoplePage: React.FC = () => {
    const { data, error, isLoading, isError } = useQuery<DiscoverPeople, Error>("popular", getPeople);
    const { filterValues, setFilterValues, filterFunction } = useFiltering([
        { name: "name", value: "", condition: nameFilter },
        { name: "popularity", value: "", condition: popularityFilter },
        { name: "gender", value: "", condition: genderFilter },
    ]);

    if (isLoading) {
        return <Spinner />;
    }

    if (isError) {
        console.error("Error fetching people:", error);
        return <h1>{error.message}</h1>;
    }

    const changeFilterValues = (type: string, value: string | number) => {
        try {
            const updatedFilterSet = filterValues.map(filter =>
                filter.name === type ? { ...filter, value: value } : filter
            );
            setFilterValues(updatedFilterSet);
        } catch (error) {
            console.error("Error updating filter values:", error);
        }
    };

    let displayedPeople = [];
    try {
        displayedPeople = filterFunction(data ? data.results : []);
    } catch (error) {
        console.error("Error applying filters:", error);
    }

    return (
        <>
            <PageTemplate
                name="Popular Actors"
                people={displayedPeople}
                action={(person: BasePeopleProps) => <AddToFavouritesIcon {...person} />}
            />
            <UserFilterUI
                onFilterValuesChange={changeFilterValues}
                nameFilter={filterValues.find(f => f.name === "name")?.value || ""}
                popularityFilter={filterValues.find(f => f.name === "popularity")?.value || ""}
                genderFilter={filterValues.find(f => f.name === "gender")?.value || ""}
            />
        </>
    );
};

export default PopularPeoplePage;