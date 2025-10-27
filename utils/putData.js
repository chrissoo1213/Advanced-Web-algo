export const putData = async (url, userData) => {
  const updateUrl = `${url}/${userData.id}` // correct URL with user ID

  try {
    const response = await fetch(updateUrl, {
      method: "PUT",
      headers: {
          "Content-Type": "application/json",
          my_key: "my_super_secret_phrase",
      },
      body: JSON.stringify(userData),
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()

    // Show success message in modal
    document.querySelector(".modal-body").innerHTML = `
      <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
        <div class="alert alert-success" role="alert">
          ${data.message || "User updated successfully!"}
        </div>
      </div>
    `

    // Dismiss modal after 700ms
    const myModal = document.getElementById("exampleModal")
    const modal = bootstrap.Modal.getInstance(myModal)
    setTimeout(() => modal.hide(), 700)

    return data
  } catch (error) {
    console.error("Failed to update data:", error)
    document.querySelector(".modal-body").innerHTML = `
      <div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
        <div class="alert alert-danger w-100" role="alert">
          ${error.message}
        </div>
        <p class="mark">${error.stack}</p>
      </div>
    `
    throw error
  }
}
