import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Blogs from './components/Blogs';
import NavBar from './components/NavBar';
import NewBlog from './components/NewBlog';
import UpdateBlog from './components/UpdateBlog';
import ExpandedBlog from './components/ExpandedBlog';
import NotFound from './components/NotFount';

function App() {
  return (
    <Router>
    <div className="App">
      <div className="header" style={{padding:40}}>
        <NavBar/>
      </div>
      <div className="content">
        <Routes>
          <Route exact path='/' element={<Blogs/>}/>
          <Route exact path='/new' element={<NewBlog/>}/>
          <Route exact path='/blogs/:id' element={<ExpandedBlog/>}/>
          <Route exact path='/update/:id' element={<UpdateBlog/>}/>
          <Route exact path='*' element={<NotFound/>}/>
        </Routes>
      </div>
    </div>
    </Router>
  );
}

export default App;
