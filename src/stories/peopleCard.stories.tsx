import type { Meta, StoryObj } from '@storybook/react';
import PeopleCard from "../components/peopleCard";
import SamplePerson from "./peopleSampleData";
import { MemoryRouter } from "react-router";
import React from 'react';
import MoviesContextProvider from "../contexts/moviesContext.tsx";
import AddToFavouritesIcon from "../components/cardIcons/addToFavourites.tsx";

const meta = {
    title: 'People Page/PeopleCard',
    component: PeopleCard,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
    ],
} satisfies Meta<typeof PeopleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        person: SamplePerson,
        action: (person ) => <AddToFavouritesIcon {...person} />,
    }

};
Basic.storyName = "Default";

const sampleNoPoster = { ...SamplePerson, profile_path: undefined };
export const Exceptional: Story = {
    args: {
        person: sampleNoPoster,
        action: (person ) => <AddToFavouritesIcon {...person} />,
    }
};
Exceptional.storyName = "Exception";