import { useState } from 'react'
import { motion } from 'framer-motion'
import { api } from '../utils/api'

export default function AdminLogin({ onLogin }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      const data = await api.login(email, password)
      localStorage.setItem('admin_token', data.token)
      onLogin(data.user)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'var(--dark)',
      padding: '2rem',
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: 400,
          padding: '3rem',
          border: '1px solid rgba(201,168,76,0.2)',
          background: 'rgba(201,168,76,0.02)',
        }}
      >
        <h1 style={{
          fontFamily: 'Cormorant Garamond',
          fontSize: '2rem',
          color: 'var(--white)',
          marginBottom: '0.5rem',
          textAlign: 'center',
        }}>Admin Login</h1>
        <p style={{
          fontFamily: 'Space Mono',
          fontSize: '0.65rem',
          color: 'var(--gold)',
          textAlign: 'center',
          marginBottom: '2rem',
          letterSpacing: '0.1em',
        }}>DEV COREX</p>

        {error && (
          <div style={{
            padding: '0.8rem',
            marginBottom: '1.5rem',
            background: 'rgba(220, 38, 38, 0.1)',
            border: '1px solid rgba(220, 38, 38, 0.3)',
            color: '#fca5a5',
            fontSize: '0.85rem',
            textAlign: 'center',
          }}>{error}</div>
        )}

        <form onSubmit={handleSubmit}>
          <div style={{ marginBottom: '1.2rem' }}>
            <label style={{
              fontFamily: 'Space Mono',
              fontSize: '0.62rem',
              color: 'var(--gold)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              display: 'block',
            }}>Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                background: 'rgba(201,168,76,0.02)',
                border: '1px solid rgba(201,168,76,0.12)',
                color: 'var(--white)',
                fontFamily: 'Outfit',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <div style={{ marginBottom: '1.8rem' }}>
            <label style={{
              fontFamily: 'Space Mono',
              fontSize: '0.62rem',
              color: 'var(--gold)',
              letterSpacing: '0.15em',
              textTransform: 'uppercase',
              marginBottom: '0.5rem',
              display: 'block',
            }}>Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: '100%',
                padding: '0.9rem 1rem',
                background: 'rgba(201,168,76,0.02)',
                border: '1px solid rgba(201,168,76,0.12)',
                color: 'var(--white)',
                fontFamily: 'Outfit',
                fontSize: '0.9rem',
                outline: 'none',
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: 'var(--gold)',
              color: 'var(--dark)',
              border: 'none',
              fontFamily: 'Space Mono',
              fontSize: '0.75rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: loading ? 'not-allowed' : 'pointer',
              opacity: loading ? 0.7 : 1,
            }}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>
      </motion.div>
    </div>
  )
}
