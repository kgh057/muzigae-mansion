// import response from "../data/product_data.Json" with { type: "json" };
// const response = await fetch("./data/product_data.json");
// console.log("✅ 제품 데이터 로드 성공:", response);

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

/******************************* 제품 *******************************/
// JSON 데이터 로드 및 제품 표시
let productsData = {};

// JSON 파일 로드
async function loadProducts() {
  try {
    const res = await fetch("data/product_data.JSON");
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
    productsData = await res.json();
    console.log("✅ 제품 데이터 로드 성공:", productsData);
    displayProducts();
  } catch (error) {
    console.error("❌ 실패:", error);
    const container = document.getElementById("products-container");
    if (container) {
      container.innerHTML = `
        <div style="grid-column: 1/-1; text-align: center; padding: 50px;">
          <p style="color: red; font-weight: bold;">제품을 불러오는데 실패했습니다.</p>
          <p style="margin-top: 10px;">에러: ${error.message}</p>
        </div>
      `;
    }
  }
}

// URL에서 카테고리 가져오기
function getCurrentCategory() {
  const params = new URLSearchParams(window.location.search);
  const category = params.get("category") || "ALL";
  console.log("📂 현재 URL 카테고리:", category);
  return category;
}

// 제품 필터링
function filterProducts(category) {
  const productsArray = Object.entries(productsData).map(([id, product]) => ({
    id,
    ...product,
  }));

  console.log("🔍 전체 제품 수:", productsArray.length);

  if (category === "ALL") {
    console.log("✅ ALL 카테고리 - 전체 제품 반환");
    return productsArray;
  }

  const filtered = productsArray.filter((product) => {
    const categories = product.category.split(",");
    return categories.includes(category);
  });

  console.log(`✅ ${category} 카테고리 필터링 결과:`, filtered.length, "개");
  return filtered;
}

// 페이지네이션 변수
const ITEMS_PER_PAGE = 8; // 페이지당 제품 수
let currentPage = 1;
let totalPages = 1;
let allFilteredProducts = [];
let currentSortType = "default"; // 현재 정렬 타입

// sort by 버튼 클릭 이벤트
const sortBtn = document.querySelector(".btn-sort");
const sortTop = document.querySelector(".sort-top");

if (sortBtn && sortTop) {
  console.log("✅ Sort 버튼 발견");

  sortBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    const isVisible = sortTop.style.display === "block";
    sortTop.style.display = isVisible ? "none" : "block";
    console.log("🔽 Sort 메뉴 토글:", !isVisible);
  });

  // 정렬 옵션 클릭
  const sortLinks = sortTop.querySelectorAll("li a");
  console.log("📋 정렬 옵션 개수:", sortLinks.length);

  sortLinks.forEach((link, index) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();

      const sortText = e.target.textContent.trim();
      console.log("🎯 클릭한 정렬:", sortText);

      // 정렬 타입 설정
      if (sortText === "신상품") {
        currentSortType = "new";
      } else if (sortText === "상품명") {
        currentSortType = "name";
      } else if (sortText === "낮은가격") {
        currentSortType = "price-low";
      } else if (sortText === "높은가격") {
        currentSortType = "price-high";
      } else if (sortText === "인기상품") {
        currentSortType = "popular";
      } else {
        currentSortType = "default";
      }

      console.log("📊 정렬 타입 변경:", currentSortType);

      // 정렬 메뉴 닫기
      sortTop.style.display = "none";

      // 1페이지로 리셋하고 다시 표시
      currentPage = 1;
      displayProducts();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  });

  // 정렬 메뉴 외부 클릭 시 닫기
  document.addEventListener("click", (e) => {
    if (!sortBtn.contains(e.target) && !sortTop.contains(e.target)) {
      if (sortTop.style.display === "block") {
        sortTop.style.display = "none";
        console.log("🔼 Sort 메뉴 닫힘");
      }
    }
  });
} else {
  console.error("❌ Sort 버튼 또는 메뉴를 찾을 수 없습니다");
}

// 제품 정렬 함수
function sortProducts(products) {
  const sorted = [...products];

  console.log(
    "🔄 정렬 시작 - 타입:",
    currentSortType,
    "제품 수:",
    sorted.length,
  );

  switch (currentSortType) {
    case "new":
      // NEW 카테고리가 있는 제품 우선
      const newSorted = sorted.sort((a, b) => {
        const aHasNew = a.category.includes("NEW");
        const bHasNew = b.category.includes("NEW");
        if (aHasNew && !bHasNew) return -1;
        if (!aHasNew && bHasNew) return 1;
        return 0;
      });
      console.log("✅ 신상품 정렬 완료");
      return newSorted;

    case "name":
      // 상품명 가나다순
      const nameSorted = sorted.sort((a, b) =>
        a.name.localeCompare(b.name, "ko"),
      );
      console.log("✅ 상품명 정렬 완료:", nameSorted[0]?.name);
      return nameSorted;

    case "price-low":
      // 가격 낮은순
      const lowSorted = sorted.sort((a, b) => a.price - b.price);
      console.log("✅ 낮은가격 정렬 완료:", lowSorted[0]?.price);
      return lowSorted;

    case "price-high":
      // 가격 높은순
      const highSorted = sorted.sort((a, b) => b.price - a.price);
      console.log("✅ 높은가격 정렬 완료:", highSorted[0]?.price);
      return highSorted;

    case "popular":
      // 인기상품 (가격이 높은 순으로 임시 구현)
      const popularSorted = sorted.sort((a, b) => b.price - a.price);
      console.log("✅ 인기상품 정렬 완료");
      return popularSorted;

    default:
      // 기본 정렬 (등록순)
      console.log("✅ 기본 정렬 유지");
      return sorted;
  }
}

// 현재 페이지 가져오기
function getCurrentPage() {
  const params = new URLSearchParams(window.location.search);
  return parseInt(params.get("page")) || 1;
}

// URL 업데이트 (페이지 변경)
function updateURL(category, page) {
  const url = new URL(window.location);
  url.searchParams.set("category", category);
  url.searchParams.set("page", page);
  window.history.pushState({}, "", url);
}

// 페이지네이션 생성
function createPagination() {
  const paginateDiv = document.querySelector(".paginate");
  if (!paginateDiv) return;

  const currentCategory = getCurrentCategory();

  // 페이지네이션 HTML 생성
  let paginationHTML = "";

  // PREV 버튼
  if (currentPage > 1) {
    paginationHTML += `<a href="#" class="page-prev" data-page="${
      currentPage - 1
    }">prev</a>`;
  } else {
    paginationHTML += `<a href="#" class="page-prev disabled" style="opacity: 0.3; pointer-events: none;">prev</a>`;
  }

  // 페이지 번호
  paginationHTML += '<ol class="page-list">';
  for (let i = 1; i <= totalPages; i++) {
    if (i === currentPage) {
      paginationHTML += `<li><a href="#" class="active" style="font-weight: bold; text-decoration: underline;">${i}</a></li>`;
    } else {
      paginationHTML += `<li><a href="#" class="page-num" data-page="${i}">${i}</a></li>`;
    }
  }
  paginationHTML += "</ol>";

  // NEXT 버튼
  if (currentPage < totalPages) {
    paginationHTML += `<a href="#" class="page-next" data-page="${
      currentPage + 1
    }">next</a>`;
  } else {
    paginationHTML += `<a href="#" class="page-next disabled" style="opacity: 0.3; pointer-events: none;">next</a>`;
  }

  paginateDiv.innerHTML = paginationHTML;

  // 페이지 클릭 이벤트
  paginateDiv
    .querySelectorAll(".page-num, .page-prev, .page-next")
    .forEach((link) => {
      link.addEventListener("click", (e) => {
        e.preventDefault();
        const page = parseInt(e.target.dataset.page);
        if (page && page !== currentPage) {
          currentPage = page;
          updateURL(currentCategory, currentPage);
          displayProducts();
          window.scrollTo({ top: 0, behavior: "smooth" });
        }
      });
    });

  console.log("✅ 페이지네이션 생성:", currentPage, "/", totalPages);
}

// 이미지 슬라이더 초기화
function initImageSlider() {
  if (getCurrentCategory() === "ALL") return; // ALL이면 슬라이더 비활성화

  const productImages = document.querySelectorAll(".product-image");

  productImages.forEach((imageContainer) => {
    const images = imageContainer.querySelectorAll(".slider-image");
    const dots = imageContainer.querySelectorAll(".dot");

    if (images.length <= 1) return; // 이미지가 1개면 스킵

    let currentIndex = 0;
    let startX = 0;
    let isDragging = false;
    let startTime = 0;

    // 이미지 변경 함수
    function changeImage(index) {
      images.forEach((img) => img.classList.remove("active"));
      dots.forEach((dot) => dot.classList.remove("active"));

      images[index].classList.add("active");
      dots[index].classList.add("active");
      currentIndex = index;
    }

    // 터치/마우스 시작
    const handleStart = (e) => {
      isDragging = true;
      startX = e.type.includes("mouse") ? e.clientX : e.touches[0].clientX;
      startTime = Date.now();
      imageContainer.style.cursor = "grabbing";
      e.preventDefault(); // 링크 이동 방지
    };

    // 터치/마우스 이동
    const handleMove = (e) => {
      if (!isDragging) return;
      e.preventDefault();
    };

    // 터치/마우스 종료
    const handleEnd = (e) => {
      if (!isDragging) return;

      const endX = e.type.includes("mouse")
        ? e.clientX
        : e.changedTouches[0].clientX;
      const diffX = startX - endX;
      const diffTime = Date.now() - startTime;

      imageContainer.style.cursor = "grab";

      // 빠른 스와이프 또는 50px 이상 드래그
      if (Math.abs(diffX) > 50 || (Math.abs(diffX) > 20 && diffTime < 300)) {
        if (diffX > 0 && currentIndex < images.length - 1) {
          // 왼쪽으로 스와이프 (다음 이미지)
          changeImage(currentIndex + 1);
        } else if (diffX < 0 && currentIndex > 0) {
          // 오른쪽으로 스와이프 (이전 이미지)
          changeImage(currentIndex - 1);
        }

        // 클릭으로 인식되지 않도록 링크 비활성화
        const link = imageContainer.closest("a");
        if (link) {
          e.preventDefault();
          e.stopPropagation();
        }
      }

      isDragging = false;
    };

    // 링크 클릭 방지 (드래그 중일 때)
    imageContainer.closest("a").addEventListener("click", (e) => {
      if (Math.abs(startX - (e.clientX || 0)) > 10) {
        e.preventDefault();
      }
    });

    // 마우스 이벤트
    imageContainer.addEventListener("mousedown", handleStart);
    imageContainer.addEventListener("mousemove", handleMove);
    imageContainer.addEventListener("mouseup", handleEnd);
    imageContainer.addEventListener("mouseleave", handleEnd);

    // 터치 이벤트
    imageContainer.addEventListener("touchstart", handleStart, {
      passive: false,
    });
    imageContainer.addEventListener("touchmove", handleMove, {
      passive: false,
    });
    imageContainer.addEventListener("touchend", handleEnd);

    // 초기 커서 스타일
    imageContainer.style.cursor = "grab";
  });

  console.log("✅ 이미지 슬라이더 초기화 완료");
}

// 제품 표시
function displayProducts() {
  const container = document.getElementById("products-container");
  const categoryTitle = document.querySelector(".product h2");
  const breadcrumbCategory = document.querySelector(
    ".breadcrumb-path ol li:last-child",
  );

  if (!container) {
    console.error("❌ products-container를 찾을 수 없습니다.");
    return;
  }

  const currentCategory = getCurrentCategory();
  currentPage = getCurrentPage();

  // 필터링 후 정렬 적용
  let filteredProducts = filterProducts(currentCategory);
  allFilteredProducts = sortProducts(filteredProducts);

  // 카테고리 제목 업데이트
  if (categoryTitle) {
    categoryTitle.textContent = currentCategory;
    console.log("✅ h2 제목 변경:", currentCategory);
  }
  if (breadcrumbCategory) {
    breadcrumbCategory.textContent = currentCategory;
    console.log("✅ breadcrumb 변경:", currentCategory);
  }

  // 제품이 없는 경우
  if (allFilteredProducts.length === 0) {
    container.innerHTML =
      '<p style="text-align: center; padding: 50px; grid-column: 1/-1;">해당 카테고리에 제품이 없습니다.</p>';
    console.log("⚠️ 표시할 제품이 없습니다.");
    document.querySelector(".paginate").innerHTML = "";
    return;
  }

  // 총 페이지 수 계산
  totalPages = Math.ceil(allFilteredProducts.length / ITEMS_PER_PAGE);

  // 현재 페이지가 범위를 벗어나면 1페이지로
  if (currentPage > totalPages) {
    currentPage = 1;
    updateURL(currentCategory, currentPage);
  }

  // 현재 페이지의 제품만 추출
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentProducts = allFilteredProducts.slice(startIndex, endIndex);

  // 제품 카드 생성 (스와이퍼 기능 포함)
  const isAll = getCurrentCategory() === "ALL";

  container.innerHTML = currentProducts
    .map(
      (product) => `
    <div class="product-card">
      <a href="#"> 
        <div class="product-image" data-product-id="${product.id}">
          <div class="image-slider">
            ${
              isAll
                ? `<img src="${product.images[0]}" alt="${product.name}" class="slider-image active" onerror="this.src='./image/no-image.jpg'">`
                : product.images
                    .map(
                      (img, idx) => `
                <img src="${img}" alt="${product.name}" 
                     class="slider-image ${idx === 0 ? "active" : ""}" 
                     onerror="this.src='./image/no-image.jpg'">
              `,
                    )
                    .join("")
            }
          </div>
          ${
            !isAll && product.images.length > 1
              ? `<div class="slider-dots">
                ${product.images
                  .map(
                    (_, idx) => `
                  <span class="dot ${idx === 0 ? "active" : ""}"></span>
                `,
                  )
                  .join("")}
              </div>`
              : ""
          }
        </div>
        <div class="product-info">
          <h3 class="product-name">${product.name}</h3>
          <p class="product-price">${product.price.toLocaleString()}</p>
        </div>
      </a>
    </div>
  `,
    )
    .join("");

  console.log(
    `✅ 페이지 ${currentPage}/${totalPages} - ${currentProducts.length}개 제품 표시 (정렬: ${currentSortType})`,
  );

  // 페이지네이션 생성
  createPagination();

  // 스와이퍼 기능 초기화
  initImageSlider();
}

// 페이지 로드 시 제품 표시
window.addEventListener("DOMContentLoaded", () => {
  console.log("페이지 로드 완료 - 제품 데이터 로드 시작");
  loadProducts();
});
