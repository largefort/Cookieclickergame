let clickCount = 0;
let cursorCount = 0;
let grandmaCount = 0;
let factoryCount = 0;
let bakeryCount = 0;
let mineCount = 0;

let cursorCost = 10;
let grandmaCost = 50;
let factoryCost = 200;
let bakeryCost = 500;
let mineCost = 1000;

let cookiesPerSecond = 0;
let prestigePoints = 0;

let achievements = {
  firstClick: false,
  cookies1k: false,
  cookies10k: false,
  cookies100k: false,
};

function clickCookie() {
  clickCount += 1 + cursorCount + grandmaCount * 5 + factoryCount * 20 + bakeryCount * 50 + mineCount * 100;
  updateClickCount();
  checkAchievements();
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
    case 3: // Factory
      if (clickCount >= factoryCost) {
        factoryCount++;
        clickCount -= factoryCost;
        factoryCost *= 2;
        cookiesPerSecond += 20;
        updateClickCount();
        updateUpgrades();
      }
      break;
    case 4: // Bakery
      if (clickCount >= bakeryCost) {
        bakeryCount++;
        clickCount -= bakeryCost;
        bakeryCost *= 2;
        cookiesPerSecond += 50;
        updateClickCount();
        updateUpgrades();
      }
      break;
    case 5: // Mine
      if (clickCount >= mineCost) {
        mineCount++;
        clickCount -= mineCost;
        mineCost *= 2;
        cookiesPerSecond += 100;
        updateClickCount();
        updateUpgrades();
      }
      break;
  }
}

function updateUpgrades() {
  document.getElementById("click-button").textContent = `Click Me! (Cursor: +${cursorCount})`;
  document.getElementById("click-button").style.backgroundColor = cursorCount > 0 ? "#2ecc71" : "#3498db";
  document.querySelector(".upgrade-item:nth-child(2) span").textContent = `Upgrade 2: Grandma (+${5 * grandmaCount} per click, Cost: ${grandmaCost})`;
  document.querySelector(".upgrade-item:nth-child(3) span").textContent = `Upgrade 3: Factory (+${20 * factoryCount} per click, Cost: ${factoryCost})`;
  document.querySelector(".upgrade-item:nth-child(4) span").textContent = `Upgrade 4: Bakery (+${50 * bakeryCount} per click, Cost: ${bakeryCost})`;
  document.querySelector(".upgrade-item:nth-child(5) span").textContent = `Upgrade 5: Mine (+${100 * mineCount} per click, Cost: ${mineCost})`;
  updateCPS();
}

function checkAchievements() {
  if (!achievements.firstClick && clickCount >= 1) {
    showAchievement("First Click!", "You clicked the cookie for the first time.");
    achievements.firstClick = true;
  }

  if (!achievements.cookies1k && clickCount >= 1000) {
    showAchievement("1,000 Cookies!", "You've collected 1,000 cookies.");
    achievements.cookies1k = true;
  }

  if (!achievements.cookies10k && clickCount >= 10000) {
    showAchievement("10,000 Cookies!", "You've collected 10,000 cookies.");
    achievements.cookies10k = true;
  }

  if (!achievements.cookies100k && clickCount >= 100000) {
    showAchievement("100,000 Cookies!", "You've collected 100,000 cookies.");
    achievements.cookies100k = true;
  }
}

function showAchievement(title, description) {
  const achievementBox = document.createElement("div");
  achievementBox.className = "achievement-box";
  achievementBox.textContent = title;
  achievementBox.title = description;

  document.body.appendChild(achievementBox);

  setTimeout(() => {
    achievementBox.style.opacity = 1;
  }, 100);

  setTimeout(() => {
    achievementBox.style.opacity = 0;
    setTimeout(() => {
      document.body.removeChild(achievementBox);
    }, 1000);
  }, 5000);
}

function updateCPS() {
  document.getElementById("cps-count").textContent = cookiesPerSecond;
}

function resetGame() {
  prestigePoints += Math.floor(clickCount / 1000);
  clickCount = 0;
  cursorCount = 0;
  grandmaCount = 0;
  factoryCount = 0;
  bakeryCount = 0;
  mineCount = 0;
  cursorCost = 10;
  grandmaCost = 50;
  factoryCost = 200;
  bakeryCost = 500;
  mineCost = 1000;
  cookiesPerSecond = 0;
  updateClickCount();
  updateUpgrades();
  updateCPS();
  updatePrestigePoints();
}

function buyPrestigeUpgrade() {
  if (prestigePoints >= 100) {
    prestigePoints -= 100;
    cookiesPerSecond += 500;
    updateCPS();
    updatePrestigePoints();
  }
}

function updatePrestigePoints() {
  document.getElementById("prestige-points").textContent = prestigePoints;
}

setInterval(() => {
  clickCount += cookiesPerSecond;
  updateClickCount();
}, 1000);
