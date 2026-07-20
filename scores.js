const scores = [
  { name: "Alvi", total: 9 },
  { name: "Millo", total: 6 },
  { name: "Luqui", total: 4 },
  { name: "Nacho", total: 2 },
  { name: "Duri", total: 2 },
  { name: "Emi", total: 1 },
  { name: "Zef", total: 2 }
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

async function updateLastModifiedDate() {
  const updateNote = document.querySelector(".update-note");
  if (!updateNote) return;

  try {
    const response = await fetch("https://api.github.com/repos/EzeMartino/liga-medianoche/commits?per_page=1");
    if (!response.ok) throw new Error("Error al consultar la API de GitHub");
    const data = await response.json();
    if (data && data.length > 0) {
      const commitDate = new Date(data[0].commit.committer.date);
      const day = String(commitDate.getDate()).padStart(2, "0");
      const month = String(commitDate.getMonth() + 1).padStart(2, "0");
      const year = commitDate.getFullYear();
      updateNote.innerHTML = `<strong>Última actualización:</strong> ${day}/${month}/${year}`;
    }
  } catch (error) {
    console.error("No se pudo obtener la fecha de la API de GitHub:", error);
  }
}

renderScores();
setupRulesModal();
updateLastModifiedDate();

