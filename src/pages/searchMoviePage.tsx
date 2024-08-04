import React from "react";
import PageTemplate from "../components/templateSearchMoviePage";
import MovieSearchForm from "../components/multiCriteriaSearchForm";
const SearchMoviePage: React.FC = () => {
    return (
        <>
            <PageTemplate pageTitle="Fantasy Movie">
                <MovieSearchForm />
            </PageTemplate>
        </>
    );
};
export default SearchMoviePage;