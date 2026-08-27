import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const values = [
  { icon: '◈', title: 'Precision Engineering', desc: 'Every line of code is written with intent. We obsess over performance, scalability, and maintainability.' },
  { icon: '◉', title: 'Design Intelligence', desc: 'Beauty and function are inseparable. We craft interfaces that are both visually stunning and intuitively usable.' },
  { icon: '◆', title: 'Client Obsession', desc: 'Your success is our success. We build long-term partnerships, not transactional relationships.' },
  { icon: '◇', title: 'Innovation First', desc: 'We stay ahead of the curve, adopting cutting-edge technologies to give you a competitive advantage.' },
]

export default function About() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section id="about" ref={ref} style={{
      padding: '8rem 4rem',
      background: 'var(--dark-2)',
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Decorative */}
      <div style={{
        position: 'absolute', top: 0, right: 0,
        width: '40%', height: '100%',
        background: 'radial-gradient(ellipse at right, rgba(201,168,76,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '5rem', alignItems: 'center' }}>
          {/* Left */}
          <div>
            <motion.p
              className="section-label"
              initial={{ opacity: 0, x: -20 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              Who We Are
            </motion.p>
            <motion.h2
              className="section-title"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.8rem)', marginBottom: '1.5rem' }}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 }}
            >
              Architects of the <span className="gold-text">Digital Frontier</span>
            </motion.h2>
            <motion.div
              className="divider"
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.6, delay: 0.3 }}
              style={{ transformOrigin: 'left' }}
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.4 }}
              style={{ color: 'var(--white-dim)', lineHeight: 1.9, marginBottom: '1.5rem', fontWeight: 300, fontSize: '1rem' }}
            >
              Founded with a vision to transform how businesses operate in the digital realm, Devcorex has grown into one of the most trusted software engineering studios. We don't just write code — we architect solutions that propel businesses forward.
            </motion.p>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.5 }}
              style={{ color: 'var(--white-dim)', lineHeight: 1.9, fontWeight: 300, fontSize: '1rem' }}
            >
              Our multidisciplinary team of engineers, designers, and strategists work in harmony to deliver products that are not only functional but genuinely transformative.
            </motion.p>

            {/* Signature block */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.6 }}
              style={{
                marginTop: '2.5rem', padding: '1.5rem',
                borderLeft: '2px solid var(--gold)',
                background: 'rgba(201,168,76,0.04)',
              }}
            >
              <p style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', fontStyle: 'italic', color: 'var(--white)', lineHeight: 1.6, marginBottom: '1rem' }}>
                "We build software that doesn't just work today — it scales for tomorrow and endures for decades."
              </p>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
                <div style={{
                  width: 42, height: 42, borderRadius: '50%',
                  background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', fontWeight: 700, color: '#050505',
                }}>HN</div>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--white)' }}>Hassan Noor</div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', fontFamily: 'Space Mono' }}>CEO & Founder, Devcorex</div>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Right — Values */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem' }}>
            {values.map((v, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: 0.2 + i * 0.1 }}
                whileHover={{ y: -6, borderColor: 'rgba(201,168,76,0.4)' }}
                style={{
                  padding: '1.8rem',
                  border: '1px solid rgba(201,168,76,0.12)',
                  background: 'rgba(201,168,76,0.02)',
                  transition: 'border-color 0.3s',
                  cursor: 'none',
                }}
              >
                <div style={{ fontSize: '1.4rem', color: 'var(--gold)', marginBottom: '0.8rem' }}>{v.icon}</div>
                <div style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.85rem', color: 'var(--white)', marginBottom: '0.6rem' }}>{v.title}</div>
                <div style={{ fontSize: '0.78rem', color: 'var(--white-dim)', lineHeight: 1.7, fontWeight: 300 }}>{v.desc}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #about > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #about { padding: 5rem 1.5rem !important; }
        }
      `}</style>
    </section>
  )
}
