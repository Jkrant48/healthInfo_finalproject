import HealthDataServices from "./externalServices.mjs";
import { setLocalStorage } from "./utils.mjs";

const healthData = new HealthDataServices();

document.addEventListener("DOMContentLoaded", () => {
  const cards = document.querySelectorAll(".card");

  cards.forEach((card) => {
    card.addEventListener("click", async (e) => {
      e.preventDefault();
      const category = card.getAttribute("data-category");

      try {
        const data = await healthData.getData(category);
        if (data) {
          setLocalStorage("H-info", data);
          console.log("Data saved: ", data);

          //navigate to the listing page
          window.location.href = "conditionsList.html";
        } else {
          console.log("No data saved for category: ", category);
        }
      } catch (e) {
        console.error("Error geting data: ", e);
      }
    });
  });
});
