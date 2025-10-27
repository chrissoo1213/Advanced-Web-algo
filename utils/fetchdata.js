export const fetchData = async (url) => {
	try {
		const response = await fetch(url, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				my_key: "my_super_secret_phrase",
			},
		})
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`)
		}
		const data = await response.json()
		return data
	} catch (error) {
		console.log(error)
		throw error
	}
}   