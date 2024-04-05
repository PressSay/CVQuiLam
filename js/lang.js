// import { delay, TxtType } from "/js/text-effect-class.js";
// import { loadNavScript, navScriptEN, navScriptVN } from "/js/nav.js";

const lang = document.getElementById("lang");

// (page) 1 -> any, 2 -> home, 3 -> about, 4 -> cv
// (lang) 1 -> en, 2 -> vn, 3 -> cn

function loadEffectText(txtTypeList, isDark = false, isOnce = false) {
    var elements = document.getElementsByClassName('typewrite');
    for (var i = 0; i < elements.length; i++) {
        var toRotate = elements[i].getAttribute('data-type');
        var period = elements[i].getAttribute('data-period');
        if (toRotate) {
            toRotate = JSON.parse(toRotate)
            const txtType = new TxtType(toRotate, elements[i], period, false, isOnce, isDark);
            txtTypeList.push(txtType);
        }
    }
    /* // INJECT CSS
    var css = document.createElement("style");
    css.type = "text/css";
    css.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff}";
    document.body.appendChild(css); */
}

async function actionEffectText(txtTypeList = []) {
    for (var i = 0; i < txtTypeList.length; i++) {
        txtTypeList[i].resume();
        txtTypeList[i].tick();
        if (txtTypeList[i].isOnce) {
            // Wait time for this next loop
            while (txtTypeList[i].txt != txtTypeList[i].toRotate[0]) {
                await delay(txtTypeList[i].delta);
            }
            txtTypeList[i].el.childNodes[0].classList.remove("wrap-light");
            txtTypeList[i].el.childNodes[0].classList.remove("wrap-dark");
        }
    };
}

async function stopEffectText(txtTypeList = []) {
    for (var i = 0; i < txtTypeList.length; i++) {
        txtTypeList[i].stop();
        await delay(txtTypeList[i].delta);
        txtTypeList[i].txt = "";
        txtTypeList[i].loopNum = 0;
        txtTypeList[i].isDeleting = false;
    }
}

function createDataType(scriptJSON, start, lenScriptJSON, haveEffect) {
    let dataType = "";
    
    if (haveEffect) {
        dataType += "[";
        for (var i = start; i < lenScriptJSON - 1; i++) {
            dataType += "\"" + scriptJSON["" + i] + '\",';
        }
        dataType += "\"" + scriptJSON["" + (lenScriptJSON - 1)] + "\"]";
    } else {
        for (var i = start; i < lenScriptJSON; i++) {
            dataType = dataType + scriptJSON["" + i];
        }
    }
    return dataType;
}

async function translateScript(script, scriptJSON, start, lenScriptJSON, langLocal = "en", navScriptVN, navScriptEN, haveEffect = true) {
    let dataType = createDataType(scriptJSON, start, lenScriptJSON, haveEffect);
    

    if (haveEffect) {
        script.setAttribute("data-type", dataType);
    } else {
        script.innerHTML = dataType;
    }
    localStorage.setItem("lang", langLocal);
    if (localStorage.getItem("lang") == "cn") {
    }
    else if (localStorage.getItem("lang") == "vn") {
        loadNavScript(navScriptVN.navigation);
    } else {
        loadNavScript(navScriptEN.navigation);
    }
}

async function loadScriptJson(Page = 1) {
    let response;
    const txtTypeList = [];

    const navScriptVN = await getScriptNav("vn");
    const navScriptEN = await getScriptNav("en");

    if (Page == 2) {
        const script = document.getElementsByClassName("intro-script");

        // get scriptVN
        response = await fetch("/js/data/vn/home.json");
        const scriptVN = await response.json();
        var lenScriptVN = Object.keys(scriptVN.introductionScript).length;
        // get scriptEN
        response = await fetch("/js/data/en/home.json");
        const scriptEN = await response.json();
        var lenScriptEN = Object.keys(scriptEN.introductionScript).length;

        // load first text effect and get list text effect
        if (localStorage.getItem("lang") == "cn") {

        } else if (localStorage.getItem("lang") == "vn") {
            translateScript(script[0], scriptVN.introductionScript, 0, lenScriptVN, "vn", navScriptVN, navScriptEN);
            lang.value = "VN";
        } else {
            translateScript(script[0], scriptEN.introductionScript, 0, lenScriptEN, "en",  navScriptVN, navScriptEN);
            lang.value = "EN";
        }

        loadEffectText(txtTypeList, parseInt(localStorage.getItem("isDark")), false);
        await actionEffectText(txtTypeList);


        lang.addEventListener("change", async () => {
            // fowarding lang to loading
            lang.classList.add("hidden");
            lang.parentElement.children[1].classList.remove("hidden");

            if (lang.value == "VN") {

                translateScript(script[0], scriptVN.introductionScript, 0, lenScriptVN, "vn",  navScriptVN, navScriptEN);
                var toRotate = script[0].getAttribute('data-type');
                txtTypeList[0].setToRotate(JSON.parse(toRotate));
                txtTypeList[0].setIsDark(parseInt(localStorage.getItem("isDark")));
                await txtTypeList[0].reset();

            } else if (lang.value == "EN") {

                translateScript(script[0], scriptEN.introductionScript, 0, lenScriptEN, "en",  navScriptVN, navScriptEN);
                var toRotate = script[0].getAttribute('data-type');
                txtTypeList[0].setToRotate(JSON.parse(toRotate));
                txtTypeList[0].setIsDark(parseInt(localStorage.getItem("isDark")));
                await txtTypeList[0].reset();

            } else {
            }
            // fowarding loading to lang
            lang.classList.remove("hidden");
            lang.parentElement.children[1].classList.add("hidden");
        });
    } else if (Page == 3) {
        const script = document.getElementsByClassName("about-me");

        // get scriptVN
        response = await fetch("/js/data/vn/about.json");
        const scriptVN = await response.json();
        // get scriptEN
        response = await fetch("/js/data/en/about.json");
        const scriptEN = await response.json();

        // load first text effect and get list text effect
        if (localStorage.getItem("lang") == "cn") {

        } else if (localStorage.getItem("lang") == "vn") {
            for (var i = 0; i < script.length; i++) {
                translateScript(script[i], scriptVN.about, i, (i + 1), "vn",  navScriptVN, navScriptEN);
            }
            lang.value = "VN";
        } else {
            for (var i = 0; i < script.length; i++) {
                translateScript(script[i], scriptEN.about, i, (i + 1), "en",  navScriptVN, navScriptEN);
            }
            lang.value = "EN";
        }

        loadEffectText(txtTypeList, parseInt(localStorage.getItem("isDark")), true);
        actionEffectText(txtTypeList);


        lang.addEventListener("change", async () => {
            var isDark = parseInt(localStorage.getItem("isDark"));
            var toRotate = [];


            // fowarding lang to loading
            lang.classList.add("hidden");
            lang.parentElement.children[1].classList.remove("hidden");

            await stopEffectText(txtTypeList);

            if (lang.value == "VN") {

                for (var i = 0; i < script.length; i++) {
                    translateScript(script[i], scriptVN.about, i, (i + 1), "vn",  navScriptVN, navScriptEN);
                    toRotate.push(script[i].getAttribute('data-type'));
                    script[i].innerHTML = "";
                }

            } else if (lang.value == "EN") {

                for (var i = 0; i < script.length; i++) {
                    translateScript(script[i], scriptEN.about, i, (i + 1), "en",  navScriptVN, navScriptEN);
                    toRotate.push(script[i].getAttribute('data-type'));
                    script[i].innerHTML = "";
                }

            } else {
            }

            for (var i = 0; i < txtTypeList.length; i++) {
                var toRotateElement = JSON.parse(toRotate[i]);
                txtTypeList[i].setToRotate(toRotateElement);
                txtTypeList[i].setIsDark(isDark);
            }

            actionEffectText(txtTypeList);

            // fowarding loading to lang
            lang.classList.remove("hidden");
            lang.parentElement.children[1].classList.add("hidden");
        });
    } else if (Page == 4) {
        const scriptTitle = document.getElementsByClassName("cv-title");
        const scriptContent = document.getElementsByClassName("cv-content");

        // get scriptVN
        response = await fetch("/js/data/vn/cv.json");
        const scriptVN = await response.json();

        // get scriptEN
        response = await fetch("/js/data/en/cv.json");
        const scriptEN = await response.json();

    

        // load first text effect and get list text effect
        if (localStorage.getItem("lang") == "cn") {

        } else if (localStorage.getItem("lang") == "vn") {
            for (var i = 0; i < scriptTitle.length; i++) {
                translateScript(scriptTitle[i], scriptVN["my-cv-title"], i, (i + 1), "vn",  navScriptVN, navScriptEN, false);
                
            }
            for (var i = 0; i < scriptContent.length; i++) {
                translateScript(scriptContent[i], scriptVN["my-cv-content"], i, (i + 1), "vn",  navScriptVN, navScriptEN, false);
                
            }
            lang.value = "VN";
        } else {
            for (var i = 0; i < scriptTitle.length; i++) {
                translateScript(scriptTitle[i], scriptEN["my-cv-title"], i, (i + 1), "en",  navScriptVN, navScriptEN, false);
            }
            for (var i = 0; i < scriptContent.length; i++) {
                translateScript(scriptContent[i], scriptEN["my-cv-content"], i, (i + 1), "en",  navScriptVN, navScriptEN, false);
            }
            lang.value = "EN";
        }


        lang.addEventListener("change", () => {
            if (lang.value == "CN") {

            } else if (lang.value == "VN") {
                for (var i = 0; i < scriptTitle.length; i++) {
                    translateScript(scriptTitle[i], scriptVN["my-cv-title"], i, (i + 1), "vn",  navScriptVN, navScriptEN, false);                    
                }
                for (var i = 0; i < scriptContent.length; i++) {
                    translateScript(scriptContent[i], scriptVN["my-cv-content"], i, (i + 1), "vn",  navScriptVN, navScriptEN, false);    
                }
                lang.value = "VN";
            } else {
                for (var i = 0; i < scriptTitle.length; i++) {
                    translateScript(scriptTitle[i], scriptEN["my-cv-title"], i, (i + 1), "en",  navScriptVN, navScriptEN, false);
                }
                for (var i = 0; i < scriptContent.length; i++) {
                    translateScript(scriptContent[i], scriptEN["my-cv-content"], i, (i + 1), "en",  navScriptVN, navScriptEN, false);
                }
                lang.value = "EN";
            }
        });

    } else {
    }

    return txtTypeList;
}