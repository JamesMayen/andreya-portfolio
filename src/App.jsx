import { Routes, Route } from 'react-router-dom'
import Layout from './components/Layout'
import Home from './pages/Home'
import About from './pages/About'
import Logistics from './pages/Logistics'
import Science from './pages/Science'
import { Stories, Ideas, ArticleDetail } from './pages/Articles'
import Experience from './pages/Experience'
import Contact from './pages/Contact'
import NotFound from './pages/NotFound'
export default function App(){
  return <Routes><Route element={<Layout/>}>
    <Route index element={<Home/>}/><Route path="about" element={<About/>}/>
    <Route path="logistics-business" element={<Logistics/>}/><Route path="science-research" element={<Science/>}/>
    <Route path="stories" element={<Stories/>}/><Route path="stories/:slug" element={<ArticleDetail/>}/>
    <Route path="ideas-strategies" element={<Ideas/>}/><Route path="ideas-strategies/:slug" element={<ArticleDetail/>}/>
    <Route path="experience" element={<Experience/>}/><Route path="contact" element={<Contact/>}/>
    <Route path="*" element={<NotFound/>}/></Route></Routes>
}
