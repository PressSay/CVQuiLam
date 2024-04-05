// import { loadScriptJson } from '/js/lang.js';
// import { execChangeTheme, loadTheme } from '/js/theme.js';

loadScriptJson(4);
loadTheme();

btnTheme.addEventListener("click", async () => {
    execChangeTheme();
});