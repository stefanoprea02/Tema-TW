function fetchGames(){

    let content=document.getElementById("content");

    let p=document.createElement("p");
    p.innerText="Loading...";
    p.setAttribute("id","loading");
    content.appendChild(p);

    let items = ["recently_released", "upcoming_releases", "most_anticipated"];
    for(let i = 0; i < items.length; i++){
        let x = items[i];
        fetch("http://localhost:3000/" + x,{
        method:'get'
    }).then(response => {
        if(!response.ok){
            throw new Error("HTTP error " + response.status);
        }
        return response.json();
    }).then(json => {
        this.users = json;
        if(content.children.length == 4){
            content.removeChild(p);
        }
        for(let field in this.users){       
            let li = document.createElement("li");
            li.classList.add("list-item");
            
            let div1 = document.createElement("div");
            div1.classList.add("list-item-img");
            
            let img = document.createElement("img");
            img.src = this.users[field]["img"];
            img.classList.add("small-image");
            div1.appendChild(img);
            li.appendChild(div1);
            
            let div2 = document.createElement("div");
            div2.classList.add("list-item-text");
            
            let p1 = document.createElement("p");
            p1.innerText = this.users[field]["name"];
            div2.appendChild(p1);
            
            let p2 = document.createElement("p");
            p2.innerText = this.users[field]["date"];
            p2.classList.add("date");
            div2.appendChild(p2);
            
            let btn1 = document.createElement("button");
            btn1.innerHTML = "Edit";
            btn1.classList.add("edit-button");
            btn1.onclick = editGame;
            div2.appendChild(btn1);
            
            let btn2 = document.createElement("button");
            btn2.innerHTML = "Remove";
            btn2.classList.add("edit-button");
            btn2.onclick = deleteGame;
            div2.appendChild(btn2);
            
            li.id = this.users[field]["id"];
            li.appendChild(div2);
            let category = document.getElementById(x);
            li.id = x + this.users[field]["id"];
            category.appendChild(li);
        }
        let li = document.createElement("li");
        let a = document.createElement("a");
        a.href = x + ".html";
        a.innerHTML = "View More";
        let i = document.createElement("i");
        //i.classList.add("fa fa-arrow-right");
        i.ariaHidden = "true";
        a.appendChild(i);
        li.appendChild(a);
        let category = document.getElementById(x);
        category.appendChild(li);
    }).catch(function(){
        this.dataError = true;
    });
    }
}

function addGame(categorie, nume, url, data){
    const response = fetch("http://localhost:3000/" + categorie,{
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nume,
            img: url,
            date: data
        })
    });
}

function deleteGame(obiect){
    let id = obiect.target.parentNode.parentNode.id.replace( /^\D+/g, '');;
    let categorie = obiect.target.parentNode.parentNode.parentNode.id;
    let url = "http://localhost:3000/" + categorie + "/" + id;
    const response = fetch(url ,{
        method: 'DELETE',
        headers:{
            'Content-Type': 'application/json'
        }
    });
}

function disableButton(buton){
    document.getElementById(buton).disabled = true;
}

function enableButton(buton){
    document.getElementById(buton).disabled = false;
}

function editGame(obiect){
    num = obiect.target.parentNode.parentNode.id.replace( /^\D+/g, '');
    id = obiect.target.parentNode.parentNode.id;
    let categorie = obiect.target.parentNode.parentNode.parentNode.id;
    disableButton("Add-btn");
    enableButton("Update-btn");
    let name = document.getElementById(id).children[1].children[0].innerHTML;
    let url = document.getElementById(id).children[0].children[0].src;
    let date = document.getElementById(id).children[1].children[1].innerHTML;

    document.getElementById("category-input").value = categorie;
    document.getElementById("name-input").value = name;
    document.getElementById("url-input").value = url;
    document.getElementById("date-input").value = date;
}

function updateGame(categorie, nume, url, data){
    const repsonse = fetch("http://localhost:3000/" + categorie + "/" + num, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: nume,
            img: url,
            date: data
        })
    })
}

let id;
let num;
document.getElementById("Update-btn").disabled = true;
fetchGames();