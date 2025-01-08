document.addEventListener("DOMContentLoaded", function () {
  //mainmenu
  const menuLeft = document.querySelectorAll(`.mainmenu .menu_l li`);
  const submenu = document.querySelector(`.submenu_box`);
  for (const menu of menuLeft) {
    menu.addEventListener(`mouseenter`, function () {
      submenu.classList.add(`on`);
    });
  }

  submenu.addEventListener(`mouseleave`, function () {
    submenu.classList.remove(`on`);
  });

  //hamburerBtn
  const hamburgurBtn = document.querySelector(`.hamburger`);
  hamburgurBtn.addEventListener(`click`, function () {
    this.classList.toggle(`active`);

    const submenuMobile = document.querySelector(`.submenu_m`);
    const menuHas = hamburgurBtn.classList.contains(`active`);
    //menuBtn 에 active 문자열이 있는지 판단

    if (menuHas === true) {
      submenuMobile.classList.add(`on`);
    } else { 
      submenuMobile.classList.remove(`on`);
    };

  });

  const shopListMobile = document.querySelector(`.shop_list_m`);
  const shopMobile = document.querySelector(`.shop_m`);
  shopMobile.addEventListener(`click`, function () {
    shopListMobile.classList.toggle(`on`);
  });

  const menuListMobile = document.querySelector(`.menu_list_m`);
  const archiveMobile = document.querySelector(`.archive_m`);
  archiveMobile.addEventListener(`click`, function (e) {
    menuListMobile.classList.toggle(`on`);
  });


  //submenu -> shop, archive 호버하면 펼쳐지게
  const shop = document.querySelector(`.shop`);
  const shopList = document.querySelector(`.shop_list`);

  shop.addEventListener(`mouseenter`, function () {
    shopList.classList.add(`on`);
    archiveList.classList.remove(`on`);
  });
  shopList.addEventListener(`mouseleave`, function () {
    shopList.classList.remove(`on`);
  });

  const archive = document.querySelector(`.archive`);
  const archiveList = document.querySelector(`.menu_list`);

  archive.addEventListener(`mouseenter`, function () {
    archiveList.classList.add(`on`);
  });
  archiveList.addEventListener(`mouseleave`, function () {
    archiveList.classList.remove(`on`);
  });

  //login_box
  const loginLi = document.querySelectorAll(`.mainmenu .menu_r li`);
  const loginBox = document.querySelector(`.login_box`);
  for (const menuR of loginLi) {
    menuR.addEventListener(`click`, function () {
      loginBox.classList.add(`on`);
    });
  }

  const closeIcon = document.querySelector(`.close`);
  closeIcon.addEventListener(`click`, function () {
    loginBox.classList.remove(`on`);
  });

  //swiper
  var swiper = new Swiper(".mySwiper", {
    breakpoints: {
      1340: {
        slidesPerView: 3,
        slidesPerGroup: 3,
        spaceBetween: 10,
      },
      780: {
        slidesPerView: 2,
        slidesPerGroup: 2,
        spaceBetween: 10,
      },
      375:{
        slidesPerView: 1,
        slidesPerGroup: 1,
        spaceBetween: 0,
      },
  
    },

    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  //data-image
  const hoverImg = document.querySelector(`.project .hover_img`);
  const listItems = document.querySelectorAll(`.project ul li`);

  //defaultImageUrl
  const defaultImageUrl = listItems[0].getAttribute("data-image");
  hoverImg.style.backgroundImage = `url(${defaultImageUrl})`;
  
  for (const item of listItems) {
    item.addEventListener("mouseenter", function () {
      const imageUrl = this.getAttribute("data-image");
      hoverImg.style.backgroundImage = `url(${imageUrl})`;
    });
    item.addEventListener(`mouseleave`, function () { 
      hoverImg.style.backgroundImage = `url(${defaultImageUrl})`;
    });

  }

    
  //aos
  AOS.init({
    easing: "ease-in-out",
  });

  //sec2_hoverEvent
  const eventWraps = document.querySelectorAll(".event_wrap");
  // hover 이벤트 제거 함수
  const removeHoverListeners = () => {
    for (const eventWrap of eventWraps) {
      const collections = eventWrap.querySelectorAll(".collection");
      for (const collection of collections) {
        collection.replaceWith(collection.cloneNode(true)); // 기존 이벤트 제거
        // collection.replaceWith() : 기존의 요소(collection)를 복제본으로 교체
        // collection.cloneNode(true) : 현재 요소(collection)의 복제본을 생성
        // 요소를 복제하고 교체하면 기존 요소에 등록된 모든 이벤트 리스너가 제거됨
      }
    }
  };

  function collectionHover() {
    let windowWidth = window.innerWidth;

    if (windowWidth >= 780) {
      for (const eventWrap of eventWraps) {
        const collections = eventWrap.querySelectorAll(".collection");

        for (const collection of collections) {
          collection.addEventListener("mouseenter", function () {
            for (const otherCollection of collections) {
              if (otherCollection !== this) {
                otherCollection.classList.add("active");
              } else {
                this.classList.add("on");
              }
            }
          });

          collection.addEventListener("mouseleave", function () {
            for (const otherCollection of collections) {
              if (otherCollection !== this) {
                otherCollection.classList.remove("active");
              } else {
                this.classList.remove("on");
              }
            }
          });
        }
      }
    }
  }

  collectionHover();

  // 윈도우 리사이즈 할 때 새로 초기화
  window.addEventListener("resize", function () {
    // 너비 다시 재할당
    windowWidth = window.innerWidth;

    submenu.classList.remove("on");
    hamburgurBtn.classList.remove("active");

    // 기존 hover 리스너 제거 후 다시 등록
    removeHoverListeners();
    collectionHover();
  });

  // -----------------------------------------------------

  // 배너 다음부터 scroll 올리면 top버튼 보여지게
    const topBtn = document.querySelector(`.top_btn`);
    const sectionWrap = document.querySelector(`.section_wrap`);
    const sectionOffsetTop = sectionWrap.offsetTop - 500;
  
  let lastTouchY = 0; // 터치 이벤트에서 이전 Y 좌표 저장
  
  function handleScroll(scrollTop, direction) {
    if (scrollTop > sectionOffsetTop) {
      if (direction === "up") {
        topBtn.classList.add("on");
      } else if (direction === "down") {
        topBtn.classList.remove("on");
      }
    } else {
      topBtn.classList.remove("on");
    }
  }

  // 데스크톱: wheel 이벤트
  window.addEventListener("wheel", (event) => {
    const scrollTop = window.scrollY;
    const direction = event.deltaY < 0 ? "up" : "down"; // 휠 방향
    handleScroll(scrollTop, direction);
  });

  // 모바일: touchmove 이벤트
  window.addEventListener("touchmove", (event) => {
    const scrollTop = window.scrollY;
    const currentTouchY = event.touches[0].clientY; // 현재 터치 Y 좌표

    let direction = "";
    if (currentTouchY < lastTouchY) {
      direction = "down"; // 터치가 아래로 이동
    } else if (currentTouchY > lastTouchY) {
      direction = "up"; // 터치가 위로 이동
    }

    lastTouchY = currentTouchY; // 마지막 터치 위치 업데이트
    handleScroll(scrollTop, direction);
  });

});
