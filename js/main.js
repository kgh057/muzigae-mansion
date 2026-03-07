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
  document.body.style.overflow = "hidden"; // 배경 스크롤 막기
});

// gnb-btn 클릭시 메뉴 열기
gnbBtn.addEventListener("click", () => {
  sideMenu.classList.add("active");
  document.body.style.overflow = "hidden"; // 배경 스크롤 막기
});

// CLOSE 버튼 클릭시 닫기
closeBtn.addEventListener("click", () => {
  sideMenu.classList.remove("active");
  // PC(1280px 이상)는 overflow hidden 유지, 모바일/태블릿은 복원
  if (isMobile()) {
    document.body.style.overflow = "";
  }
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
    // PC(1280px 이상)는 overflow hidden 유지, 모바일/태블릿은 복원
    if (isMobile()) {
      document.body.style.overflow = "";
    }
  }
});

/******************************* search *******************************/
// 검색 기능 추가
const searchBtn = document.querySelector(
  ".right-menu .menu-list a:first-child",
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
// 1279px 이하(모바일, 태블릿)는 일반 스크롤, 1280px 이상(PC, 노트북)은 한 컷씩
function isMobile() {
  return window.innerWidth <= 1279;
}

// 1280px 이상에서만 body overflow hidden 적용
if (!isMobile()) {
  document.body.style.overflow = "hidden";
}

// 부드러운 스크롤 효과
document.documentElement.style.scrollBehavior = "smooth";

// 새로고침 시 스크롤 위치 맨 위로 초기화
setTimeout(() => {
  window.scrollTo(0, 0);
}, 400);

// 현재 페이지 번호
let pgNo = 0;

// 스크롤 이동 단위 = 윈도우 높이값
let winH = window.innerHeight;

// 윈도우 리사이즈 시 높이값 업데이트 + PC/모바일 전환에 따라 overflow 재적용
window.addEventListener("resize", () => {
  winH = window.innerHeight;

  if (isMobile()) {
    document.body.style.overflow = ""; // 모바일, 태블릿: 기본 스크롤 복원
  } else {
    document.body.style.overflow = "hidden"; // PC, 노트북: 스크롤 잠금
  }
});

// 배너 섹션 전체 수집
const bannerSections = document.querySelectorAll(".banner-section");
const pageCnt = bannerSections.length;

// 광클 방지 상태 변수
let stopWheel = false;
const TIME_GAP = 600; // 섹션 전환 후 600ms 동안 추가 입력 무시

// 광클 방지 함수 - true 반환 시 이미 동작 중이므로 무시
function blockWheel() {
  if (stopWheel) return true;
  stopWheel = true;
  setTimeout(() => {
    stopWheel = false;
  }, TIME_GAP);
  return false;
}

// 공통 섹션 이동 함수
function moveToSection(index) {
  bannerSections[index].scrollIntoView({ behavior: "smooth" });
}

// 휠 이벤트 - PC(마우스 휠)용
// passive: false 로 설정해야 e.preventDefault()가 작동함
window.addEventListener(
  "wheel",
  (e) => {
    // 1279px 이하에서는 휠 이벤트 무시 → 기본 스크롤 동작
    if (isMobile()) return;

    e.preventDefault(); // 기본 스크롤 막기
    if (blockWheel()) return; // 광클 방지

    // 휠 방향 감지
    let dir = e.wheelDelta;

    if (dir < 0) {
      pgNo++;
      if (pgNo >= pageCnt) pgNo = pageCnt - 1; // 마지막 섹션에서 고정
    } else if (dir > 0) {
      pgNo--;
      if (pgNo < 0) pgNo = 0; // 첫 섹션에서 고정
    }

    moveToSection(pgNo);
  },
  { passive: false },
);

// 터치 스와이프 이벤트 - 1280px 이상 터치 기기용
let touchStartY = 0;
let isSwiping = false;

window.addEventListener(
  "touchstart",
  (e) => {
    if (isMobile()) return;
    touchStartY = e.touches[0].clientY;
    isSwiping = false;
  },
  { passive: true },
);

window.addEventListener(
  "touchmove",
  (e) => {
    if (isMobile()) return;
    isSwiping = true;
  },
  { passive: true },
);

window.addEventListener(
  "touchend",
  (e) => {
    if (isMobile() || !isSwiping) return;
    if (blockWheel()) return;

    const touchEndY = e.changedTouches[0].clientY;
    const diff = touchStartY - touchEndY;

    if (Math.abs(diff) < 50) return; // 오터치 방지

    if (diff > 0) {
      pgNo++;
      if (pgNo >= pageCnt) pgNo = pageCnt - 1;
    } else {
      pgNo--;
      if (pgNo < 0) pgNo = 0;
    }

    moveToSection(pgNo);
  },
  { passive: true },
);
