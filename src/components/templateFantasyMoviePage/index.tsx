import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import {BaseFantasyMovieProps, MovieDetailsProps} from "../../types/interfaces";

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    }
};
interface TemplateFantasyPageProps {
    pageTitle: "string";
    fantasy: BaseFantasyMovieProps;
    children: React.ReactElement;
}
const FantasyMoviePageTemplate: React.FC<TemplateFantasyPageProps> = ({ fantasy, pageTitle,  children })=> {
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
export default FantasyMoviePageTemplate;