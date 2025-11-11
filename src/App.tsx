// import { useState } from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import FrontPage from './pages/FrontPage';
import Memes from './pages/Memes';
import { PageLayout } from "./pages/PageLayout";


const Pages = (): React.JSX.Element => {
	return (
  <Routes>
    <Route path="/" element={<FrontPage />} />
    <Route path="/frontpage" element={<FrontPage />} />
    <Route path="/memes" element={<Memes />} />
  </Routes>
	);
};

function App() {
  return (
    <Router>
      <PageLayout>
        <Pages />
      </PageLayout>
    </Router>
  );
}

export default App
