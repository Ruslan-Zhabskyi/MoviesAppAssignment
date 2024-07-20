import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { PeopleContext } from "../../contexts/peopleContext";
import {BasePeopleProps} from "../../types/interfaces";

const RemoveFromFavouritePeopleIcon: React.FC<BasePeopleProps> = (person) => {
    const context = useContext(PeopleContext);

    const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.removeFromFavouritePeople(person);
    };

    return (
        <IconButton
            aria-label="remove from favorite actors"
            onClick={onUserRequest}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromFavouritePeopleIcon;