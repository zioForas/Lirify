import { createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

    export const shazamCoreApi = createApi({
        reducerPath: 'shazamCoreApi',
        baseQuery: fetchBaseQuery({
            baseUrl: 'https://shazam-core.p.rapidapi.com/v1',
            prepareHeaders: (headers) => {
                headers.set('X-RapidAPI-Key', 'a0c58acb90msha36da496af6f0adp103f9ajsnbbb8dd07a3a8')
                
                return headers;
            },
        }),
        // API ENDPOINTS
        endpoints: (builder) => ({
            // fetching top world charts from API
            getTopCharts: builder.query({ query: () => '/charts/world'}),
            // fething songs by genre
            getSongsByGenre: builder.query({query: (genre) => `/charts/genre-world?genre_code=${genre}`}),
            // fetching song id and details from API
            getSongDetails: builder.query({ query: ({ songid }) => `/tracks/details?track_id=${songid}` }),
                                                 //destructure song id                   //pass it here
            // fetching related songs
            getSongRelated:builder.query({ query: ({ songid }) => `/tracks/related?track_id=${songid}`}), 
            // fetching artist details
            getArtistDetails: builder.query({query:(artistId) => `/artists/details?artist_id=${artistId}` }),    
            // fetching user location, spooky
            getSongsByCountry: builder.query({query: (countryCode) => `/charts/country?country_code=${countryCode}`}),
            // fetching search results
            getSongsBySearch: builder.query({query: (searchTerm)=> `/search/multi?search_type=SONGS_ARTISTS&query=${searchTerm}`})
        }),                                


    })
            //passing them as arguments so they can be used
    export const {
        useGetTopChartsQuery,
        useGetSongsByGenreQuery,
        useGetSongDetailsQuery,
        useGetSongRelatedQuery,
        useGetArtistDetailsQuery,
        useGetSongsByCountryQuery,
        useGetSongsBySearchQuery,
    } = shazamCoreApi;