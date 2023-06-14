import './App.css';
import { createBrowserRouter, RouterProvider ,createHashRouter } from 'react-router-dom';

import { useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';
import { Offline, Online } from "react-detect-offline";
import Layout from './Components/Layout/Layout';
import Home from './Components/Home/Home';
import Movies from './Components/Movies/Movies';
import Tvshow from './Components/Tvshow/Tvshow';
import People from './Components/People/People';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Notfound from './Components/NotFound/Notfound';
import ItemDetails from './Components/ItemDetails/ItemDetails';
import ProtectedRoute from './Components/ProtectedRoute/ProtectedRoute';

function App() {

  useEffect(() => {
    if (localStorage.getItem('userToken') !== null) {
      saveUserData()
    }
  }, [])


  const [userData, setUserData] = useState(null)

  function saveUserData() {
    let encodedToken = localStorage.getItem('userToken');
    let decodedToken = jwtDecode(encodedToken);
    setUserData(decodedToken)
    // console.log(userData);
  }

const Routers = createHashRouter ([
  {path: '',element :<Layout setUserData={setUserData} userData={userData}/>, children:[
    {index: true, element: <ProtectedRoute> <Home/> </ProtectedRoute> },
    {path: 'home', element:<ProtectedRoute> <Home/> </ProtectedRoute> },
    {path: 'movies', element:<ProtectedRoute> <Movies/> </ProtectedRoute> },
    {path: 'tvshow', element:<ProtectedRoute> <Tvshow/></ProtectedRoute>},
    {path: 'people', element:<ProtectedRoute><People/></ProtectedRoute>},
    {path: 'itemdetails/:id/:MediaType', element:<ProtectedRoute><ItemDetails/></ProtectedRoute>},
    {path: 'register', element:<Register/>},
    {path: 'login', element:<Login saveUserData={saveUserData}/>},
    {path: '*', element:<Notfound/>},

  ]
}])


  return<>
  <div>

  <Offline> <div className='offline'>You Are Offline!</div></Offline>
</div>
<RouterProvider router={Routers}></RouterProvider>
  </>
}

export default App;
