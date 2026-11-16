import { Route, Routes } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';  
import Home from './pages/Home';

function App() {

  return (
    <div>
      <Header />
      
      <Routes>
        <Route>
            <Route path="/" element={<Home />} />
        </Route>
      </Routes>
        
        <Footer />   
    </div>
  )
}

export default App