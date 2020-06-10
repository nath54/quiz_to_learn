

function createPage(){
    for(q of quiz_dispos){
        console.log(q);

        var aa=document.createElement("a");
        aa.setAttribute("href","quiz.html?"+q[1]);

        var dd=document.createElement("div");
        dd.setAttribute("class","quizelement");
        
        var hh=document.createElement("h2");
        hh.innerHTML=q[0];
        
        dd.appendChild(hh);
        aa.appendChild(dd);

        document.getElementById("listquiz").appendChild(aa);
    }
}

createPage();






