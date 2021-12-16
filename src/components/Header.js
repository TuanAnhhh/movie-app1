import React from "react";
import { AppBar, Toolbar, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
const useStyles = makeStyles({
    title: {
        textTransform: "uppercase",
        fontSize: "2.5vw",
        fontFamily: "Montserrat",
    },
    toolbar: {
        margin: "auto",
        height: "5rem",
    },
});
function Header() {
    const classes = useStyles();
    return (
        <>
            <AppBar elevation={10} position="fixed">
                <Toolbar className={classes.toolbar}>
                    <Typography className={classes.title}>
                        {" "}
                        TA' MOVIE
                    </Typography>
                </Toolbar>
            </AppBar>
        </>
    );
}

export default Header;
