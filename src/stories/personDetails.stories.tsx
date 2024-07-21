import type { Meta, StoryObj } from '@storybook/react';
import PersonDetails from "../components/peopleDetails";
import SamplePerson from "./peopleSampleData";
import { MemoryRouter } from "react-router";
import PeopleContextProvider from "../contexts/peopleContext.tsx";

const meta = {
    title: "People Page/PersonDetails",
    component: PersonDetails,
    decorators: [
        (Story) => <MemoryRouter initialEntries={["/"]}>{Story()}</MemoryRouter>,
        (Story) => <PeopleContextProvider>{Story()}</PeopleContextProvider>,
    ],
} satisfies Meta<typeof PersonDetails>;
export default meta;

type Story = StoryObj<typeof meta>;
export const Basic: Story = {
    args: SamplePerson
};
Basic.storyName = "Default";