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

/******************************* 로그인 자바스크립트 *******************************/
// DOMContentLoaded 이벤트로 감싸기
document.addEventListener("DOMContentLoaded", function () {
  // 로그인 버튼 클릭 이벤트
  document
    .querySelector(".login-input .login-btn button")
    .addEventListener("click", function (e) {
      e.preventDefault();

      const userId = document.getElementById("user-id").value;
      const userPw = document.getElementById("user-pw").value;
      const idError = document.getElementById("id-error");
      const pwError = document.getElementById("pw-error");

      // 에러 메시지 초기화
      idError.textContent = "";
      idError.style.display = "none";
      pwError.textContent = "";
      pwError.style.display = "none";

      // 아이디 검사
      if (userId === "") {
        idError.textContent = "아이디 항목은 필수 입력값입니다.";
        idError.style.display = "block";
        idError.style.color = "red";
        return;
      }

      // 비밀번호 검사
      if (userPw === "") {
        pwError.textContent = "패스워드 항목은 필수 입력값입니다.";
        pwError.style.display = "block";
        pwError.style.color = "red";
        return;
      }

      // 로그인 처리 (실제로는 서버와 통신) -> 현재 없으니 일치하지 않음으로 처리
      console.log("로그인 시도:", userId, userPw);
      alert("아이디 또는 비밀번호가 일치하지 않습니다.");
    });

  // 비회원 주문조회 버튼 클릭 이벤트
  document
    .querySelector(".guest-order-input .login-btn button")
    .addEventListener("click", function (e) {
      e.preventDefault();

      const orderName = document.getElementById("order-name").value;
      const orderNumber = document.getElementById("order-number").value;
      const orderPw = document.getElementById("order-pw").value;

      const nameError = document.getElementById("order-name-error");
      const numberError = document.getElementById("order-number-error");
      const pwError = document.getElementById("order-pw-error");

      // 에러 메시지 초기화
      nameError.textContent = "";
      nameError.style.display = "none";
      numberError.textContent = "";
      numberError.style.display = "none";
      pwError.textContent = "";
      pwError.style.display = "none";

      // 주문자명 검사
      if (orderName === "") {
        nameError.textContent = "주문자명 항목은 필수 입력값입니다.";
        nameError.style.display = "block";
        nameError.style.color = "red";
        return;
      }

      // 주문번호 검사
      if (orderNumber === "") {
        numberError.textContent =
          '올바른 주문번호가 아닙니다.(주문번호는 하이픈(" - ")을 포함해서 입력해주세요.)';
        numberError.style.display = "block";
        numberError.style.color = "red";
        return;
      }

      // 비밀번호 검사
      if (orderPw === "") {
        pwError.textContent = "비회원주문 비밀번호 항목은 필수 입력값입니다.";
        pwError.style.display = "block";
        pwError.style.color = "red";
        return;
      }

      // 주문조회 처리
      console.log("주문조회:", orderName, orderNumber, orderPw);
      alert("주문조회가 완료되었습니다.");
    });

  // 회원가입 버튼
  document
    .querySelector(".join-btn button")
    .addEventListener("click", function () {
      // 회원가입 페이지로 이동
      window.location.href = "/signup.html";
    });

  // 카카오 로그인
  document
    .querySelector(".sns-login a:first-child")
    .addEventListener("click", function (e) {
      e.preventDefault();
      console.log("카카오 로그인");
      alert("카카오 로그인 기능은 준비 중입니다.");
    });

  // 네이버 로그인
  document
    .querySelector(".sns-login a:last-child")
    .addEventListener("click", function (e) {
      e.preventDefault();
      console.log("네이버 로그인");
      alert("네이버 로그인 기능은 준비 중입니다.");
    });

  // Enter 키로 로그인
  document.getElementById("user-pw").addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      document.querySelector(".login-input .login-btn button").click();
    }
  });

  // 비회원 주문조회 Enter 키
  document
    .getElementById("order-pw")
    .addEventListener("keypress", function (e) {
      if (e.key === "Enter") {
        document.querySelector(".guest-order-input .login-btn button").click();
      }
    });

  // 입력 시 에러 메시지 제거
  document.getElementById("user-id").addEventListener("input", function () {
    document.getElementById("id-error").style.display = "none";
  });

  document.getElementById("user-pw").addEventListener("input", function () {
    document.getElementById("pw-error").style.display = "none";
  });

  document.getElementById("order-name").addEventListener("input", function () {
    document.getElementById("order-name-error").style.display = "none";
  });

  document
    .getElementById("order-number")
    .addEventListener("input", function () {
      document.getElementById("order-number-error").style.display = "none";
    });

  document.getElementById("order-pw").addEventListener("input", function () {
    document.getElementById("order-pw-error").style.display = "none";
  });
});
