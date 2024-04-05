// import { loadScriptJson } from '/js/lang.js';
// import { execChangeTheme, loadTheme } from '/js/theme.js';

loadTheme();

const txtTypeList = loadScriptJson(3);

btnTheme.addEventListener("click", async () => {
    execChangeTheme();
    var isDark = parseInt(localStorage.getItem("isDark"));
    var wrap = document.getElementsByClassName("wrap");
    txtTypeList.forEach(element => {
        element.setIsDark(isDark);
    });
    if (isDark && !wrap) {
        for (var i = 0; i < wrap.length; i++) {
            wrap[i].classList.remove("wrap-dark");
        }
    } else {
        for (var i = 0; i < wrap.length; i++) {
            wrap[i].classList.remove("wrap-light");
        }
    }
});