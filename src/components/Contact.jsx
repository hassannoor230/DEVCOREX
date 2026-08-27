import { useRef, useState, useEffect } from 'react'
import { motion, useInView } from 'framer-motion'
import { API_BASE } from '../utils/apiBase'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [form, setForm] = useState({ name: '', email: '', company: '', budget: '', message: '' })
  const [sent, setSent] = useState(false)
  const [focused, setFocused] = useState(null)
  const [settings, setSettings] = useState(null)

  useEffect(() => {
    fetch(`${API_BASE}/settings`, { headers: { 'Content-Type': 'application/json' } })
      .then(res => res.ok ? res.json() : Promise.reject())
      .then(data => setSettings(data))
      .catch(() => {})
  }, [])

  const inputStyle = (field) => ({
    width: '100%',
    padding: '1rem 1.2rem',
    background: focused === field ? 'rgba(201,168,76,0.04)' : 'rgba(201,168,76,0.02)',
    border: `1px solid ${focused === field ? 'rgba(201,168,76,0.5)' : 'rgba(201,168,76,0.12)'}`,
    color: 'var(--white)',
    fontFamily: 'Outfit',
    fontSize: '0.88rem',
    outline: 'none',
    transition: 'all 0.3s',
    cursor: 'none',
  })

  const labelStyle = {
    fontFamily: 'Space Mono', fontSize: '0.62rem',
    letterSpacing: '0.15em', color: 'var(--gold)',
    textTransform: 'uppercase', marginBottom: '0.5rem',
    display: 'block',
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      const res = await fetch(`${API_BASE}/contacts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Failed to send')
      setSent(true)
      setTimeout(() => setSent(false), 4000)
      setForm({ name: '', email: '', company: '', budget: '', message: '' })
    } catch (error) {
      console.error('Failed to send email:', error)
      alert('Failed to send message. Please try again or email us directly at hassannoor2309@gmail.com')
    }
  }

  const contactEmail = settings?.contact_email || 'hassannoor2309@gmail.com'
  const location = settings?.location || 'Gujranwala, Pakistan'

  return (
    <section id="contact" ref={ref} style={{
      padding: '8rem 4rem',
      background: 'var(--dark)',
      position: 'relative', overflow: 'hidden',
    }}>
      <div style={{
        position: 'absolute', bottom: 0, left: 0, right: 0, height: '40%',
        background: 'linear-gradient(to top, rgba(201,168,76,0.04), transparent)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: 1200, margin: '0 auto', position: 'relative', zIndex: 1 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '6rem', alignItems: 'start' }}>
          <div>
            <motion.p className="section-label"
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}}
            >Get In Touch</motion.p>
            <motion.h2 className="section-title"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3.2rem)', marginBottom: '1.5rem' }}
              initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}
            >
              Let's Build Something <span className="gold-text">Extraordinary</span>
            </motion.h2>
            <motion.div className="divider"
              initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}}
              style={{ transformOrigin: 'left' }} transition={{ delay: 0.3 }}
            />
            <motion.p
              initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ delay: 0.4 }}
              style={{ color: 'var(--white-dim)', lineHeight: 1.9, fontWeight: 300, marginBottom: '2.5rem' }}
            >
              Ready to turn your vision into reality? Share your project details and we'll get back to you within 24 hours with a tailored proposal.
            </motion.p>

            {[
              { icon: '✉', label: 'Email', value: contactEmail },
              { icon: '◎', label: 'Location', value: location },
              { icon: '⌚', label: 'Response Time', value: 'Within 24 hours' },
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + i * 0.1 }}
                style={{
                  display: 'flex', alignItems: 'center', gap: '1rem',
                  marginBottom: '1.2rem', padding: '1rem',
                  border: '1px solid rgba(201,168,76,0.08)',
                  background: 'rgba(201,168,76,0.02)',
                }}
              >
                <span style={{ fontSize: '1.1rem', color: 'var(--gold)' }}>{item.icon}</span>
                <div>
                  <div style={{ fontFamily: 'Space Mono', fontSize: '0.58rem', color: 'rgba(201,168,76,0.6)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{item.label}</div>
                  <div style={{ fontSize: '0.88rem', color: 'var(--white)', fontWeight: 400, marginTop: '0.15rem' }}>{item.value}</div>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3 }}
            style={{
              padding: '2.5rem',
              border: '1px solid rgba(201,168,76,0.15)',
              background: 'rgba(201,168,76,0.02)',
              position: 'relative',
            }}
          >
            <div style={{ position: 'absolute', top: -1, left: -1, width: 40, height: 40, borderTop: '2px solid var(--gold)', borderLeft: '2px solid var(--gold)' }} />
            <div style={{ position: 'absolute', bottom: -1, right: -1, width: 40, height: 40, borderBottom: '2px solid var(--gold)', borderRight: '2px solid var(--gold)' }} />

            {sent ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{ textAlign: 'center', padding: '4rem 2rem' }}
              >
                <div style={{ fontSize: '2.5rem', color: 'var(--gold)', marginBottom: '1rem' }}>✓</div>
                <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '0.5rem' }}>Message Sent!</h3>
                <p style={{ color: 'var(--white-dim)', fontSize: '0.88rem' }}>We'll be in touch within 24 hours.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      type="text" required placeholder="Hassan Noor"
                      value={form.name}
                      onChange={e => setForm({...form, name: e.target.value})}
                      onFocus={() => setFocused('name')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('name')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Email</label>
                    <input
                      type="email" required placeholder="you@company.com"
                      value={form.email}
                      onChange={e => setForm({...form, email: e.target.value})}
                      onFocus={() => setFocused('email')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('email')}
                    />
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.2rem', marginBottom: '1.2rem' }}>
                  <div>
                    <label style={labelStyle}>Company</label>
                    <input
                      type="text" placeholder="Your Company"
                      value={form.company}
                      onChange={e => setForm({...form, company: e.target.value})}
                      onFocus={() => setFocused('company')}
                      onBlur={() => setFocused(null)}
                      style={inputStyle('company')}
                    />
                  </div>
                  <div>
                    <label style={labelStyle}>Budget Range</label>
                    <select
                      value={form.budget}
                      onChange={e => setForm({...form, budget: e.target.value})}
                      onFocus={() => setFocused('budget')}
                      onBlur={() => setFocused(null)}
                      style={{ ...inputStyle('budget'), appearance: 'none' }}
                    >
                      <option value="" style={{ background: '#111' }}>Select Budget</option>
                      <option value="5k-15k" style={{ background: '#111' }}>$5K – $15K</option>
                      <option value="15k-50k" style={{ background: '#111' }}>$15K – $50K</option>
                      <option value="50k-100k" style={{ background: '#111' }}>$50K – $100K</option>
                      <option value="100k+" style={{ background: '#111' }}>$100K+</option>
                    </select>
                  </div>
                </div>

                <div style={{ marginBottom: '1.8rem' }}>
                  <label style={labelStyle}>Project Details</label>
                  <textarea
                    rows={5} required placeholder="Tell us about your project, goals, and timeline..."
                    value={form.message}
                    onChange={e => setForm({...form, message: e.target.value})}
                    onFocus={() => setFocused('message')}
                    onBlur={() => setFocused(null)}
                    style={{ ...inputStyle('message'), resize: 'vertical', minHeight: 130 }}
                  />
                </div>

                <motion.button
                  type="submit"
                  className="btn-primary"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  style={{ width: '100%', justifyContent: 'center', fontSize: '0.8rem', padding: '1.1rem' }}
                >
                  Send Message
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8l12 0M10 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.button>
              </form>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          #contact > div > div { grid-template-columns: 1fr !important; gap: 3rem !important; }
          #contact { padding: 5rem 1.5rem !important; }
        }
        input::placeholder, textarea::placeholder { color: rgba(245,240,232,0.2); }
        input, textarea, select { color: var(--white) !important; }
        option { background: #111; color: #F5F0E8; }
      `}</style>
    </section>
  )
}
