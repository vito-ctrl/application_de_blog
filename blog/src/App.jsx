import './App.css'
import { BrowserRouter, Router, Route, Routes } from 'react-router-dom'
import Blog from './Blog'
import AddBlog from './AddBlog'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Blog/>}/>
        <Route path='/addBlog' element={<AddBlog/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
