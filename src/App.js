import Header from "./components/Header"
import { makeStyles } from '@material-ui/styles';
import { Container, Paper } from '@material-ui/core';
import SimpleBottomNavigation from "./components/MainNav"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Trending from "./pages/Trending"
import Movies from "./pages/Movies"
import Series from "./pages/Series"
import Search from "./pages/Search"
const useStyles = makeStyles({

    root: {
        minHeight: "100vh",
        backgroundColor: "#39445a",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        position: "relative"
    },
    container: {
        color: "white",
        marginTop: "3.5rem",
        flex: "1",
        padding: "3.5rem"
    },
    navbot: {

    },


})

function App() {
    const classes = useStyles();
    return (
        <Router >
            <div className={classes.root}>
                <Header className={classes.header} />
                <Container className={classes.container} >
                    <Switch>
                        <Route exact path="/"
                            render={(props) => <Trending {...props} />}
                        />
                        <Route path="/movies"
                            render={(props) => <Movies {...props} />}
                        />
                        <Route path="/series"
                            render={(props) => <Series {...props} />}
                        />
                        <Route path="/search"
                            render={(props) => <Search {...props} />}
                        />
                    </Switch>
                </Container>
                <SimpleBottomNavigation className={classes.navbot} />

            </div>
        </Router>
    );
}

export default App;
