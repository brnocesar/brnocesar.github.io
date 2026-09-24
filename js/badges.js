var elementos = document.getElementsByClassName("badge");

for(var i=0; i<elementos.length; i++) {

    elementos[i].classList.add("badge" + (Math.floor(Math.random() * 3) + 1).toString());
}

async function loadSkills() {
    const container = document.getElementById("badges");
    if (!container) return;

    try {
        const response = await fetch("js/skills.json");
        if (!response.ok) throw new Error(`Failed to load skills: ${response.status}`);

        const skills = await response.json();
        skills.forEach((skill) => {
            const badge = document.createElement("span");
            const color = Math.floor(Math.random() * 3) + 1;

            badge.classList.add("badge", "skill-badge", "badge-pill", `badge${color}`);
            badge.textContent = skill;
            container.appendChild(badge);
        });
    } catch (error) {
        console.error("Unable to load skills", error);
    }
}

loadSkills();
