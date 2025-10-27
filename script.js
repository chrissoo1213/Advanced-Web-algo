import { fetchData } from "./utils/fetchdata.js";
import { formFactory } from "./utils/formFactory.js";
import { putData } from "./utils/putData.js";

const remoteUrl = "https://easy-simple-users-rest-api.onrender.com/api/users";
const submitBtn = document.querySelector(".submit-btn");

// DOM elements
const alert = document.querySelector(".alert");
const spinner = document.querySelector(".spinner-border");
const usersContainer = document.getElementById("users-container");

let users = [];

// --- Load users from API ---
const loadData = async () => {
  spinner.classList.remove("d-none");
  try {
    console.log("Fetching data...");
    const data = await fetchData(remoteUrl);
    if (data) {
      spinner.classList.add("d-none");
      users = data.data;
      displayUsers(users);
    }
  } catch (error) {
    console.error("Failed to load data:", error.message);
    spinner.classList.add("d-none");
    alert.classList.remove("d-none");
    alert.classList.add("alert-danger");
    alert.innerHTML = `Failed to load data: ${error.message}`;
  }
};

// --- Display users as cards ---
const displayUsers = (userArray) => {
  usersContainer.innerHTML = ""; // Clear existing cards
  userArray.forEach((user) => {
    usersContainer.innerHTML += `
      <article class="card  p-3">
        <div class="card-image  p-3">
          <img src="${user.avatar_url}" alt="${user.name}" class="card-img-top" />
		  <span class="card-title">${user.name}</span>
        </div>
        <div class="card-content">
          <ul class="list-group">
            <li class="list-group-item"><strong>Name:</strong> ${user.name}</li>
            <li class="list-group-item"><strong>Age:</strong> ${user.age}</li>
            <li class="list-group-item"><strong>Gender:</strong> ${user.gender}</li>
          </ul>
          <button 
            data-user-id="${user.id}" 
            data-bs-toggle="modal" 
            data-bs-target="#exampleModal" 
            class="edit-btn btn btn-secondary m-2">
            Edit
          </button>
        </div>
      </article>
    `;
  });
};

// --- Event delegation for edit buttons ---
usersContainer.addEventListener("click", (e) => {
  if (!e.target.classList.contains("edit-btn")) return;

  const modalBody = document.querySelector(".modal-body");
  modalBody.innerHTML = "";
  modalBody.appendChild(formFactory());

  const userId = parseInt(e.target.getAttribute("data-user-id"));
  const foundUser = users.find((user) => user.id === userId);

  fillModalForm(foundUser);
});

// --- Fill modal form with user data ---
const fillModalForm = (user) => {
  const modalForm = document.querySelector(".modal-body form");
  modalForm.querySelector("#userName").value = user.name;
  modalForm.querySelector("#userAge").value = user.age;
  modalForm.querySelector("#userImage").value = user.avatar_url;
  modalForm.querySelector("#userGender").value = user.gender;

  submitBtn.setAttribute("data-user-id", user.id);
};

// --- Submit updated user data ---
submitBtn.addEventListener("click", async () => {
  const userId = parseInt(submitBtn.getAttribute("data-user-id"));
  const dataToSend = {
    id: userId,
    name: document.querySelector("#userName").value,
    age: document.querySelector("#userAge").value,
    avatar_url: document.querySelector("#userImage").value,
    gender: document.querySelector("#userGender").value,
  };

  // Show spinner while updating
  document.querySelector(".modal-body").innerHTML = `
    <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
      <div class="spinner-border" role="status">
        <span class="visually-hidden">Loading...</span>
      </div>
    </div>
  `;

  try {
    const response = await putData(remoteUrl, dataToSend);

    if (response) {
      // Update card on the page
      updateCard(dataToSend);

      // Show success message in modal
      document.querySelector(".modal-body").innerHTML = `
        <div class="d-flex justify-content-center align-items-center" style="height: 312px;">
          <div class="alert alert-success" role="alert">
            ${response.message}
          </div>
        </div>
      `;

      // Dismiss modal after short delay
      const myModal = document.getElementById("exampleModal");
      const modal = bootstrap.Modal.getInstance(myModal);
      setTimeout(() => modal.hide(), 700);
    }
  } catch (error) {
    console.error("Failed to update data:", error);
    document.querySelector(".modal-body").innerHTML = `
      <div class="d-flex flex-column justify-content-center align-items-center" style="height: 312px;">
        <div class="alert alert-danger w-100" role="alert">
          ${error.message}
        </div>
      </div>
    `;
  }
});

// --- Update the displayed card with new data ---
const updateCard = (user) => {
  const card = Array.from(document.querySelectorAll(".card")).find(
    (c) => c.querySelector("button").getAttribute("data-user-id") === String(user.id)
  );
  if (!card) return;

  card.innerHTML = `
    <div class="card-image p-3">
      <img src="${user.avatar_url}" alt="${user.name}" height="254px" class="card-img-top object-fit-cover" />
    </div>
    <div class="card-content">
      <ul class="list-group">
        <li class="list-group-item"><strong>Name:</strong> ${user.name}</li>
        <li class="list-group-item"><strong>Age:</strong> ${user.age}</li>
        <li class="list-group-item"><strong>Gender:</strong> ${user.gender}</li>
      </ul>
      <button 
        data-user-id="${user.id}" 
        data-bs-toggle="modal" 
        data-bs-target="#exampleModal" 
        class="edit-btn btn btn-secondary m-2">
        Edit
      </button>
    </div>
  `;
};

loadData();
