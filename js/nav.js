async function getScriptNav(isEnVnCn) {
    let url = "/js/data/";
    if (isEnVnCn == "vn") {
        url += "vn/nav.json";
    } else if (isEnVnCn == "en") {
        url += "en/nav.json";
    }

    const response = await fetch(url);
    const script = await response.json();

    return script;
}

function loadNavScript(script) {
    const navScript = document.getElementsByClassName("nav-script");
    const lenNavScript = navScript.length;
    var j = 0;
    for (var i = 0; i < lenNavScript; i++) {
        navScript[i].innerHTML = script["" + j];
        j = (j + 1) % 3;
    }
}