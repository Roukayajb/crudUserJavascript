var tabuser=[];
tabuser = JSON.parse(localStorage.getItem('user')); 
function afficher(){
    if(tabuser == null){
        alert("There is no user !!!");
    }else{
     console.log(tabuser);
    var render = "<table class='table-form table-form-zebra  table-form-horizontal' border='1' id='table'>"; 
    render += "<tr><th>User-ID</th><th>FirstName</th><th>Email</th><th>Date</th><th>Action</th></tr>"; 
    for(var i=0,len=tabuser.length;i<len;i++){ 
        var p = tabuser[i];
        render += "<tr class='second-tr' ><td>" + i + "</td>";
        render += "<td>" + p.nom + "</td>"; 
        render += "<td>" + p.email + "</td>"; 
        render += "<td>" + p.birth + "</td>"; 
        render +="<td><button class='bt-edit' onClick='edit()'/>Edit<button class='bt-delete' onclick='deleteUser()'/>Delete</td></tr>"  ;
    }
    render+="</table>"; 
    document.getElementById("affiche-list").innerHTML = render; 
}
}
  //delete user  function
  function deleteUser (){
    var table=document.getElementById('table');
    var rIndex;
    for(var i=1 ;i<table.rows.length ; i++)
    {
       table.rows[i].cells[4].onclick =function (){
           rIndex=this.parentElement.rowIndex ;
            table.deleteRow(rIndex);
            console.log(rIndex);
            tabuser.splice(rIndex-1);
            console.log(rIndex-1);
            console.log(tabuser);
            localStorage.setItem('user',JSON.stringify(tabuser));
       }
    }
}  
//edit user function
function edit(){
    var table=document.getElementById('table'),rIndex;
    /*table est un variable qui contient la liste d'utilisateurs
      rIndex une variable qui retourne l'indice de la ligne sélectionnée
    */
    for(var i=1 ;i<table.rows.length ; i++)
    {
        table.rows[i].onclick =function (){
            rIndex=this.rowIndex;
            console.log(rIndex);
            document.getElementById('name').value=this.cells[1].innerHTML;//récupération du nom de la table vers le formulaire
            document.getElementById('mail').value=this.cells[2].innerHTML;//récupération de email de la table vers le formulaire
            document.getElementById('date').value=this.cells[3].innerHTML;//récupération de la date naisaance de la table vers le formulaire
            document.getElementById('pwd').disabled=true;//le mot de passe ne doit pas être ni visible ni modifiable
        }  
        //si on confirme la modification, on fait l'enregistrement de l'utilisateur dans la meme ligne
        document.getElementById('res').onclick=function (){
            tabuser[rIndex-1].nom=document.getElementById('name').value;
            tabuser[rIndex-1].email=document.getElementById('mail').value;
            tabuser[rIndex-1].birth=document.getElementById('date').value;
            console.log(tabuser);
            localStorage.setItem('user',JSON.stringify(tabuser));
        }
    }
}

