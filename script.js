const listContainer = document.querySelector(".listContainer");
const input = document.querySelector(".inputSearch");
const btn = document.querySelector(".inputBtn");
const searchInfo = document.querySelector(".searchInfo");
const wishListBtn = document.querySelector(".wishListBtn");
let wishArray = [];

const url = "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=956d0807d7c3f88b165a72b99f5edc0a&query=";
const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI5NTZkMDgwN2Q3YzNmODhiMTY1YTcyYjk5ZjVlZGMwYSIsInN1YiI6IjY1NmUzOGUwODgwNTUxMDEwMDBmMGMxZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.PKqiE4ZQqo9xK1UsSgRYHh0cnsqoYL49cPA22BPkeK0",
  },
};

const getMovies = async (url, options) => {
  const response = await fetch(url, options);
  movies = await response.json();
  console.log(movies);
  renderListMovies(movies);
};

const renderListMovies = (movies) => {
  movies.results.map((element) => {
    listContainer.innerHTML += `<div class="movieItem"><img src="${
      IMGPATH + element.poster_path
    }"></img><h2>${element.title}</h2></div>`;
  });

  const moviesItems = document.querySelectorAll(".movieItem");

  const movieDetails = (item) => {
    listContainer.innerHTML = "";
    console.log(item.innerText);
    movies.results.map((element) => {
      if (item.innerText == element.title) {
        listContainer.innerHTML += `<div class="movieDetailsContainer"><button class="backBtn" onClick="backTohomePage()">Back</button><div class="imgInnerContainer"><img src="${
          IMGPATH + element.poster_path
        }"></img></div><div class="descriptionInnerContainer"><h2>${
          element.title
        }</h2><p><span>Vote average:</span> ${
          element.vote_average
        }</p><p><span>release date:</span> ${element.release_date}</p><p>${
          element.overview
        }</p><button class="wishBtn" onClick="wishList(${
          element.title
        })">Add to wish list</button></div></div>`;
        const wishBtn = document.querySelector(".wishBtn");
        wishBtn.addEventListener("click", function () {
          wishList(element);
        });
      }
    });
  };

  moviesItems.forEach((item) => {
    console.log(item.innerText);
    item.addEventListener("click", function () {
      movieDetails(item);
    });
  });
};

const moviesSearch = () => {
  const inputContent = input.value;
  console.log(inputContent);
  if (inputContent) {
    getMovies(SEARCHAPI + inputContent, options);
    input.value = "";
    listContainer.innerHTML = "";
    searchInfo.innerHTML = `Search for: ${inputContent}`;
    renderListMovies();
  }
};

const backTohomePage = () => {
  listContainer.innerHTML = "";
  getMovies(url, options);
};

const wishList = (item) => {
  console.log("ok");
  wishArray.push(item);
  console.log(wishArray);
};

const wishListPage = () => {
  listContainer.innerHTML = `<button class="backBtn" onClick="backTohomePage()">Back</button>`;
  wishArray.map((element) => {
    listContainer.innerHTML += `<div class="movieItem"><img src="${
      IMGPATH + element.poster_path
    }"></img><h2>${element.title}</h2></div>`;
  });

  const moviesItems = document.querySelectorAll(".movieItem");

  const movieDetails = (item) => {
    listContainer.innerHTML = "";
    console.log(item.innerText);
    wishArray.map((element) => {
      if (item.innerText == element.title) {
        listContainer.innerHTML += `<div class="movieDetailsContainer"><button class="backBtn" onClick="backTohomePage()">Back</button><div class="imgInnerContainer"><img src="${
          IMGPATH + element.poster_path
        }"></img></div><div class="descriptionInnerContainer"><h2>${
          element.title
        }</h2><p><span>Vote average:</span> ${
          element.vote_average
        }</p><p><span>release date:</span> ${element.release_date}</p><p>${
          element.overview
        }</p><button class="wishBtn" onClick="wishList(${
          element.title
        })">Add to wish list</button></div></div>`;
      }
    });
  };

  moviesItems.forEach((item) => {
    console.log(item.innerText);
    item.addEventListener("click", function () {
      movieDetails(item);
    });
  });
};

wishListBtn.addEventListener("click", wishListPage);

btn.addEventListener("click", moviesSearch);
getMovies(url, options);
