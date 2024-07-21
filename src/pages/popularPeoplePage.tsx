import React, {useState} from "react";
import PageTemplate from "../components/templatePeopleListPage";
import {getPeoplePaginated} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import UserFilterUI from "../components/userFilterUI";
import { nameFilter, popularityFilter, genderFilter } from "../components/userFilterUI";
import {BasePeopleProps, DiscoverMovies, DiscoverPeople} from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from "../components/cardIcons/addToFavouritePeople";

const PopularPeoplePage: React.FC = () => {

    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["popular", currentPage],
        () => getPeoplePaginated({ page: currentPage }),
        { keepPreviousData: true }
    );

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

    const handlePrevPage = () => {
        setCurrentPage(old => Math.max(old - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };


    return (
        <>
            <PageTemplate
                name="Popular Actors"
                onBack={handlePrevPage}
                onForward={handleNextPage}
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