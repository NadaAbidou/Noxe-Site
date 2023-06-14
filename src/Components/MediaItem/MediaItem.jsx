import React from 'react'
import { Link } from 'react-router-dom'

export default function MediaItem({ item }) {
  return <>
    <div className='col-md-2'>
      <Link className='text-decoration-none text-white' to={`/itemdetails/${item.id} /${item.media_type}`}>
      <div className='position-relative'>
        {item?.poster_path ? <img src={`https://image.tmdb.org/t/p/w500` + item.poster_path} alt="posterPath" className='w-100' />
          :
          <img src={`https://image.tmdb.org/t/p/w500` + item?.profile_path} alt="posterPath" className='w-100' />
        }
        <h3 className='h6 my-3'>{item.title} {item.name}</h3>
        {item?.vote_average ?
          <div className='vote p-2 text-white position-absolute top-0 end-0'>{item.vote_average.toFixed(1)}</div>
          : ''}
      </div>
      </Link>
    </div>
  </>
}
