import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = ['Home', 'About', 'Services', 'Portfolio', 'Team', 'Contact']

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollTo = (id) => {
    const el = document.getElementById(id.toLowerCase())
    if (el) el.scrollIntoView({ behavior: 'smooth' })
    setOpen(false)
  }

  return (
    <>
      <motion.nav
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 1000,
          padding: scrolled ? '1rem 4rem' : '1.5rem 4rem',
          background: scrolled ? 'rgba(5,5,5,0.96)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(201,168,76,0.12)' : 'none',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'all 0.4s ease',
        }}
      >
        {/* Logo */}
        <motion.div
          whileHover={{ scale: 1.02 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', cursor: 'none' }}
          onClick={() => scrollTo('home')}
        >
          <div style={{
            width: 38, height: 38,
            background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <span style={{ fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: '1rem', color: '#050505' }}>D</span>
          </div>
          <div>
            <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.3rem', fontWeight: 600, letterSpacing: '0.08em', color: 'var(--white)' }}>
              Dev<span style={{ color: 'var(--gold)' }}>corex</span>
            </div>
          </div>
        </motion.div>

        {/* Desktop Links */}
        <div style={{ display: 'flex', gap: '2.5rem', alignItems: 'center' }}>
          {links.map((link, i) => (
            <motion.button
              key={link}
              onClick={() => scrollTo(link)}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * i + 0.3 }}
              style={{
                background: 'none',
                border: 'none',
                color: 'var(--white-dim)',
                fontFamily: 'Outfit',
                fontSize: '0.78rem',
                fontWeight: 400,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                cursor: 'none',
                position: 'relative',
                padding: '0.2rem 0',
                transition: 'color 0.3s',
              }}
              whileHover={{ color: '#C9A84C' }}
            >
              {link}
              <motion.span
                style={{
                  position: 'absolute',
                  bottom: 0, left: 0,
                  height: '1px',
                  background: 'var(--gold)',
                  width: '100%',
                  transformOrigin: 'left',
                }}
                initial={{ scaleX: 0 }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.3 }}
              />
            </motion.button>
          ))}
          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => scrollTo('contact')}
            style={{ fontSize: '0.7rem', padding: '0.65rem 1.4rem' }}
          >
            Get Started
          </motion.button>
        </div>

        {/* Mobile Hamburger */}
        <button
          onClick={() => setOpen(!open)}
          style={{ display: 'none', background: 'none', border: 'none', cursor: 'none', flexDirection: 'column', gap: 5 }}
          className="hamburger"
        >
          {[0,1,2].map(i => (
            <motion.span key={i} style={{ display: 'block', width: 24, height: 1, background: 'var(--gold)' }} />
          ))}
        </button>
      </motion.nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            style={{
              position: 'fixed', inset: 0, zIndex: 999,
              background: 'rgba(5,5,5,0.98)',
              display: 'flex', flexDirection: 'column',
              alignItems: 'center', justifyContent: 'center', gap: '2rem',
            }}
          >
            {links.map((link, i) => (
              <motion.button
                key={link}
                initial={{ opacity: 0, x: 40 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07 }}
                onClick={() => scrollTo(link)}
                style={{
                  background: 'none', border: 'none',
                  fontFamily: 'Cormorant Garamond',
                  fontSize: '2.5rem', fontWeight: 300,
                  color: 'var(--white)', cursor: 'none',
                }}
                whileHover={{ color: 'var(--gold)', x: 10 }}
              >
                {link}
              </motion.button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          nav > div:nth-child(2) { display: none !important; }
          .hamburger { display: flex !important; }
        }
        @media (max-width: 768px) {
          nav { padding: 1rem 1.5rem !important; }
        }
      `}</style>
    </>
  )
}
