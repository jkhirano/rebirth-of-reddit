// IG hover
let igHover = document.getElementById("IG");
igHover.addEventListener("mouseover", function() {
  this.src = "../assets/instagram_orange.svg";
});

igHover.addEventListener("mouseout", function() {
  this.src = "../assets/instagram_grey.svg";
});

// clear main
function clear() {
  let main = document.getElementById("main");
  main.innerHTML = " ";
}

// navbar subreddits
let randomSub = document.getElementById("random");
randomSub.addEventListener("click", function() {
  clear();
  let randomReq = new XMLHttpRequest();
  randomReq.open("GET", getRandom);
  randomReq.send();
  randomReq.addEventListener("load", mainReqListener);
});

let randomSubArr = [
  "https://www.reddit.com/r/news.json",
  "https://www.reddit.com/r/aww.json",
  "https://www.reddit.com/r/NatureIsFuckingLit.json",
  "https://www.reddit.com/r/listentothis.json",
  "https://www.reddit.com/r/funny.json",
  "https://www.reddit.com/r/LifeProTips.json",
  "https://www.reddit.com/r/getmotivated.json"
];

let getRandom = randomSubArr[Math.floor(Math.random() * randomSubArr.length)];

let catsSub = document.getElementById("cats");
catsSub.addEventListener("click", function() {
  clear();
  let catsReq = new XMLHttpRequest();
  catsReq.open("GET", "https://www.reddit.com/r/cats.json");
  catsReq.send();
  catsReq.addEventListener("load", mainReqListener);
});

let designPornSub = document.getElementById("designPorn");
designPornSub.addEventListener("click", function() {
  clear();
  let designPornReq = new XMLHttpRequest();
  designPornReq.open("GET", "https://www.reddit.com/r/designporn.json");
  designPornReq.send();
  designPornReq.addEventListener("load", mainReqListener);
});

let todayILearnedSub = document.getElementById("todayILearned");
todayILearnedSub.addEventListener("click", function() {
  clear();
  let todayILearnedSubReq = new XMLHttpRequest();
  todayILearnedSubReq.open(
    "GET",
    "https://www.reddit.com/r/todayilearned.json"
  );
  todayILearnedSubReq.send();
  todayILearnedSubReq.addEventListener("load", mainReqListener);
});

// main subreddit
let subReddit = document.getElementById("main");

const mainReq = new XMLHttpRequest();
mainReq.addEventListener("load", mainReqListener);
mainReq.open("GET", "https://www.reddit.com/r/cats.json");
mainReq.send();

function mainReqListener() {
  let subredditResponse = JSON.parse(this.responseText);
  let subData = subredditResponse.data.children;

  for (let i = 0; i < subData.length; i++) {
    let container = document.createElement("div");
    container.className = "container";
    subReddit.appendChild(container);

    let imageContainer = document.createElement("div");
    imageContainer.className = "imageContainer";
    container.appendChild(imageContainer);

    let image = document.createElement("IMG");
    image.className = "image";
    imageContainer.appendChild(image);

    if (subData[i].data.preview === undefined) {
      image.src = "http://placekitten.com/150/300/";
    } else {
      image.src = subData[i].data.preview.images[0].source.url.replace(
        /amp;/g,
        ""
      );
    }

    let titleContainer = document.createElement("div");
    titleContainer.className = "titleContainer";
    titleContainer.innerHTML = subData[i].data.title;
    container.appendChild(titleContainer);

    let subtitleContainer = document.createElement("div");
    subtitleContainer.className = "subtitleContainer";

    let author = subData[i].data.author;
    let pubDate = moment.unix(subData[i].data.created).fromNow();
    let comments = subData[i].data.num_comments;

    subtitleContainer.innerHTML =
      "by " + author + " • " + pubDate + " • " + comments + " comments";
    container.appendChild(subtitleContainer);

    let textContainer = document.createElement("div");
    textContainer.className = "textContainer";
    container.appendChild(textContainer);
    textContainer.innerHTML = subData[i].data.title;
  }
}
