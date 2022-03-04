fetch("http://localhost:3000/ramens", {
  headers: { "Content-Type": "application/json" },
})
  .then((res) => res.json())
  .then((data) => renderRamen(data));

function renderRamen(data) {
  const ramenMenu = document.getElementById("ramen-menu");

  data.forEach((ramen) => {
    const ramenPic = document.createElement("img");
    ramenPic.src = ramen.image;
    ramenMenu.appendChild(ramenPic);

    ramenPic.addEventListener("click", (e) =>
      renderRamenDetails(data, e.target)
    );
  });
}

function renderRamenDetails(data, pic) {
  const ramen = data.find((element) => {
    console.log(element.image);
    console.log(pic.src);
    element.image.includes(pic.src);
  });

  console.log(ramen);
  //   document.querySelector(".detail-image").src = ramen.image;
}
