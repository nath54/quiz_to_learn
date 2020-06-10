window.etape=0;
window.nbqs=0;
window.brps=0;
window.reponses=[];
window.pourcentages=[];

document.getElementById("nom").innerHTML=nom;
document.getElementById("description").innerHTML=description;

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
        "*":"",
        "-":"",
        "_":"",
        "'":"",
        '"':"",
        "(":"",
        ")":"",
        "&":"",
        "#":"",
        "{":"",
        "[":"",
        "|":"",
        "`":"",
        "\\":"",
        "^":"",
        "@":"",
        "]":"",
        "}":"",
        "=":"",
        "+":"",
        "°":"",
        "€":"",
        "£":"",
        "µ":""
    }
    for(k of Object.keys(replacements)){
        while(ntxt.includes(k)){ ntxt=ntxt.replace(k,replacements[k]); }
    }

    return ntxt
}

function aff_evo_reps(){
    if(window.pourcentages.length<=1){
        return 0;
    }
    if( ! document.getElementById("canvas") ){
        can=document.createElement("canvas");
        can.setAttribute("id","canvas");
        can.setAttribute("width","500");
        can.setAttribute("height","150");
        document.body.appendChild(can);
    }
    var canvas=document.getElementById("canvas");
    var ctx=canvas.getContext("2d");
    ctx.fillStyle="white";
    ctx.fillRect(0,0,500,150);

    var x0=20;
    var y0=130;
    var x1=480;
    var y1=30;

    //quadrillage
    
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x0,y0);    
    ctx.lineTo(x0,y1);
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 2
    ctx.strokeStyle = 'black';
    ctx.beginPath();
    ctx.moveTo(x1,y0);
    ctx.lineTo(x0,y0);
    ctx.stroke();
    ctx.closePath();
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'grey';
    ctx.beginPath();
    ctx.moveTo(x0,y0-50);
    ctx.lineTo(x1,y0-50);
    ctx.stroke();
    ctx.closePath();
    ctx.beginPath();
    ctx.moveTo(x0,y1);
    ctx.lineTo(x1,y1);
    ctx.stroke();
    ctx.closePath();

    var tc=10;
    if(window.pourcentages[0]>70){ ctx.fillStyle="green"; }
    else if(window.pourcentages[0]>50){ ctx.fillStyle="orange"; }
    else{ ctx.fillStyle="red"; }
    ctx.fillRect(x0-tc/2,y0-window.pourcentages[0]-tc/2,tc,tc);
    //pourcentages
    for(x=1; x<window.nbqs; x++){        
        if(window.pourcentages[x]>window.pourcentages[x-1]){
            ctx.strokeStyle = 'green';
            ctx.fillStyle = "green";
        }
        else if(window.pourcentages[x]<window.pourcentages[x-1]){
            ctx.strokeStyle = 'red';
            ctx.fillStyle = "red";
        }
        else{
            if(window.pourcentages[x]>70){
                ctx.strokeStyle = "green";
                ctx.fillStyle = "green";
            }
            else if(window.pourcentages[x]>50){
                ctx.strokeStyle = "orange";
                ctx.fillStyle = "orange";
            }
            else{
                ctx.strokeStyle = "red";
                ctx.fillStyle = "red";
            }
        }
        ctx.fillRect(x0+(x1-x0)/(window.pourcentages.length-1)*x-tc/2,y0-window.pourcentages[x]-tc/2,tc,tc);
        ctx.lineWidth = 3;
        ctx.beginPath();
        ctx.moveTo(x0+(x1-x0)/(window.pourcentages.length-1)*(x-1), y0-window.pourcentages[x-1]);
        ctx.lineTo(x0+(x1-x0)/(window.pourcentages.length-1)*x,y0-window.pourcentages[x]);
        ctx.stroke();
        ctx.closePath();
        /*
        ctx.strokeStyle="grey";
        ctx.lineWidth=1;
        ctx.beginPath();
        ctx.moveTo(x0+(x1-x0)/(window.pourcentages.length-1)*x,y0);
        ctx.lineTo(x0+(x1-x0)/(window.pourcentages.length-1)*x,y1);
        ctx.stroke();
        ctx.closePath();
        */
    }

    
    

}

function createQuestion(){
    document.getElementById("affreponse").innerHTML="";
    document.getElementById("input").value="";
    question=randomchoice(quiz);
    if(document.getElementById("inverser").checked){
        window.reponse=question[0];
        window.question=question[1];
    }
    else{
        window.reponse=question[1];
        window.question=question[0];
    }
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
        window.pourcentages.push((window.brps/window.nbqs*100))
        document.getElementById("score").innerHTML="Score : "+window.brps+"/"+window.nbqs+" - "+(window.brps/window.nbqs*100)+"%";
        document.getElementById("button").innerHTML="continuer";
        window.etape=0;
        aff_evo_reps();
    }
    else if(window.etape==0){
        createQuestion();
    }
    
}
createQuestion();

function checkEnter(e) {
    if(e && e.keyCode == 13) {
       repondre();
    }
 }

