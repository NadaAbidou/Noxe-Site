import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';


export default function Movies() {


  const [movies, setMovies] = useState([])
  let MediaType = 'movie';
  let nums = new Array(10).fill(1).map((elem,index)=>index +1);

  async function getMovies(page) {
    let { data } = await axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=eac04f79494b94483227629a5ceeb89c&language=en-US&sort_by=popularity.desc&include_adult=false&include_video=true&page=${page}`)
    setMovies(data?.results)
    // console.log(data.results);
  }

  useEffect(() => {
    getMovies(1)

  }, [])

  return <>

<Helmet>
      <meta charSet="utf-8" />
      <title>Movies Page</title>
    </Helmet>

  {movies [0] ?  <div className="row">

{movies.map((item, index) => <div key={index} className='col-md-3 py-2'>
  <Link className='text-decoration-none text-white' to={`/itemdetails/${item.id} /${MediaType}`}>
    <div className='position-relative'>
      <img src={`https://image.tmdb.org/t/p/w500` + item.poster_path} alt="posterPath" className='w-100' />

      <h3 className='h6 my-3'>{item.title}</h3>

      <div className='vote p-2 text-white position-absolute top-0 end-0'>{item.vote_average}</div>

    </div>
  </Link>
</div>)}

</div>

: 
<div className='loading d-flex vh-100 align-items-center justify-content-center'> <i className='fas fa-spinner fa-spin fa-8x'></i> </div>
}
    

    <nav className='py-5'>
      <ul className='pagination pagination-sm d-flex justify-content-center'>
       {nums.map((page,index)=><li key={index} onClick={()=>getMovies(page)} className='page-item p-1'>
          <Link className='page-link bg-transparent text-white'>{page}</Link>
        </li>)}
        
      </ul>
    </nav>
  </>
}
