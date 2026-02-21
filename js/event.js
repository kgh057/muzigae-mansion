/******************************* 메뉴 *******************************/
// 사이드 메뉴 열기/닫기
const productBtn = document.querySelector(".nav-list li:first-child a");
const gnbBtn = document.querySelector(".gnb-btn");
const sideMenu = document.querySelector(".side-menu");
const closeBtn = document.querySelector(".close");

// PRODUCT 클릭시 메뉴 열기
productBtn.addEventListener("click", (e) => {
  e.preventDefault();
  sideMenu.classList.add("active");
});

// gnb-btn 클릭시 메뉴 열기
gnbBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
});

// CLOSE 버튼 클릭시 닫기
closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
});

// 사이드 메뉴 배경 클릭시 닫기
document.addEventListener("click", (e) => {
  if (
    sideMenu.classList.contains("active") &&
    !sideMenu.contains(e.target) &&
    !gnbBtn.contains(e.target) &&
    !productBtn.contains(e.target)
  ) {
    sideMenu.classList.remove("active");
  }
});

/******************************* search *******************************/
// 검색 기능 추가
const searchBtn = document.querySelector(
  ".right-menu .menu-list a:first-child"
);
const searchOverlay = document.querySelector(".search");
const searchClose = document.querySelector(".search-close");
const searchInput = document.querySelector(".search-input");
const searchSubmitBtn = document.querySelector(".search-btn");

// 검색창 열기
searchBtn.addEventListener("click", function (e) {
  e.preventDefault();
  searchOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  setTimeout(() => {
    searchInput.focus();
  }, 300);
});

// 검색창 닫기
searchClose.addEventListener("click", function () {
  searchOverlay.classList.remove("active");
  document.body.style.overflow = "";
  searchInput.value = "";
});

// 검색창 배경 클릭 시 닫기
searchOverlay.addEventListener("click", function (e) {
  if (e.target === searchOverlay) {
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "";
    searchInput.value = "";
  }
});

// ESC 키로 검색창 닫기
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && searchOverlay.classList.contains("active")) {
    searchOverlay.classList.remove("active");
    document.body.style.overflow = "";
    searchInput.value = "";
  }
});

// 검색 실행
searchSubmitBtn.addEventListener("click", function () {
  const searchValue = searchInput.value.trim();
  if (searchValue === "") {
    alert("검색어를 입력해주세요.");
    return;
  }
  console.log("검색어:", searchValue);
  alert(`"${searchValue}" 검색 결과를 표시합니다.`);
});

// Enter 키로 검색
searchInput.addEventListener("keypress", function (e) {
  if (e.key === "Enter") {
    searchSubmitBtn.click();
  }
});

/******************************* 이벤트 *******************************/
