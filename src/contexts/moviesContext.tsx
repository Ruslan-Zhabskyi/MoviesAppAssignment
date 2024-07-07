import React, { useState, useCallback } from "react";
import { BaseMovieProps, Review, BaseFantasyMovieProps } from "../types/interfaces";

interface MovieContextInterface {
    favourites: number[];
    addToFavourites: ((movie: BaseMovieProps) => void);
    removeFromFavourites: ((movie: BaseMovieProps) => void);
    addReview: ((movie: BaseMovieProps, review: Review) => void);  // NEW
    watchLater: number[];
    addToWatchLater: ((movie: BaseMovieProps) => void);
    removeFromWatchLater: ((movie: BaseMovieProps) => void);
    addFantasyMovie: ((fantacy: BaseFantasyMovieProps) => void);
}
const initialContextState: MovieContextInterface = {
    favourites: [],
    addToFavourites: () => {},
    removeFromFavourites: () => {},
    addReview: (movie, review) => { movie.id, review},  // NEW
    watchLater: [],
    addToWatchLater: () => {},
    removeFromWatchLater: () => {},
    addFantasyMovie: (fantasy) => {fantasy},  //
};

export const MoviesContext = React.createContext<MovieContextInterface>(initialContextState);

const MoviesContextProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
    const [favourites, setFavourites] = useState<number[]>([]);
    const [watchLater, setWatchLater] = useState<number[]>([]);
    const [myReviews, setMyReviews] = useState<Review[]>( [] );  // NEW
    const [myFantasy, setMyFantasy] = useState<BaseFantasyMovieProps[]>( [] );  // NEW
    const addToFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => {
            if (!prevFavourites.includes(movie.id)) {
                return [...prevFavourites, movie.id];
            }
            return prevFavourites;
        });
    }, []);

        const addToWatchLater = useCallback((movie: BaseMovieProps) => {
            setWatchLater((prevWatchLater) => {
                if (!prevWatchLater.includes(movie.id)) {
                    const newWatchLater = [...prevWatchLater, movie.id];
                    console.log("Updated watchLater:", newWatchLater);
                    return [...prevWatchLater, movie.id];
                }
                return prevWatchLater;
            });
    }, []);

    const removeFromWatchLater = useCallback((movie: BaseMovieProps) => {
        setWatchLater((prevWatchLater) => prevWatchLater.filter((mId) => mId !== movie.id));
    }, []);

    const removeFromFavourites = useCallback((movie: BaseMovieProps) => {
        setFavourites((prevFavourites) => prevFavourites.filter((mId) => mId !== movie.id));
    }, []);

    const addReview = (movie:BaseMovieProps, review: Review) => {   // NEW
        setMyReviews( {...myReviews, [movie.id]: review } )
    };

    const addFantasyMovie = (fantasy: BaseFantasyMovieProps) => {   // NEW
        setMyFantasy( {...myFantasy, id: fantasy } )
    };

    return (
        <MoviesContext.Provider
            value={{
                favourites,
                addToFavourites,
                removeFromFavourites,
                addReview,    // NEW
                watchLater,
                addToWatchLater,
                removeFromWatchLater,
                addFantasyMovie,
            }}
        >
            {children}
        </MoviesContext.Provider>
    );
};

export default MoviesContextProvider;