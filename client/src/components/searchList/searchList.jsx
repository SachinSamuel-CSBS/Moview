import React, {useEffect, useState} from "react"
import "./searchList.css"
import { useParams } from "react-router-dom"
import Cards from "../card/card"

const SearchList = () => {
    
    const [searchList, setSearchList] = useState([])
    const {name} = useParams()

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        getData()
    }, [name])

    const getData = () => {
        fetch(`https://api.themoviedb.org/3/search/movie?api_key=4e44d9029b1270a757cddc766a1bcb63&query=${name}`)
        .then(res => res.json())
        .then(data => setSearchList(data.results))
    }

    return (
        <div className="movie__list">
            <h2 className="list__title">Top Results</h2>
            <div className="list__cards">
                {
                    searchList.length > 0? (
                    searchList.map(movie => (
                        <Cards movie={movie} />
                    )))
                    :
                    (<h2 className="no">No Result Found</h2> )   
                }
            </div>
        </div>
    )
}

export default SearchList