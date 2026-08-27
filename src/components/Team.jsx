import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'

const staticTeam = [
  {
    name: 'Hassan Noor',
    role: 'CEO & Founder',
    bio: 'Visionary leader with 10+ years in software engineering. Founded Devcorex with the mission to deliver world-class digital solutions that stand the test of time.',
    skills: ['Strategy', 'Architecture', 'Leadership', 'Innovation'],
    initials: 'HN',
    featured: true,
  },
  {
    name: 'Usman Zafar',
    role: 'Senior Software Developer & graphic designer',
    bio: 'Former Google engineer with deep expertise in distributed systems and cloud architecture. Leads our technical direction and engineering excellence.',
    skills: ['UX', 'UI', 'Motion', 'Brand' , 'Graphic Design', 'React,typescript', 'JavaScript', 'AI' , 'Node'  ],
    initials: 'UZ',
  },
  {
    name: 'Umair Azam',
    role: 'Senior frontend Developer',
    bio: 'Award-winning UX/UI designer who blends art with user psychology to create interfaces that captivate and convert.',
    skills: ['UX', 'UI', 'Motion', 'Brand', 'javascript', 'React', 'Next.js', 'Tailwind CSS'],
    initials: 'UA',
  },
  {
    name: 'Ali Raza',
    role: 'Full-stack Developer',
    bio: 'Full-stack powerhouse who orchestrates complex engineering projects with military precision and creative flair.',
    skills: ['React', 'Node', 'Nuxt.js', 'AWS' , 'MySQL', 'MongoDB', 'Next.js', 'Tailwind CSS'],
    initials: 'AR',
  },
  {
    name: 'Hamza Arsahd',
    role: 'Software Engineer',
    bio: 'PhD in Machine Learning from LUMS. Builds intelligent systems that transform raw data into business-changing insights.',
    skills: ['React', 'Node', 'Nuxt.js', 'AWS' , 'MySQL', 'MongoDB', 'Next.js'],
    initials: 'HA',
  },
]

export default function Team() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [team, setTeam] = useState(staticTeam)

  useEffect(() => {
    fetch('/api/team', { headers: { 'Content-Type': 'application/json' } })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => {
        if (Array.isArray(data) && data.length > 0) {
          setTeam(data)
        }
      })
      .catch(() => {})
  }, [])

  const featured = team.find(m => m.featured) || team[0]
  const rest = team.filter(m => m !== featured)

  return (
    <section id="team" ref={ref} style={{
      padding: '8rem 4rem',
      background: 'var(--dark-2)',
      position: 'relative',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
          <motion.p className="section-label"
            initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            style={{ justifyContent: 'center', display: 'flex' }}
          >The Minds Behind</motion.p>
          <motion.h2 className="section-title"
            style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)' }}
            initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
          >
            Meet the <span className="gold-text">Elite Team</span>
          </motion.h2>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          style={{
            display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '3rem',
            padding: '3rem',
            border: '1px solid rgba(201,168,76,0.2)',
            background: 'linear-gradient(135deg, rgba(201,168,76,0.06) 0%, transparent 60%)',
            marginBottom: '2rem', position: 'relative', overflow: 'hidden',
          }}
        >
          <div style={{
            position: 'absolute', top: 0, right: 0,
            width: 100, height: 100,
            background: 'linear-gradient(225deg, rgba(201,168,76,0.1) 0%, transparent 60%)',
          }} />

          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '1rem' }}>
            <motion.div
              whileHover={{ scale: 1.05 }}
              style={{
                width: 120, height: 120, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '2.5rem', fontFamily: 'Cormorant Garamond', fontWeight: 700, color: '#050505',
                boxShadow: '0 0 40px rgba(201,168,76,0.25)',
                cursor: 'none',
              }}
            >{featured.initials}</motion.div>
            <div style={{
              padding: '0.3rem 1rem',
              border: '1px solid var(--gold)',
              fontFamily: 'Space Mono', fontSize: '0.6rem',
              color: 'var(--gold)', letterSpacing: '0.15em', textTransform: 'uppercase',
            }}>{featured.role}</div>
          </div>

          <div>
            <div style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'var(--gold)', letterSpacing: '0.2em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
              ★ Founder
            </div>
            <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.8rem', fontWeight: 500, color: 'var(--white)', marginBottom: '1rem', lineHeight: 1 }}>
              {featured.name}
            </h3>
            <div className="divider" />
            <p style={{ color: 'var(--white-dim)', lineHeight: 1.9, fontWeight: 300, fontSize: '0.95rem', marginBottom: '1.5rem' }}>
              {featured.bio}
            </p>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
              {featured.skills.map(skill => (
                <span key={skill} style={{
                  padding: '0.3rem 0.8rem',
                  border: '1px solid rgba(201,168,76,0.25)',
                  fontFamily: 'Space Mono', fontSize: '0.58rem',
                  color: 'var(--gold)', letterSpacing: '0.08em',
                  background: 'rgba(201,168,76,0.04)',
                }}>{skill}</span>
              ))}
            </div>
          </div>
        </motion.div>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '1.2rem' }}>
          {rest.map((member, i) => (
            <motion.div
              key={member._id || i}
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: 0.3 + i * 0.1 }}
              whileHover={{ y: -8, borderColor: 'rgba(201,168,76,0.35)' }}
              style={{
                padding: '2rem',
                border: '1px solid rgba(201,168,76,0.1)',
                background: 'var(--dark)',
                transition: 'all 0.3s', cursor: 'none', textAlign: 'center',
              }}
            >
              <div style={{
                width: 64, height: 64, borderRadius: '50%',
                background: 'linear-gradient(135deg, var(--dark-4), var(--dark-5))',
                border: '1px solid rgba(201,168,76,0.25)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', fontWeight: 600, color: 'var(--gold)',
                margin: '0 auto 1rem',
              }}>{member.initials}</div>
              <h4 style={{ fontFamily: 'Outfit', fontWeight: 600, fontSize: '0.95rem', color: 'var(--white)', marginBottom: '0.3rem' }}>{member.name}</h4>
              <p style={{ fontFamily: 'Space Mono', fontSize: '0.58rem', color: 'var(--gold)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.8rem' }}>{member.role}</p>
              <p style={{ fontSize: '0.78rem', color: 'var(--white-dim)', lineHeight: 1.7, fontWeight: 300, marginBottom: '1rem' }}>{member.bio}</p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem', justifyContent: 'center' }}>
                {member.skills.map(s => (
                  <span key={s} style={{
                    fontFamily: 'Space Mono', fontSize: '0.56rem',
                    color: 'rgba(201,168,76,0.7)', padding: '0.15rem 0.5rem',
                    border: '1px solid rgba(201,168,76,0.15)',
                  }}>{s}</span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #team > div > div:nth-child(3) { grid-template-columns: 1fr 1fr !important; }
          #team > div > div:nth-child(2) { grid-template-columns: 1fr !important; text-align: center; }
          #team { padding: 5rem 1.5rem !important; }
        }
        @media (max-width: 600px) {
          #team > div > div:nth-child(3) { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}
