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
      animateSAECards();
      
    }
  }
  
  window.addEventListener("DOMContentLoaded", loadSAE);
  