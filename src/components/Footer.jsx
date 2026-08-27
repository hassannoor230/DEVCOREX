import { motion } from 'framer-motion'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: 'var(--dark-2)',
      borderTop: '1px solid rgba(201,168,76,0.1)',
      padding: '4rem 4rem 2rem',
    }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        {/* Top grid */}
        <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr', gap: '3rem', marginBottom: '3rem' }}>
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', marginBottom: '1.2rem' }}>
              <div style={{
                width: 34, height: 34,
                background: 'linear-gradient(135deg, var(--gold), var(--gold-dim))',
                clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <span style={{ fontFamily: 'Cormorant Garamond', fontWeight: 700, fontSize: '0.9rem', color: '#050505' }}>D</span>
              </div>
              <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.3rem', fontWeight: 600, color: 'var(--white)' }}>
                Dev<span style={{ color: 'var(--gold)' }}>corex</span>
              </span>
            </div>
            <p style={{ color: 'var(--white-dim)', fontSize: '0.82rem', lineHeight: 1.8, fontWeight: 300, maxWidth: 260, marginBottom: '1.5rem' }}>
              Premium software engineering studio crafting digital solutions that stand the test of time.
            </p>
            <div style={{ display: 'flex', gap: '0.8rem' }}>
              {['𝕏', 'in', 'gh', 'be'].map(s => (
                <motion.a
                  key={s}
                  href="#"
                  whileHover={{ y: -3, color: 'var(--gold)' }}
                  style={{
                    width: 36, height: 36,
                    border: '1px solid rgba(201,168,76,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--white-dim)', textDecoration: 'none',
                    fontSize: '0.75rem', fontFamily: 'Space Mono',
                    transition: 'color 0.3s', cursor: 'none',
                  }}
                >{s}</motion.a>
              ))}
            </div>
          </div>

          {/* Services */}
          <div>
            <p style={{ fontFamily: 'Space Mono', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Services</p>
            {['Custom Software', 'Mobile Apps', 'Cloud & DevOps', 'UI/UX Design', 'AI & ML'].map(link => (
              <motion.a key={link} href="#" whileHover={{ x: 4, color: 'var(--gold)' }}
                style={{ display: 'block', color: 'var(--white-dim)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s', cursor: 'none', fontWeight: 300 }}>
                {link}
              </motion.a>
            ))}
          </div>

          {/* Company */}
          <div>
            <p style={{ fontFamily: 'Space Mono', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Company</p>
            {['About Us', 'Portfolio', 'Team', 'Careers', 'Blog'].map(link => (
              <motion.a key={link} href="#" whileHover={{ x: 4, color: 'var(--gold)' }}
                style={{ display: 'block', color: 'var(--white-dim)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '0.6rem', transition: 'color 0.3s', cursor: 'none', fontWeight: 300 }}>
                {link}
              </motion.a>
            ))}
          </div>

          {/* Contact */}
          <div>
            <p style={{ fontFamily: 'Space Mono', fontSize: '0.62rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '1.2rem' }}>Contact</p>
            <p style={{ color: 'var(--white-dim)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 300 }}>hello@devcorex.com</p>
            <p style={{ color: 'var(--white-dim)', fontSize: '0.82rem', marginBottom: '0.5rem', fontWeight: 300 }}>Lahore, Pakistan</p>
            <p style={{ color: 'var(--white-dim)', fontSize: '0.82rem', fontWeight: 300 }}>+92 300 0000000</p>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{
          paddingTop: '2rem',
          borderTop: '1px solid rgba(201,168,76,0.08)',
          display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem',
        }}>
          <p style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'var(--white-dim)', letterSpacing: '0.1em' }}>
            © {year} DEVCOREX. ALL RIGHTS RESERVED.
          </p>
          <p style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'var(--white-dim)', letterSpacing: '0.1em' }}>
            BUILT WITH PRECISION BY{' '}
            <span style={{ color: 'var(--gold)' }}>HASSAN NOOR</span>
          </p>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          footer > div > div:first-child { grid-template-columns: 1fr 1fr !important; }
          footer { padding: 3rem 1.5rem 1.5rem !important; }
        }
        @media (max-width: 500px) {
          footer > div > div:first-child { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}
