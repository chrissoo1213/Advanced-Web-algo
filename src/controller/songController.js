import * as songService from '../services/songService.js'

// Get all users
export const getAllsongs = (req, res) => {
	try {
		const songs = songService.getAllsongs()
		res.status(200).json(songs)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Get single user by ID
export const getsongById = (req, res) => {
	try {
		const { id } = req.params
		const song = songService.getsongById(id)
		
		if (!song) {
			return res.status(404).json({ message: "song not found" })
		}
		
		res.status(200).json(song)
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}

// Create new user
export const createsong = (req, res) => {
	try {
		const { title, artist, album,duration } = req.body
		
		// Validation
		if (!title) {
			return res.status(400).json({ message: "title is required" })
		}
		
		const newsong = songService.createsong({title, artist, album,duration})
		res.status(201).json(newsong)
	} catch (error) {
		// Handle duplicate email error
		if (error.message === 'Email already exists') {
			return res.status(409).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

// Update user
export const updatesong = (req, res) => {
	try {
		const { id } = req.params
		const { title, artist, album,duration } = req.body
		
		const updatedsong = songService.updatesong(id, { title, artist, album,duration })
		
		if (!updatedsong) {
			return res.status(404).json({ message: "song not found" })
		}
		
		res.status(200).json(updatedsong)
	} catch (error) {
		if (error.message === 'Email already exists') {
			return res.status(409).json({ message: error.message })
		}
		res.status(500).json({ message: error.message })
	}
}

// Delete user
export const deletesong = (req, res) => {
	try {
		const { id } = req.params
		const deleted = songService.deletesong(id)
		
		if (!deleted) {
			return res.status(404).json({ message: "song not found" })
		}
		
		res.status(204).send()
	} catch (error) {
		res.status(500).json({ message: error.message })
	}
}