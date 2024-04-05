// import { execChangeTheme, loadTheme } from '/js/theme.js';
// import { loadScriptJson } from '/js/lang.js';

loadTheme();

const intro = document.getElementsByClassName("intro-script");
const txtTypeList = loadScriptJson(2);


btnTheme.addEventListener("click", async () => {
    execChangeTheme(2, intro);
    var isDark = parseInt(localStorage.getItem("isDark"));
    var wrap;
    txtTypeList.forEach(element => {
        element.setIsDark(isDark);
    });
    if (isDark) {
        wrap = document.getElementsByClassName("wrap-dark");
        for (var i = 0; i < wrap.length; i++) {
            wrap[i].classList.add("wrap-light");
            wrap[i].classList.remove("wrap-dark");
        }
    } else {
        wrap = document.getElementsByClassName("wrap-light");
        for (var i = 0; i < wrap.length; i++) {
            wrap[i].classList.add("wrap-dark");
            wrap[i].classList.remove("wrap-light");
        }
    }
});