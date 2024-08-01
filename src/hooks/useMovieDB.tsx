import { useState, useEffect } from 'react';
import movieDB from '../api/movieDB';
import { LOG } from '../config/logger';
import { Movie } from '../types/movieInterface';


const useMovieDB = (path: string) => {
  const [films, setFilms] = useState<Movie[] | undefined>(undefined);

  const getFilms = async () => {
    try {
      const resp = await movieDB.get(path);
      setFilms(resp.data.results);
      // LOG.info(resp.data.results.length, 'this is from the PlayingNowComponent');
      // LOG.info(films, 'this is from the PlayingNowComponent');
    } catch (error) {
      // Handle error if needed
      LOG.error('Error fetching films:', error);
    }
  };

  useEffect(() => {
    getFilms();
  }, [path]); 
  

  return films;
};

export default useMovieDB;
