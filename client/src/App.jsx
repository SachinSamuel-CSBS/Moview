import { useState } from 'react'
import './App.css'
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Header from "./components/Header/Header";
import Signup from './pages/Signup/Signup'
import Signin from './pages/Signin/Signin';
import Home from './pages/home/home';
import MovieList from './components/movieList/movieList';
import Movie from './pages/movieDetail/movie';
import SearchList from './components/searchList/searchList';
import PlayList from './components/playList/playList';

function App() {

  return (
    <div className="App">
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Signup />}></Route>
        <Route path='/signin' element={<Signin />}></Route>
        <Route path='/home' element={<Home />}></Route>
        <Route path="movie/:id" element={<Movie />}></Route>
        <Route path="movies/:type" element={<MovieList />}></Route>
        <Route path="movies/search/:name" element={<SearchList />}></Route>
        <Route path="movies/playlist" element={<PlayList />}></Route>
      </Routes>
    </BrowserRouter>
    </div>
  )
}

export default App
