import React, {useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import {getTrendingTVSecondPaginated} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import {BaseTVProps, DiscoverMovies, DiscoverTV} from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';

const titleFiltering = {
    name: "title",
    value: "",
    condition: titleFilter,
};
const genreFiltering = {
    name: "genre",
    value: "0",
    condition: genreFilter,
};

const TvSeriesPage: React.FC = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["tv series", currentPage],
        () => getTrendingTVSecondPaginated({ page: currentPage }),
        { keepPreviousData: true }
    );

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

    const tv = data ? data.results : [];
    const displayedTV = filterFunction(tv);
    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };

    return (
        <>
            <PageTemplate
                title="Trending TV Series"
                onBack={handlePrevPage}
                onForward={handleNextPage}
                movies={displayedTV}
                action={(tv: BaseTVProps) => {
                    return <AddToFavouritesIcon {...tv} />
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
export default TvSeriesPage;