import React from 'react'
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import App from './App'

function Router() {
  return (
    <BrowserRouter>
        <Routes>
            <Route path='/studentsDetails' element={<App/>}></Route>
        </Routes>
    </BrowserRouter>
  )
}

export default Router