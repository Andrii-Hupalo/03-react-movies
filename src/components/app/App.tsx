"use client";

import { useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Toaster position="top-right" />
      </body>
    </html>
  );
}

export default function App() {
  const [movies, setMovies] = useState([]);

  async function fetchMovies(query) {
    setMovies([]);

    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/search/movie?api_key=YOUR_KEY&query=${query}`
      );
      const data = await res.json();

      if (!data.results || data.results.length === 0) {
        toast("No movies found for your request.");
        return;
      }

      setMovies(data.results);
    } catch (err) {
      toast.error("Error fetching data");
    }
  }

  return (
    <>
      <SearchBar onSubmit={fetchMovies} />

      <main>
        {movies.map((movie) => (
          <p key={movie.id}>{movie.title}</p>
        ))}
      </main>
    </>
  );
}
