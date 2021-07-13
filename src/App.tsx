import { Box } from '@material-ui/core';
import axios from 'axios';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import './App.css';
import { FilmCard } from './components/filmCard';
import { PopupModal } from './components/popup';
import { findItemInArrayOfObject } from './utils/functions';

function App() {

  const [data, setData] = useState<any[]>([]); 
  const [dataLiked, setDataLiked] = useState<any[]>([]);

  useEffect(() => {
    const getMovieRequest = async () => {
      const result = await axios(
        'https://api.themoviedb.org/3/discover/tv?api_key=92b418e837b833be308bbfb1fb2aca1e&language=fr-FR&sort_by=popularity.desc&page=1&timezone=America/New_York&include_null_first_air_dates=false',
      );
      setData(result.data.results);
    }
    getMovieRequest();
  },[]);

  
  const onClickLike = (id: number) => {
    const film = findItemInArrayOfObject(data, id);
    if(findItemInArrayOfObject(dataLiked, id)){
      setData([...data, findItemInArrayOfObject(dataLiked, id)]);
      const newList = dataLiked.filter((v) => v !== findItemInArrayOfObject(dataLiked, id));
      setDataLiked([...newList]);
    } else {
      setDataLiked([...dataLiked, film]);
      const newList = data.filter((v) => v !== film);
      setData([...newList]);
    };
  };

  const [currentFilm, setCurrentFilm] = useState<Record<string, any>>();
  const [openPopup, setOpenPopup] = useState(false);

  const onClickShare = (id: number) => {
    let film = findItemInArrayOfObject(data, id);
    if(film === undefined){
      film = findItemInArrayOfObject(dataLiked, id);
    }
    setCurrentFilm(film);
    setOpenPopup(true);
  };

  const onClickDelete = (id: number) => {
    const film = findItemInArrayOfObject(data, id);
    const newList = data.filter((v) => v !== film);
    setData([...newList]);
  };


  return (
    <Box className="App">
      <header className="App-header">
        <h1>Cine React</h1>
      </header>
      <section className="Section">
        <h1>Films et séries du moment aux US</h1>
        <PopupModal 
          title={currentFilm !== undefined && currentFilm.name} 
          image={currentFilm !== undefined && currentFilm.backdrop_path} 
          openPopup={openPopup} 
          setOpenPopup={setOpenPopup} 
        />
        <Box display="flex" flexDirection="row" className="image-container">
          {data.map(item => (
            <FilmCard 
              key={item.id}
              id={item.id}
              name={item.name} 
              textOverview={item.overview} 
              poster_path={item.poster_path} 
              backdrop_path={item.backdrop_path}
              date={item.first_air_date}
              vote_average={item.vote_average}
              totalLikes={item.popularity}
              vote_count={item.vote_count}
              onClickLike={onClickLike}
              onClickShare={onClickShare}
              onClickDelete={onClickDelete}
            />              
          ))}
        </Box>
      </section>
      <section className="Section">
        {dataLiked.length !== 0 && <h1>Films et séries en favoris</h1>}
        <Box display="flex" flexDirection="row" className="image-container">
          {dataLiked.map(item => (
            <FilmCard 
              liked
              key={item.id}
              id={item.id}
              name={item.name} 
              textOverview={item.overview} 
              poster_path={item.poster_path} 
              backdrop_path={item.backdrop_path}
              date={item.first_air_date}
              vote_average={item.vote_average}
              totalLikes={item.popularity}
              vote_count={item.vote_count}
              onClickLike={onClickLike}
              onClickShare={onClickShare}
              onClickDelete={onClickDelete}
            />              
          ))}
        </Box>
      </section>
    </Box>
  );
}

export default App;
