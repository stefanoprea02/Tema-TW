const express=require('express');
const morgan = require("morgan");
const { v1: uuid } = require('uuid');
const bodyParser = require("body-parser");
const cors = require("cors");
const fs = require("fs");
const { response } = require('express');

const app=express();

app.use(morgan("tiny"));
app.use(bodyParser.json());
app.use(cors());

app.use('/post',express.urlencoded({extended:true}));
app.use(express.static(__dirname + '/'));

app.get("/", function(req,res){
	const recently_released = readJSONFileCategory("recently_released");
	const upcoming_releases = readJSONFileCategory("upcoming_releases");
	const most_anticipated = readJSONFileCategory("most_anticipated");
	res.write('<!DOCTYPE html><html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"><link rel="stylesheet" href="reviews.css"></head><body><script src="scripts.js"></script><nav><a href="reviews.html" class="nav-element"><i class="fa fa-gamepad game-icon" aria-hidden="true"></i>Games</a><a href="#" class="nav-element">Contact</a><a href="#" class="nav-element">About</a><div class="search-container nav-element"><form action="/action_page.php"><input type="text" placeholder="Search..." name="search"><button type="submit"><i class="fa fa-search"></i></button></form></div></nav><div class="page-grid"><div id="content" class="container game-lists"><div class="game-list"><ul id="recently_released"><li><h3>RECENTLY RELEASED</h3></li>');
	for(item in recently_released){
		res.write('<li class="list-item"><div class="list-item-img"><img src="' + recently_released[item]["img"] + '" class="small-image"></div><div class="list-item-text"><p>' + recently_released[item]["name"] + '</p><p class="date">' + recently_released[item]["date"] + '</p></div></li>');
	}
	res.write('</ul></div><div class="game-list"><ul id="upcoming_releases"><li><h3>UPCOMING RELEASES</h3></li>');
	for(item in upcoming_releases){
		res.write('<li class="list-item"><div class="list-item-img"><img src="' + upcoming_releases[item]["img"] + '" class="small-image"></div><div class="list-item-text"><p>' + upcoming_releases[item]["name"] + '</p><p class="date">' + upcoming_releases[item]["date"] + '</p></div></li>');
	}
	res.write('</ul></div><div class="game-list"><ul id="most_anticipated"><li><h3>MOST ANTICIPATED</h3></li>');
	for(item in most_anticipated){
		res.write('<li class="list-item"><div class="list-item-img"><img src="' + most_anticipated[item]["img"] + '" class="small-image"></div><div class="list-item-text"><p>' + most_anticipated[item]["name"] + '</p><p class="date">' + most_anticipated[item]["date"] + '</p></div></li>');
	}
	res.write('</ul></div></div><div class="footer"><i class="fa fa-facebook-square icon" aria-hidden="true"></i><i class="fa fa-instagram icon" aria-hidden="true"></i><i class="fa fa-youtube-play icon" aria-hidden="true"></i><i class="fa fa-twitter icon" aria-hidden="true"></i><i class="fa fa-linkedin-square icon" aria-hidden="true"></i></div></div></body></html>');
});

app.post("/post", function(req,res){
	const allGames = readJSONFile();
	const categorie = req.body['category-input'];
	let obiect;
	if(categorie == "recently_released"){
		const gameList = readJSONFileCategory(req.body['category-input']);
		obiect = {'id': (gameList.length+1), 'name': req.body["name-input"], 'img': req.body["url-input"], 'date': req.body["date-input"]};
		const newGameList = [...gameList, obiect];
		allGames[categorie] = newGameList;
	}
	if(categorie == "upcoming_releases"){
		const gameList = readJSONFileCategory(req.body['category-input']);
		obiect = {'id': (gameList.length+1), 'name': req.body["name-input"], 'img': req.body["url-input"], 'date': req.body["date-input"]};
		const newGameList = [...gameList, obiect];
		allGames[categorie] = newGameList;
	}
	if(categorie == "most_anticipated"){
		const gameList = readJSONFileCategory(req.body['category-input']);
		obiect = {'id': (gameList.length+1), 'name': req.body["name-input"], 'img': req.body["url-input"], 'date': req.body["date-input"]};
		const newGameList = [...gameList, obiect];
		allGames[categorie] = newGameList;
	}
	writeJSONFile( allGames );
	//res.json(obiect);
})

app.get("/delete", (req,res) => {
	let allCat = readJSONFileCategory(req.query["category-input-delete"]);
	allCat = allCat.filter(data => data["id"] != (req.query["id-input-delete"]));
	let allGames = readJSONFile();
	allGames[req.query["category-input-delete"]] = allCat;
	writeJSONFile( allGames );
	//res.json(allGames);
});

app.get("/edit", (req, res) => {
	let allCat = readJSONFileCategory(req.query["category-input-edit"]);
	const newAllCat = allCat.map((data) => {
		if(data["id"] != req.query["id-input-edit"]){
			return data;
		}else{
			const obiect = {'id': req.query["id-input-edit"], 'name': req.query["name-input-edit"], 'img':req.query["img-input-edit"], 'date': req.query["date-input-edit"]};
			return obiect;
		}
	});
	let allGames = readJSONFile();
	allGames[req.query["category-input-edit"]] = newAllCat;
	writeJSONFile( allGames );
	//res.json(allGames);
});

function readJSONFile(){
	return JSON.parse(fs.readFileSync("db.json"));
}

function readJSONFileCategory(categorie){
	return JSON.parse(fs.readFileSync("db.json"))[categorie];
}

function writeJSONFile(content) {
	fs.writeFileSync(
	  "db.json",
	  JSON.stringify( content ),
	  "utf8",
	  err => {
		if (err) {
		  console.log(err);
		}
	  }
	);
}

app.listen(7000, function(){console.log("Serverul a pornit");});