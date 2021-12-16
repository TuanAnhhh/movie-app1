import axios from 'axios'
import React from 'react'
import { useState, useEffect } from "react"
import { Grid } from "@material-ui/core"
import FilmCard from "./../components/FilmCard"
import { makeStyles } from '@material-ui/styles';
import CustomPagination from "./../components/CustomPagination"
import { API_KEY } from "../constants/constants"
import { TextField, Button, Tabs, Tab } from '@material-ui/core'
import { ThemeProvider, createTheme } from "@material-ui/core/styles"
import SearchIcon from "@material-ui/icons/Search"

const useStyles = makeStyles({
    root: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    searchForm: {
        display: "flex",
        justifyContent: "center"
    },
    text: {
        color: "white",
        width: "500px",
        marginRight: "1rem"
    },
    searchIcon: {
    }

})
const themes = createTheme({
    palette: {
        type: "dark",
        primary: {
            main: "#fff"
        }
    }
})

function Search() {
    const classed = useStyles();
    const [page, setPage] = useState(1)
    const [type, setType] = useState(0)
    const [searchText, setSearchText] = useState("")
    const [films, setFilms] = useState([])
    const [numOfPages, setNumOfPages] = useState()
    const fetchSearch = async () => {
        try {
            const { data } = await axios.get(
                `https://api.themoviedb.org/3/search/${type ? "tv" : "movie"}?api_key=${API_KEY}&language=en-US&query=${searchText}&page=${page}&include_adult=false`
            );
            setFilms(data.results);
            setNumOfPages(data.total_pages);
            // console.log(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        window.scroll(0, 0);
        fetchSearch();
        // eslint-disable-next-line
    }, [type, page]);
    return (
        <ThemeProvider theme={themes}>
            <div className={classed.root}>
                <div className={classed.searchForm}>
                    <TextField
                        label="Search..."
                        variant="filled"
                        className={classed.text}
                        color="primary"
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button
                        variant="container"
                        color="primary"
                        label="Search"
                        className={classed.searchIcon}
                        onClick={fetchSearch}
                    >
                        <SearchIcon />
                    </Button>
                </div>
                <Tabs
                    value={type}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={(event, newValue) => {
                        setType(newValue)
                        setPage(1)
                    }}
                >
                    <Tab label="Search Movies" />
                    <Tab label="Search TV Series" />
                </Tabs>
                <Grid container spacing={2}  >
                    {films && films.map(item => (
                        <Grid item md={3} xs={6}>
                            <FilmCard
                                key={item.id}
                                film={item}
                            />
                        </Grid>

                    ))}
                    {searchText && !films && (type ? <h3>No Series Found</h3> : <h3>No Movies Found</h3>)}
                </Grid>

                {numOfPages > 1 && (
                    <CustomPagination
                        setPage={setPage}
                        numOfPages={numOfPages}
                    />)}

            </div>
        </ThemeProvider>

    )
}

export default Search
