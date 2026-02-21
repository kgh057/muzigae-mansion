/******************************* 메인페이지 노이즈 효과 *******************************/
document.addEventListener("DOMContentLoaded", () => {
  const noiseLayer = document.createElement("div");
  noiseLayer.style.cssText = `
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: url('https://www.ui-layouts.com/noise.gif');
    opacity: 0.05;
    pointer-events: none;
    z-index: 9999;
  `;
  document.body.appendChild(noiseLayer);
});

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

/******************************* 배너 스크롤시 하나씩 *******************************/
// 1. body에 overflow:hidden 셋팅
// 모바일 체크 함수
function isMobile() {
  return window.innerWidth <= 800;
}

// PC/태블릿에서만 body overflow hidden 적용
if (!isMobile()) {
  document.body.style.overflow = "hidden";
}

// 2. html에 scroll-behavior:smooth 셋팅
document.documentElement.style.scrollBehavior = "smooth";

// 3. 새로고침시 스크롤위치 맨위로 이동하기
setTimeout(() => {
  window.scrollTo(0, 0);
}, 400);

// 4. 전역 페이지번호
let pgNo = 0;

// 5. 이동단위 -> 윈도우 높이값
let winH = window.innerHeight;

// 윈도우 리사이즈 시 높이값 업데이트
window.addEventListener("resize", () => {
  winH = window.innerHeight;
});

// 6. 배너 섹션 수집
const bannerSections = document.querySelectorAll(".banner-section");
const pageCnt = bannerSections.length;

console.log("배너개수", pageCnt);

// 7. 광휠금지상태변수
let stopWheel = false;
const TIME_GAP = 600;

// 8. 광휠금지함수
function blockWheel() {
  if (stopWheel) return true;

  stopWheel = true;
  setTimeout(() => {
    stopWheel = false;
  }, TIME_GAP);

  return false;
}

// 9. 휠 이벤트 (PC용)
window.addEventListener(
  "wheel",
  (e) => {
    // 모바일에서는 휠 이벤트 비활성화
    if (isMobile()) return;

    e.preventDefault();

    // 광휠막기
    if (blockWheel()) return;

    // 휠 방향 알아내기
    let dir = e.wheelDelta;

    // 방향에 따른 페이지번호 증감
    if (dir < 0) {
      // 아랫방향
      pgNo++;
      if (pgNo >= pageCnt) pgNo = pageCnt - 1;
    } else if (dir > 0) {
      // 윗방향
      pgNo--;
      if (pgNo < 0) pgNo = 0;
    }

    console.log("휠", dir, pgNo);

    // 화면 크기에 따라 스크롤 방식 변경
    if (window.innerWidth <= 500) {
      // 모바일: 섹션의 실제 위치로 이동
      bannerSections[pgNo].scrollIntoView({ behavior: "smooth" });
    } else {
      // PC: 윈도우 높이 기준으로 이동
      window.scrollTo(0, pgNo * winH);
    }
  },
  { passive: false }
);
