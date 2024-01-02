import axios from "../node_modules/axios/dist/esm/axios.js";

const BASE_URL = "https://api.thecatapi.com/v1/breeds";
const SEARCH_IMG_URL = "https://api.thecatapi.com/v1/images/search?breed_ids=";
const token =
  "live_EkxO7qUbIaS2465JNnbq4UZSvhMqYeGlbYaAiuiyqkY3d5Pbevv0W1VTGHR2RFFo";

  
  // запити за допомогую axios
  axios.defaults.headers.common['x-api-key'] = token;

export const clientCat = axios.create({
  baseURL: "https://api.thecatapi.com/v1/breeds",
});

export const clientCatImg = axios.create({
  baseURL: "https://api.thecatapi.com/v1/images/search",
});



// та fetch запити "в коді запити видправляються через axios" с початку робив через fetch для правктики 
