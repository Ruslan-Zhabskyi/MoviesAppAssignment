import React from "react";
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Navigate, Routes } from "react-router-dom";
import HomePage from "./pages/homePage";
import MoviePage from "./pages/movieDetailsPage";
import FavouriteMoviesPage from "./pages/favouriteMoviesPage"; // NEW
import MovieReviewPage from "./pages/movieReviewPage";
import SiteHeader from './components/siteHeader';
import UpcomingMoviesPage from "./pages/upcomingMoviesPage";
import { QueryClientProvider, QueryClient } from "react-query";
import { ReactQueryDevtools } from 'react-query/devtools';
import MoviesContextProvider from "./contexts/moviesContext";
import AddMovieReviewPage from './pages/addMovieReviewPage';
import WatchLaterMoviePage from './pages/watchLaterMoviePage';
import PopularPeoplePage from './pages/popularPeoplePage';
import PopularMoviesPage from "./pages/popularMoviesPage";
import TvSeriesPage from "./pages/tvSeriesPage.tsx";
import PersonDetailsPage from "./pages/peopleDetailsPage.tsx";
import FantasyMoviePage from "./pages/fantasyMoviePage.tsx";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false
        },
    },
});
const App = () => {

    return (

        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <SiteHeader />
                <MoviesContextProvider>
                    <Routes>
                 <Route path="/reviews/form" element={<AddMovieReviewPage/>} />
                 <Route path="/movies/upcoming/watchlater" element={<WatchLaterMoviePage />} />
                <Route path="/popular/people" element={<PopularPeoplePage />} />
                <Route path="/popular/people/:id" element={<PersonDetailsPage />} />
                <Route path="/movies/upcoming" element={<UpcomingMoviesPage />} />
                 <Route path="/movies/popular" element={<PopularMoviesPage />} />
                 <Route path="/fantasy" element={<FantasyMoviePage />} />
                <Route path="/tv/trending" element={<TvSeriesPage />} />
                <Route path="/reviews/:id" element={<MovieReviewPage/>} />
                <Route path="/movies/favourites" element={<FavouriteMoviesPage />} />
                <Route path="/movies/:id" element={<MoviePage />} />
                <Route path="/" element={<HomePage />} />
                <Route path="*" element={<Navigate to="/" />} />
                    </Routes>
                </MoviesContextProvider>
            </BrowserRouter>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
)
