import type { Meta, StoryObj } from '@storybook/react';
import FilterPeopleCard from "../components/filterPeopleCard";
import { MemoryRouter } from "react-router";
import { action } from "@storybook/addon-actions";
import { QueryClientProvider, QueryClient } from "react-query";
import React from 'react';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 360000,
            refetchInterval: 360000,
            refetchOnWindowFocus: false,
        },
    },
});

const meta = {
    title: 'People Page/FilterActorCard',
    component: FilterPeopleCard,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
        (Story: React.FC) => (<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
        )
    ],
} satisfies Meta<typeof FilterPeopleCard>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        onUserInput: action("filter input"),
        nameFilter: "",
        popularityFilter: "50",
        genderFilter: "1",
    },
};
Basic.storyName = "Default";