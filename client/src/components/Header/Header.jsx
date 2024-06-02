import {React,useState} from "react"
import "./Header.css"
import { Link } from "react-router-dom"
import { useNavigate } from "react-router-dom";
import {Search} from 'lucide-react'


const Header = () => {

    const [searchText,setSearchText] = useState("")

    const navigate=useNavigate();
    
    const upadateSearchText = (e) => {
        setSearchText(e.target.value)
      }
  
    const filterSearch = () =>{
        const text = searchText;
        setSearchText("")
        navigate(`/movies/search/${text}`)
    }

    //const username = JSON.parse(localStorage.getItem('email'));
    const login = JSON.parse(localStorage.getItem('login'));

    const hadleLogout = () => {
        localStorage.setItem('login', false);
        localStorage.setItem('email', "");
        navigate('/signin')
    }

    return (

        <div className="header">
            <div className="headerLeft">
                <Link to="/home" style={{textDecoration: "none"}}><h1 className="header__icon">MoView</h1></Link>
                {
                login?<>
                <Link to="/movies/popular" style={{textDecoration: "none"}}><span>Popular</span></Link>
                <Link to="/movies/top_rated" style={{textDecoration: "none"}}><span>Top Rated</span></Link>
                <Link to="/movies/upcoming" style={{textDecoration: "none"}}><span>Upcoming</span></Link>
                <Link to="/movies/playlist" style={{textDecoration: "none"}}><span>My Playlist</span></Link></>
                :<div></div>
                }
            </div>
            {login?
            <div className="headerRight">
                <input type="text" value={searchText} onChange={upadateSearchText} className="searchbar" />
                <button onClick={filterSearch} className="searchbtn"><Search /></button>
                <button className="logout__btn" onClick={hadleLogout}>Log out</button>
            </div>:<div></div>
            }

        </div>
    )
}

export default Header