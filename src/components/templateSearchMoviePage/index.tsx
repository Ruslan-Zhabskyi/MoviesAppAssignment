import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import {BaseMultiSearchMovieProps} from "../../types/interfaces";

const styles = {
    root: {
        backgroundColor: "#fffefe",
    }
};
interface TemplateFantasyPageProps {
    pageTitle: "string";
    movie: BaseMultiSearchMovieProps;
    children: React.ReactElement;
}
const SearchMoviePageTemplate: React.FC<TemplateFantasyPageProps> = ({ movie, pageTitle,  children })=> {
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