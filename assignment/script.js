const form = document.getElementById("registrationForm");
const participantList = document.getElementById("participantList");
const emptyState = document.getElementById("emptyState");
const filter = document.getElementById("filterWorkshop");
const themeToggle = document.getElementById("themeToggle");

form.addEventListener("submit", function (e) {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById("fullName");
    const email = document.getElementById("email");
    const workshop = document.getElementById("workshop");
    const agreement = document.getElementById("agreement");
    const experience = document.querySelector('input[name="experience"]:checked');

    let valid = true;

    if (name.value.length < 3) {
        showError(name, "Name must be at least 3 characters");
        valid = false;
    }

    if (!email.value.includes("@")) {
        showError(email, "Invalid email address");
        valid = false;
    }

    if (!experience) {
        showError(document.querySelector('input[name="experience"]').parentElement,
            "Select experience level");
        valid = false;
    }

    if (!agreement.checked) {
        showError(agreement, "You must agree to continue");
        valid = false;
    }

    if (!valid) return;

    addParticipant(name.value, workshop.value, experience.value);
    form.reset();
});

function showError(element, message) {
    const error = element.parentElement.querySelector(".error");
    error.textContent = message;
    error.classList.remove("hidden");
}

function clearErrors() {
    document.querySelectorAll(".error").forEach(err => {
        err.classList.add("hidden");
    });
}

function addParticipant(name, workshop, experience) {
    emptyState.classList.add("hidden");

    const card = document.createElement("div");
    card.classList.add("participant");
    card.dataset.workshop = workshop;

    const info = document.createElement("p");
    info.textContent = `${name} | ${workshop} | ${experience} | Active`;

    const removeBtn = document.createElement("button");
    removeBtn.textContent = "Remove";
    removeBtn.classList.add("remove");

    const priorityBtn = document.createElement("button");
    priorityBtn.textContent = "Priority";
    priorityBtn.classList.add("priorityBtn");

    card.appendChild(info);
    card.appendChild(priorityBtn);
    card.appendChild(removeBtn);

    participantList.appendChild(card);
}

participantList.addEventListener("click", function (e) {

    const card = e.target.closest(".participant");

    if (e.target.classList.contains("remove")) {
        const confirmBox = document.createElement("p");
        confirmBox.textContent = "Click remove again to confirm";
        card.appendChild(confirmBox);

        e.target.onclick = function () {
            participantList.removeChild(card);
            if (!participantList.children.length) {
                emptyState.classList.remove("hidden");
            }
        };
    }

    if (e.target.classList.contains("priorityBtn")) {
        card.classList.toggle("priority");
        participantList.prepend(card);
    }
});

filter.addEventListener("change", function () {
    document.querySelectorAll(".participant").forEach(card => {
        if (filter.value === "All" || card.dataset.workshop === filter.value) {
            card.classList.remove("hidden");
        } else {
            card.classList.add("hidden");
        }
    });
});

themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});
