import axios from 'axios'
import React, { useEffect } from 'react'
import { API_KEY } from "./../constants/constants"
import Chip from '@material-ui/core/Chip';
import { ThemeProvider } from "@material-ui/styles"
import { createTheme } from '@material-ui/core'

const darkTheme = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#0000EE",
        },
        secondary: {
            main: "#fff",
        },
    }
})



function Genres(props) {
    const { type, selectedGenres, setSelectedGenres, genres, setGenres, setPage } = props

    const fetchGenres = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/genre/${type}/list?api_key=${API_KEY}&language=en-US`
        );
        setGenres(data.genres);
    }
    useEffect(() => {
        fetchGenres();
        return () => {
            setGenres({})
        }
    }, [])

    const handleAdd = (genre) => {
        setSelectedGenres([...selectedGenres, genre])
        setGenres(genres.filter(g => g.id !== genre.id))
        setPage(1)
    }
    const handleRemove = (genre) => {
        setSelectedGenres(
            selectedGenres.filter((selected) => selected.id !== genre.id)
        );
        setGenres([...genres, genre]);
        setPage(1)
    }
    return (
        <ThemeProvider theme={darkTheme}>
            <div>
                {selectedGenres.map((genre) => (
                    <Chip
                        style={{ margin: 2 }}
                        label={genre.name}
                        key={genre.id}
                        color="primary"
                        clickable
                        key={genre.id}
                        size="small"
                        onDelete={() => handleRemove(genre)}
                    />
                ))}
                {genres && genres.map(genre => (
                    <Chip
                        label={genre.name}
                        style={{ margin: 2 }}
                        color="secondary"
                        clickable
                        key={genre.id}
                        size="small"
                        onClick={() => handleAdd(genre)}
                    />
                ))}
            </div>
        </ThemeProvider>
    )
}
export default Genres
