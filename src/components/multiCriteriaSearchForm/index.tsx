import React, { useContext, useState } from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import {Select, InputLabel, FormControl, Grid, Slider, Rating} from '@mui/material';
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import styles from "./styles";
import {BaseMovieListProps, BaseMovieProps, BaseMultiSearchMovieProps, GenreData} from "../../types/interfaces";
import {useQuery} from "react-query";
import {getGenres} from "../../api/tmdb-api.ts";
import MenuItem from "@mui/material/MenuItem";
import { getMovieSearch } from "../../api/tmdb-api";
import MovieList from "../movieList";
import AddToFavouritesIcon from "../cardIcons/addToFavourites.tsx";
import {LanguageContext} from "../../contexts/languageContext.tsx";

const multiCriteriaSearchForm: React.FC<BaseMovieListProps> = () => {
    const { language } = useContext(LanguageContext);
    const defaultValues = {
        defaultValues: {
            language: language,
            primary_release_year: "2024",
            vote_average_gte: "1",
            vote_average_lte: "10",
            with_origin_country: "US",
            with_original_language: "en",
            with_genres: ""
        }
    };

    const { data } = useQuery<GenreData, Error>("genres", getGenres);
    const genres = data?.genres || [];

    const {
        control,
        formState: { errors },
        handleSubmit,
        reset,
    } = useForm<BaseMultiSearchMovieProps>(defaultValues);

    const [moviesSearch, setMoviesSearch] = useState([]);
    const onSubmit: SubmitHandler<BaseMultiSearchMovieProps> = async (movie) => {
        try {
            const moviesSearch = await getMovieSearch(
                movie.language,
                movie.primary_release_year,
                movie.vote_average_gte,
                movie.vote_average_lte,
                movie.with_origin_country,
                movie.with_original_language,
                movie.with_genres,
            );
            setMoviesSearch(moviesSearch.results || []);
            console.log(moviesSearch.results);
            console.log(moviesSearch);
        } catch (error) {
            console.error("Failed to fetch movies:", error);
        }
    };
    return (
        <Box component="div" sx={styles.root}>
            <Typography component="h2" variant="h3">
                Movie Search
            </Typography>

            <form style={styles.form} onSubmit={handleSubmit(onSubmit)} noValidate>

                <Controller
                    name="with_origin_country"
                    control={control}
                    rules={{required: "with_origin_country is required"}}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <TextField
                            sx={{width: "40ch"}}
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
                    rules={{required: "with_original_language is required"}}
                    defaultValue=""
                    render={({field: {onChange, value}}) => (
                        <TextField
                            sx={{width: "40ch"}}
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
                    rules={{ required: "Primary release year is required" }}
                    defaultValue={2024} // Set a reasonable default value for the slider
                    render={({ field: { onChange, value } }) => (
                        <Box sx={{ width: "40ch", margin: "normal" }}>
                            <Typography id="input-slider" gutterBottom>
                                Primary Release Year: {value}
                            </Typography>
                            <Slider
                                value={typeof value === 'number' ? value : 2020}
                                onChange={(event, newValue) => {
                                    onChange(newValue);
                                }}
                                aria-labelledby="input-slider"
                                min={1900}
                                max={new Date().getFullYear()}
                                valueLabelDisplay="auto"
                            />
                        </Box>
                    )}
                />
                {errors.primary_release_year && (
                    <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                        {errors.primary_release_year.message}
                    </Typography>
                )}

                <Controller
                    name="with_genres"
                    control={control}
                    rules={{required: "Genre is required"}}
                    defaultValue={[]}
                    render={({field: {onChange, value}}) => (
                        <FormControl sx={{width: "40ch"}} margin="normal" required>
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
                    rules={{ required: "Minimum vote average is required" }}
                    defaultValue={1}
                    render={({ field: { onChange, value } }) => (
                        <Box sx={{ width: "40ch", margin: "normal" }}>
                            <Typography gutterBottom>
                                Minimum Vote Average {[value]}
                            </Typography>
                            <Rating
                                name="vote-average-gte-rating"
                                value={value}
                                onChange={(event, newValue) => {
                                    onChange(newValue);
                                }}
                                precision={0.1}
                                max={10}
                            />
                        </Box>
                    )}
                />
                {errors.vote_average_gte && (
                    <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                        {errors.vote_average_gte.message}
                    </Typography>
                )}

                <Controller
                    name="vote_average_lte"
                    control={control}
                    rules={{ required: "Maximum vote average is required" }}
                    defaultValue={10}
                    render={({ field: { onChange, value } }) => (
                        <Box sx={{ width: "40ch", margin: "normal" }}>
                            <Typography gutterBottom>
                                Maximum Vote Average {[value]}
                            </Typography>
                            <Rating
                                name="vote-average-lte-rating"
                                value={value}
                                onChange={(event, newValue) => {
                                    onChange(newValue);
                                }}
                                precision={0.1}
                                max={10}
                            />
                        </Box>
                    )}
                />
                {errors.vote_average_lte && (
                    <Typography variant="h6" color="error" sx={{ mt: 2 }}>
                        {errors.vote_average_lte.message}
                    </Typography>
                )}


                <Box>
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

            <Grid item container spacing={5}>
                <MovieList action={(movie: BaseMovieProps) => {
                    return <AddToFavouritesIcon {...movie} />
                }}

                           movies={moviesSearch}></MovieList>
            </Grid>

        </Box>
    );
};

export default multiCriteriaSearchForm;