import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import MenuItem from "@mui/material/MenuItem";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import ratings from "./ratingCategories";
import {BaseFantasyMovieProps} from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const FantasyMovieForm: React.FC<BaseFantasyMovieProps> = () => {
    const defaultValues = {
        defaultValues: {
            title: "",
            overview: "",
            release_date: "",
            runtime: "",
            production_company: "",
            genre: ""
        }
    };

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<BaseFantasyMovieProps>(defaultValues);

    const navigate = useNavigate();
    const context = useContext(MoviesContext);

    const onSubmit: SubmitHandler<BaseFantasyMovieProps> = (fantacy) => {
        fantacy.id = "0"; //AI: add ID generator here
        console.log(fantacy);
    };
    return (
        <h3>Placeholder for web form</h3>
    );
};

export default FantasyMovieForm;