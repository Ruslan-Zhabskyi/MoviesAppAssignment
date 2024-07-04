import type { Meta, StoryObj } from '@storybook/react';
import PersonHeader from "../components/headerPerson";
import SamplePerson from "./peopleSampleData";
import { MemoryRouter } from "react-router";

import React from 'react';

const meta = {
    title: "People Page/PersonHeader",
    component: PersonHeader,
    decorators: [
        (Story: React.FC) => <MemoryRouter initialEntries={["/"]}><Story /></MemoryRouter>,
    ],
} satisfies Meta<typeof PersonHeader>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: {
        ...SamplePerson
    }
};
Basic.storyName = "Default";