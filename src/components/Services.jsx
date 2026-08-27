import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const services = [
  {
    num: '01',
    title: 'Custom Software Development',
    desc: 'Tailor-made software solutions designed from the ground up to meet your unique business requirements and growth objectives.',
    tags: ['React', 'Node.js', 'Python', 'Go'],
    icon: '⬡',
  },
  {
    num: '02',
    title: 'Mobile App Engineering',
    desc: 'Cross-platform and native mobile applications with exceptional UX that your users will love to engage with daily.',
    tags: ['React Native', 'Flutter', 'iOS', 'Android'],
    icon: '⬢',
  },
  {
    num: '03',
    title: 'Cloud & DevOps',
    desc: 'Scalable cloud infrastructure, CI/CD pipelines, and DevOps practices that ensure 99.99% uptime and rapid deployment cycles.',
    tags: ['AWS', 'GCP', 'Docker', 'Kubernetes'],
    icon: '◉',
  },
  {
    num: '04',
    title: 'UI/UX Design',
    desc: 'Research-driven design systems and interfaces that convert visitors into loyal customers through intuitive user journeys.',
    tags: ['Figma', 'Design System', 'Prototyping', 'Motion'],
    icon: '◈',
  },
  {
    num: '05',
    title: 'AI & Machine Learning',
    desc: 'Intelligent automation, predictive analytics, and AI-powered features that give your business an unparalleled competitive edge.',
    tags: ['TensorFlow', 'OpenAI', 'LLMs', 'Data Science'],
    icon: '◇',
  },
  {
    num: '06',
    title: 'E-Commerce Solutions',
    desc: 'High-conversion online stores and marketplace platforms with seamless payment processing and inventory management.',
    tags: ['Next.js', 'Shopify', 'Stripe', 'Commerce'],
    icon: '◆',
  },
]

export default function Services() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [active, setActive] = useState(null)

  return (
    <section id="services" ref={ref} style={{
      padding: '8rem 4rem',
      background: 'var(--dark)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '4rem', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <motion.p className="section-label"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.6 }}
            >What We Do</motion.p>
            <motion.h2 className="section-title"
              style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7, delay: 0.1 }}
            >
              Services Built for <span className="gold-text">Scale</span>
            </motion.h2>
          </div>
          <motion.p
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.3 }}
            style={{ color: 'var(--white-dim)', maxWidth: 300, fontSize: '0.88rem', lineHeight: 1.8, fontWeight: 300 }}
          >
            End-to-end digital engineering across every layer of the modern tech stack.
          </motion.p>
        </div>

        {/* Services Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1px', background: 'rgba(201,168,76,0.08)' }}>
          {services.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              onHoverStart={() => setActive(i)}
              onHoverEnd={() => setActive(null)}
              style={{
                padding: '2.5rem',
                background: active === i ? 'rgba(201,168,76,0.05)' : 'var(--dark)',
                transition: 'background 0.3s',
                cursor: 'none',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Number */}
              <div style={{
                fontFamily: 'Space Mono', fontSize: '0.65rem',
                color: active === i ? 'var(--gold)' : 'rgba(201,168,76,0.25)',
                letterSpacing: '0.15em', marginBottom: '1.5rem',
                transition: 'color 0.3s',
              }}>{s.num}</div>

              {/* Icon */}
              <motion.div
                animate={{ rotate: active === i ? 90 : 0 }}
                transition={{ duration: 0.3 }}
                style={{ fontSize: '1.6rem', color: 'var(--gold)', marginBottom: '1rem', display: 'inline-block' }}
              >{s.icon}</motion.div>

              <h3 style={{
                fontFamily: 'Outfit', fontWeight: 600,
                fontSize: '1.05rem', color: 'var(--white)',
                marginBottom: '0.8rem', lineHeight: 1.3,
              }}>{s.title}</h3>

              <p style={{
                fontSize: '0.82rem', color: 'var(--white-dim)',
                lineHeight: 1.8, fontWeight: 300, marginBottom: '1.5rem',
              }}>{s.desc}</p>

              {/* Tags */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {s.tags.map(tag => (
                  <span key={tag} style={{
                    fontFamily: 'Space Mono', fontSize: '0.6rem',
                    color: active === i ? 'var(--gold)' : 'var(--white-dim)',
                    padding: '0.25rem 0.6rem',
                    border: `1px solid ${active === i ? 'rgba(201,168,76,0.35)' : 'rgba(201,168,76,0.1)'}`,
                    transition: 'all 0.3s', letterSpacing: '0.08em',
                  }}>{tag}</span>
                ))}
              </div>

              {/* Hover arrow */}
              <motion.div
                animate={{ x: active === i ? 0 : 10, opacity: active === i ? 1 : 0 }}
                style={{
                  position: 'absolute', bottom: '2.5rem', right: '2.5rem',
                  color: 'var(--gold)',
                }}
              >
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                  <path d="M4 10h12M12 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </motion.div>

              {/* Hover line bottom */}
              <motion.div
                animate={{ scaleX: active === i ? 1 : 0 }}
                style={{
                  position: 'absolute', bottom: 0, left: 0, right: 0,
                  height: 2, background: 'linear-gradient(90deg, var(--gold), var(--gold-dim))',
                  transformOrigin: 'left',
                }}
                transition={{ duration: 0.3 }}
              />
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #services > div > div:last-child { grid-template-columns: 1fr !important; }
          #services { padding: 5rem 1.5rem !important; }
        }
        @media (max-width: 600px) {
          #services > div > div:last-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
