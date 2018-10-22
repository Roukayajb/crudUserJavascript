
function check() {
    var usermail = document.getElementById("mail2");
    var userpwd = document.getElementById("pwd2");
    var loginusers = [];
    var userid = JSON.parse(localStorage.getItem('user'));
    var i = 0;
    while (i < userid.length) {
        if ((usermail.value == userid[i].email) && (userpwd.value == userid[i].pass)) {
            alert('You are loged in!');
            document.getElementById("new").onclick = function () {
                location.href = "tasks.html";
            };
            var loggeduser = {
                mail: usermail.value,
                password: userpwd.value
            }
            loginusers.push(loggeduser);
            console.log(loggeduser);
            localStorage.setItem('logged', JSON.stringify(loginusers));
            break;
        } else {
            i++;
        }
    }
    if (i == userid.length) {
        alert('verify your connection!');
    }
}
function savetasks() {
    var alltask, tasks, users,usertasktable = [];
    var taskname = document.getElementById("taskname").value;
    var tasktime = document.getElementById("tasktime").value;
    var x;
    users = JSON.parse(localStorage.getItem('user'));
    loginusers = JSON.parse(localStorage.getItem('logged') || '[]');
    for (var i = 0; i < users.length; i++) {
        for (var j = 0; j < loginusers.length; j++) {
            if (users[i].email == loginusers[j].mail) {
                x = i;
            }
        }
    }
    var task = {
        name: taskname,
        time: tasktime
    }
    usertasktable=users[x].alltask ;
    tasks = JSON.parse(localStorage.getItem('t') || '[]');
    tasks=usertasktable;
    tasks.push(task);
    localStorage.setItem('t', JSON.stringify(tasks));
    console.log(tasks);
    users[x].alltask = tasks;
    console.log(users);
    localStorage.setItem('user', JSON.stringify(users));
}
function deconnexion() {
    var loginusers = [];
    localStorage.setItem('logged', JSON.stringify(loginusers));
    var taskusers = [];
    localStorage.setItem('t', JSON.stringify(taskusers));
}

function viewtask() {
    var tabuser, loginusers, taskstab = [];
    var ind;
    tabuser = JSON.parse(localStorage.getItem('user'));
    loginusers = JSON.parse(localStorage.getItem('logged'));
    for (var i = 0; i < tabuser.length; i++) {
        for (var j = 0; j < loginusers.length; j++) {
            if (tabuser[i].email == loginusers[j].mail) {
                ind = i;
                taskstab = tabuser[i].alltask;
            }
        }
    }
        console.log(taskstab);
        if ((taskstab == null)||(taskstab .length ===0)) {
            alert("no tasks ! add task ");
        }
        else {
            var tasktable = "<table class='table-form table-form-zebra  table-form-horizontal' border='1' id='tabletodo'>";
            tasktable += "<tr><th>User-ID</th><th>tasksname</th><th>taskstime</th><th>Action</th></tr>";
            for (var k = 0; k < taskstab.length; k++) {
                tasktable += "<tr class='second-tr' ><td>" + ind + "</td>";
                tasktable += "<td>" + taskstab[k].name + " </td><td>" + taskstab[k].time +  "</td>";
                tasktable += "<td><button class='bt-edit' onClick='editask()'/>Edit<button class='bt-delete' onclick='deleteTask()'/>Delete</td></tr>";
            } tasktable += "</table>";
            document.getElementById("todo").innerHTML = tasktable;
        }
   
}
function deleteTask() {
    var tasks, users, htmltable = [];
    var rIndex;
    tasks = JSON.parse(localStorage.getItem('t'));
    users = JSON.parse(localStorage.getItem('user'));
    htmltable = document.getElementById('tabletodo');
    for (var i = 1; i < htmltable.rows.length; i++) {
        htmltable.rows[i].cells[3].onclick = function () {
            rIndex = this.parentElement.rowIndex;
            var induser = htmltable.rows[rIndex].cells[0].innerHTML;
            console.log(induser);
            htmltable.deleteRow(rIndex);
            tasks.splice(rIndex - 1);
            localStorage.setItem('t', JSON.stringify(tasks));
            users[induser].alltask.splice(rIndex - 1);
            localStorage.setItem('user', JSON.stringify(users));
        }
    }
}
function editask(){
    var users = JSON.parse(localStorage.getItem('user'));
   var htmltable = document.getElementById('tabletodo');
   var rIndex,induser;
    for (var i = 1; i < htmltable.rows.length; i++) {
        htmltable.rows[i].cells[3].onclick = function () {
            rIndex=this.parentElement.rowIndex;
            document.getElementById('taskname').value=htmltable.rows[rIndex].cells[1].innerHTML;//récupération du task de la table vers le formulaire
            document.getElementById('tasktime').value=htmltable.rows[rIndex].cells[2].innerHTML;
             induser = htmltable.rows[rIndex].cells[0].innerHTML;
        }
        document.getElementById('btnedit').onclick=function (){
            users[induser].alltask[rIndex-1].name=document.getElementById('taskname').value;
            users[induser].alltask[rIndex-1].time=document.getElementById('tasktime').value;
            localStorage.setItem('user',JSON.stringify(users));
    }
}
}