import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"
import { Typography, Grid } from "@material-ui/core"
import FilmCard from "./../components/FilmCard"
import { makeStyles } from '@material-ui/styles';
import CustomPagination from "./../components/CustomPagination"
import { API_KEY } from "../constants/constants"
import Genres from "./../components/Genres"
import useGenres from "./../hooks/useGenres"
const useStyles = makeStyles({
    title: {
        textAlign: "center",
        fontSize: "2rem",
        fontWeight: "200",
        textTransform: "uppercase"
    },
    container: {
        marginTop: "1rem",
    },

})

function Movies() {
    const [films, setFilms] = useState([])
    const [page, setPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState()
    const [selectedGenres, setSelectedGenres] = useState([])
    const [genres, setGenres] = useState([])
    const classes = useStyles();
    const genreforURL = useGenres(selectedGenres);
    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=false&page=${page}&with_genres=${genreforURL}`
        );

        setFilms(data.results);
        setNumOfPages(data.total_pages)
    };


    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
    }, [page, genreforURL])

    return (
        <div>
            <Typography variant="h5" className={classes.title}>TV Series</Typography>
            <Genres
                type="tv"
                selectedGenres={selectedGenres}
                setSelectedGenres={setSelectedGenres}
                genres={genres}
                setGenres={setGenres}
                setPage={setPage}
            />
            <Grid container spacing={2} className={classes.container} >
                {films && films.map(item =>
                    <Grid item md={3} xs={6}>
                        <FilmCard
                            key={item.id}
                            film={item}
                        />
                    </Grid>
                )}
            </Grid>
            <CustomPagination
                setPage={setPage}
                numOfPages={numOfPages}
            />
        </div>
    )
}

export default Movies
