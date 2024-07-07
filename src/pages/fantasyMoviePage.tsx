import React from "react";
import PageTemplate from "../components/templateFantasyMoviePage";
import FantasyMovieForm from "../components/fantasyMovieForm";
const FantasyMoviePage: React.FC = () => {
    return (
        <>
            <PageTemplate pageTitle="Fantasy Movie">
                <FantasyMovieForm />
            </PageTemplate>
        </>
    );
};
export default FantasyMoviePage;