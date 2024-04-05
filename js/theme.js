const navbar = document.getElementById("nav-bar");
const avatar = document.getElementById("avatar");
const btnTheme = document.getElementById("btn-theme");
const gitIcon = document.getElementById("github-icon");

// (page) 1 -> any, 2 -> home, 3 -> about
// (lang) 1 -> en, 2 -> vn, 3 -> cn

function themeDark(Page, script) {
    document.all[0].setAttribute("data-theme", "dark");
    navbar.classList.remove("shadow-black");
    navbar.classList.add("shadow-white");
    avatar.classList.remove("shadow-black");
    avatar.classList.add("shadow-white");
    gitIcon.src = "/images/github.png"
    if (Page == 2) {
        script[0].classList.remove("shadow-black");
        script[0].classList.add("shadow-white");
    }
    localStorage.setItem("isDark", 1);
}

function themeLight(Page, script) {
    document.all[0].setAttribute("data-theme", "garden");
    navbar.classList.remove("shadow-white")
    navbar.classList.add("shadow-black");
    avatar.classList.remove("shadow-white")
    avatar.classList.add("shadow-black");
    gitIcon.src = "/images/github(dark).png"
    if (Page == 2) {
        script[0].classList.remove("shadow-white");
        script[0].classList.add("shadow-black");
    }
    localStorage.setItem("isDark", 0);
}


function execChangeTheme(Page = 1, script) {
    // btnTheme.checked == false is theme staying sun-icon
    if (btnTheme.checked) {
        // background black for icon-sun
        themeDark(Page, script);
    } else {
        themeLight(Page, script);
    }
};


function loadTheme(Page = 1, script) {
    if (parseInt(localStorage.getItem("isDark"))) {
        btnTheme.setAttribute("checked", true);
        themeDark(Page, script);
    } else {
        themeLight(Page, script);
    }
}