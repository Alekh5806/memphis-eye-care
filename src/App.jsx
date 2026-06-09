import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import BackToTop from './components/common/BackToTop'
import AppPreloader from './components/common/AppPreloader'
import CookieConsent from './components/common/CookieConsent'
import Footer from './components/common/Footer'
import Header from './components/common/Header'
import QuickContactDock from './components/common/QuickContactDock'
import ScrollProgress from './components/common/ScrollProgress'
import ScrollToTop from './components/common/ScrollToTop'
import Home from './pages/Home'
import './App.css'
import './styles/ambient.css'

// Code-split secondary routes
const About = lazy(() => import('./pages/About'))
const Capabilities = lazy(() => import('./pages/Capabilities'))
const Contact = lazy(() => import('./pages/Contact'))
const ContractManufacturing = lazy(() => import('./pages/ContractManufacturing'))
const GlobalReach = lazy(() => import('./pages/GlobalReach'))
const Manufacturing = lazy(() => import('./pages/Manufacturing'))
const NotFound = lazy(() => import('./pages/NotFound'))
const PartnerWithUs = lazy(() => import('./pages/PartnerWithUs'))
const ProductDetails = lazy(() => import('./pages/ProductDetails'))
const Products = lazy(() => import('./pages/Products'))
const Quality = lazy(() => import('./pages/Quality'))

function RouteFallback() {
  return (
    <div className="route-fallback" role="status" aria-live="polite">
      <span className="route-fallback-spinner" aria-hidden="true" />
      <span className="sr-only">Loading…</span>
    </div>
  )
}

function App() {
  return (
    <div className="app-shell">
      <AppPreloader />
      <a className="skip-link" href="#main">Skip to content</a>
      <ScrollToTop />
      <ScrollProgress />
      <Header />
      <main id="main">
        <Suspense fallback={<RouteFallback />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:slug" element={<ProductDetails />} />
            <Route path="/capabilities" element={<Capabilities />} />
            <Route path="/manufacturing" element={<Manufacturing />} />
            <Route path="/global-reach" element={<GlobalReach />} />
            <Route path="/quality" element={<Quality />} />
            <Route path="/contract-manufacturing" element={<ContractManufacturing />} />
            <Route path="/partner-with-us" element={<PartnerWithUs />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer />
      <QuickContactDock />
      <BackToTop />
      <CookieConsent />
    </div>
  )
}

export default App
