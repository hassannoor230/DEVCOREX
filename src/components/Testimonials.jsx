import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
  {
    name: 'James Wellington',
    role: 'CEO, NexusTech Solutions',
    text: 'Devcorex completely transformed our platform. What used to take us 3 months to build, they delivered in 6 weeks — and the quality was exceptional. Hassan and his team are in a league of their own.',
    country: '🇬🇧',
  },
  {
    name: 'Sarah Kim',
    role: 'Founder, LaunchPad Ventures',
    text: 'Working with Devcorex felt like having an in-house team of the best engineers. They understood our product vision instantly and executed with precision. Our app launch was a massive success.',
    country: '🇺🇸',
  },
  {
    name: 'Ahmed Al-Rashid',
    role: 'CTO, FinEdge Capital',
    text: 'The level of technical sophistication and design quality that Devcorex brings is unmatched. Our fintech platform has processed over $100M in transactions with zero downtime since launch.',
    country: '🇦🇪',
  },
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(0)

  return (
    <section ref={ref} style={{
      padding: '8rem 4rem',
      background: 'var(--dark-4)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 900, margin: '0 auto', textAlign: 'center' }}>
        <motion.p className="section-label"
          initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
          style={{ justifyContent: 'center', display: 'flex' }}
        >Client Stories</motion.p>
        <motion.h2 className="section-title"
          style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', marginBottom: '3rem' }}
          initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
        >
          What Our Clients <span className="gold-text">Say</span>
        </motion.h2>

        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            style={{
              padding: '3rem',
              border: '1px solid rgba(201,168,76,0.15)',
              background: 'rgba(201,168,76,0.03)',
              position: 'relative',
              marginBottom: '2rem',
            }}
          >
            <div style={{ fontSize: '3rem', color: 'var(--gold)', opacity: 0.3, fontFamily: 'Cormorant Garamond', lineHeight: 1, marginBottom: '1rem' }}>"</div>
            <p style={{
              fontFamily: 'Cormorant Garamond', fontSize: '1.35rem',
              lineHeight: 1.8, color: 'var(--white)', fontWeight: 300,
              fontStyle: 'italic', marginBottom: '2rem',
            }}>
              {testimonials[active].text}
            </p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.8rem' }}>
              <div style={{
                width: 44, height: 44, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold-dim), var(--gold))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Outfit', fontWeight: 700, fontSize: '0.85rem', color: '#050505',
              }}>{testimonials[active].name[0]}</div>
              <div style={{ textAlign: 'left' }}>
                <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--white)' }}>
                  {testimonials[active].country} {testimonials[active].name}
                </div>
                <div style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                  {testimonials[active].role}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: 'flex', gap: '0.6rem', justifyContent: 'center' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: i === active ? 24 : 8, height: 8,
                borderRadius: 4,
                background: i === active ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                border: 'none', cursor: 'none',
                transition: 'all 0.3s',
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          section[style*="var(--dark-4)"] { padding: 5rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
