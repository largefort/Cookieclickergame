let clickCount = 0;
let cursorCount = 0;
let grandmaCount = 0;

let cursorCost = 10;
let grandmaCost = 50;

let cookiesPerSecond = 0;
let prestigePoints = 0;

let cursorImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAr0lEQVR42mJkwAMYgk9SPR1glIoagpPEaIh9DpUdQwWICiRfIUelJRlAfFIE8IlBEyiIyE6FAEzQFEdDC5BMkQkCVkQjJKAJEVQhSiRfXKBEykhSR6ElKQFM0FHz4zgQQXQADPwhA+lyFvLIAAAAAElFTkSuQmCC';
let grandmaImage = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAQAAAAngNWGAAAAz0lEQVR42mJkwAMYgk9SPR1glIoagi5ph9HscRAweBpUdQwWICiRfIUelJRlAfFIE8IlBEyiIyE6FAEzQFEdDC5BMkQkCVkQjJKAJEVQhSiRfXKBEykhSR6ElKQFM0FHz4zgQQXQADPwhA+lyFvLIAAAAASUVORK5CYII=';

function clickCookie() {
  clickCount += 1 + cursorCount;
  updateClickCount();
}

function updateClickCount() {
  document.getElementById("click-count").textContent = clickCount;
}

function buyUpgrade(upgradeId) {
  switch (upgradeId) {
    case 1: // Cursor
      if (clickCount >= cursorCost) {
        cursorCount++;
        clickCount -= cursorCost;
        cursorCost *= 2;
        cookiesPerSecond += 1;
        updateClickCount();
        updateUpgrades();
      }
      break;
    case 2: // Grandma
      if (clickCount >= grandmaCost) {
        grandmaCount++;
        clickCount -= grandmaCost;
        grandmaCost *= 2;
        cookiesPerSecond += 5;
        updateClickCount();
        updateUpgrades();
      }
      break;
  }
}

function updateUpgrades() {
  document.getElementById("click-button").textContent = `Click Me! (Cursor: +${cursorCount})`;
  document.getElementById("click-button").style.backgroundColor = cursorCount > 0 ? "#2ecc71" : "#3498db";
  document.querySelector(".upgrade-item:nth-child(2) img").src = cursorImage;
  document.querySelector(".upgrade-item:nth-child(2) span").textContent = `Upgrade 1: Cursor (+1 per click, Cost: ${cursorCost})`;
  document.querySelector(".upgrade-item:nth-child(3) img").src = grandmaImage;
  document.querySelector(".upgrade-item:nth-child(3) span").textContent = `Upgrade 2: Grandma (+${5 * grandmaCount} per click, Cost: ${grandmaCost})`;
  // Add more upgrades with virtual images here
}

function updateCPS() {
  document.getElementById("cps-count").textContent = cookiesPerSecond;
}

function resetGame() {
  prestigePoints += Math.floor(clickCount / 1000);
  clickCount = 0;
  cursorCount = 0;
  grandmaCount = 0;
  cursorCost = 10;
  grandmaCost = 50;
  cookiesPerSecond = 0;
  updateClickCount();
  updateUpgrades();
  updateCPS();
  updatePrestigePoints();
}

function updatePrestigePoints() {
  document.getElementById("prestige-points").textContent = prestigePoints;
}

setInterval(() => {
  clickCount += cookiesPerSecond;
  updateClickCount();
}, 1000);
