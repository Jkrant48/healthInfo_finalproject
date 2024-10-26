import { getLocalStorage, setLocalStorage } from "./utils.mjs";

function diseaseListTemplate(disease) {
  return `<li class="info-card" data-disease= "${disease.name}">
    <h2>${disease.name}</h2>
    <p>${disease.incidence}</p>
    </li>`;
}

function healthTipTemplate(tip) {
  return `<li class="info-card" data-disease= "${tip.tip}">
    <h2>${tip.tip}</h2>
    <p>${tip.what_it_involves}</p>
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
  /* (
    !data ||
    !data.communicable_diseases ||
    !data.non_communicable_diseases ||
    !data.lifesyle_tips
  ) {
    console.error("Data is not in the expected format:", data);
    return;
  }*/

  if (data.communicable_diseases) {
    insertHTML(data.communicable_diseases);
  } else if (data.non_communicable_diseases) {
    insertHTML(data.non_communicable_diseases);
  } else if (data.lifestyle_tips) {
    insertHTML(data.lifestyle_tips);
  }
}

function insertHTML(requiredData) {
  const container = document.getElementById("info");
  container.innerHTML = "";

  /*if (
    requiredData === data.communicable_diseases ||
    requiredData === data.non_communicable_diseases
  ) {
    requiredData.forEach((element) => {
      const listItem = diseaseListTemplate(element);
      container.innerHTML += listItem;
    });
  } else if (requiredData === data.lifestyle_tips) {
    requiredData.forEach((element) => {
      const listItem = healthTipTemplate(element);
      container.innerHTML += listItem;
    });
  }*/
  // Check if the requiredData is an array and determine the correct template
  if (Array.isArray(requiredData)) {
    if (requiredData[0]?.incidence) {
      // Check if it's disease data
      requiredData.forEach((element) => {
        const listItem = diseaseListTemplate(element);
        container.innerHTML += listItem;
      });
    } else if (requiredData[0]?.what_it_involves) {
      // Check if it's health tip data
      requiredData.forEach((element) => {
        const listItem = healthTipTemplate(element);
        container.innerHTML += listItem;
      });
    }
  }
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
