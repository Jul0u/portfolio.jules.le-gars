function animateSAECards() {
    const cards = document.querySelectorAll(".sae-card");
    cards.forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(30px)";
      card.style.transition = "opacity 0.5s ease, transform 0.5s ease";
      setTimeout(() => {
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 100); // décalage progressif
    });
  }
  