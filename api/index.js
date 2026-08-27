import app from '../server/server.js'

export default (req, res) => {
	// Vercel strips the /api function prefix before invoking Express.
	if (!req.url.startsWith('/api')) {
		req.url = `/api${req.url === '/' ? '' : req.url}`
	}

	return app(req, res)
}
