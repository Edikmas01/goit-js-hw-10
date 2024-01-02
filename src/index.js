import {clientCat, clientCatImg} from "./cat-api.js";
// import { getAllCats, getOneCat, getOneCatImage } from "./catapi.js";

clientCat.get().then((res) => console.log(res.data, "data from axios request"));

const catInfo = document.querySelector(".cat-info");
const loader = document.querySelector(".loader");
const errorMessage = document.querySelector(".error");
errorMessage.style.display = "none";
const selectElement = document.querySelector(".breed-select");
selectElement.style.display = "none";

document.addEventListener("DOMContentLoaded", () => {
  clientCat
    .get()
    .then((breeds) => {
      const optionsMarkup = breeds.data
        .map(
          (breed) =>
            `
                <option value=${breed.id}>${breed.name}</option>
            `
        )
        .join("");

      const defaultOption = `
        <option selected disabled>Choose a cat</option>
      `;
      selectElement.insertAdjacentHTML("afterbegin", defaultOption);
      selectElement.insertAdjacentHTML("afterbegin", optionsMarkup);
      selectElement.style.display = "block";
    })
    .catch((err) => {
      errorMessage.style.display = "block";
    })
    .finally(() => {
      loader.remove();
    });
});

selectElement.addEventListener("change", (e) => {
  const catId = e.target.value;

  clientCat
    .get(catId)
    .then((res) => createCatInfo(res.data));
});

const createCatInfo = async (catData) => {
  catInfo.innerHTML = "Loading, please wait...";
  
    const response = await clientCatImg({ params: { breed_ids: catData.id } });
    const catImgData = await response.data;
    console.log(catImgData);

  const catCard = `
    <div class="cat-card">
      <h2 class="cat-card__title">
        ${catData.name}
      </h2>
      <div class="cat-card__content">
        <img src=${catImgData[0].url}>
        <p class="cat-card__description">
          ${catData.description}
        </p>
      </div>
    </div>
  `;
  catInfo.innerHTML = "";
  catInfo.insertAdjacentHTML("beforeend", catCard);
};
