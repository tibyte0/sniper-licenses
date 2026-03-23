// TiByte Sniper V3 - CDN VERSION

(function(){

if(window.tibyteSniperActive) return;
window.tibyteSniperActive = true;

let intervalId = null;
let clickCount = 0;
let settingsOpen = false;

let targets = ["join","queue","beitreten"];

let settings = {
    aimHighlight: true,
    highlightColor: "#ffa500"
};

const link = document.createElement("link");
link.href =
"https://fonts.googleapis.com/css2?family=Orbitron:wght@700&family=Exo+2:wght@500&display=swap";
link.rel = "stylesheet";
document.head.appendChild(link);

const style = document.createElement("style");

style.textContent = `

@keyframes neonPulse {
0%{box-shadow:0 0 10px red;}
50%{box-shadow:0 0 25px orange;}
100%{box-shadow:0 0 10px red;}
}

.tibyte-container{
position:fixed;
top:100px;
right:40px;
width:400px;
background:#111;
color:white;
border-radius:15px;
z-index:999999;
padding:10px;
font-family:Exo 2;
animation:neonPulse 2s infinite;
}

.tibyte-btn{
width:100%;
margin-top:5px;
padding:8px;
cursor:pointer;
}

.aim-highlight{
outline:3px solid var(--aimColor);
}

`;

document.head.appendChild(style);

const container = document.createElement("div");

container.className = "tibyte-container";

container.innerHTML = `

<h3>TiByte Sniper</h3>

Status:
<span id="status">Stopped</span>

<br>

Clicks:
<span id="clicks">0</span>

<br>

Interval
<input id="ms" value="1">

<button id="start" class="tibyte-btn">
Start
</button>

<button id="stop" class="tibyte-btn">
Stop
</button>

`;

document.body.appendChild(container);

const status = document.getElementById("status");
const clicks = document.getElementById("clicks");
const msInput = document.getElementById("ms");

function sniperAction(){

const buttons =
Array.from(document.querySelectorAll("button"));

const target = buttons.find(b =>
targets.some(t =>
b.innerText.toLowerCase().includes(t)
)
);

if(target){

if(settings.aimHighlight){

target.style.setProperty(
"--aimColor",
settings.highlightColor
);

target.classList.add(
"aim-highlight"
);

setTimeout(()=>{
target.classList.remove(
"aim-highlight"
);
},200);

}

target.click();

clickCount++;

clicks.innerText = clickCount;

}

}

document.getElementById("start").onclick = () => {

intervalId = setInterval(

sniperAction,

parseInt(msInput.value) || 1

);

status.innerText = "Running";

};

document.getElementById("stop").onclick = () => {

clearInterval(intervalId);

status.innerText = "Stopped";

};

})();
