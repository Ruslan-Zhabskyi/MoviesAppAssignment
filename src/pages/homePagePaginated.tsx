import React, { useState, useContext, useEffect } from "react";
import PageTemplate from "../components/templateMovieListPage";
import { getMoviesPaginated } from "../api/tmdb-api";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import { BaseMovieProps, DiscoverMovies } from "../types/interfaces";
import { useQuery } from "react-query";
import Spinner from "../components/spinner";
import AddToFavouritesIcon from '../components/cardIcons/addToFavourites';
import { LanguageContext } from "../contexts/languageContext";

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

const HomePage: React.FC = () => {
    const { language } = useContext(LanguageContext);
    const [currentPage, setCurrentPage] = useState(1);

    const { data, error, isLoading, isError } = useQuery<DiscoverMovies, Error>(
        ["discover", currentPage, language],  // Include language in the query key
        () => getMoviesPaginated({ page: currentPage, language }),
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
                title="Discover Movies"
                onBack={handlePrevPage}
                onForward={handleNextPage}
                movies={displayedMovies}
                action={(movie: BaseMovieProps) => {
                    return <AddToFavouritesIcon {...movie} />
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

export default HomePage;