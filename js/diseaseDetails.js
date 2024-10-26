import { getLocalStorage } from "./utils.mjs";

function renderDetailsTemplate(disease) {
  return `<div class="d-hero">
        <img src="${
          disease.image_link
        }" alt="Picture illustrating ${disease}" />
        <h1>${disease.name}</h1>
      </div>
      <div class="details-info">
        <h3 class="details-heading">What it is...</h3> <hr />
        <p>${disease.definition}</p>
        <p><strong>Incidence:</strong> ${disease.incidence}</p>
        <p>${disease.infection_occurrence}</p> 
        <h3 class="t-heading">Treatment Methods</h3> <hr />
        <ul>
          ${disease.treatment_methods
            .map((method) => `<li>${method}</li>`)
            .join("")}
        </ul>
        <h3 class="p-heading">Prevention</h3> <hr />
        <ul>
          ${disease.prevention.map((prevent) => `<li>${prevent}</li>`).join("")}
        </ul>
        <h3 class="r-heading">Risk Factors</h3> <hr />
        <ul>
          ${disease.risk_factors.map((factor) => `<li>${factor}</li>`).join("")}
        </ul>
      </div>`;
}

function renderTipTemplate(tip) {
  return `
  <div class="details-info">
    <h3 class="details-heading">What it involves...</h3> <hr />
    <p>${tip.what_it_involves}</p>
    <h3 class="t-heading">Benefits</h3> <hr />
    <p>${tip.benefits}</p>
    <h3 class="p-heading">Recommendations</h3> <hr />
    <p>${tip.recommendations}</p>
  </div>`;
}

function getData() {
  document.addEventListener("DOMContentLoaded", () => {
    const storedData = getLocalStorage("H-info");
    const selected_disease = getLocalStorage("selected_disease");
    console.log("Data retrieved: ", storedData);
    console.log("selected_disease: ", selected_disease);

    if (storedData) {
      if (storedData.communicable_diseases) {
        findAndDisplay(selected_disease, storedData.communicable_diseases);
      } else if (storedData.non_communicable_diseases) {
        findAndDisplay(selected_disease, storedData.non_communicable_diseases);
      } else if (storedData.lifestyle_tips) {
        findAndDisplayTip(selected_disease, storedData.lifestyle_tips);
      }
    } else {
      console.log("Stored data is not available.");
    }

    /*if (storedData && selected_disease) {
      // Find the selected disease from the complete data
      const selectedDisease = storedData.communicable_diseases.find(
        (disease) => disease.name === selected_disease
      );

      if (selectedDisease) {
        const container = document.getElementById("content");
        container.innerHTML = renderDetailsTemplate(selectedDisease);
      } else {
        console.error("Selected disease not found in stored data");
      }
    } else {
      console.error("Selected disease not found in local storage");
    }*/
  });
}

function findAndDisplay(selectedName, data) {
  if (data && selectedName) {
    // Find the selected disease from the complete data
    const selectedItem = data.find((disease) => disease.name === selectedName);

    if (selectedItem) {
      const container = document.getElementById("content");
      container.innerHTML = renderDetailsTemplate(selectedItem);
    } else {
      console.error("Selected disease not found in stored data");
    }
  } else {
    console.error("Selected disease not found in local storage");
  }
}

function findAndDisplayTip(selectedName, data) {
  if (selectedName && data) {
    const selectedItem = data.find((item) => item.tip === selectedName);

    if (selectedItem) {
      const container = document.getElementById("content");
      container.innerHTML = renderTipTemplate(selectedItem);
    } else {
      console.error("Selected item not found in stored data");
    }
  } else {
    console.error("Selected item not found in local storage");
  }
}

/*function getData() {
  document.addEventListener("DOMContentLoaded", () => {
    const storedData = getLocalStorage("H-info");
    const selected_disease = getLocalStorage("selected_disease");
    console.log("Data retrieved: ", storedData);
    console.log("selected_disease: ", selected_disease);

    if (storedData && typeof storedData === "object") {
      const diseaseType =
        getLocalStorage("selected_disease") || "communicable_diseases";
      let diseaseArray = storedData[diseaseType];

      if (diseaseArray) {
        const selectedDisease = diseaseArray.find(
          (disease) => disease.name === selected_disease
        );

        if (selectedDisease) {
          const container = document.getElementById("content");
          container.innerHTML = renderDetailsTemplate(selectedDisease);
        } else {
          console.error("Selected disease not found in", diseaseType);
        }
      } else {
        console.error("Disease type", diseaseType, "not found in data");
      }
    } else {
      console.error("Selected disease not found in local storage");
    }
  });
}*/

getData();
