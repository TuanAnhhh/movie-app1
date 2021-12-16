import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import axios from "axios"
import { API_KEY } from "./../constants/constants"
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import { unavailable, img_500 } from "./../config/config"
import { Button } from '@material-ui/core';
import YouTubeIcon from '@material-ui/icons/YouTube';
import Carousel from './../components/Carousel'
const useStyles = makeStyles((theme) => ({

    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: "#39445a",
        border: '1px solid #fff',
        borderRadius: ".5rem",
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 2, 2),
        height: "60%",
        width: "60%",
        display: "flex",

    },
    media: {
        width: 400,
        paddingTop: '50%', // 16:9
        objectFit: "cover",
        borderRadius: "10px",
        boxShadow: "0 0 5px black"
    },
    content: {
        flex: 1,
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
    },
    content1: {
        width: 800,
    },
    btnWatch: {
        color: "white",
        backgroundColor: "red",
        width: "100%"
    },
    overview: {
        padding: "1rem",
        boxShadow: "0px 0px .5rem black",
        borderRadius: ".5rem",
        margin: "1rem 0"
    },
    carousel: {
        width: "100%",
    },
    buttonModel: {
        width: "100%",
        height: "100%",
        backgroundColor: "#282c34",
        border: "none",

    }
}));

export default function TransitionsModal({ children, media_type, id }) {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [content, setContent] = useState();
    const [video, setVideo] = useState();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };
    const fetchData = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}?api_key=${API_KEY}&language=en-US`
        );

        setContent(data);
        console.log(data.poster_path);
    };

    const fetchVideo = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/videos?api_key=${API_KEY}&language=en-US`
        );

        setVideo(data.results[0]?.key);
    };

    useEffect(() => {
        fetchData();
        fetchVideo();
        // eslint-disable-next-line
    }, []);

    return (
        <>
            <button type="button" onClick={handleOpen} className={classes.buttonModel}>
                {children}
            </button>
            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                className={classes.modal}
                open={open}
                onClose={handleClose}
                closeAfterTransition
                BackdropComponent={Backdrop}
                BackdropProps={{
                    timeout: 500,
                }}
            >
                <Fade in={open}>
                    {content && (
                        <div className={classes.paper}>
                            <CardMedia
                                className={classes.media}
                                image={content.poster_path ? `${img_500}/${content.poster_path}` : unavailable}
                            />
                            <CardContent className={classes.content}>
                                <div className={classes.content1}>
                                    <Typography variant="h4" color="secondary" component="p">
                                        {content.name || content.title} (
                                        {
                                            (
                                                content.first_air_date ||
                                                content.release_date ||
                                                "----"
                                            ).substring(0, 4)
                                        }
                                        )
                                    </Typography>
                                    <Typography variant="body1" color="secondary" component="p">
                                        {content.tagline}
                                    </Typography>
                                    <Typography variant="body2" color="secondary" component="p" className={classes.overview}>
                                        {content.overview}
                                    </Typography>

                                    <Carousel media_type={media_type} id={id} className={classes.carousel} />
                                </div>
                                <Typography variant="body2" color="secondary" component="p">
                                    <Button
                                        variant="container"
                                        startIcon={<YouTubeIcon />}
                                        color="primary"
                                        target="__blank"
                                        href={`https://www.youtube.com/watch?v=${video}`}
                                        className={classes.btnWatch}
                                    >
                                        Watch trailer!
                                    </Button>
                                </Typography>
                            </CardContent>

                        </div>
                    )}
                </Fade>
            </Modal>
        </>
    );
}
