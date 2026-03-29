const scores = [
  { name: "Alvi", total: 7 },
  { name: "Millo", total: 4 },
  { name: "Luqui", total: 1 },
  { name: "Nacho", total: 2 },
  { name: "Duri", total: 0 },
  { name: "Emi", total: 0 },
  { name: "Zef", total: 1 }
];

function renderScores() {
  const tableBody = document.getElementById("score-table");
  const playerCount = document.getElementById("player-count");

  if (!tableBody || !playerCount) return;

  const sortedScores = [...scores].sort((a, b) => {
    if (b.total !== a.total) return b.total - a.total;
    return a.name.localeCompare(b.name, "es", { sensitivity: "base" });
  });

  tableBody.innerHTML = sortedScores
    .map(
      (player, index) => `
        <tr class="${index < 3 ? `rank rank-${index + 1}` : ""}">
          <td class="position"><span class="position-badge">${index + 1}</span></td>
          <td class="player-name">${player.name}</td>
          <td class="player-score">${player.total}</td>
        </tr>
      `
    )
    .join("");

  playerCount.textContent = `${sortedScores.length} jugador${
    sortedScores.length === 1 ? "" : "es"
  }`;
}

function setupRulesModal() {
  const modal = document.getElementById("rules-modal");
  const openButton = document.getElementById("open-rules");
  const closeButtons = document.querySelectorAll("[data-close-modal]");

  if (!modal || !openButton) return;

  const closeModal = () => {
    modal.hidden = true;
    document.body.classList.remove("modal-open");
    openButton.focus();
  };

  const openModal = () => {
    modal.hidden = false;
    document.body.classList.add("modal-open");
  };

  openButton.addEventListener("click", openModal);

  closeButtons.forEach((button) => {
    button.addEventListener("click", closeModal);
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && !modal.hidden) {
      closeModal();
    }
  });
}

renderScores();
setupRulesModal();
