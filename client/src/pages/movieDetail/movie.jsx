import React, {useEffect, useState} from "react"
import "./movie.css"
import { useParams } from "react-router-dom"
import axios from "axios"

const Movie = () => {
    const [currentMovieDetail, setMovie] = useState()
    const { id } = useParams()

    useEffect(() => {
        getData()
        window.scrollTo(0,0)
    }, [id])

    useEffect(() => {
        checkPlaylist()
    },[id])



    const getData = () => {
        fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=4e44d9029b1270a757cddc766a1bcb63&language=en-US`)
        .then(res => res.json())
        .then(data => setMovie(data)).then(localStorage.setItem("movie_id", id))
    }

    const [remove,setRemove] = useState()

    const checkPlaylist = () => {
        const ids = JSON.parse(localStorage.getItem('movie_id'));
        console.log(ids)
        const email = JSON.parse(localStorage.getItem('email'));
        axios.post('https://moview-4.onrender.com/check',{ids,email})
        .then(result => {
            console.log(result)
            if(result.data === 'available') {
                setRemove(true)
            } else if(result.data === 'not available') {
                setRemove(false)
            }
        })
        .catch((err) => console.log(err))
    }


    const handleAdd = () => {
        setRemove(!remove)
        const id = JSON.parse(localStorage.getItem('movie_id'));
        const email = JSON.parse(localStorage.getItem('email'));
        axios.post('https://moview-4.onrender.com/playlist',{email,id})
        .then((result) => {console.log(result)})
        .catch((err) => console.log(err))
    }

    const handleRemove = () => {
        setRemove(!remove)
        const id = JSON.parse(localStorage.getItem('movie_id'));
        const email = JSON.parse(localStorage.getItem('email'));
        axios.post('https://moview-4.onrender.com/remove',{email,id})
        .then((result) => {console.log(result)})
        .catch((err) => console.log(err))
    }



    return (
        <>
        <div className="movie">
            <div className="movie__intro">
                <img className="movie__backdrop" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.backdrop_path : ""}`} />
            </div>
            <div className="movie__detail">
                <div className="movie__detailLeft">
                    <div className="movie__posterBox">
                        <img className="movie__poster" src={`https://image.tmdb.org/t/p/original${currentMovieDetail ? currentMovieDetail.poster_path : ""}`} />
                    </div>
                </div>
                <div className="movie__detailRight">
                    <div className="movie__detailRightTop">
                        <div className="movie__name">{currentMovieDetail ? currentMovieDetail.original_title : ""}</div>
                        <div className="movie__tagline">{currentMovieDetail ? currentMovieDetail.tagline : ""}</div>
                        <div className="movie__rating">
                            {currentMovieDetail ? currentMovieDetail.vote_average: ""} <i class="fas fa-star" />
                            <span className="movie__voteCount">{currentMovieDetail ? "(" + currentMovieDetail.vote_count + ") votes" : ""}</span>
                        </div>  
                        <div className="movie__runtime">{currentMovieDetail ? currentMovieDetail.runtime + " mins" : ""}</div>
                        <div className="movie__releaseDate">{currentMovieDetail ? "Release date: " + currentMovieDetail.release_date : ""}</div>
                        <div className="movie__genres">
                            {
                                currentMovieDetail && currentMovieDetail.genres
                                ? 
                                currentMovieDetail.genres.map(genre => (
                                    <><span className="movie__genre" id={genre.id}>{genre.name}</span></>
                                )) 
                                : 
                                ""
                            }
                        </div>
                        {
                            remove?
                            <button className="playlist__btn" onClick={handleRemove}>Remove from playlist</button>
                            :<button className="playlist__btn" onClick={handleAdd}>Add to playlist</button>
                        }
                    </div>
                    <div className="movie__detailRightBottom">
                        <div className="synopsisText">Synopsis</div>
                        <div>{currentMovieDetail ? currentMovieDetail.overview : ""}</div>
                    </div>
                    
                </div>
            </div>


            <div className="movie__links">
                <div className="movie__heading">Useful Links</div>
                {
                    currentMovieDetail && currentMovieDetail.homepage && <a href={currentMovieDetail.homepage} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__homeButton movie__Button">Homepage <i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
                {
                    currentMovieDetail && currentMovieDetail.imdb_id && <a href={"https://www.imdb.com/title/" + currentMovieDetail.imdb_id} target="_blank" style={{textDecoration: "none"}}><p><span className="movie__imdbButton movie__Button">IMDb<i className="newTab fas fa-external-link-alt"></i></span></p></a>
                }
            </div>
            
            <div className="movie__heading">Production companies</div>
            <div className="movie__production">
                {
                    currentMovieDetail && currentMovieDetail.production_companies && currentMovieDetail.production_companies.map(company => (
                        <>
                            {
                                company.logo_path 
                                && 
                                <span className="productionCompanyImage">
                                    <img className="movie__productionComapany" src={"https://image.tmdb.org/t/p/original" + company.logo_path} />
                                    <span>{company.name}</span>
                                </span>
                            }
                        </>
                    ))
                }
            </div>
           
        </div>
        </>
    )
}

export default Movie
