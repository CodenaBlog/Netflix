$(function(){


  /**
   * 헤더 애니메이션
   */
  var lastScrollTop = 0;
  $(window).scroll(function(){
    curr = $(this).scrollTop();
    if(curr > 0){
      $('.header').addClass('on');
    }else{
      $('.header').removeClass('on');
    }
    lastScrollTop = curr;
  })


  /**
   * 모바일 -> 메뉴 리스트 보기
   */
  $('.nev-mo .btn-menu').mouseover(function(e){
    e.preventDefault();
    $('.sub-list').addClass('on');
  });
  $('.nev-mo .btn-menu').mouseout(function(e){
    e.preventDefault();
    $('.sub-list').removeClass('on');
  });

  $('.nev-mo .btn-menu .sub-item').click(function(e){
    e.preventDefault();
    $(this).siblings('.sub-list').toggleClass('on');
  });


  // function play() {
    // var video = document.getElementById("recomboard-video");
    // video.play();

    $('#recomboard-video').get(0).play()
  // }

/**
 * sort 1 = 새로올라온콘텐츠
 * sort 2 = 인기콘텐츠
 * sort 3 = 지금콘텐츠
 * sort 4 = 대한민국 top10
 * 
 */
list(1,"#list1")
list(2,"#list2")
list(3,"#list3")
list(4,"#list4")

  function list(sortNum,frame){

    fetch('./assets/data/videoData.json')
    .then((response)=>response.json())
    .then((json)=>{
      allData=json.items;
  
      result = allData.filter(function(parm){
        return parm.sort.indexOf(sortNum)>=0;
      })
  
  
      let html='';
      let rank = 1;

      result.forEach(element => {

        if(element.sort.indexOf(4) >= 0){
          rankEl = `<div class="ic-rank"> 
                      <img src="./assets/images/rank${rank}.svg" alt> 
                    </div>`
          imgEl = element.thumb2;
        }
        else{
          rankEl = '';
          imgEl = element.thumb;
        }

        html+=`<div class="swiper-slide" data-id="${element.id}">
                <div class="thum-box">
                  ${rankEl}
                  <img src="${imgEl}" alt>
                </div>
              </div>`;

        rank++;
      }); //end
      $(frame).html(html);
    })
  }

  $(document).on('mouseover','.swiper-slide',function(e){
      w=($('.preview-wrap').width() - $(this).width()) /2 //200
      h=($('.preview-wrap').height() - $(this).height()) /2 //200
      y= $('.preview-wrap').height()*40/100;

      y=$(this).offset().top - (y/2);
      x=$(this).offset().left-w;
      setTimeout(() => {
  
        $('.preview-wrap').css({left:x,top:y})
        .addClass('show');

      }, 500);


      idx=$(this).data('id');
      
      fetch('./assets/data/videoData.json')
      .then((response)=>response.json())
      .then((json)=>{
        allData = json.items;
        result = json.items.filter(function(parm){
          return parm.id === idx;
        })

        cateEl = ''
        result[0].cate.forEach(element => {
          cateEl += `<span class="tag">${element}</span>`;
        });


        spaceSoundEl = (result[0].spaceSound)?'<span>공간음향</span>':'';

        html = `
        <div class="col-top">
        <img src="${result[0].thumb}" alt="">
      </div>
      
      <div class="col-bottom">
        <div class="control-box">
          <button class="btn play" aria-label="재생">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
              <path d="M4 2.69127C4 1.93067 4.81547 1.44851 5.48192 1.81506L22.4069 11.1238C23.0977 11.5037 23.0977 12.4963 22.4069 12.8762L5.48192 22.1849C4.81546 22.5515 4 22.0693 4 21.3087V2.69127Z" fill="currentColor"></path>
            </svg>
          </button>
          <button class="btn plus" aria-label="내가찜한 콘텐츠에 추가">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M11 2V11H2V13H11V22H13V13H22V11H13V2H11Z" fill="#fff"></path>
            </svg>
          </button>
          <button class="btn like" aria-label="좋아요">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M10.696 8.7732C10.8947 8.45534 11 8.08804 11 7.7132V4H11.8377C12.7152 4 13.4285 4.55292 13.6073 5.31126C13.8233 6.22758 14 7.22716 14 8C14 8.58478 13.8976 9.1919 13.7536 9.75039L13.4315 11H14.7219H17.5C18.3284 11 19 11.6716 19 12.5C19 12.5929 18.9917 12.6831 18.976 12.7699L18.8955 13.2149L19.1764 13.5692C19.3794 13.8252 19.5 14.1471 19.5 14.5C19.5 14.8529 19.3794 15.1748 19.1764 15.4308L18.8955 15.7851L18.976 16.2301C18.9917 16.317 19 16.4071 19 16.5C19 16.9901 18.766 17.4253 18.3994 17.7006L18 18.0006L18 18.5001C17.9999 19.3285 17.3284 20 16.5 20H14H13H12.6228C11.6554 20 10.6944 19.844 9.77673 19.5382L8.28366 19.0405C7.22457 18.6874 6.11617 18.5051 5 18.5001V13.7543L7.03558 13.1727C7.74927 12.9688 8.36203 12.5076 8.75542 11.8781L10.696 8.7732ZM10.5 2C9.67157 2 9 2.67157 9 3.5V7.7132L7.05942 10.8181C6.92829 11.0279 6.72404 11.1817 6.48614 11.2497L4.45056 11.8313C3.59195 12.0766 3 12.8613 3 13.7543V18.5468C3 19.6255 3.87447 20.5 4.95319 20.5C5.87021 20.5 6.78124 20.6478 7.65121 20.9378L9.14427 21.4355C10.2659 21.8094 11.4405 22 12.6228 22H13H14H16.5C18.2692 22 19.7319 20.6873 19.967 18.9827C20.6039 18.3496 21 17.4709 21 16.5C21 16.4369 20.9983 16.3742 20.995 16.3118C21.3153 15.783 21.5 15.1622 21.5 14.5C21.5 13.8378 21.3153 13.217 20.995 12.6883C20.9983 12.6258 21 12.5631 21 12.5C21 10.567 19.433 9 17.5 9H15.9338C15.9752 8.6755 16 8.33974 16 8C16 6.98865 15.7788 5.80611 15.5539 4.85235C15.1401 3.09702 13.5428 2 11.8377 2H10.5Z" fill="#fff"></path>
            </svg>
          </button>
          <button class="btn info" aria-label="상세 정보">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class="Hawkins-Icon Hawkins-Icon-Standard">
              <path fill-rule="evenodd" clip-rule="evenodd" d="M19.293 7.29297L12.0001 14.5859L4.70718 7.29297L3.29297 8.70718L11.293 16.7072C11.4805 16.8947 11.7349 17.0001 12.0001 17.0001C12.2653 17.0001 12.5196 16.8947 12.7072 16.7072L20.7072 8.70718L19.293 7.29297Z" fill="#fff"></path>
            </svg>
          </button>
        </div>

        <div class="text-box">
          <div class="info">
            <div class="ic-age">
              <svg id="age" viewBox="0 0 100 100" class="svg-icon svg-icon-maturity-rating-976 ">
                <path id="Fill---Yellow" fill="#DFB039" d="M88.724 100h-77.45C5.049 100 0 94.954 0 88.728V11.274C0 5.048 5.048 0 11.275 0h77.449C94.949 0 100 5.048 100 11.274v77.454C100 94.954 94.95 100 88.724 100"></path>
                <path id="12" fill="#000" d="M36.92 15.484v68.647H21.553V34.62h-5.48l7.097-19.136h13.75zm44.288 0c.848 0 1.535.687 1.535 1.533v18.144c0 1.018-.044 1.885-.133 2.605a8.067 8.067 0 01-.493 1.975 14.48 14.48 0 01-.9 1.843c-.362.631-.84 1.363-1.44 2.204L60.643 70.653h21.923v13.394H41.59v-10.07l26.152-37.29V28.42H57.136v9.345H42.127V17.017c0-.846.687-1.533 1.534-1.533z"></path>
              </svg>                      </div>
            <span class="running-time">1시간 53분</span>
            <span class="feature-badge">HD</span>
          </div>
          ${spaceSoundEl}
          <div class="tag-box">
            ${cateEl}
          </div>
        </div>
      </div>`
        
        $('#load').html(html);
      })


  })




  $(document).on('mouseout','.preview-wrap',function(e){
    $('.preview-wrap').removeClass('show');
  })



  $(window).resize(function(){
    $('.preview-wrap').removeClass('show');
  })








  // $('.a1 .swiper-slide').hover(function(){
    
  // })


        //   <div class="swiper-slide">
            //   <div class="thum-box">
            //     <div class="ic-rank">
            //       <img src="./assets/images/rank1.svg" alt="">
            //     </div>
            //     <img src="./assets/images/rank-thum.jpg" alt="">
            //   </div>
            // </div>













  /**
   * 스와리퍼
   */
  var themeSlide = new Swiper(".theme-slide", {
    slidesPerView: 3,
    spaceBetween: 5,
    slidesPerGroup: 3,
    loop: true,

    pagination: {
      el: ".pagination",
    },
    navigation: {
      nextEl: ".btn.next",
      prevEl: ".btn.prev",
    },
    breakpoints: { //반응형 조건 속성
      800: {
        slidesPerView: 4,
        slidesPerGroup: 4,

      },
      1100: {
        slidesPerView: 5,
        slidesPerGroup: 5,

      },
      1400: {
        slidesPerView: 6,
        slidesPerGroup: 6,

      },
    }
  });


  /**
   * 모바일 -> 메뉴 리스트 보기
   */
  $('.theme-slide').mouseover(function(e){
    e.preventDefault();
    $(this).find('.pagination').addClass('on');
    $(this).find('.headline-area').addClass('on');
  });
  $('.theme-slide').mouseout(function(e){
    e.preventDefault();
    $(this).find('.pagination').removeClass('on');
    $(this).find('.headline-area').removeClass('on');

  });

});