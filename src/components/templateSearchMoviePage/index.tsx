import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import {BaseMultiSearchMovieProps, MovieListPageTemplateProps} from "../../types/interfaces";
import MovieList from "../movieList";

const styles = {
    root: {
        backgroundColor: "#fffefe",
    }
};
interface TemplateSearchPageProps {
    pageTitle: "string";
    movies: MovieListPageTemplateProps;
    children: React.ReactElement;
}
const SearchMoviePageTemplate: React.FC<TemplateSearchPageProps> = ({ movies, pageTitle,  children })=> {
    return (
        <Grid container sx={styles.root}>
            <Grid item xs={12}>
                <Header title={pageTitle} />

            </Grid>

            <Grid item xs={9}>
                {children}
            </Grid>

        </Grid>
    );
}
export default SearchMoviePageTemplate;