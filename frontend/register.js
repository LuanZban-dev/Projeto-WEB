const API_URL = "http://localhost:3333";


console.log("register.js carregado");

const form = document.querySelector("#register-form");

console.log(form);

form.addEventListener("submit", register);

async function register(event) {

    event.preventDefault();

    const username = document.querySelector("#username").value.trim();
    const email = document.querySelector("#email").value.trim();
    const password = document.querySelector("#password").value;
    const confirmPassword = document.querySelector("#confirmPassword").value;

    if (password !== confirmPassword) {
        alert("As senhas não coincidem.");
        return;
    }

    const response = await fetch(`${API_URL}/auth/register`, {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify({
            username,
            email,
            password
        })

    });

    const data = await response.json();

    if (!response.ok) {
        alert(data.message);
        return;
    }

    alert("Conta criada com sucesso!");

    window.location.href = "login.html";

}