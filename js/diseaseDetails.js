import { getLocalStorage } from "./utils.mjs";

function renderDetailsTemplate(disease) {
  return `<div class="d-hero">
        <img src="${disease.image_link}" alt="Picture illustrating disease" />
        <h1>${disease.name}</h1>
      </div>
      <div class="details-info">
        <h3>What it is...</h3>
        <p>${disease.definition}</p>
        <p><strong>Incidence:</strong> ${disease.incidence}</p>
        <p>${disease.infection_occurrence}</p> <br>
        <h3>Symptoms</h3>
        <ul>
          ${
            disease.symptoms
              ? disease.symptoms
                  .map((symptom) => `<li>${symptom}</li>`)
                  .join("")
              : "<li>No symptoms listed</li>"
          }
        </ul>
        <h3>Treatment Methods</h3>
        <ul>
          ${disease.treatment_methods
            .map((method) => `<li>${method}</li>`)
            .join("")}
        </ul>
        <h3>Prevention</h3>
        <ul>
          ${disease.prevention.map((prevent) => `<li>${prevent}</li>`).join("")}
        </ul>
        <h3>Risk Factors</h3>
        <ul>
          ${disease.risk_factors.map((factor) => `<li>${factor}</li>`).join("")}
        </ul>
      </div>`;
}

function getData() {
  document.addEventListener("DOMContentLoaded", () => {
    const storedData = getLocalStorage("H-info");
    const selected_disease = getLocalStorage("selected_disease");
    console.log("Data retrieved: ", storedData);
    console.log("selected_disease: ", selected_disease);

    if (storedData && selected_disease) {
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
    }
  });
}

getData();
