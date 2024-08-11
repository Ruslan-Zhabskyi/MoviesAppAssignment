import React, {useContext, useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Select, InputLabel, FormControl, Stack} from '@mui/material';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import {BaseFantasyMovieProps, GenreData} from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useQuery} from "react-query";
import {getGenres} from "../../api/tmdb-api.ts";
import MenuItem from "@mui/material/MenuItem";
import { v4 as uuidv4 } from 'uuid';
import LlamaAI from 'llamaai';
import LinearProgress from '@mui/material/LinearProgress';
import BootstrapDialog from "../dialogButton";

const apiToken = import.meta.env.VITE_API_TOKEN;
const llamaAPI = new LlamaAI(apiToken);

const FantasyMovieForm: React.FC<BaseFantasyMovieProps> = () => {
    const defaultValues = {
        defaultValues: {
            title: "Scrary Death",
            overview: "Scrary Death on the cemetry. Multiple people died. Alliens came and ate all trees",
            release_date: "",
            runtime: "96",
            production_company: "AAA aa",
            genre: ""
        }
    };
//some changes

    const [apiResponse, setApiResponse] = useState(null);
    const [error, setError] = useState(null);
    const { data } = useQuery<GenreData, Error>("genres", getGenres);
    const genres = data?.genres || [];

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<BaseFantasyMovieProps>(defaultValues);

    const navigate = useNavigate();
    const [open, setOpen] = useState(false);  //NEW
    const context = useContext(MoviesContext);
    const [isInvalidInput, setIsInvalidInput] = useState(false);

    const handleSnackClose = () => {
        setOpen(false);
        navigate("/fantasy");
    };

    const onSubmit: SubmitHandler<BaseFantasyMovieProps> = (fantasy) => {
        fantasy.id = uuidv4();
        context.addFantasyMovie(fantasy);
        setOpen(true);
        console.log(fantasy);
    };

    const onSubmitLlama: SubmitHandler<BaseFantasyMovieProps> = (fantasy) => {
        const apiRequestJson = {
            'model': 'llama-70b-chat',
            'max_token': 500,
            'temperature': 0.9,

            'functions': [
                {
                    "name": "Fantasy",
                    "description": "Creating fantasy movie.",
                    "parameters": {
                        "type": "object",
                        "properties": {
                            "title": {"title": "Title", "description": "Movie's title", "type": "string"},
                            "overview": {
                                "title": "Overview",
                                "description": "Movie's overview",
                                "type": "string",
                            },
                        },
                        "required": ["title", "overview"]
                    }
                }
            ],
            'function_call': {'name': 'Fantasy'},

            'messages': [
                {
                    'role': 'user',
                    'content': `Rephrase a fantasy movie title and a description based on the user-provided title "${fantasy.title}" and description "${fantasy.overview}". Explain it like for 4 year olds`
                }
            ]
        };

        llamaAPI.run(apiRequestJson)
            .then(response => {
                setApiResponse(response);
                fantasy.id = uuidv4();

                const newTitle = response.choices[0].message.function_call.arguments.title;
                const newOverview = response.choices[0].message.function_call.arguments.overview;

                context.addFantasyMovie({...fantasy, overview: newOverview, title: newTitle});


                setOpen(true);
            })
            .catch(error => {
                setError(error.message);
            });
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
                    <Typography variant="h6" color="error">
                        {errors.title.message}
                    </Typography>
                )}

                <Controller
                    name="production_company"
                    control={control}
                    rules={{ required: "Production Company is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="production_company"
                            label="Production Company"
                            autoFocus
                        />
                    )}
                />
                {errors.production_company && (
                    <Typography variant="h6" color="error">
                        {errors.production_company.message}
                    </Typography>
                )}

                <Controller
                    name="release_date"
                    control={control}
                    rules={{ required: "Release Date is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="release_date"
                            label="Release Date"
                            type="date"
                            InputLabelProps={{
                                shrink: true,
                            }}
                            autoFocus
                        />
                    )}
                />
                {errors.release_date && (
                    <Typography variant="h6" color="error">
                        {errors.release_date.message}
                    </Typography>
                )}

                <Controller
                    name="genre"
                    control={control}
                    rules={{ required: "Genre is required" }}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                        <FormControl sx={{ width: "40ch" }} margin="normal" required>
                            <InputLabel id="genre-label">Genres</InputLabel>
                            <Select
                                labelId="genre-label"
                                multiple
                                value={value || []}
                                onChange={onChange}
                                label="Genres"
                                renderValue={(selected) =>
                                    selected.map(id => genres.find(genre => genre.id === id)?.name).filter(name => name).join(', ')
                                }
                            >
                                {genres.map((genre) => (
                                    <MenuItem key={genre.id} value={genre.id}>
                                        {genre.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    )}
                />
                {errors.genre && (
                    <Typography variant="h6" color="error">
                        {errors.genre.message}
                    </Typography>
                )}

                <Controller
                    name="runtime"
                    control={control}
                    rules={{ required: "Runtime is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={(e) => {
                                const onlyNums = e.target.value.replace(/[^0-9]/g, '');
                                if (e.target.value !== onlyNums) {
                                    setIsInvalidInput(true);
                                } else {
                                    setIsInvalidInput(false);
                                }
                                onChange(onlyNums);
                            }}
                            value={value}
                            id="runtime"
                            label="Runtime Minutes"
                            autoFocus
                        />
                    )}
                />
                {isInvalidInput && (

                    <Typography variant="h6" color="error">
                        Please enter only number as runtime.
                    </Typography>
                )}
                {errors.runtime && (
                    <Typography variant="h6" color="error">
                        {errors.runtime.message}
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
                    <Typography variant="h6" color="error">
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
                        type="button"
                        variant="contained"
                        color="secondary"
                        sx={styles.submit}
                        onClick={() => handleSubmit(onSubmitLlama)()}
                    >
                        Generate Kids Version
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

            <Box sx={{ marginTop: 4 }}>
                <Typography variant="h4">Submitted Fantasy Movies:</Typography>
                {context.myFantasy.length > 0 ? (
                    context.myFantasy.map((fantasy, id) => (
                        <Box key={id} sx={{ marginTop: 2, padding: 2, border: '1px solid gray' }}>
                            <>
                                <Typography variant="h6">Title: {fantasy.title}</Typography>
                                <Typography variant="body1">Overview: {fantasy.overview}</Typography>
                                <Typography variant="body1">Release Date: {fantasy.release_date}</Typography>
                                <Typography variant="body1">Runtime: {fantasy.runtime} minutes</Typography>
                                <Typography variant="body1">Production Company: {fantasy.production_company}</Typography>
                                <Typography variant="body1">Genres: {fantasy.genre.map(id => genres.find(genre => genre.id === id)?.name).join(', ')}</Typography>
                                <BootstrapDialog {...fantasy}/>
                            </>
                        </Box>

                    ))
                ) : (
                    <>
                        <Typography variant="h6" sx={{ marginTop: 2 }}>Submit your first Fantasy Movie</Typography>
                        <Stack sx={{ width: '100%', color: 'grey.500' }} spacing={2}>
                            <LinearProgress color="secondary" />
                            <LinearProgress color="success" />
                            <LinearProgress color="inherit" />
                        </Stack>
                    </>
                )}
            </Box>

        </Box>
    );
};

export default FantasyMovieForm;