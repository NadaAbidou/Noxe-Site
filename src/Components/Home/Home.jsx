
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import MediaItem from './../MediaItem/MediaItem';

export default function Home() {

  const [movies, setMovies] = useState([])
  const [tv, setTv] = useState([])
  const [people, setPeople] = useState([])

  async function getTrending(mediaType, callback) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/trending/${mediaType}/week?api_key=eac04f79494b94483227629a5ceeb89c`)
    callback(data?.results)
    // console.log(data.results);
  }

  useEffect(() => {
    getTrending('movie', setMovies)
    getTrending('tv', setTv)
    getTrending('person', setPeople)
  }, [])


  return <>
    <Helmet>
      <meta charSet="utf-8" />
      <title>Home Page</title>
    </Helmet>

    {movies[0] ? <>
      <div className="row py-3">

        <div className="col-md-4 d-flex align-items-center">
          <div >
            <div className='brdr w-25 mb-3'></div>
            <h2 className='h3'>Trending <br /> Movies <br /> Right Now</h2>
            <p className='text-muted py-2'>Top Trending Movies by Week </p>
            <div className='brdr w-100 mt-3'></div>
          </div>

        </div>
        {movies.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}

      </div>
      <div className="row">

        <div className="col-md-4 d-flex align-items-center">
          <div >
            <div className='brdr w-25 mb-3'></div>
            <h2 className='h3'>Trending <br /> Tvs <br /> Right Now</h2>
            <p className='text-muted py-2'>Top Trending Tvs by Week </p>
            <div className='brdr w-100 mt-3'></div>
          </div>

        </div>
        {tv.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}

      </div>
      <div className="row py-5">

        <div className="col-md-4 d-flex align-items-center">
          <div >
            <div className='brdr w-25 mb-3'></div>
            <h2 className='h3'>Trending <br /> People <br /> Right Now</h2>
            <p className='text-muted py-2'>Top Trending People by Week </p>
            <div className='brdr w-100 mt-3'></div>
          </div>

        </div>
        {people.slice(0, 10).map((item, index) => <MediaItem key={index} item={item} />)}

      </div> </>
      : <div className='loading d-flex vh-100 align-items-center justify-content-center'> <i className='fas fa-spinner fa-spin fa-8x'></i> </div>
    }



  </>

}
