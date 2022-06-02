function readMore(clicked){
    var num = clicked.replace( /^\D+/g, '');
    let item = document.getElementById(clicked);
    let parent = item.parentElement;
    let children = parent.children;
    let i = 0;
    for(; i < children.length; i++){
        if(children[i].id === "content" + num){
            break;
        }
    }
    children[i].style.height= 'auto';
    for(i = 0; i < children.length; i++){
        if(children[i].id === "readLess" + num){
            break;
        }
    }
    children[i].style.display = 'block';
    item.style.display = 'none';
}
function readLess(clicked){
    var num = clicked.replace( /^\D+/g, '');
    let item = document.getElementById(clicked);
    let parent = item.parentElement;
    let children = parent.children;
    let i = 0;
    for(; i < children.length; i++){
        if(children[i].id === "content" + num){
            break;
        }
    }
    children[i].style.height= '2em';
    for(i = 0; i < children.length; i++){
        if(children[i].id === "readMore" + num){
            break;
        }
    }
    children[i].style.display = 'block';
    item.style.display = 'none';
}

function ajax(){
    document.getElementById("node").style.display = 'none';
    document.getElementById("ajax").style.display = 'block';
    console.log(document.getElementById("node"));
}

function node(){
    document.getElementById("ajax").style.display = 'none';
    document.getElementById("node").style.display = 'block';
}

window.onload = function(){
    if(document.getElementById("ajax") != null){
        document.getElementById("ajax").style.display = 'none';
        document.getElementById("node").style.display = 'none';
    }
}