// IG hover
let igHover = document.getElementById("IG");
igHover.addEventListener("mouseover", function() {
  this.src = "../assets/instagram_orange.svg";
});

igHover.addEventListener("mouseout", function() {
  this.src = "../assets/instagram_grey.svg";
});
