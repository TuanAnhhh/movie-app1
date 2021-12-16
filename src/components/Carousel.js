import React, { useState, useEffect } from 'react';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';
import axios from "axios"
import { API_KEY } from "./../constants/constants"
import { noPicture, img_300 } from '../config/config';
import { makeStyles } from '@material-ui/core/styles';

const handleDragStart = (e) => e.preventDefault();
const useStyles = makeStyles(() => ({
    carouselItem: {
        margin: ".5rem",
        color: "white",
        objectFit: "contain",
        display: "flex",
        flexDirection: "column"

    },
    carouselItem__img: {
        width: "100%",
        boxShadow: "0px 0px 5px black",
        borderRadius: "10px",
        marginBottom: ".5rem"
    }
}))


const Gallery = ({ media_type, id }) => {
    const classes = useStyles();
    const [credits, setCredits] = useState([])
    const fetchCredits = async () => {
        const { data } = await axios.get(
            `https://api.themoviedb.org/3/${media_type}/${id}/credits?api_key=${API_KEY}&language=en-US`
        )
        setCredits(data.cast)
    }
    useEffect(() => {
        fetchCredits();
    }, [])
    const items = credits.map(c => (
        <div className={classes.carouselItem}>
            <img
                src={c.profile_path ? `${img_300}/${c.profile_path}` : noPicture}
                alt={c?.name}
                onDragStart={handleDragStart}
                className={classes.carouselItem__img}
            />
            <b>{c.name}</b>
        </div>
    ))
    const responsive = {
        0: {
            items: 3,
        },
        512: {
            items: 5,
        },
        1024: {
            items: 5,
        },
    };


    return (
        <AliceCarousel
            mouseTracking
            items={items}
            responsive={responsive}
            autoPlay
            infinite
            disableDotsControls
            disableButtonsControls
        />
    );
}
export default Gallery;
