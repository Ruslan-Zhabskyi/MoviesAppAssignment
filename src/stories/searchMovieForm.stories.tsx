import type { Meta, StoryObj } from '@storybook/react';
import MultiCriteriaSearchForm from "../components/multiCriteriaSearchForm";
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
    title: 'Search Movie Page/SearchMovieForm',
    component: MultiCriteriaSearchForm,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
        (Story: React.FC) => (<QueryClientProvider client={queryClient}><Story /></QueryClientProvider>
        )
    ],
} satisfies Meta<typeof MultiCriteriaSearchForm>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Basic: Story = {
    args: {
        language: "en",
        primary_release_year: "2024",
        vote_average_gte: "1",
        vote_average_lte: "10",
        with_origin_country: "US",
        with_original_language: "en",
        with_genres: ""
    },
};
Basic.storyName = "Default";