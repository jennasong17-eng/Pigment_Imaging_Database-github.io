const uploadBtn = document.getElementById("uploadBtn");
const gallery = document.getElementById("gallery");

uploadBtn.addEventListener("click", function(){

const file = document.getElementById("imageInput").files[0];
const title = document.getElementById("titleInput").value;
const desc = document.getElementById("descInput").value;

if(!file){
alert("Please select an image");
return;
}

const reader = new FileReader();

reader.onload = function(event){

const imgData = {
url: event.target.result,
title: title,
desc: desc
};

let images = JSON.parse(localStorage.getItem("images")) || [];
images.push(imgData);
localStorage.setItem("images", JSON.stringify(images));

displayImages();

};

reader.readAsDataURL(file);

});

function displayImages(){

gallery.innerHTML = "";

let images = JSON.parse(localStorage.getItem("images")) || [];

images.forEach(function(data){

const img = document.createElement("img");
img.src = data.url;

img.addEventListener("click", function(){
openModal(data);
});

gallery.appendChild(img);

});

}

function openModal(data){

document.getElementById("modal").style.display = "block";
document.getElementById("modalImg").src = data.url;
document.getElementById("modalTitle").innerText = data.title;
document.getElementById("modalDesc").innerText = data.desc;

}

document.getElementById("closeBtn").onclick = function(){
document.getElementById("modal").style.display = "none";
};

displayImages();
