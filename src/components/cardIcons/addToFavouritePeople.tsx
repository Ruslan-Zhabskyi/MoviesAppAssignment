import React, {MouseEvent, useContext} from "react";
import { PeopleContext } from "../../contexts/peopleContext";
import IconButton from "@mui/material/IconButton";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {BasePeopleProps} from "../../types/interfaces"

const AddToFavouritesIcon: React.FC<BasePeopleProps> = (person) => {
    const context = useContext(PeopleContext);

    const onUserSelect = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.addToFavouritePeople(person);
    };
    return (
        <IconButton aria-label="add to favorites" onClick={onUserSelect}>
            <FavoriteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default AddToFavouritesIcon;