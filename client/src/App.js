import React, { useState, useEffect } from "react";
import { Route, Link } from "react-router-dom";
import SavedList from "./Movies/SavedList";
import MovieList from "./Movies/MovieList";
import Movie from "./Movies/Movie";
import axios from "axios";
import UpdateForm from "./Components/UpdateForm";
import AddMovie from "./Components/AddMovie";

const App = () => {
  const [savedList, setSavedList] = useState([]);
  const [movieList, setMovieList] = useState([]);

  const getMovieList = () => {
    axios
      .get("http://localhost:5000/api/movies")
      .then((res) => setMovieList(res.data))
      .catch((err) => console.log(err.response));
  };

  const addToSavedList = (movie) => {
    setSavedList([...savedList, movie]);
  };

  const addMovie = (newMovie) => {
    setMovieList([...movieList, newMovie]);
  };

  useEffect(() => {
    getMovieList();
  }, []);

  return (
    <>
      <Link to="/add-movie">Add Movie</Link>
      <SavedList list={savedList} />

      <Route exact path="/">
        <MovieList movies={movieList} />
      </Route>

      <Route path="/movies/:id">
        <Movie addToSavedList={addToSavedList} />
      </Route>

      <Route path="/update-movie/:id">
        <UpdateForm setMovieList={setMovieList} />
      </Route>

      <Route path="/add-movie">
        <AddMovie addMovie={addMovie} />
      </Route>
    </>
  );
};

export default App;
