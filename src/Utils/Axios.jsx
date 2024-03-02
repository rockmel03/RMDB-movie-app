import axios from "axios";

const instance  = axios.create({
    baseURL : "https://api.themoviedb.org/3/",
    headers: {
        accept: 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmZjE3MmYxZjEzNmE4MTM5NzA3YTU3MzAxMTkwYTNlMiIsInN1YiI6IjY1ZDk5MjZhNzJkODU1MDE2MmJiOTBkZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.KfR4hmbSQMWbW-K70u9KjK6Q3m9FzeHyNKbgKbxvldk'
      }
})

export default instance