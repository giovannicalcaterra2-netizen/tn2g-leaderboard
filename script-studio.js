const STUDIO_CSV_URL = "https://docs.google.com/spreadsheets/d/e/2PACX-1vRdw2aqYrpebQDoKySNidi-hHRZJowezLt9u4XGIZVbUQzZQrIhOpy9G7qVtOOzyplfrJSjO5wRfp2_/pub?gid=2058120563&single=true&output=csv";

async function loadStudioLeaderboard() {
  const container = document.getElementById("studioLeaderboard");

  try {
    const response = await fetch(STUDIO_CSV_URL);
    const csvText = await response.text();

    const rows = csvText
      .trim()
      .split("\n")
      .map(row => row.split(",").map(cell => cell.trim()));

    const headers = rows[0];
    const data = rows.slice(1);

    const usernameIndex = headers.indexOf("Username");
    const puntiIndex = headers.indexOf("Punti studio");

    const players = data
  .map(row => ({
    username: row[usernameIndex],
    punti: Number(row[puntiIndex]) || 0
  }))
  .filter(player =>
    player.username &&
    player.username.trim() !== "" &&
    player.punti > 0
  );
    players.sort((a, b) => b.punti - a.punti);

    container.innerHTML = "";

    players.forEach((player, index) => {
      const card = document.createElement("div");
      card.className = "studio-card";

      card.innerHTML = `
        <div class="studio-rank">#${index + 1}</div>

        <div class="studio-info">
          <h3>${player.username}</h3>
          <p>${player.punti} sessioni studio completate</p>
        </div>

        <div class="studio-score">
          ${player.punti} pt
        </div>
      `;

      container.appendChild(card);
    });

  } catch (error) {
    console.error(error);
    container.innerHTML = "<p>Errore nel caricamento della classifica studio.</p>";
  }
}

loadStudioLeaderboard();
