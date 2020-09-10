import React, { useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";

const AddMovie = (props) => {
    const {push} = useHistory()
  const [form, setForm] = useState({
    id: "",
    title: "",
    director: "",
    metascore: "",
    stars: "",
  });

  const handleChanges = (e) => {
      e.preventDefault();
      setForm({...form, [e.target.name]: e.target.value})
  }

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log(form)
      axios.post(`http://localhost:5000/api/movies/`, form)
      .then(res => console.log(res))
      .catch(err => console.log(err))
      props.AddMovie(form)
      push("/")
      setForm({ id: "", title: "", director: "", metascore: "", stars: ""})

  }

  return(
      <form onSubmit={handleSubmit}>
          <input type="number" value={form.id} name="id" onChange={handleChanges} placeholder="Enter ID"></input>
          <input type="text" value={form.title} name="title" onChange={handleChanges} placeholder="Enter Title"></input>
          <input type="text" value={form.director} name="director" onChange={handleChanges} placeholder="Enter Director"></input>
          <input type="number" value={form.metascore} name="metascore" onChange={handleChanges} placeholder="Enter Metascore"></input>
          <input type="text" value={form.stars} name="stars" onChange={handleChanges} placeholder="Enter Stars"></input>
          <button type="submit">Add Movie</button>
      </form>
  )
};

export default AddMovie;
