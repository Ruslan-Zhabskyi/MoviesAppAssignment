import React, { useState } from "react";
import FilterCard from "../filterPeopleCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BasePeopleProps } from "../../types/interfaces";

export const nameFilter = (person: BasePeopleProps, value: string): boolean => {
    return person.name.toLowerCase().search(value.toLowerCase()) !== -1;
};

export const popularityFilter = (person: BasePeopleProps, value: number): boolean => {
    return person.popularity >= value;
};

const styles = {
    root: {
        backgroundColor: "#bfbfbf",
    },
    fab: {
        marginTop: 8,
        position: "fixed",
        top: 20,
        right: 2,
    },
};

interface PersonFilterUIProps {
    onFilterValuesChange: (p: string) => void;
    nameFilter: string;
    popularityFilter: string;
}


const UserFilterUI: React.FC<PersonFilterUIProps> = ({ onFilterValuesChange, nameFilter, popularityFilter }) => {
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <>
            <Fab
                color="secondary"
                variant="extended"
                onClick={() => setDrawerOpen(true)}
                sx={styles.fab}
            >
                Filter
            </Fab>
            <Drawer
                anchor="left"
                open={drawerOpen}
                onClose={() => setDrawerOpen(false)}
            >
                <FilterCard
                    onUserInput={onFilterValuesChange}
                    nameFilter={nameFilter}
                    popularityFilter={popularityFilter}
                />
            </Drawer>
        </>
    );
};

export default UserFilterUI;