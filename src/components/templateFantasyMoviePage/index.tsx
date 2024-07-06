import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import {  BaseFantasyMovieProps} from "../../types/interfaces";
import PeopleList from "../peopleList";


const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    }
};

const FantasyMoviePageTemplate: React.FC<BaseFantasyMovieProps> = ({ title})=> {
    return (
        <Grid container sx={styles.root}>
            <Grid item xs={12}>
                <Header title={title} />

            </Grid>
        </Grid>
    );
}
export default FantasyMoviePageTemplate;