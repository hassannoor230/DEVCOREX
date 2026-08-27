import { API_BASE } from './apiBase'

const getAuthHeaders = () => {
  const token = localStorage.getItem('admin_token')
  return {
    'Content-Type': 'application/json',
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  }
}

export const api = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Login failed')
    return data
  },

  getMe: async () => {
    const res = await fetch(`${API_BASE}/auth/me`, {
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Unauthorized')
    return data
  },

  getProjects: async () => {
    const res = await fetch(`${API_BASE}/projects`, {
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch projects')
    return data
  },

  createProject: async (project) => {
    const res = await fetch(`${API_BASE}/projects`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create project')
    return data
  },

  updateProject: async (id, project) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(project),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update project')
    return data
  },

  deleteProject: async (id) => {
    const res = await fetch(`${API_BASE}/projects/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete project')
    return data
  },

  getContacts: async () => {
    const res = await fetch(`${API_BASE}/contacts`, {
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch contacts')
    return data
  },

  deleteContact: async (id) => {
    const res = await fetch(`${API_BASE}/contacts/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete contact')
    return data
  },

  getTeam: async () => {
    const res = await fetch(`${API_BASE}/team`, {
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch team')
    return data
  },

  createTeamMember: async (member) => {
    const res = await fetch(`${API_BASE}/team`, {
      method: 'POST',
      headers: getAuthHeaders(),
      body: JSON.stringify(member),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to create team member')
    return data
  },

  updateTeamMember: async (id, member) => {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(member),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update team member')
    return data
  },

  deleteTeamMember: async (id) => {
    const res = await fetch(`${API_BASE}/team/${id}`, {
      method: 'DELETE',
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to delete team member')
    return data
  },

  getSettings: async () => {
    const res = await fetch(`${API_BASE}/settings`, {
      headers: getAuthHeaders(),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to fetch settings')
    return data
  },

  updateSettings: async (settings) => {
    const res = await fetch(`${API_BASE}/settings`, {
      method: 'PUT',
      headers: getAuthHeaders(),
      body: JSON.stringify(settings),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.message || 'Failed to update settings')
    return data
  },
}
