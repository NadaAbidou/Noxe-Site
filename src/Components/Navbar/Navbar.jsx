import React from 'react';
import { Link } from 'react-router-dom';


export default function Navbar({ userData, userLogout }) {
  return <>
    <nav className="navbar navbar-expand-lg navbar-dark bg-transparent ">
      <div className="container-fluid">
        <Link className="navbar-brand text-light" to='/'><h3>Noxe</h3></Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse " id="navbarSupportedContent">

          {userData ? <ul className="navbar-nav me-auto mb-2 mb-lg-0 ">

            <li className="nav-item">
              <Link className="nav-link active" aria-current="page" to='home'>Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='movies'>Movies</Link>
            </li>

            <li className="nav-item">
              <Link className="nav-link active" to='tvshow'>Tvshow</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link active" to='people'>People</Link>
            </li>

          </ul>
            :
            ''
          }

          <ul className=" navbar-nav mb-2 mb-lg-0 ms-auto ">

            <li className="nav-item d-flex align-items-center">
              <a target="_blank" href="https://www.facebook.com/noody.youssef.93">
                <i className="fab mx-2 fa-facebook text-white"></i>
              </a>

              <a target="_blank" href="https://twitter.com/nadousha_nada?t=aT9eakh9KOBCz-U753CZpA&s=09">
                <i className="fab mx-2 fa-twitter text-white"></i>
              </a>

              <a target="_blank" href="https://www.instagram.com/nada_abidou/?igshid=MzNlNGNkZWQ4Mg%3D%3D">
                <i className='fab mx-2 fa-instagram text-white'></i>
              </a>

              <a target='_blank' href='https://soundcloud.com/'>
                <i className='fab mx-2 fa-soundcloud text-white'></i>
              </a>
           
            </li>

            {userData ? <li className="nav-item">
              <span onClick={userLogout} className="nav-link curser-pointer">Logout</span>
            </li>
              :
              <>
                <li className="nav-item">
                  <Link className="nav-link active" to='register'>Register</Link>
                </li>

                <li className="nav-item">
                  <Link className="nav-link active" to='login'>Login</Link>
                </li>
              </>
            }






          </ul>
        </div>
      </div>
    </nav>
  </>

}
