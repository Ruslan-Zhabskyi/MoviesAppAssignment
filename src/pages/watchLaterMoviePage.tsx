import React, { useContext } from "react";

import PageTemplate from "../components/templateMovieListPage";
import { MoviesContext } from "../contexts/moviesContext";
import { useQueries } from "react-query";
import { getMovie } from "../api/tmdb-api";
import Spinner from "../components/spinner";
import useFiltering from "../hooks/useFiltering";
import MovieFilterUI, {
    titleFilter,
    genreFilter,
} from "../components/movieFilterUI";
import RemoveFromWatchLater from "../components/cardIcons/removeFromWatchList";
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

const WatchLaterMoviePage: React.FC = () => {
    const { language } = useContext(LanguageContext);
    const { watchLater: movieIds } = useContext(MoviesContext);
    const { filterValues, setFilterValues, filterFunction } = useFiltering(
        [titleFiltering, genreFiltering]
    );

    // Create an array of queries and run them in parallel.
    const watchLaterMovieQueries = useQueries(
        movieIds.map((movieId) => {
            return {
                queryKey: ["movie", movieId, language],
                queryFn: () => getMovie(movieId.toString(), language),
            };
        })
    );

    // Check if any of the parallel queries is still loading.
    const isLoading = watchLaterMovieQueries.find((m) => m.isLoading === true);

    if (isLoading) {
        return <Spinner />;
    }

    const allWatchLater = watchLaterMovieQueries.map((q) => q.data);
    const displayedMovies = allWatchLater
        ? filterFunction(allWatchLater)
        : [];

    const changeFilterValues = (type: string, value: string) => {
        const changedFilter = { name: type, value: value };
        const updatedFilterSet =
            type === "title" ? [changedFilter, filterValues[1]] : [filterValues[0], changedFilter];
        setFilterValues(updatedFilterSet);
    };

    const toDo = () => true;

    return (
        <>
            <PageTemplate
                title="Watch Later Movies"
                movies={displayedMovies}
                action={(movie) => {
                    return (
                        <>
                            <RemoveFromWatchLater {...movie} />
                        </>
                    );
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

export default WatchLaterMoviePage;