// 1. Charger un composant HTML générique (Header, Footer...)
async function loadComponent(id, filePath) {
  const res = await fetch(filePath);
  const html = await res.text();
  document.getElementById(id).innerHTML = html;
}

// 2. Charger les SAE dynamiquement
async function loadSAE() {
  const response = await fetch("yaml/sae.yaml");
  const text = await response.text();
  const saeList = jsyaml.load(text);

  const container = document.getElementById("sae-cards");

  for (const sae of saeList) {
    const res = await fetch("components/carte-sae.html");
    const html = await res.text();
    const temp = document.createElement("div");
    temp.innerHTML = html.trim();

    const card = temp.firstChild;
    card.querySelector(".sae-code").textContent = sae.code;
    card.querySelector(".sae-titre").textContent = sae.titre;
    card.querySelector(".sae-description").textContent = sae.description;
    card.querySelector(".sae-lien").href = sae.livrable;
    card.querySelector(".sae-image").src = sae.image;

    container.appendChild(card);
  }

  animateSAECards(); // important : l'appeler après avoir chargé les cartes
}

// 3. Charger tout une fois que la page est prête
window.addEventListener("DOMContentLoaded", () => {
  loadComponent("site-header", "components/header.html");
  loadComponent("site-footer", "components/footer.html");
  loadSAE();
  loadCV(); // Charger aussi le CV maintenant
});


async function loadCV() {
  const response = await fetch("yaml/Etudes_Diplomes_Experiences.yaml");
  const text = await response.text();
  const cvData = jsyaml.load(text);

  const cvContainer = document.getElementById("cv");
  
  // Créer conteneurs pour deux colonnes
  const etudesColumn = document.createElement("div");
  etudesColumn.className = "cv-column";
  
  const experiencesColumn = document.createElement("div");
  experiencesColumn.className = "cv-column";

  // Charger les Études
  for (const etude of cvData.etudes) {
    const res = await fetch("components/cv-block.html");
    const html = await res.text();
    const temp = document.createElement("div");
    temp.innerHTML = html.trim();

    const block = temp.firstChild;
    block.querySelector(".cv-titre").textContent = etude.titre;
    block.querySelector(".cv-ecole").textContent = etude.ecole;
    block.querySelector(".cv-dates").textContent = etude.dates;
    block.querySelector(".cv-description").remove(); // pas de description pour études

    etudesColumn.appendChild(block);
  }

  // Charger les Expériences
  for (const experience of cvData.experiences) {
    const res = await fetch("components/cv-block.html");
    const html = await res.text();
    const temp = document.createElement("div");
    temp.innerHTML = html.trim();

    const block = temp.firstChild;
    block.querySelector(".cv-titre").textContent = experience.poste;
    block.querySelector(".cv-ecole").textContent = experience.entreprise;
    block.querySelector(".cv-dates").textContent = experience.dates;
    block.querySelector(".cv-description").textContent = experience.description;

    experiencesColumn.appendChild(block);
  }

  // Ajouter les deux colonnes au CV
  cvContainer.appendChild(etudesColumn);
  cvContainer.appendChild(experiencesColumn);
}
