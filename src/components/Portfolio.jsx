import { useRef, useState, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { API_BASE } from '../utils/apiBase'

const staticProjects = [
  {
    id: 1, category: 'Salon',
    title: 'Smartcut',
    sub: 'Men’s Salon Website',
    desc: 'A polished barbershop website for Smartcut Rahwali, featuring services, appointments, reviews, and contact options.',
    tech: ['React', 'Responsive Design', 'Vercel'],
    color: '#C9A84C',
    year: '2025',
    link: 'https://smartcut-ashy.vercel.app/',
    image: 'https://image.thum.io/get/width/600/crop/800/https://smartcut-ashy.vercel.app/',
  },
  {
    id: 2, category: 'Marketing',
    title: 'Ali Ecom',
    sub: 'Social Media Marketing Portfolio',
    desc: 'A high-conversion portfolio website for a Meta ads and social media expert, showcasing results, services, and client work.',
    tech: ['React', 'Marketing UI', 'Vercel'],
    color: '#E53935',
    year: '2025',
    link: 'https://aliecom.vercel.app/',
    image: 'https://image.thum.io/get/width/600/crop/800/https://aliecom.vercel.app/',
  },
  {
    id: 3, category: 'POS',
    title: 'SmartPOS',
    sub: 'Point of Sale Dashboard',
    desc: 'A modern point-of-sale dashboard with sales insights, order management, product tracking, reports, and stock alerts.',
    tech: ['React', 'Dashboard UI', 'Charts'],
    color: '#22C55E',
    year: '2025',
    link: 'https://pos-coral-seven-16.vercel.app/',
    image: 'https://image.thum.io/get/width/600/crop/800/https://pos-coral-seven-16.vercel.app/',
  },
  {
    id: 4, category: 'Salon',
    title: 'Shiza Salon',
    sub: 'Beauty & Bridal Salon Website',
    desc: 'An elegant salon website designed for beauty, bridal, hair, skin, and self-care services with appointment booking.',
    tech: ['React', 'Responsive Design', 'Vercel'],
    color: '#D4A373',
    year: '2025',
    link: 'https://shiza-salon.vercel.app/',
    image: 'https://image.thum.io/get/width/600/crop/800/https://shiza-salon.vercel.app/',
  },
  {
    id: 5, category: 'Salon',
    title: 'Best Hair Salon',
    sub: 'Premium Men’s Grooming Website',
    desc: 'A refined men’s grooming website for showcasing services and helping customers reserve a chair online.',
    tech: ['React', 'Responsive Design', 'Vercel'],
    color: '#C9A84C',
    year: '2025',
    link: 'https://best-hair.vercel.app/',
    image: 'https://image.thum.io/get/width/600/crop/800/https://best-hair.vercel.app/',
  },
  {
    id: 6, category: 'Business',
    title: 'Standard General',
    sub: 'Construction Company Website',
    desc: 'A professional construction company website presenting services, completed work, and estimate request options.',
    tech: ['React', 'Responsive Design', 'Vercel'],
    color: '#C99A3D',
    year: '2025',
    link: 'https://standard-general.vercel.app/',
    image: 'https://image.thum.io/get/width/600/crop/800/https://standard-general.vercel.app/',
  },
]

const categories = ['All', 'Salon', 'Marketing', 'POS', 'Business']

export default function Portfolio() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [filter, setFilter] = useState('All')
  const [hovered, setHovered] = useState(null)
  const [imgErrors, setImgErrors] = useState({})
  const [projects, setProjects] = useState(staticProjects)

  useEffect(() => {
    fetch(`${API_BASE}/projects`)
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          const mapped = data.map((p, i) => ({
            ...p,
            id: p._id || i + 1,
          }))
          setProjects(mapped)
        }
      })
      .catch(() => {})
  }, [])

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="portfolio" ref={ref} style={{
      padding: '8rem 4rem',
      background: 'var(--dark-3)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <motion.p className="section-label"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
        >Our Work</motion.p>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '3rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <motion.h2 className="section-title"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          >
            Case <span className="gold-text">Studies</span>
          </motion.h2>

          <motion.div
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.2 }}
            style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}
          >
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setFilter(cat)}
                style={{
                  padding: '0.45rem 1rem',
                  background: filter === cat ? 'var(--gold)' : 'transparent',
                  color: filter === cat ? 'var(--dark)' : 'var(--white-dim)',
                  border: `1px solid ${filter === cat ? 'var(--gold)' : 'rgba(201,168,76,0.2)'}`,
                  fontFamily: 'Space Mono', fontSize: '0.6rem',
                  letterSpacing: '0.1em', cursor: 'none',
                  transition: 'all 0.3s',
                  textTransform: 'uppercase',
                }}
              >{cat}</button>
            ))}
          </motion.div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1.5rem' }}>
          <AnimatePresence mode="popLayout">
            {filtered.map((p, i) => (
              <motion.div
                key={p.id || p._id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                onHoverStart={() => setHovered(p.id || p._id)}
                onHoverEnd={() => setHovered(null)}
                style={{
                  border: '1px solid rgba(201,168,76,0.1)',
                  background: hovered === (p.id || p._id) ? 'rgba(201,168,76,0.04)' : 'var(--dark-2)',
                  overflow: 'hidden', cursor: 'none',
                  transition: 'background 0.3s, border-color 0.3s',
                  borderColor: hovered === (p.id || p._id) ? 'rgba(201,168,76,0.3)' : 'rgba(201,168,76,0.1)',
                  position: 'relative',
                  display: 'flex', flexDirection: 'column',
                }}
              >
                <div style={{
                  height: 140,
                  background: `linear-gradient(135deg, ${p.color}15 0%, transparent 60%)`,
                  borderBottom: '1px solid rgba(201,168,76,0.08)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  position: 'relative', overflow: 'hidden',
                }}>
                  {!imgErrors[p.id || p._id] && p.image ? (
                    <img
                      src={p.image}
                      alt={p.title}
                      onError={() => setImgErrors(prev => ({ ...prev, [p.id || p._id]: true }))}
                      style={{
                        width: '100%', height: '100%', objectFit: 'cover',
                        position: 'absolute', top: 0, left: 0,
                        opacity: hovered === (p.id || p._id) ? 1 : 0.85,
                        transition: 'opacity 0.3s',
                      }}
                    />
                  ) : (
                    <motion.div
                      animate={{ scale: hovered === (p.id || p._id) ? 1.1 : 1, opacity: hovered === (p.id || p._id) ? 1 : 0.4 }}
                      style={{
                        fontFamily: 'Cormorant Garamond', fontSize: '4rem',
                        fontWeight: 600, color: p.color, letterSpacing: '-0.02em',
                      }}
                    >{p.title[0]}</motion.div>
                  )}

                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    fontFamily: 'Space Mono', fontSize: '0.6rem',
                    color: 'rgba(201,168,76,0.5)', letterSpacing: '0.1em',
                  }}>{p.year}</div>

                  <div style={{
                    position: 'absolute', top: '1rem', left: '1rem',
                    padding: '0.2rem 0.6rem',
                    border: '1px solid rgba(201,168,76,0.2)',
                    fontFamily: 'Space Mono', fontSize: '0.55rem',
                    color: 'var(--gold)', letterSpacing: '0.1em',
                  }}>{p.category}</div>
                </div>

                <div style={{ padding: '1.8rem', flex: 1, display: 'flex', flexDirection: 'column' }}>
                  <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.6rem', fontWeight: 600, color: 'var(--white)', marginBottom: '0.25rem' }}>{p.title}</h3>
                  <p style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>{p.sub}</p>
                  <p style={{ fontSize: '0.8rem', color: 'var(--white-dim)', lineHeight: 1.7, marginBottom: '1.2rem', fontWeight: 300 }}>{p.desc}</p>

                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                    {p.tech.map(t => (
                      <span key={t} style={{
                        fontFamily: 'Space Mono', fontSize: '0.58rem',
                        color: 'var(--white-dim)',
                        padding: '0.2rem 0.5rem',
                        border: '1px solid rgba(201,168,76,0.12)',
                        letterSpacing: '0.06em',
                      }}>{t}</span>
                    ))}
                  </div>

                  <a
                    href={p.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    style={{
                      marginTop: '1.2rem',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.5rem',
                      fontFamily: 'Space Mono',
                      fontSize: '0.65rem',
                      color: 'var(--gold)',
                      textDecoration: 'none',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                    }}
                  >
                    View Project
                    <span style={{ fontSize: '1rem', lineHeight: 1 }}>→</span>
                  </a>
                </div>

                <motion.div
                  animate={{ scaleX: hovered === (p.id || p._id) ? 1 : 0 }}
                  style={{ position: 'absolute', bottom: 0, left: 0, right: 0, height: 2, background: 'linear-gradient(90deg, var(--gold), transparent)', transformOrigin: 'left' }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #portfolio > div > div:last-child { grid-template-columns: 1fr 1fr !important; }
          #portfolio { padding: 5rem 1.5rem !important; }
        }
        @media (max-width: 600px) {
          #portfolio > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
