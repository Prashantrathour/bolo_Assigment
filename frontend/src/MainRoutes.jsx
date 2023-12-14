import React from 'react'
import {Routes,Route} from "react-router-dom"
import Home from './Pages/Home'
import Preview from './Pages/Preview'
import QuizSuccessPage from './Pages/QuizSuccessPage'
function MainRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='/View/:id' element={<Preview/>}/>
        <Route path='/successPage' element={<QuizSuccessPage/>}/>
    </Routes>
  )
}

export default MainRoutes