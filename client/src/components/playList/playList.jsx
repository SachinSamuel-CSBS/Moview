import React, { useEffect, useState } from "react";
import "./playlist.css";
import { useParams } from "react-router-dom";
import Cards from "../card/card";
import axios from "axios";

const PlayList = () => {
    const [movieList, setMovieList] = useState([]);
    const { type } = useParams();

    useEffect(() => {
        const email = JSON.parse(localStorage.getItem('email'));
        axios.get(`http://localhost:3001/movies/${email}`)
            .then(result => {
                const ids = result.data.movies;
                fetchMovies(ids);
            })
            .catch(err => console.log(err));
    }, []);

    const fetchMovies = (ids) => {
        const promises = ids.map(id => {
            return fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
                .then(res => res.json());
        });

        Promise.all(promises)
            .then(data => {
                setMovieList(data);
            })
            .catch(error => {
                console.error('Error fetching movies:', error);
                setMovieList([]);
            });
    };

    return (
        <div className="movie__list">
            <h2 className="list__title">My Playlist</h2>
            <div className="list__cards">
                {
                    movieList.length > 0 ?
                    (movieList.map((movie, index) => (
                        <Cards key={index} movie={movie} />
                    )))
                    : (<h2 className="no">" No Movies Added "</h2>)
                }
            </div>
        </div>
    );
};

export default PlayList;
