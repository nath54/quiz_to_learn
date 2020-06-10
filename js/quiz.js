


function init(){
    var parameters = location.search.substring(1).split("&");
    var fichjs=parameters[0];

    var sc=document.createElement("script");
    sc.setAttribute("src","quizs/"+fichjs+".js");
    sc.setAttribute("type","text/javascript");
    document.body.appendChild(sc);

    var sc2=document.createElement("script");
    sc2.setAttribute("src","js/questions.js");
    sc2.setAttribute("type","text/javascript");
    document.body.appendChild(sc2);
    
}

init();







