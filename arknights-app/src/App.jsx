import { Routes, Route } from 'react-router-dom'
import Home from './pages/home/Home'
import Operators from './pages/operators/Operators'
import News from './pages/news/News'
import Contact from './pages/contact/Contact'
import Rss from './pages/rss/Rss';
import Manage from './pages/manage/Manage';

// App root – defines all application routes
function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/home" element={<Home />} />
      <Route path="/operators" element={<Operators />} />
      <Route path="/news" element={<News />} />
      <Route path="/contact" element={<Contact />} />
      <Route path="/rss" element={<Rss />} />
      <Route path="/manage" element={<Manage />} />
    </Routes>
  )
}

export default App
