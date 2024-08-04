import React, { useContext, useState, ChangeEvent } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Select, InputLabel, FormControl } from '@mui/material';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { MoviesContext } from "../../contexts/moviesContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";
import {BaseMultiSearchMovieProps, GenreData} from "../../types/interfaces";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import {useQuery} from "react-query";
import {getGenres} from "../../api/tmdb-api.ts";
import MenuItem from "@mui/material/MenuItem";
import { getMovieSearch } from "../../api/tmdb-api";


const multiCriteriaSearchForm: React.FC<BaseMultiSearchMovieProps> = () => {
    const defaultValues = {
        defaultValues: {
            language: "en-US",
            primary_release_year: "",
            vote_average_gte: "",
            vote_average_lte: "",
            with_origin_country: "",
            with_original_language: "",
            with_genres: ""
        }
    };

    const { data, error, isLoading, isError } = useQuery<GenreData, Error>("genres", getGenres);
    const genres = data?.genres || [];

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<BaseMultiSearchMovieProps>(defaultValues);

    const [isInvalidInput, setIsInvalidInput] = useState(false);

    const onSubmit: SubmitHandler<BaseMultiSearchMovieProps> = (movie) => {
        const moviesSearch =  getMovieSearch(movie.language,movie.primary_release_year, movie.vote_average_gte, movie.vote_average_lte,  movie.with_origin_country, movie.with_original_language, movie.with_genres);
        console.log(moviesSearch);
    };
    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Movie Search
            </Typography>

            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

                <Controller
                    name="language"
                    control={control}
                    rules={{ required: "Language is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="language"
                            label="language"
                            autoFocus
                        />
                    )}
                />
                {errors.language && (
                    <Typography variant="h6" color="error">
                        {errors.language.message}
                    </Typography>
                )}

                <Controller
                    name="with_origin_country"
                    control={control}
                    rules={{ required: "with_origin_country is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="with_origin_country"
                            label="with_origin_country"
                            autoFocus
                        />
                    )}
                />
                {errors.with_origin_country && (
                    <Typography variant="h6" color="error">
                        {errors.with_origin_country.message}
                    </Typography>
                )}

                <Controller
                    name="with_original_language"
                    control={control}
                    rules={{ required: "with_original_language is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="with_original_language"
                            label="with_original_language"
                            autoFocus
                        />
                    )}
                />
                {errors.with_original_language && (
                    <Typography variant="h6" color="error">
                        {errors.with_original_language.message}
                    </Typography>
                )}

                <Controller
                    name="primary_release_year"
                    control={control}
                    rules={{ required: "primary_release_year is required" }}
                    defaultValue=""
                    render={({ field: { onChange, value } }) => (
                        <TextField
                            sx={{ width: "40ch" }}
                            variant="outlined"
                            margin="normal"
                            required
                            onChange={onChange}
                            value={value}
                            id="primary_release_year"
                            label="primary_release_year"
                            autoFocus
                        />
                    )}
                />
                {errors.primary_release_year && (
                    <Typography variant="h6" color="error">
                        {errors.primary_release_year.message}
                    </Typography>
                )}


                <Controller
                    name="with_genres"
                    control={control}
                    rules={{ required: "Genre is required" }}
                    defaultValue={[]}
                    render={({ field: { onChange, value } }) => (
                        <FormControl sx={{ width: "40ch" }} margin="normal" required>
                            <InputLabel id="genre-label">Genres</InputLabel>
                            <Select
                                labelId="with_genres-label"
                                multiple
                                value={value || []}
                                onChange={onChange}
                                label="with_genres"
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
                {errors.with_genres && (
                    <Typography variant="h6" color="error">
                        {errors.with_genres.message}
                    </Typography>
                )}

                <Controller
                    name="vote_average_gte"
                    control={control}
                    rules={{ required: "vote_average_gte is required" }}
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
                            id="vote_average_gte"
                            label="vote_average_gte"
                            autoFocus
                        />
                    )}
                />
                {isInvalidInput && (

                    <Typography variant="h6" color="error">
                        Please enter only number as vote_average_gte.
                    </Typography>
                )}
                {errors.vote_average_gte && (
                    <Typography variant="h6" color="error">
                        {errors.vote_average_gte.message}
                    </Typography>
                )}

                <Controller
                    name="vote_average_lte"
                    control={control}
                    rules={{ required: "vote_average_lte is required" }}
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
                            id="vote_average_lte"
                            label="vote_average_lte"
                            autoFocus
                        />
                    )}
                />
                {isInvalidInput && (

                    <Typography variant="h6" color="error">
                        Please enter only number as vote_average_lte.
                    </Typography>
                )}
                {errors.vote_average_lte && (
                    <Typography variant="h6" color="error">
                        {errors.vote_average_lte.message}
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

export default multiCriteriaSearchForm;