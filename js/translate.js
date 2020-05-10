function translate(language, status){
    var elements = document.querySelectorAll(`[lang=${language}]:not(html)`);
    
    for(var i=0; i<elements.length; i++) {
        elements[i].hidden = status;
    }
}

function toEnglish(){
    // alert('toEnglish')
    translate("pt", true)
    translate("en", false)
}

function toPortuguese(){
    // alert('toPortuguese')
    translate("en", true)
    translate("pt", false)
}

// proxima mudança:
// - metodo apenas para trocar o valor de 'lang'
// - metodo que busca num JSON o texto que deve ser aplicado de acordo com o valor de 'lang'
// - armazenar na sessao o ultimo valor de 'lang', roda o metodo acima ao carregar também