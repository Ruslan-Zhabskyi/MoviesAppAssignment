export const getMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMoviesPaginated = ({ page }) => {
    return fetch(
        `https://api.themoviedb.org/3/discover/movie?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error;
        });
};

export const getMovie = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get movie data. Response status: ${response.status}`);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getGenres = () => {
    return fetch(
        "https://api.themoviedb.org/3/genre/movie/list?api_key=" + import.meta.env.VITE_TMDB_KEY + "&language=en-US"
    ).then( (response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch genres. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getMovieImages = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error("failed to fetch images");
        }
        return response.json();
    }).then((json) => json.posters)
        .catch((error) => {
            throw error
        });
};

export const getMovieReviews = (id: string | number) => { //movie id can be string or number
    return fetch(
        `https://api.themoviedb.org/3/movie/${id}/reviews?api_key=${import.meta.env.VITE_TMDB_KEY}`
    )
        .then((res) => res.json())
        .then((json) => {
            // console.log(json.results);
            return json.results;
        });
};

export const getUpcomingMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getUpcomingMoviesPaginated = ({page}) => {
    return fetch(
        `https://api.themoviedb.org/3/movie/upcoming?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=${page}`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};
export const getPeople = () => {
    return fetch(
        `https://api.themoviedb.org/3/person/popular?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&page=1`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch people. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPerson = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get person data. Response status: ${response.status}`);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPersonSocialMedia = (id: string) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/external_ids?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error(`Failed to get person social media data. Response status: ${response.status}`);
        }
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getPersonImages = (id: string | number) => {
    return fetch(
        `https://api.themoviedb.org/3/person/${id}/images?api_key=${import.meta.env.VITE_TMDB_KEY}`
    ).then((response) => {
        if (!response.ok) {
            throw new Error("failed to fetch images");
        }
        return response.json();
    }).then((json) => json.profiles)
        .catch((error) => {
            throw error
        });
};

export const getPopularMovies = () => {
    return fetch(
        `https://api.themoviedb.org/3/trending/movie/day?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch movies. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getTrendingTV = () => {
    return fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch TV series. Response status: ${response.status}`);
        return response.json();
    })
        .catch((error) => {
            throw error
        });
};

export const getTrendingTVSecond = () => {
    return fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=1`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch TV series. Response status: ${response.status}`);
        return response.json();
    })
        .then((data) => {
            return {
                ...data,
                results: data.results.map((tvShow: any) => ({
                    ...tvShow,
                    title: tvShow.name,
                    release_date: tvShow.first_air_date,
                    name: undefined
                }))
            };
        })
        .catch((error) => {
            throw error;
        });
};

export const getTrendingTVSecondPaginated = ({page}) => {
    return fetch(
        `https://api.themoviedb.org/3/trending/tv/day?api_key=${import.meta.env.VITE_TMDB_KEY}&language=en-US&include_adult=false&include_video=false&page=${page}`
    ).then((response) => {
        if (!response.ok)
            throw new Error(`Unable to fetch TV series. Response status: ${response.status}`);
        return response.json();
    })
        .then((data) => {
            return {
                ...data,
                results: data.results.map((tvShow: any) => ({
                    ...tvShow,
                    title: tvShow.name,
                    release_date: tvShow.first_air_date,
                    name: undefined
                }))
            };
        })
        .catch((error) => {
            throw error;
        });
};
