
import type { Meta, StoryObj } from '@storybook/react';
import PeopleList from "../components/peopleList";
import SamplePerson from "./peopleSampleData";
import { MemoryRouter } from "react-router";
import Grid from "@mui/material/Grid";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites.tsx";
import React from "react";

const meta = {
    title: "People Page/PeopleList",
    component: PeopleList,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],

} satisfies Meta<typeof PeopleList>;
export default meta;


export const Basic = () => {
    const people = [
        { ...SamplePerson, id: 1 },
        { ...SamplePerson, id: 2 },
        { ...SamplePerson, id: 3 },
        { ...SamplePerson, id: 4 },
        { ...SamplePerson, id: 5 },
    ];
    return (
        <Grid container spacing={5}>
            <PeopleList
                people={people}
                action={(person) => <AddToFavouritesIcon {...person} />}
            />
        </Grid>
    );
};
Basic.storyName = "Default";


