import type { Meta, StoryObj } from '@storybook/react';
import FantasyMovieForm from "../components/fantasyMovieForm";
import { MemoryRouter } from "react-router";
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
    title: 'Fantasy Movie Page/FantasyMovieForm',
    component: FantasyMovieForm,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
        (Story: React.FC) => (<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
        )
    ],
} satisfies Meta<typeof FantasyMovieForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        title: "",
        overview: "",
        release_date: "",
        runtime: "",
        production_company: [],
        genre: [],
    },
};
Basic.storyName = "Default";