import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { img_300, unavailable } from "./../config/config"
import { Badge } from '@material-ui/core';
import Filmmodel from "../components/FilmModel"
const useStyles = makeStyles({
    root: {
        width: "100%",
        backgroundColor: "#282c34",
        color: "white",
        padding: ".6rem",
        transform: "translateX(-3%)"

    },
    media: {
        height: 385,

    },
    title: {
        textAlign: "center"
    },
    content: {
        display: "flex",
        justifyContent: "space-between"
    },
    badge: {
        position: "absolute",
        top: "0",
        right: "0",
    }
});

export default function FilmCard(props) {
    const classes = useStyles(props);
    const [film, setFilm] = useState(props.film)
    return (
        <Filmmodel media_type={film.media_type} id={film.id} >
            <Card className={classes.root} >
                <CardActionArea>
                    <CardMedia
                        className={classes.media}
                        image={film.poster_path ? `${img_300}/${film.poster_path}` : unavailable}
                        title="Contemplative Reptile"
                    >
                        <Badge badgeContent={film.vote_average} color="secondary"
                            className={classes.badge} > </Badge>
                    </CardMedia>

                    <CardContent>
                        <Typography gutterBottom variant="h6" component="h2" className={classes.title} noWrap>
                            {film.original_title ? film.original_title : film.original_name}
                        </Typography>
                        <div className={classes.content}>
                            <Typography style={{ textTransform: "capitalize" }}>{film.media_type}</Typography>
                            <Typography>{film.release_date}</Typography>
                        </div>
                    </CardContent>
                </CardActionArea>
            </Card>
        </Filmmodel>
    );
}
