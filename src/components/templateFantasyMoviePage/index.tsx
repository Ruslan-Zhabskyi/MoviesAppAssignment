import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";

const styles = {
    root: {
        backgroundColor: "#fffefe",
    }
};
interface TemplateFantasyPageProps {
    pageTitle: string;
    children: React.ReactElement;
}
const FantasyMoviePageTemplate: React.FC<TemplateFantasyPageProps> = ({ pageTitle,  children })=> {
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