import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { api } from '../utils/api'

const emptyProject = {
  title: '',
  sub: '',
  desc: '',
  tech: '',
  category: 'Web App',
  color: '#C9A84C',
  year: '2024',
  link: '#',
  image: '',
}

const emptyMember = {
  name: '',
  role: '',
  bio: '',
  skills: '',
  initials: '',
  featured: false,
}

export default function AdminDashboard({ user, onLogout }) {
  const [tab, setTab] = useState('dashboard')
  const [projects, setProjects] = useState([])
  const [contacts, setContacts] = useState([])
  const [team, setTeam] = useState([])
  const [settings, setSettings] = useState({})
  const [loading, setLoading] = useState(true)
  const [editingProject, setEditingProject] = useState(null)
  const [editingMember, setEditingMember] = useState(null)
  const [projectForm, setProjectForm] = useState(emptyProject)
  const [memberForm, setMemberForm] = useState(emptyMember)
  const [message, setMessage] = useState({ type: '', text: '' })

  const fetchAll = async () => {
    setLoading(true)
    try {
      const [p, c, t, s] = await Promise.all([
        api.getProjects(),
        api.getContacts(),
        api.getTeam(),
        api.getSettings(),
      ])
      setProjects(p)
      setContacts(c)
      setTeam(t)
      setSettings(s)
    } catch (err) {
      showMessage('error', err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchAll()
  }, [])

  const showMessage = (type, text) => {
    setMessage({ type, text })
    setTimeout(() => setMessage({ type: '', text: '' }), 3000)
  }

  const handleSaveProject = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...projectForm,
        tech: projectForm.tech.split(',').map(s => s.trim()).filter(Boolean),
      }
      if (editingProject) {
        await api.updateProject(editingProject._id, payload)
        showMessage('success', 'Project updated')
      } else {
        await api.createProject(payload)
        showMessage('success', 'Project created')
      }
      setProjectForm(emptyProject)
      setEditingProject(null)
      fetchAll()
    } catch (err) {
      showMessage('error', err.message)
    }
  }

  const handleEditProject = (p) => {
    setEditingProject(p)
    setProjectForm({
      ...p,
      tech: Array.isArray(p.tech) ? p.tech.join(', ') : p.tech || '',
    })
  }

  const handleDeleteProject = async (id) => {
    if (!confirm('Delete this project?')) return
    try {
      await api.deleteProject(id)
      showMessage('success', 'Project deleted')
      fetchAll()
    } catch (err) {
      showMessage('error', err.message)
    }
  }

  const handleSaveMember = async (e) => {
    e.preventDefault()
    try {
      const payload = {
        ...memberForm,
        skills: memberForm.skills.split(',').map(s => s.trim()).filter(Boolean),
      }
      if (editingMember) {
        await api.updateTeamMember(editingMember._id, payload)
        showMessage('success', 'Team member updated')
      } else {
        await api.createTeamMember(payload)
        showMessage('success', 'Team member created')
      }
      setMemberForm(emptyMember)
      setEditingMember(null)
      fetchAll()
    } catch (err) {
      showMessage('error', err.message)
    }
  }

  const handleEditMember = (m) => {
    setEditingMember(m)
    setMemberForm({
      ...m,
      skills: Array.isArray(m.skills) ? m.skills.join(', ') : m.skills || '',
    })
  }

  const handleDeleteMember = async (id) => {
    if (!confirm('Delete this team member?')) return
    try {
      await api.deleteTeamMember(id)
      showMessage('success', 'Team member deleted')
      fetchAll()
    } catch (err) {
      showMessage('error', err.message)
    }
  }

  const handleSaveSettings = async (e) => {
    e.preventDefault()
    try {
      await api.updateSettings(settings)
      showMessage('success', 'Settings saved')
    } catch (err) {
      showMessage('error', err.message)
    }
  }

  const handleDeleteContact = async (id) => {
    if (!confirm('Delete this contact?')) return
    try {
      await api.deleteContact(id)
      showMessage('success', 'Contact deleted')
      fetchAll()
    } catch (err) {
      showMessage('error', err.message)
    }
  }

  const tabs = [
    { id: 'dashboard', label: 'Dashboard' },
    { id: 'projects', label: 'Projects' },
    { id: 'contacts', label: 'Contacts' },
    { id: 'team', label: 'Team' },
    { id: 'settings', label: 'Settings' },
  ]

  if (!user) {
    return (
      <div style={{ display: 'flex', minHeight: '100vh', alignItems: 'center', justifyContent: 'center', background: 'var(--dark)', color: 'var(--gold)', fontFamily: 'Space Mono', fontSize: '0.8rem', letterSpacing: '0.1em' }}>
        LOADING...
      </div>
    )
  }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: 'var(--dark)' }}>
      {/* Sidebar */}
      <div style={{
        width: 240,
        background: 'var(--dark-2)',
        borderRight: '1px solid rgba(201,168,76,0.1)',
        padding: '2rem 0',
        display: 'flex',
        flexDirection: 'column',
      }}>
        <div style={{ padding: '0 1.5rem 2rem', borderBottom: '1px solid rgba(201,168,76,0.08)' }}>
          <h2 style={{
            fontFamily: 'Cormorant Garamond',
            fontSize: '1.6rem',
            color: 'var(--white)',
            marginBottom: '0.2rem',
          }}>Admin</h2>
          <p style={{
            fontFamily: 'Space Mono',
            fontSize: '0.6rem',
            color: 'var(--gold)',
            letterSpacing: '0.1em',
          }}>{user?.email || 'Admin account'}</p>
        </div>

        <nav style={{ flex: 1, padding: '1.5rem 0' }}>
          {tabs.map(t => (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              style={{
                width: '100%',
                padding: '0.8rem 1.5rem',
                background: tab === t.id ? 'rgba(201,168,76,0.08)' : 'transparent',
                border: 'none',
                borderLeft: tab === t.id ? '2px solid var(--gold)' : '2px solid transparent',
                color: tab === t.id ? 'var(--gold)' : 'var(--white-dim)',
                fontFamily: 'Space Mono',
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
                cursor: 'pointer',
                textAlign: 'left',
                transition: 'all 0.2s',
              }}
            >{t.label}</button>
          ))}
        </nav>

        <div style={{ padding: '1.5rem', borderTop: '1px solid rgba(201,168,76,0.08)' }}>
          <button
            onClick={onLogout}
            style={{
              width: '100%',
              padding: '0.7rem',
              background: 'transparent',
              border: '1px solid rgba(201,168,76,0.2)',
              color: 'var(--white-dim)',
              fontFamily: 'Space Mono',
              fontSize: '0.65rem',
              letterSpacing: '0.1em',
              textTransform: 'uppercase',
              cursor: 'pointer',
            }}
          >Logout</button>
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, padding: '2rem', overflow: 'auto' }}>
        {message.text && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              padding: '0.8rem 1.2rem',
              marginBottom: '1.5rem',
              background: message.type === 'success' ? 'rgba(34, 197, 94, 0.1)' : 'rgba(220, 38, 38, 0.1)',
              border: `1px solid ${message.type === 'success' ? 'rgba(34,197,94,0.3)' : 'rgba(220,38,38,0.3)'}`,
              color: message.type === 'success' ? '#4ade80' : '#fca5a5',
              fontSize: '0.85rem',
            }}
          >{message.text}</motion.div>
        )}

        {loading ? (
          <div style={{ color: 'var(--gold)', textAlign: 'center', padding: '4rem' }}>Loading...</div>
        ) : (
          <>
            {tab === 'dashboard' && (
              <DashboardOverview
                projects={projects}
                contacts={contacts}
                team={team}
              />
            )}

            {tab === 'projects' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--white)' }}>Projects</h2>
                  <button
                    onClick={() => { setEditingProject(null); setProjectForm(emptyProject) }}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: 'var(--gold)',
                      color: 'var(--dark)',
                      border: 'none',
                      fontFamily: 'Space Mono',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >Add Project</button>
                </div>

                {(editingProject || projects.length === 0) && (
                  <form onSubmit={handleSaveProject} style={{
                    padding: '1.5rem',
                    border: '1px solid rgba(201,168,76,0.15)',
                    background: 'rgba(201,168,76,0.02)',
                    marginBottom: '1.5rem',
                  }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '1rem' }}>
                      {editingProject ? 'Edit Project' : 'New Project'}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        placeholder="Title"
                        required
                        value={projectForm.title}
                        onChange={e => setProjectForm({ ...projectForm, title: e.target.value })}
                        style={inputStyle}
                      />
                      <input
                        placeholder="Subtitle"
                        required
                        value={projectForm.sub}
                        onChange={e => setProjectForm({ ...projectForm, sub: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <textarea
                      placeholder="Description"
                      required
                      value={projectForm.desc}
                      onChange={e => setProjectForm({ ...projectForm, desc: e.target.value })}
                      style={{ ...inputStyle, minHeight: 80, marginBottom: '1rem' }}
                    />
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        placeholder="Tech (comma separated)"
                        value={projectForm.tech}
                        onChange={e => setProjectForm({ ...projectForm, tech: e.target.value })}
                        style={inputStyle}
                      />
                      <input
                        placeholder="Category"
                        required
                        value={projectForm.category}
                        onChange={e => setProjectForm({ ...projectForm, category: e.target.value })}
                        style={inputStyle}
                      />
                      <input
                        placeholder="Year"
                        value={projectForm.year}
                        onChange={e => setProjectForm({ ...projectForm, year: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        placeholder="Link URL"
                        value={projectForm.link}
                        onChange={e => setProjectForm({ ...projectForm, link: e.target.value })}
                        style={inputStyle}
                      />
                      <input
                        placeholder="Image URL"
                        value={projectForm.image}
                        onChange={e => setProjectForm({ ...projectForm, image: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="submit" style={btnPrimary}>Save</button>
                      <button type="button" onClick={() => { setEditingProject(null); setProjectForm(emptyProject) }} style={btnSecondary}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'grid', gap: '0.8rem' }}>
                  {projects.map(p => (
                    <div key={p._id} style={{
                      padding: '1rem 1.2rem',
                      border: '1px solid rgba(201,168,76,0.1)',
                      background: 'var(--dark-2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.2rem' }}>{p.title}</div>
                        <div style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'var(--gold)' }}>{p.category} • {p.year}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleEditProject(p)} style={btnSmall}>Edit</button>
                        <button onClick={() => handleDeleteProject(p._id)} style={{ ...btnSmall, background: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)', color: '#fca5a5' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'contacts' && (
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1.5rem' }}>Contacts</h2>
                <div style={{ display: 'grid', gap: '0.8rem' }}>
                  {contacts.map(c => (
                    <div key={c._id} style={{
                      padding: '1.2rem',
                      border: '1px solid rgba(201,168,76,0.1)',
                      background: 'var(--dark-2)',
                    }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                        <div>
                          <span style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', color: 'var(--white)' }}>{c.name}</span>
                          <span style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--gold)', marginLeft: '1rem' }}>{c.email}</span>
                        </div>
                        <button onClick={() => handleDeleteContact(c._id)} style={{ ...btnSmall, background: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)', color: '#fca5a5' }}>Delete</button>
                      </div>
                      {c.company && <div style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--white-dim)', marginBottom: '0.3rem' }}>Company: {c.company}</div>}
                      {c.budget && <div style={{ fontFamily: 'Space Mono', fontSize: '0.65rem', color: 'var(--white-dim)', marginBottom: '0.3rem' }}>Budget: {c.budget}</div>}
                      <div style={{ fontSize: '0.85rem', color: 'var(--white-dim)', lineHeight: 1.6, marginTop: '0.5rem' }}>{c.message}</div>
                      <div style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'rgba(201,168,76,0.4)', marginTop: '0.5rem' }}>
                        {new Date(c.createdAt).toLocaleString()}
                      </div>
                    </div>
                  ))}
                  {contacts.length === 0 && (
                    <div style={{ color: 'var(--white-dim)', textAlign: 'center', padding: '2rem' }}>No contacts yet</div>
                  )}
                </div>
              </div>
            )}

            {tab === 'team' && (
              <div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
                  <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--white)' }}>Team Members</h2>
                  <button
                    onClick={() => { setEditingMember(null); setMemberForm(emptyMember) }}
                    style={{
                      padding: '0.6rem 1.2rem',
                      background: 'var(--gold)',
                      color: 'var(--dark)',
                      border: 'none',
                      fontFamily: 'Space Mono',
                      fontSize: '0.7rem',
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                    }}
                  >Add Member</button>
                </div>

                {(editingMember || team.length === 0) && (
                  <form onSubmit={handleSaveMember} style={{
                    padding: '1.5rem',
                    border: '1px solid rgba(201,168,76,0.15)',
                    background: 'rgba(201,168,76,0.02)',
                    marginBottom: '1.5rem',
                  }}>
                    <h3 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', color: 'var(--white)', marginBottom: '1rem' }}>
                      {editingMember ? 'Edit Member' : 'New Member'}
                    </h3>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        placeholder="Full Name"
                        required
                        value={memberForm.name}
                        onChange={e => setMemberForm({ ...memberForm, name: e.target.value })}
                        style={inputStyle}
                      />
                      <input
                        placeholder="Role"
                        required
                        value={memberForm.role}
                        onChange={e => setMemberForm({ ...memberForm, role: e.target.value })}
                        style={inputStyle}
                      />
                    </div>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1rem' }}>
                      <input
                        placeholder="Initials (e.g. HN)"
                        required
                        value={memberForm.initials}
                        onChange={e => setMemberForm({ ...memberForm, initials: e.target.value })}
                        style={inputStyle}
                      />
                      <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--white-dim)', fontFamily: 'Space Mono', fontSize: '0.7rem', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={memberForm.featured}
                          onChange={e => setMemberForm({ ...memberForm, featured: e.target.checked })}
                        />
                        Featured (CEO)
                      </label>
                    </div>
                    <textarea
                      placeholder="Bio"
                      required
                      value={memberForm.bio}
                      onChange={e => setMemberForm({ ...memberForm, bio: e.target.value })}
                      style={{ ...inputStyle, minHeight: 80, marginBottom: '1rem' }}
                    />
                    <input
                      placeholder="Skills (comma separated)"
                      value={memberForm.skills}
                      onChange={e => setMemberForm({ ...memberForm, skills: e.target.value })}
                      style={{ ...inputStyle, marginBottom: '1rem' }}
                    />
                    <div style={{ display: 'flex', gap: '0.5rem' }}>
                      <button type="submit" style={btnPrimary}>Save</button>
                      <button type="button" onClick={() => { setEditingMember(null); setMemberForm(emptyMember) }} style={btnSecondary}>Cancel</button>
                    </div>
                  </form>
                )}

                <div style={{ display: 'grid', gap: '0.8rem' }}>
                  {team.map(m => (
                    <div key={m._id} style={{
                      padding: '1rem 1.2rem',
                      border: '1px solid rgba(201,168,76,0.1)',
                      background: 'var(--dark-2)',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                    }}>
                      <div>
                        <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.1rem', color: 'var(--white)', marginBottom: '0.2rem' }}>{m.name}</div>
                        <div style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'var(--gold)' }}>{m.role} {m.featured ? '• Featured' : ''}</div>
                      </div>
                      <div style={{ display: 'flex', gap: '0.5rem' }}>
                        <button onClick={() => handleEditMember(m)} style={btnSmall}>Edit</button>
                        <button onClick={() => handleDeleteMember(m._id)} style={{ ...btnSmall, background: 'rgba(220,38,38,0.1)', borderColor: 'rgba(220,38,38,0.3)', color: '#fca5a5' }}>Delete</button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {tab === 'settings' && (
              <div>
                <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1.5rem' }}>Website Settings</h2>
                <form onSubmit={handleSaveSettings} style={{
                  padding: '1.5rem',
                  border: '1px solid rgba(201,168,76,0.15)',
                  background: 'rgba(201,168,76,0.02)',
                  maxWidth: 600,
                }}>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Contact Email</label>
                    <input
                      value={settings.contact_email || ''}
                      onChange={e => setSettings({ ...settings, contact_email: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Location</label>
                    <input
                      value={settings.location || ''}
                      onChange={e => setSettings({ ...settings, location: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Hero Title</label>
                    <input
                      value={settings.hero_title || ''}
                      onChange={e => setSettings({ ...settings, hero_title: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>Hero Subtitle</label>
                    <textarea
                      value={settings.hero_subtitle || ''}
                      onChange={e => setSettings({ ...settings, hero_subtitle: e.target.value })}
                      style={{ ...inputStyle, minHeight: 80 }}
                    />
                  </div>
                  <div style={{ marginBottom: '1rem' }}>
                    <label style={labelStyle}>About Text</label>
                    <textarea
                      value={settings.about_text || ''}
                      onChange={e => setSettings({ ...settings, about_text: e.target.value })}
                      style={{ ...inputStyle, minHeight: 120 }}
                    />
                  </div>
                  <div style={{ marginBottom: '1.5rem' }}>
                    <label style={labelStyle}>Footer Text</label>
                    <input
                      value={settings.footer_text || ''}
                      onChange={e => setSettings({ ...settings, footer_text: e.target.value })}
                      style={inputStyle}
                    />
                  </div>
                  <button type="submit" style={btnPrimary}>Save Settings</button>
                </form>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  )
}

const inputStyle = {
  width: '100%',
  padding: '0.8rem 1rem',
  background: 'rgba(201,168,76,0.02)',
  border: '1px solid rgba(201,168,76,0.12)',
  color: 'var(--white)',
  fontFamily: 'Outfit',
  fontSize: '0.85rem',
  outline: 'none',
}

const labelStyle = {
  fontFamily: 'Space Mono',
  fontSize: '0.62rem',
  color: 'var(--gold)',
  letterSpacing: '0.15em',
  textTransform: 'uppercase',
  marginBottom: '0.5rem',
  display: 'block',
}

const btnPrimary = {
  padding: '0.7rem 1.4rem',
  background: 'var(--gold)',
  color: 'var(--dark)',
  border: 'none',
  fontFamily: 'Space Mono',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

const btnSecondary = {
  padding: '0.7rem 1.4rem',
  background: 'transparent',
  color: 'var(--white-dim)',
  border: '1px solid rgba(201,168,76,0.2)',
  fontFamily: 'Space Mono',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

const btnSmall = {
  padding: '0.4rem 0.8rem',
  background: 'transparent',
  border: '1px solid rgba(201,168,76,0.2)',
  color: 'var(--gold)',
  fontFamily: 'Space Mono',
  fontSize: '0.65rem',
  letterSpacing: '0.08em',
  textTransform: 'uppercase',
  cursor: 'pointer',
}

const isNew = (date) => {
  if (!date) return false
  const diff = Date.now() - new Date(date).getTime()
  return diff >= 0 && diff <= 7 * 24 * 60 * 60 * 1000
}

const recentOf = (items, n = 5) =>
  [...items]
    .sort((a, b) => new Date(b.createdAt || 0) - new Date(a.createdAt || 0))
    .slice(0, n)

function StatCard({ label, value, sub }) {
  return (
    <div style={{
      padding: '1.4rem',
      border: '1px solid rgba(201,168,76,0.12)',
      background: 'var(--dark-2)',
    }}>
      <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '2.4rem', color: 'var(--gold)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontFamily: 'Space Mono', fontSize: '0.62rem', color: 'var(--white-dim)', letterSpacing: '0.12em', textTransform: 'uppercase', marginTop: '0.5rem' }}>{label}</div>
      {sub && <div style={{ fontFamily: 'Space Mono', fontSize: '0.6rem', color: 'rgba(201,168,76,0.5)', marginTop: '0.3rem' }}>{sub}</div>}
    </div>
  )
}

function RecentList({ title, items, render }) {
  return (
    <div style={{ border: '1px solid rgba(201,168,76,0.1)', background: 'var(--dark-2)' }}>
      <div style={{ padding: '1rem 1.2rem', borderBottom: '1px solid rgba(201,168,76,0.08)', fontFamily: 'Cormorant Garamond', fontSize: '1.2rem', color: 'var(--white)' }}>{title}</div>
      <div style={{ display: 'grid', gap: '0.5rem', padding: '0.8rem' }}>
        {items.length === 0 && (
          <div style={{ color: 'var(--white-dim)', fontSize: '0.8rem', textAlign: 'center', padding: '1rem' }}>Nothing added yet</div>
        )}
        {items.map((it) => render(it))}
      </div>
    </div>
  )
}

function DashboardOverview({ projects, contacts, team }) {
  const featured = team.filter((m) => m.featured).length
  const recentProjects = recentOf(projects)
  const recentTeam = recentOf(team)
  const recentContacts = recentOf(contacts)

  return (
    <div>
      <h2 style={{ fontFamily: 'Cormorant Garamond', fontSize: '1.8rem', color: 'var(--white)', marginBottom: '1.5rem' }}>Dashboard</h2>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))', gap: '1rem', marginBottom: '2rem' }}>
        <StatCard label="Projects" value={projects.length} sub="total added" />
        <StatCard label="Contacts" value={contacts.length} sub="received" />
        <StatCard label="Team Members" value={team.length} sub="total added" />
        <StatCard label="Featured" value={featured} sub="on homepage" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
        <RecentList
          title="Recently Added Projects"
          items={recentProjects}
          render={(p) => (
            <div key={p._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', border: '1px solid rgba(201,168,76,0.08)' }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1rem', color: 'var(--white)' }}>{p.title}</div>
                <div style={{ fontFamily: 'Space Mono', fontSize: '0.58rem', color: 'var(--gold)' }}>{p.category} • {p.year}</div>
              </div>
              {isNew(p.createdAt) && <span style={badgeStyle}>NEW</span>}
            </div>
          )}
        />

        <RecentList
          title="Recently Added Team"
          items={recentTeam}
          render={(m) => (
            <div key={m._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', border: '1px solid rgba(201,168,76,0.08)' }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1rem', color: 'var(--white)' }}>{m.name}</div>
                <div style={{ fontFamily: 'Space Mono', fontSize: '0.58rem', color: 'var(--gold)' }}>{m.role}{m.featured ? ' • Featured' : ''}</div>
              </div>
              {isNew(m.createdAt) && <span style={badgeStyle}>NEW</span>}
            </div>
          )}
        />

        <RecentList
          title="Recently Received Contacts"
          items={recentContacts}
          render={(c) => (
            <div key={c._id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.6rem 0.8rem', border: '1px solid rgba(201,168,76,0.08)' }}>
              <div>
                <div style={{ fontFamily: 'Cormorant Garamond', fontSize: '1rem', color: 'var(--white)' }}>{c.name}</div>
                <div style={{ fontFamily: 'Space Mono', fontSize: '0.58rem', color: 'var(--gold)' }}>{c.email}</div>
              </div>
              {isNew(c.createdAt) && <span style={badgeStyle}>NEW</span>}
            </div>
          )}
        />
      </div>
    </div>
  )
}

const badgeStyle = {
  padding: '0.2rem 0.5rem',
  background: 'rgba(201,168,76,0.12)',
  border: '1px solid rgba(201,168,76,0.3)',
  color: 'var(--gold)',
  fontFamily: 'Space Mono',
  fontSize: '0.55rem',
  letterSpacing: '0.1em',
}
