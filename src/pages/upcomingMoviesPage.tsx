import React, {useContext, useState} from "react";
import PageTemplate from "../components/templateMovieListPage";
import {getUpcomingMoviesPaginated} from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import {BaseMovieProps, DiscoverMovies} from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToWatchListIcon from '../components/cardIcons/addToWatchList';
import {LanguageContext} from "../contexts/languageContext.tsx";

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

const UpcomingMoviesPage: React.FC = () => {
    const { language } = useContext(LanguageContext);
    const [currentPage, setCurrentPage] = useState(1);
    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["upcoming", currentPage, language],
        () => getUpcomingMoviesPaginated({ page: currentPage, language}),
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

    const movies = data ? data.results : [];
    const displayedMovies = filterFunction(movies);
    const handlePrevPage = () => {
        setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
    };

    const handleNextPage = () => {
        setCurrentPage(currentPage + 1);
    };
    return (
        <>
            <PageTemplate
                title="Upcoming Movies"
                onBack={handlePrevPage}
                onForward={handleNextPage}
                movies={displayedMovies}
                action={(movie: BaseMovieProps) => {
                    return <AddToWatchListIcon {...movie} />
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
export default UpcomingMoviesPage;