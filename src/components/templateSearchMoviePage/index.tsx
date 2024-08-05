import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import {MovieListPageTemplateProps} from "../../types/interfaces";

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
const SearchMoviePageTemplate: React.FC<TemplateSearchPageProps> = ({ pageTitle,  children })=> {
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