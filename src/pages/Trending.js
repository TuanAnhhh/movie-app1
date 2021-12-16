import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"
import { Typography, Grid } from "@material-ui/core"
import FilmCard from "./../components/FilmCard"
import { makeStyles } from '@material-ui/styles';
import CustomPagination from "./../components/CustomPagination"
import { API_KEY } from "../constants/constants"
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

function Trending() {
    const [films, setFilms] = useState([])
    const [page, setPage] = useState(1)
    const [numOfPages, setNumOfPages] = useState()
    const classes = useStyles();

    const fetchTrending = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/trending/all/day?api_key=${API_KEY}&page=${page}`
        );

        setFilms(data.results);
        setNumOfPages(data.total_pages)
    };


    useEffect(() => {
        window.scroll(0, 0);
        fetchTrending();
    }, [page])

    return (
        <div>
            <Typography variant="h5" className={classes.title}>Trending</Typography>
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

export default Trending
