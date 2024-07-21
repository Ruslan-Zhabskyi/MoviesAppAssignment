import React from "react";
import Header from "../headerMovieList";
import Grid from "@mui/material/Grid";
import PeopleList from "../peopleList";
import {  PeopleListPageTemplateProps} from "../../types/interfaces";

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    }
};

const PeopleListPageTemplate: React.FC<PeopleListPageTemplateProps> = ({ people, name, action, onBack, onForward })=> {
    return (
        <Grid container sx={styles.root}>
            <Grid item xs={12}>
                <Header
                    title={name}
                    onBack={onBack}
                    onForward={onForward}/>
            </Grid>
            <Grid item container spacing={5}>
                <PeopleList action={action} people={people}></PeopleList>
            </Grid>
        </Grid>
    );
}
export default PeopleListPageTemplate;