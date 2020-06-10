window.etape=0;
window.nbqs=0;
window.brps=0;
window.reponses=[];

function randomchoice(liste){
    return liste[ parseInt( Math.random() * liste.length ) ];
}

function traitre_txt(txt){
    ntxt=txt
    ntxt=txt.toLowerCase();
    replacements={
        "é":"e",
        "è":"e",
        "ê":"e",
        "ë":"e",
        "â":"a",
        "ä":"a",
        "à":"a",
        "ç":"c",
        "ù":"u",
        "û":"u",
        "ü":"u",
        "î":"i",
        "ï":"i",
        "ö":"o",
        "ô":"o",
        " ":"",
        "\t":"",
        "\r":"",
        "\n":"",
        "!":"",
        ",":"",
        "?":"",
        ";":"",
        ".":"",
        ":":"",
        "/":"",
        "§":"",
        "%":"",
        "*":""
    }
    for(k of Object.keys(replacements)){
        while(ntxt.includes(k)){ ntxt=ntxt.replace(k,replacements[k]); }
    }

    return ntxt
}

function aff_evo_reps(){
    if( ! document.getElementById("canvas") ){
        can=document.createElement("canvas");
        can.setAttribute("id","canvas");
        can.setAttribute("width","500");
        can.setAttribute("height","150");
        document.body.appendChild(can);
    }
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");

    if(window.nbqs<20){
        for(x=0; x<window.nbqs; x++){

        }
    }
}

function createQuestion(){
    document.getElementById("affreponse").innerHTML="";

    question=randomchoice(quiz);
    window.reponse=question[1];
    window.question=question[0];

    document.getElementById("question").innerHTML="Traduction de : "+window.question;
    document.getElementById("button").innerHTML="répondre";

    window.etape=1;
}

function repondre(){
    if(window.etape==1){
        rep=traitre_txt(document.getElementById("input").value);
        window.arepondu=rep;
        vrep=traitre_txt(window.reponse);
        window.nbqs+=1;
        if(rep==vrep){
            document.getElementById("affreponse").innerHTML="Bonne réponse !";
            document.getElementById("affreponse").style.color="green";
            window.reponses.push(1);
            window.brps+=1;
        }
        else if(vrep.includes(rep) && Math.abs(vrep.length-rep.length) < 3 ){
            document.getElementById("affreponse").innerHTML="Votre réponse est dans la bonne réponse, la bonne réponse était : '"+window.reponse+"'";
            document.getElementById("affreponse").style.color="orange";
            window.reponses.push(0.5);
            window.brps+=0.5;
        }
        else{
            document.getElementById("affreponse").innerHTML="mauvaise réponse, la bonne réponse était : '"+window.reponse+"'";
            document.getElementById("affreponse").style.color="red";
            window.reponses.push(0);
        }
        document.getElementById("score").innerHTML=window.brps+"/"+window.nbqs;
        document.getElementById("input").value="";
        document.getElementById("button").innerHTML="continuer";
        window.etape=0;
    }
    else if(window.etape==0){
        createQuestion();
    }
    
}
createQuestion();



