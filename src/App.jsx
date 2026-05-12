import { Route, Routes } from 'react-router-dom'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import About from './pages/About'
import Contact from './pages/Contact'
import ContractManufacturing from './pages/ContractManufacturing'
import Home from './pages/Home'
import Manufacturing from './pages/Manufacturing'
import NotFound from './pages/NotFound'
import PartnerWithUs from './pages/PartnerWithUs'
import ProductDetails from './pages/ProductDetails'
import Products from './pages/Products'
import Quality from './pages/Quality'
import './App.css'

function App() {
  return (
    <div className="app-shell">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/products" element={<Products />} />
          <Route path="/products/:slug" element={<ProductDetails />} />
          <Route path="/manufacturing" element={<Manufacturing />} />
          <Route path="/quality" element={<Quality />} />
          <Route path="/contract-manufacturing" element={<ContractManufacturing />} />
          <Route path="/partner-with-us" element={<PartnerWithUs />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}

export default App
