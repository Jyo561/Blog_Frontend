import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PostList from './components/PostList';
import PostDetail from './components/PostDetail';
import NewPost from './components/NewPost';
import Navbar from './components/Navbar';
import SideMenu from './components/SideMenu';

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <SideMenu />
        <Routes>
          <Route path="/" element={<PostList />} />
          <Route path="/posts/:id" element={<PostDetail />} />
          <Route path="/new-post" element={<NewPost />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;

