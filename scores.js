const scores = [
  { name: "Alvi", total: 3 },
  { name: "Millo", total: 2 },
  { name: "Luqui", total: 1 },
  { name: "Nacho", total: 1 },
  { name: "Duri", total: 0 },
  { name: "Emi", total: 0 },
  { name: "Zef", total: 0 }
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

renderScores();
