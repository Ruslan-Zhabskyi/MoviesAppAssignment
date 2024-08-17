# React App Assignment

###### Full Stack Development 2, HDip in Computer Science

__Name:__ Ruslan Zhabskyi

__Video Demo:__ [ Edit YouTube](https://youtube.com)

This repository contains an implementation of the Movie Fans Web Application using the React library. 

### Features
[ A bullet-point list of the __new features__ you added to the Movies Fan app (and any **modifications to existing features**) .]

+ Feature 1
+ Feature 2
+ Feature 3
+ etc
+ etc

### Setup requirements.

+ sign up to supabase and create new project https://supabase.com/docs/guides/getting-started/tutorials/with-react
+ sign up to LlamaAPI and generate API token
+ run:
  + npm install axios
  + npm install llamaai
  + npm install @supabase/supabase-js
+ .env file must include:
  + VITE_TMDB_KEY= ...
  + VITE_SUPABASE_URL= ... 
  + VITE_SUPABASE_ANON_KEY= ... 
  + VITE_API_TOKEN= {this is LlamaAPI token: https://www.llama-api.com/}



### API endpoints

+ Popular Actors - /popular/people
+ Actor Details - /popular/people/:id
+ Trending Tv Series - /tv/trending


### Routing

Public routes:
+ /popular/people - displays popular actors
+ /popular/people/:id - displays selected actor information such as photos, overview, links to availible social media and popularity
+ /tv/trending - displays trending TV series
+ /login - login page

Protected routes that require authentication:

+ /movies/upcoming/watchlater - displays watch later movies
+ /search - multi-criteria search page to look for movies
+ /fantasy - page where you can define or generate using GenAI your Fanstasy Movie
+ /people/favourite - displays actors marked as favourite


### Third Party Components/Integration

+ Supabase Authentication by using magic link  
+ LlamaAPI to enhance the fantasy movie creation process: generates kids and Quentin Tarantino version
+ Pagination for data-listing pages such as Home, Upcoming, Trending, TV series, Popular Actors
+ Implemented transation functionality: English-Ukrainian, Ukrainian-English 


### Independent learning

+ Pagination: [online resources](https://tanstack.com/query/latest/docs/framework/react/guides/paginated-queries?from=reactQueryV3)
  + [tmdb-api.ts lines: 188-200](https://github.com/Ruslan-Zhabskyi/MoviesAppAssignment/blob/master/src/api/tmdb-api.ts)
  + [popularMoviesPage.tsx lines: 28-33](https://github.com/Ruslan-Zhabskyi/MoviesAppAssignment/blob/master/src/pages/popularMoviesPage.tsx)
+ Third Party Authentication with supabase: [online resources](https://supabase.com/docs/guides/getting-started/tutorials/with-react)
  +
+ LlamaAPI: [online resources](https://docs.llama-api.com/essentials/function)

Itemize the technologies/techniques you researched independently and adopted in your project, 
i.e. aspects not covered in the lectures/labs. Include the source code filenames that illustrate these 
(we do not require code excerpts) and provide references to the online resources that helped you (articles/blogs).