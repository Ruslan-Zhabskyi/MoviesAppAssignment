import React from "react";
import PageTemplate from "../components/templateFantasyMoviePage";
import MovieReview from "../components/movieReview";
import {useLocation} from "react-router-dom";
import styles from "../components/reviewForm/styles.ts";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";


const FantasyMoviePage: React.FC = () => {

    return (
        <>
            <PageTemplate
                title="Fantacy Movie"

            />

            <Box component="div" sx={styles.root}>
                <Typography component="h2" variant="h3">
                    Create a fantacy movie
                </Typography>
            </Box>


        </>


    );
};
export default FantasyMoviePage;