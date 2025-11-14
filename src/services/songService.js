import song from '../models/songs.js'

// Get all users
export const getAllsongs = () => {
	return song.findAll()
}

// Get user by ID
export const getsongById = (id) => {
	return song.findById(id)
}

// Create new user
export const createsong = (songData) => {
	const { title, artist, album, duration } = songData
	
	// Business logic: Check if email already exists
	// if (email && User.emailExists(email)) {
	// 	throw new Error('Email already exists')
	// }
	
	// Additional business logic could go here
	// e.g., send welcome email, log user creation, etc.
	
	return song.create({ title, artist, album, duration })
}

// Update user
export const updatesong = (id, songData) => {
	const {title, artist, album, duration } = songData
	
	// Check if user exists
	const existingsong = song.findById(id)
	if (!existingsong) {
		return null
	}
	
	// Business logic: Check if new email conflicts
	// if (email && email !== existingUser.email && User.emailExists(email, id)) {
	// 	throw new Error('Email already exists')
	// }
	
	return song.update(id, {title, artist, album, duration})
}

// Delete user
export const deletesong = (id) => {
	return song.delete(id)
}

// Additional service methods with business logic
export const getsongBytitle = (title) => {
	return song.findBytitle(title)
}

export const getsongCount = () => {
	return song.count()
}