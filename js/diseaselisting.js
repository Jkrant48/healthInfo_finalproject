import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function diseaseListTemplate(disease) {
  return `<li class="info-card" data-disease= "${disease.name}">
    <h2>${disease.name}</h2>
    <p>${disease.incidence}</p>
    </li>`;
}

//get data from local storage
function getData() {
  const data = getLocalStorage("H-info");
  console.log("Data retrieved: ", data);
  if (data) {
    displayData(data);
  } else {
    console.log("No data found");
  }
}

function displayData(data) {
  console.log(data);
  if (!data || !data.communicable_diseases) {
    console.error("Data is not in the expected format:", data);
    return;
  }
  const container = document.getElementById("info");
  container.innerHTML = "";

  data.communicable_diseases.forEach((element) => {
    const listItem = diseaseListTemplate(element);
    container.innerHTML += listItem;
  });
}

getData();

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".info-card");

  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest(".info-card")) {
        const selected_disease = e.target
          .closest(".info-card")
          .getAttribute("data-disease");
        setLocalStorage("selected_disease", selected_disease);
        console.log("selected_disease", selected_disease);
        window.location.href = "conditionsDetails.html";
      }
    });
  });
});
