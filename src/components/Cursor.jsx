import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

export default function Cursor() {
  const [pos, setPos] = useState({ x: 0, y: 0 })
  const [ring, setRing] = useState({ x: 0, y: 0 })
  const [clicked, setClicked] = useState(false)
  const [hovered, setHovered] = useState(false)

  useEffect(() => {
    const move = (e) => setPos({ x: e.clientX, y: e.clientY })
    const ringMove = (e) => setRing({ x: e.clientX, y: e.clientY })
    const down = () => setClicked(true)
    const up = () => setClicked(false)

    window.addEventListener('mousemove', move)
    window.addEventListener('mousemove', ringMove)
    window.addEventListener('mousedown', down)
    window.addEventListener('mouseup', up)

    const links = document.querySelectorAll('a, button, .hoverable')
    links.forEach(el => {
      el.addEventListener('mouseenter', () => setHovered(true))
      el.addEventListener('mouseleave', () => setHovered(false))
    })

    return () => {
      window.removeEventListener('mousemove', move)
      window.removeEventListener('mousemove', ringMove)
      window.removeEventListener('mousedown', down)
      window.removeEventListener('mouseup', up)
    }
  }, [])

  return (
    <>
      <motion.div
        className="cursor-dot"
        animate={{
          x: pos.x,
          y: pos.y,
          scale: clicked ? 0.5 : hovered ? 1.5 : 1,
        }}
        transition={{ type: 'spring', stiffness: 800, damping: 35 }}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 99999, pointerEvents: 'none', width: 8, height: 8, background: 'var(--gold)', borderRadius: '50%', marginTop: -4, marginLeft: -4 }}
      />
      <motion.div
        className="cursor-ring"
        animate={{
          x: ring.x,
          y: ring.y,
          scale: hovered ? 1.8 : clicked ? 0.8 : 1,
          opacity: hovered ? 0.9 : 0.5,
        }}
        transition={{ type: 'spring', stiffness: 200, damping: 25 }}
        style={{ position: 'fixed', top: 0, left: 0, zIndex: 99998, pointerEvents: 'none', width: 36, height: 36, border: '1px solid var(--gold)', borderRadius: '50%', marginTop: -18, marginLeft: -18 }}
      />
    </>
  )
}
