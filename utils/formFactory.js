export const formFactory = () => {
	const form = document.createElement("form")

	// now create your labels and inputs as before ...
	const nameLabel = document.createElement("label")
	nameLabel.htmlFor = "userName"
	nameLabel.classList.add("form-label")
	nameLabel.textContent = "User's Name"

	const nameInput = inputFactory("text", "userName", "form-control", "nameHelp")

	const ageLabel = document.createElement("label")
	ageLabel.htmlFor = "userAge"
	ageLabel.classList.add("form-label")
	ageLabel.textContent = "User's Age"

	const ageInput = inputFactory("number", "userAge", "form-control", "ageHelp")

	const imageLabel = document.createElement("label")
	imageLabel.htmlFor = "userImage"
	imageLabel.classList.add("form-label")
	imageLabel.textContent = "User's Image URL"

	const imageInput = inputFactory("url", "userImage", "form-control", "imageHelp")

	const genderLabel = document.createElement("label")
	genderLabel.htmlFor = "userGender"
	genderLabel.classList.add("form-label")
	genderLabel.textContent = "User's Gender"

	const genderInput = inputFactory("text", "userGender", "form-control", "genderHelp")

	form.append(nameLabel, nameInput, ageLabel, ageInput, imageLabel, imageInput, genderLabel, genderInput)

	return form
}
const inputFactory = (type, id, className, ariaDescribedby) => {
	const input = document.createElement("input")
	input.type = type
	input.id = id
	input.classList.add(className)
	input.ariaDescribedby = ariaDescribedby
	return input
}
