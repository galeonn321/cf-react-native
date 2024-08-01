import React, { useState, useEffect } from 'react'
import movieDB from '../api/movieDB';
import { LOG } from '../config/logger';
import searchMovieDB from '../api/searchMovieDB';
import { Movie } from '../types/movieInterface';

const useSearchMovieDB = ({ path }: any) => {
    LOG.debug(path, 'path hahaha')
    const [films, setFilms] = useState<object>({});


    // const getFilmsFromSearch = async () => {
    //     const resp = await searchMovieDB.get(path);
    //     LOG.info(resp.data.results, 'this is from the searchMovieDB')
    //     setFilms(resp.data.results)
    // }



    // useEffect(() => {
    //     getFilmsFromSearch();
    // }, [path]);

    return [films, setFilms]
}

export default useSearchMovieDB;