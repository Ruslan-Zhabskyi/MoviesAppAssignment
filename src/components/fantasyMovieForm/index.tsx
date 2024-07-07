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
    const [open, setOpen] = useState(false);  //NEW
    const context = useContext(MoviesContext);

    const handleSnackClose = () => {
        setOpen(false);
        navigate("/fantasy");
    };

    const onSubmit: SubmitHandler<BaseFantasyMovieProps> = (fantasy) => {
        fantasy.id = "0"; //AI: add ID generator here
        context.addFantasyMovie(fantasy);
        setOpen(true);
        console.log(fantasy);
    };
    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Create a Fantasy Movie
            </Typography>

            <Snackbar
                sx={styles.snack}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
                open={open}
                onClose={handleSnackClose}
            >
                <Alert
                    severity="success"
                    variant="filled"
                    onClose={handleSnackClose}
                >
                    <Typography variant="h4">
                        Thank you for submitting a Fantasy Movie
                    </Typography>
                </Alert>
            </Snackbar>

            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>
                <Controller
                    name="title"
                    control={control}
                    rules={{ required: "Title is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="title"
                            label="Title"
                            autoFocus
                        />
                    )}
                />
                {errors.title && (
                    <Typography variant="h6" component="p">
                        {errors.title.message}
                    </Typography>
                )}

                <Controller
                    name="overview"
                    control={control}
                    rules={{
                        required: "Overview cannot be empty.",
                        minLength: { value: 10, message: "Overview is too short" },
                    }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            variant="outlined"
                            margin="normal"
                            required
                            fullWidth
                            value={value}
                            onChange={onChange}
                            label="Overview text"
                            id="overview"
                            multiline
                            minRows={10}
                        />
                    )}
                />
                {errors.overview && (
                    <Typography variant="h6" component="p">
                        {errors.overview.message}
                    </Typography>
                )}

                <Box >
                    <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        sx={styles.submit}
                    >
                        Submit
                    </Button>
                    <Button
                        type="reset"
                        variant="contained"
                        color="secondary"
                        sx={styles.submit}
                        onClick={() => {
                            reset({
                                title: "",
                                overview: "",
                            });
                        }}
                    >
                        Reset
                    </Button>
                </Box>
            </form>
        </Box>
);
};

export default FantasyMovieForm;