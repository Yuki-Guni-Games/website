/**
 * Theming.
 *
 * Supports the preferred color scheme of the operation system as well as
 * the theme choice of the user.
 *
 */
const yukilogo = document.querySelector("[name='yukilogo']");
const themeToggle = document.querySelector(".theme-toggle");
const chosenTheme = window.localStorage && window.localStorage.getItem("theme");
const chosenThemeIsDark = chosenTheme == "dark";
const chosenThemeIsLight = chosenTheme == "light";

// NOTE: This is clearly a very hacky way of doing this
function setLogo(dark)
{
    if(yukilogo)
    {
        if(dark)
        {
            yukilogo.src = "/img/yukilogo-dark.png";
        }
        else
        {
            yukilogo.src = "/img/yukilogo.png";
        }
    }
}

// Detect the color scheme the operating system prefers.
function detectOSColorTheme() {
  if (chosenThemeIsDark) {
    document.documentElement.setAttribute("data-theme", "dark");
    setLogo(true);
  } else if (chosenThemeIsLight) {
    document.documentElement.setAttribute("data-theme", "light");
    setLogo(false);
  } else if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
    document.documentElement.setAttribute("data-theme", "dark");
    setLogo(true);
  } else {
    document.documentElement.setAttribute("data-theme", "light");
    setLogo(false);
  }
}

// Switch the theme.
function switchTheme(e) {
  if (chosenThemeIsDark) {
    localStorage.setItem("theme", "light");
    setLogo(false);
  } else if (chosenThemeIsLight) {
    localStorage.setItem("theme", "dark");
    setLogo(true);
  } else {
    if (document.documentElement.getAttribute("data-theme") == "dark") {
      localStorage.setItem("theme", "light");
      setLogo(false);
    } else {
      localStorage.setItem("theme", "dark");
      setLogo(true);
    }
  }

  detectOSColorTheme();
  window.location.reload();
}

// Event listener
if (themeToggle) {
  themeToggle.addEventListener("click", switchTheme, false);
} else {
  localStorage.removeItem("theme");
}

window
    .matchMedia("(prefers-color-scheme: dark)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());
window
    .matchMedia("(prefers-color-scheme: light)")
    .addEventListener("change", (e) => e.matches && detectOSColorTheme());

detectOSColorTheme();