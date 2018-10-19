
//fonction qui vérifie l'input items ainsi la sauvegarde d'une connexion en localstorage

function verifier() {
    var indice1 = 0;//compteurs pour examiner si un mot de passe est fort ou non 
    var indice2 = 0; 
    var up = /[A-Z]/;//intervale de lettres en majuscule
    var nb = /[0-255]/g;//intervale pour les chiffres
    var test1 = true;//variables booléens pour valider que les conditions d'inscription ont été respecté
    var test2 = false;
    var test3 = true;
    var users1 = [];//tableau qui contient  des utilisateurs sauvegardés dans localstorage
    var username = document.getElementById("name").value;//récupérer la valeur de input name à partir de l'ID
    var usermail = document.getElementById("mail").value;
    var userdate = document.getElementById("date").value;
    var userpwd = document.getElementById("pwd").value;
    //teste pour que le nom ne contient pas un espace
    //indexOf une fonction qui retourne l'indice d'un caractére dans une chaine de caractéres s'il existe
    if (username.indexOf(' ') > -1) {
        document.getElementById("output1").innerHTML = "le nom ne doit pas contenir un espace!!!";
        var test1 = false;
    }
    //intervale pour les caractéres spéciaux
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(String(usermail).toLowerCase())) {
        document.getElementById("output2").innerHTML = "mail valid!!!";
        var test2 = true;
    } else {
        document.getElementById("output2").innerHTML = "mail invalid!!!";
    }
    //extraire une année de la date saisie
    var annee = userdate.substring(0, 4);
    console.log(annee);
    //now variable qui contient la date courante
    var now = new Date();
    //annenow contient l'année courante
    var anneenow = now.getFullYear();
    //vérifier si il a l'age supérieur à 18
    var age = anneenow - annee;
    if (age < 18) {
        document.getElementById("output3").innerHTML = "age - 18!!!";
        var test3 = false;
    }
    //controle sur le niveau de sécurité d'un mot de passe
    for (i = 0; i < userpwd.length; i++) {
        if ((userpwd[i].match(up)) || (userpwd[i].match(s)) || (userpwd[i].match(nb))) {
            indice1++;
        } else {
            indice2++;
        }
    }
    console.log("indice1 " + indice1);
    console.log("indice2 " + indice2);
    if ((indice1 > indice2) && (indice2 == 0)) {
        console.log("votre mot de passe est fort");
    } else if (indice1 != 0 && (indice2 > indice1)) {
        console.log("votre mot de passe est moyenne");
    } else
        console.log("votre mot de passe est faible");
    //valider l'inscription seulement s'il a bien respecté les conditions
    if ((test1 == true) && (test2 == true) && (test3 == true)) {
        alert("bien");
        //créer un objet user qui contient le nom,mail,date et motdepasse
        var user = {
            email: usermail,
            pass: userpwd,
            birth: userdate,
            nom: username
        }
        //sauvegarde des données d'utilisateurs dans notre table 
        users1 = JSON.parse(localStorage.getItem('user') || '[]');
        users1.push(user);
        //verse le table dans localstorage 
        localStorage.setItem('user', JSON.stringify(users1));
        console.log(users1);
    } else {
        alert("saisir de nouveau");//si les conditions d'incription ne sont pas respectés il faut que l'utilisateur saisir de nouveau
    }

}

