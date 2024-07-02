import React from "react";
import People from "../peopleCard/";
import Grid from "@mui/material/Grid";
import { BasePeopleListProps } from "../../types/interfaces";

const PeopleList: React.FC<BasePeopleListProps> = ({people, action}) => {
    let peopleCards = people.map((p) => (
        <Grid key={p.id} item xs={12} sm={6} md={4} lg={3} xl={2}>
            <People key={p.id} person={p} action={action}/>
        </Grid>
    ));
    return peopleCards;
}

export default PeopleList;