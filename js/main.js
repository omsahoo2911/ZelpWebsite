
const init = function(){
    document.getElementById('submit').addEventListener('click', fromState)
}

function fromState(ev){
    let a = document.getElementById("search1").value;
    let b = document.getElementById("search2").value;
    let c = document.getElementById("search3").value;
    let d = document.getElementById("search4").value;
    let e = document.getElementById("search5").value;
    document.body.innerHTML = a + b +c+d+e;
}//qwd12we12qweqwe
//edited by akash

document.addEventListener('DOMContentLoaded', init)
