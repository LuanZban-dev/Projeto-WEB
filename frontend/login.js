const API_URL = "http://localhost:3333";

const form = document.querySelector("#login-form");

form.addEventListener("submit", login);

if (localStorage.getItem("token")) {
    window.location.href = "index.html";
}

async function login(event) {

    event.preventDefault();

    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;

    const response = await fetch(`${API_URL}/auth/login`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            email,
            password
        })

    });

    const data = await response.json();

    if (!response.ok) {

        alert(data.message);

        return;

    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    window.location.href = "index.html";

}