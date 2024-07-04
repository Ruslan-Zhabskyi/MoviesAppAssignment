export interface BaseMovieProps {
    title: string;
    budget: number;
    homepage: string | undefined;
    id: number;
    imdb_id: string;
    original_language: string;
    overview: string;
    release_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    tagline: string;
    runtime: number;
    revenue: number;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
}
export interface BaseMovieListProps {
    movies: BaseMovieProps[];
    action: (m: BaseMovieProps) => React.ReactNode;
}

export interface MovieDetailsProps extends BaseMovieProps {
    genres: {
        id: number;
        name: string;
    }[];
    production_countries: {
        iso_3166_1: string;
        name: string;
    }[];
}

export interface MovieImage {
    file_path: string;
    aspect_ratio?: number; //some props are optional...
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
}

export interface MoviePageProps {
    movie: MovieDetailsProps;
    images: MovieImage[];
}

export type FilterOption = "title" | "genre";

export interface MovieListPageTemplateProps extends BaseMovieListProps {
    title: string;
}

export interface Review{
    id: string;
    content: string
    author: string
}

export interface GenreData {
    genres: {
        id: string;
        name: string
    }[];
}

export interface DiscoverMovies {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
}

export interface Review {
    author: string,
    content: string,
    agree: boolean,
    rating: number,
    movieId: number,
}

export interface UpcomingMovies {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseMovieProps[];
}

export interface BasePeopleProps {
    name: string;
    original_name: string;
    id: number;
    gender: number;
    popularity: number;
    profile_path: string;
    biography?: string;
}

export interface PeopleDetailsProps extends BasePeopleProps {
    facebook_id?: string,
    instagram_id?: string,
    tiktok_id?: string,
    twitter_id?: string,
    youtube_id?: string
}

export interface BasePeopleListProps {
    people: BasePeopleProps[];
    action: (m: BasePeopleProps) => React.ReactNode;
}

export interface PeopleListPageTemplateProps extends BasePeopleListProps {
    name: string;
}

export interface DiscoverPeople {
    page: number;
    total_pages: number;
    total_results: number;
    results: BasePeopleListProps[];
}

export interface PersonImage {
    file_path: string;
    aspect_ratio?: number;
    height?: number;
    iso_639_1?: string;
    vote_average?: number;
    vote_count?: number;
    width?: number;
}

export interface BaseTVProps {
    title: string;
    id: number;
    original_language: string;
    overview: string;
    first_air_date: string;
    vote_average: number;
    popularity: number;
    poster_path?: string;
    vote_count: number;
    favourite?: boolean;
    genre_ids?: number[];
}

export interface DiscoverTV {
    page: number;
    total_pages: number;
    total_results: number;
    results: BaseTVProps[];
}