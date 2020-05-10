function translate(language, status){
    var elements = document.getElementsByClassName("lang-" + language);
    for(var i=0; i<elements.length; i++) {
        elements[i].hidden = status;
    }
}

function toEnglish(){
    translate("pt", true)
    translate("en", false)
}

function toPortuguese(){
    translate("en", true)
    translate("pt", false)
}

// se for usar tag 'lang'
// $("[lang='pt']")