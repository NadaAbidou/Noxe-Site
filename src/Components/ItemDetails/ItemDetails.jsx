import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router-dom'


export default function ItemDetails() {

  let { id, MediaType } = useParams();

  const [details, setDetails] = useState({});

  async function getTrending(id, MediaType) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/${MediaType}/${id}?api_key=eac04f79494b94483227629a5ceeb89c`)
    setDetails(data)
    console.log(data);
  }

  useEffect(() => {
    getTrending(id, MediaType)

  }, [])

  return <>

    <Helmet>
      <meta charSet="utf-8" />
      {details.title ? <title>{`${details.title}`}</title>
        :
        <title>{`${details.name}`}</title>
      }

    </Helmet>

    {details !== {} ? <div className='row'>
      <div className="col-md-4">
        {details?.poster_path ? <img src={`https://image.tmdb.org/t/p/w500` + details.poster_path} alt="posterPath" className='w-100 mt-4' />
          :
          <img src={`https://image.tmdb.org/t/p/w500` + details?.profile_path} alt="posterPath" className='w-100 mt-4' />
        }
      </div>

      <div className="col-md-6 d-flex align-items-center">
        <div>
          <h2 className=' my-3'>{details.title} {details.name}</h2>
          <p className='text-muted my-3'>{details.overview} {details.biography}</p>
          {details.vote_average ? <h4>Vote average : {details.vote_average}</h4>
            : ''}

          {details.vote_count ? <h4>Vote count : {details.vote_count}</h4>
            : ''}
        </div>
      </div>
    </div>
      :
      <div className='loading d-flex vh-100 align-items-center justify-content-center'> <i className='fas fa-spinner fa-spin fa-8x'></i> </div>

    }
  </>
}
