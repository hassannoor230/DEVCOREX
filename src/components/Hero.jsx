import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'

const floatVariants = {
  initial: { opacity: 0, y: 40 },
  animate: (i) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15 + 0.2, duration: 0.9, ease: [0.16, 1, 0.3, 1] }
  })
}

export default function Hero() {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    const particles = Array.from({ length: 80 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: Math.random() * 1.5 + 0.3,
      speedX: (Math.random() - 0.5) * 0.3,
      speedY: (Math.random() - 0.5) * 0.3,
      opacity: Math.random() * 0.5 + 0.1,
    }))

    let frame
    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      particles.forEach(p => {
        p.x += p.speedX
        p.y += p.speedY
        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(201, 168, 76, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      particles.forEach((p1, i) => {
        particles.slice(i + 1).forEach(p2 => {
          const dist = Math.hypot(p1.x - p2.x, p1.y - p2.y)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(p1.x, p1.y)
            ctx.lineTo(p2.x, p2.y)
            ctx.strokeStyle = `rgba(201, 168, 76, ${0.06 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        })
      })

      frame = requestAnimationFrame(animate)
    }
    animate()

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
    }
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <section id="home" style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      position: 'relative',
      overflow: 'hidden',
      background: 'radial-gradient(ellipse 80% 60% at 50% 0%, rgba(201,168,76,0.06) 0%, transparent 70%), var(--dark)',
    }}>
      <canvas ref={canvasRef} style={{ position: 'absolute', inset: 0, zIndex: 0 }} />

      {/* Grid overlay */}
      <div style={{
        position: 'absolute', inset: 0, zIndex: 1,
        backgroundImage: 'linear-gradient(rgba(201,168,76,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,76,0.03) 1px, transparent 1px)',
        backgroundSize: '60px 60px',
      }} />

      {/* Glow orbs */}
      <div style={{
        position: 'absolute', top: '20%', left: '10%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(201,168,76,0.07) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(40px)', zIndex: 1,
      }} />
      <div style={{
        position: 'absolute', bottom: '20%', right: '10%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(201,168,76,0.05) 0%, transparent 70%)',
        borderRadius: '50%', filter: 'blur(60px)', zIndex: 1,
      }} />

      <div style={{
        position: 'relative', zIndex: 2,
        maxWidth: 1200, margin: '0 auto',
        padding: '8rem 4rem 4rem',
        width: '100%',
      }}>
        <div style={{ maxWidth: 820 }}>
          {/* Badge */}
          <motion.div
            custom={0} variants={floatVariants} initial="initial" animate="animate"
            style={{
              display: 'inline-flex', alignItems: 'center', gap: '0.6rem',
              padding: '0.4rem 1rem',
              border: '1px solid rgba(201,168,76,0.25)',
              marginBottom: '2rem',
              background: 'rgba(201,168,76,0.05)',
            }}
          >
            <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--gold)', animation: 'pulse-gold 2s infinite' }} />
            <span style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', letterSpacing: '0.2em', color: 'var(--gold)', textTransform: 'uppercase' }}>
              Premium Software House
            </span>
          </motion.div>

          {/* Main Heading */}
          <motion.div custom={1} variants={floatVariants} initial="initial" animate="animate">
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05, color: 'var(--white)', marginBottom: '0.3rem' }}>
              We Build
            </h1>
          </motion.div>
          <motion.div custom={2} variants={floatVariants} initial="initial" animate="animate">
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontWeight: 600, fontStyle: 'italic', fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05, color: 'var(--gold)', marginBottom: '0.3rem' }}>
              Digital Empires
            </h1>
          </motion.div>
          <motion.div custom={3} variants={floatVariants} initial="initial" animate="animate">
            <h1 style={{ fontFamily: 'Cormorant Garamond', fontWeight: 300, fontSize: 'clamp(3rem, 7vw, 6.5rem)', lineHeight: 1.05, color: 'var(--white)' }}>
              That Endure.
            </h1>
          </motion.div>

          <motion.div custom={4} variants={floatVariants} initial="initial" animate="animate">
            <div style={{ width: 80, height: 1, background: 'linear-gradient(90deg, var(--gold), transparent)', margin: '2.5rem 0' }} />
          </motion.div>

          <motion.p
            custom={5} variants={floatVariants} initial="initial" animate="animate"
            style={{
              fontFamily: 'Outfit', fontWeight: 300, fontSize: '1.05rem',
              lineHeight: 1.8, color: 'var(--white-dim)',
              maxWidth: 560, marginBottom: '3rem',
            }}
          >
            Devcorex is a premium software engineering studio crafting high-performance digital products — from scalable SaaS platforms to immersive web experiences — with obsessive precision.
          </motion.p>

          <motion.div
            custom={6} variants={floatVariants} initial="initial" animate="animate"
            style={{ display: 'flex', gap: '1.2rem', flexWrap: 'wrap' }}
          >
            <motion.button
              className="btn-primary"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('contact').scrollIntoView({ behavior: 'smooth' })}
            >
              <span>Start Your Project</span>
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.button>
            <motion.button
              className="btn-outline"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => document.getElementById('portfolio').scrollIntoView({ behavior: 'smooth' })}
            >
              View Our Work
            </motion.button>
          </motion.div>
        </div>

        {/* Stats Row */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.8 }}
          style={{
            display: 'flex', gap: '3rem', flexWrap: 'wrap',
            marginTop: '6rem',
            paddingTop: '2.5rem',
            borderTop: '1px solid rgba(201,168,76,0.1)',
          }}
        >
          {[
            { num: '150+', label: 'Projects Delivered' },
            { num: '8+', label: 'Years Excellence' },
            { num: '40+', label: 'Expert Engineers' },
            { num: '98%', label: 'Client Retention' },
          ].map((stat, i) => (
            <motion.div
              key={i}
              whileHover={{ y: -4 }}
              style={{ cursor: 'none' }}
            >
              <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.4rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>
                {stat.num}
              </div>
              <div style={{ fontFamily: 'Outfit', fontSize: '0.75rem', color: 'var(--white-dim)', letterSpacing: '0.1em', marginTop: '0.4rem', textTransform: 'uppercase' }}>
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        style={{
          position: 'absolute', bottom: '2.5rem', left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem', zIndex: 2,
        }}
      >
       
      </motion.div>

      <style>{`
        @media (max-width: 768px) {
          #home > div:last-of-type { padding: 6rem 1.5rem 3rem !important; }
        }
      `}</style>
    </section>
  )
}
