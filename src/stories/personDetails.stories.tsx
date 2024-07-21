import React from 'react';
import { Meta, StoryObj } from '@storybook/react';
import { QueryClient, QueryClientProvider } from 'react-query';
import PersonDetails from "../components/peopleDetails";
import SamplePerson from "./peopleSampleData";

const queryClient = new QueryClient();

export default {
    title: 'People Page/PersonDetails',
    component: PersonDetails,
    decorators: [
        (Story) => (
            <QueryClientProvider client={queryClient}>
                {Story()}
            </QueryClientProvider>
        )
    ],
} as Meta<typeof PersonDetails>;

export const Basic: StoryObj<typeof PersonDetails> = {
    args: {
        ...SamplePerson
    }
};