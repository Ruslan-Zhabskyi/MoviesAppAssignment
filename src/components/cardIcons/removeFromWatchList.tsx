import React, { MouseEvent, useContext } from "react";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import { MoviesContext } from "../../contexts/moviesContext";
import {BaseMovieProps} from "../../types/interfaces";

const RemoveFromWatchLaterIcon: React.FC<BaseMovieProps> = (movie) => {
    const context = useContext(MoviesContext);

    const onUserRequest = (e: MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        context.removeFromWatchLater(movie);
    };

    return (
        <IconButton
            aria-label="remove from Watch Later"
            onClick={onUserRequest}
        >
            <DeleteIcon color="primary" fontSize="large" />
        </IconButton>
    );
};

export default RemoveFromWatchLaterIcon;