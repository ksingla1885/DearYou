import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Landing from './pages/Landing';
import Home from './pages/Home';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Messages from './pages/Messages';
import OpenWhen from './pages/OpenWhen';
import Surprise from './pages/Surprise';
import MusicPlayer from './components/MusicPlayer';
import CreateLink from './pages/CreateLink';

function App() {
    return (
        <Router>
            <MusicPlayer />
            <Routes>
                <Route path="/" element={<Landing />} />
                <Route path="/home" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/messages" element={<Messages />} />
                <Route path="/open-when" element={<OpenWhen />} />
                <Route path="/create" element={<CreateLink />} />
            </Routes>
        </Router>
    );
}

export default App;
