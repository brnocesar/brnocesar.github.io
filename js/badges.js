var elementos = document.getElementsByClassName("badge");

for(var i=0; i<elementos.length; i++) {

    elementos[i].classList.add("badge" + (Math.floor(Math.random() * 3) + 1).toString());
}
