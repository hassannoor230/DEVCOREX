import { motion } from 'framer-motion'

const techs = ['React', 'Next.js', 'Node.js', 'Python', 'Flutter', 'React Native', 'AWS', 'GCP', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'OpenAI', 'TypeScript', 'GraphQL', 'Redis']

export default function TechBand() {
  return (
    <div style={{
      background: 'var(--dark-4)',
      borderTop: '1px solid rgba(201,168,76,0.08)',
      borderBottom: '1px solid rgba(201,168,76,0.08)',
      padding: '1.2rem 0',
      overflow: 'hidden',
      position: 'relative',
    }}>
      {/* Fade edges */}
      <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to right, var(--dark-4), transparent)', zIndex: 2 }} />
      <div style={{ position: 'absolute', right: 0, top: 0, bottom: 0, width: 100, background: 'linear-gradient(to left, var(--dark-4), transparent)', zIndex: 2 }} />

      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{ display: 'flex', gap: '3rem', width: 'max-content' }}
      >
        {[...techs, ...techs].map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.8rem', whiteSpace: 'nowrap' }}>
            <span style={{ width: 4, height: 4, borderRadius: '50%', background: 'var(--gold)', opacity: 0.6, flexShrink: 0 }} />
            <span style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--white-dim)', letterSpacing: '0.15em', textTransform: 'uppercase' }}>{t}</span>
          </div>
        ))}
      </motion.div>
    </div>
  )
}
