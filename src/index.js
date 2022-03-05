function fetchData() {
  fetch("http://localhost:3000/ramens", {
    headers: { "Content-Type": "application/json" },
  })
    .then((res) => res.json())
    .then((data) => renderRamen(data));
}

function renderRamen(data) {
  const ramenMenu = document.getElementById("ramen-menu");

  data.forEach((ramen) => {
    const ramenPic = document.createElement("img");
    ramenPic.src = ramen.image;
    ramenPic.id = `${ramen.id}-pic`;
    ramenMenu.appendChild(ramenPic);

    ramenPic.addEventListener("click", (e) =>
      renderRamenDetails(data, e.target)
    );
  });
}

function renderRamenDetails(data, pic) {
  const ramen = data.find((element) => {
    if (element.id == pic.id.split("-")[0]) {
      return element;
    }
  });
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".name").innerText = ramen.name;
  document.querySelector(".restaurant").innerText = ramen.restaurant;
  document.getElementById("rating-display").innerText = ramen.rating;
  document.getElementById("comment-display").innerText = ramen.comment;
}

document.getElementById("new-ramen").addEventListener("submit", (e) => {
  e.preventDefault();
  const name = document.getElementById("new-name").value;
  const restaurant = document.getElementById("new-restaurant").value;
  const image = document.getElementById("new-image").value;
  const rating = document.getElementById("new-rating").value;
  const comment = document.getElementById("new-comment").value;

  fetch("http://localhost:3000/ramens", {
    method: "POST",
    headers: { "Content-Type": "application/json", accept: "application/json" },
    body: JSON.stringify({
      name: name,
      restaurant: restaurant,
      image: image,
      rating: rating,
      comment: comment,
    }),
  });
  clearAndReRender();
});

function clearAndReRender() {
  document.getElementById("ramen-menu").remove();
  const header = document.querySelector("header");
  const newMenu = document.createElement("div");
  newMenu.id = "ramen-menu";
  document.body.insertBefore(newMenu, document.body.childNodes[2]);
  fetchData();
}

fetchData();

// function renderRamenDetails(data, pic) {
//   const ramen = data.find((element) => {
//     if (element.id == pic.id.split("-")[0]) {
//       return element;
//     }
//   });
//   console.log(ramen);
//   // This works, but shouldn't need the 'if' statement
// }
// function renderRamenDetails(data, pic) {
//   const ramen = data.forEach((element) => {
//     if (element.id == pic.id.split("-")[0]) {
//       return element;
//     }
//   });
//   console.log(ramen);
//   // this doesn't work, but I feel like it should
// }
// function renderRamenDetails(data, pic) {
//   const ramen = data.find((element) => {
//     element.id == pic.id.split("-")[0];
//   });
//   console.log(ramen);
//   // this doesn't work but I feel like it should
// }
