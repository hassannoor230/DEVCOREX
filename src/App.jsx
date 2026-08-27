import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import Cursor from './components/Cursor'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechBand from './components/TechBand'
import About from './components/About'
import Services from './components/Services'
import Portfolio from './components/Portfolio'
import Testimonials from './components/Testimonials'
import Team from './components/Team'
import Contact from './components/Contact'
import Footer from './components/Footer'
import AdminLogin from './pages/AdminLogin'
import AdminDashboard from './pages/AdminDashboard'
import { api } from './utils/api'

function Loader({ onDone }) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.8, duration: 0.6 }}
      onAnimationComplete={onDone}
      style={{
        position: 'fixed', inset: 0, zIndex: 9999,
        background: 'var(--dark)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        flexDirection: 'column', gap: '1.5rem',
      }}
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        style={{ textAlign: 'center' }}
      >
        <div style={{
          width: 60, height: 60,
          background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
          clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          margin: '0 auto 1rem',
        }}>
          <span style={{ fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: '1.6rem', color: '#050505' }}>D</span>
        </div>
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3 }}
          style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', letterSpacing: '0.3em', color: 'var(--gold)', textTransform: 'uppercase' }}
        >Devcorex</motion.p>
      </motion.div>

      <div style={{ width: 200, height: 1, background: 'rgba(201,168,76,0.15)', overflow: 'hidden' }}>
        <motion.div
          initial={{ x: '-100%' }}
          animate={{ x: '0%' }}
          transition={{ delay: 0.5, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ width: '100%', height: '100%', background: 'linear-gradient(90deg, var(--gold), var(--gold-light))' }}
        />
      </div>
    </motion.div>
  )
}

function ProtectedRoute({ children }) {
  const token = localStorage.getItem('admin_token')
  if (!token) return <Navigate to="/admin" replace />
  return children
}

export default function App() {
  const [loaded, setLoaded] = useState(false)
  const [adminUser, setAdminUser] = useState(null)

  useEffect(() => {
    const token = localStorage.getItem('admin_token')
    if (token) {
      api.getMe()
        .then(data => setAdminUser(data.user))
        .catch(() => localStorage.removeItem('admin_token'))
    }
  }, [])

  return (
    <BrowserRouter>
      <Cursor />
      <AnimatePresence>
        {!loaded && <Loader onDone={() => setLoaded(true)} />}
      </AnimatePresence>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.5 }}
      >
        <Routes>
          <Route path="/" element={
            <>
              <Navbar />
              <main>
                <Hero />
                <TechBand />
                <About />
                <Services />
                <Portfolio />
                <Testimonials />
                <Team />
                <Contact />
              </main>
              <Footer />
            </>
          } />
          <Route path="/admin" element={
            adminUser ? <Navigate to="/admin/dashboard" replace /> : <AdminLogin onLogin={setAdminUser} />
          } />
          <Route path="/admin/dashboard" element={
            <ProtectedRoute>
              <AdminDashboard user={adminUser} onLogout={() => { localStorage.removeItem('admin_token'); setAdminUser(null); }} />
            </ProtectedRoute>
          } />
        </Routes>
      </motion.div>
    </BrowserRouter>
  )
}
