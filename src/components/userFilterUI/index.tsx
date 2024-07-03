import React, { useState } from "react";
import FilterCard from "../filterMoviesCard";
import Fab from "@mui/material/Fab";
import Drawer from "@mui/material/Drawer";
import { BasePeopleProps } from "../../types/interfaces";

export const nameFilter = (person: BasePeopleProps, value: string): boolean => {
    return person.name.toLowerCase().search(value.toLowerCase()) !== -1;
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
    onFilterValuesChange: (f: string) => void;
    nameFilter: string;
}


const UserFilterUI: React.FC<PersonFilterUIProps> = ({ onFilterValuesChange, nameFilter }) => {
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
                    titleFilter={nameFilter}
                />
            </Drawer>
        </>
    );
};

export default UserFilterUI;