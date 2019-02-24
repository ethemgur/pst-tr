<template>
  <div data-page="swiper-horizontal" class="page kitchen-sink-material">
    <div class="page-content" style="background-color: #f0d2f0">
      <div data-pagination=".swiper-pagination" data-paginationhide="true" class="swiper-container swiper-init ks-demo-slider">
        <div class="swiper-pagination"></div>
        <div class="swiper-wrapper">
          <div class="swiper-slide my-slide" style="background-color: #f0d2f0">
            <p class="my-text">
              {{slide1}}
            </p>
          </div>
          <div class="swiper-slide my-slide" style="background-color: #f0d2f0">
            <p class="my-text">
              {{slide2}}
            </p>
          </div>
          <div class="swiper-slide my-slide" style="background-color: #f0d2f0">
            <p class="my-text">
              {{slide3}}
            </p>
            <a href="/home/" class="floating-button color-purple"><i class="material-icons">navigate_next</i></a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      slide1: 'Sorunlarımı Çözebilirim uygulamasına hoş geldiniz',
      slide2: 'Uygulamada aşama aşama ilerleyeceksiniz',
      slide3: 'Aşamaları tamamladıkça ileriki aşamalara erişebileceksiniz',
    }
  },
}
</script>
<style>
.my-text {
  margin: 10%;
  font-size: 20px;
  text-align: center;
  font-weight: bold;
}
</style>
