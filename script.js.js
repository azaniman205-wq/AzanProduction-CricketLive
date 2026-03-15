const API_KEY = "YOUR_API_KEY_HERE"; // Free API Key له cricketdata.org

async function loadLiveMatches() {
  const liveDiv = document.getElementById("liveMatches");
  liveDiv.innerHTML = "Loading live matches...";

  try {
    const res = await fetch(`https://api.cricapi.com/v1/currentMatches?apikey=${API_KEY}&offset=0`);
    const data = await res.json();

    if (!data.data || data.data.length === 0) {
      liveDiv.innerHTML = "No live matches currently.";
      return;
    }

    let html = "";
    data.data.forEach(m => {
      html += `<div class="match" onclick="loadScorecard('${m.id}')">
        <strong>${m.name}</strong><br>Status: ${m.status}
      </div>`;
    });

    liveDiv.innerHTML = html;
  } catch(err) {
    liveDiv.innerHTML = "Error loading matches.";
    console.error(err);
  }
}

async function loadScorecard(matchId) {
  const scoreDiv = document.getElementById("scorecard");
  scoreDiv.innerHTML = "Loading scorecard...";

  try {
    const res = await fetch(`https://api.cricapi.com/v1/match_scorecard?apikey=${API_KEY}&id=${matchId}`);
    const data = await res.json();

    let html = `<table border="1" width="100%">
      <tr><th>Batsman</th><th>R</th><th>B</th><th>4s</th><th>6s</th></tr>`;

    data.data.batsman.forEach(b => {
      html += `<tr>
        <td>${b.name}</td><td>${b.runs}</td><td>${b.balls}</td>
        <td>${b.fours}</td><td>${b.sixes}</td>
      </tr>`;
    });

    html += "</table>";
    scoreDiv.innerHTML = html;
  } catch(e) {
    scoreDiv.innerHTML = "Unable to load scorecard.";
  }
}

loadLiveMatches();
setInterval(loadLiveMatches, 10000);