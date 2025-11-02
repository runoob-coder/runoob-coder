<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/parallax'
import {Autoplay, EffectFade, Mousewheel} from 'swiper/modules';

const swiperList = [
  /*{
    bg: '//www.bt.cn/static/new/images/i2pic1-waf1.png',
    title: '堡塔云WAF',
  },*/
  {
    bg: '//www.bt.cn/static/new/images/i2pic1_03.png',
    title: '快速创建管理web项目',
  },
  {
    bg: '//www.bt.cn/static/new/images/i2pic2_03.png',
    title: '快速预览服务器资源使用情况',
  },
  {
    bg: '//www.bt.cn/static/new/images/i2pic3_03.png',
    title: '熟悉的文件管理系统',
  },
  {
    bg: '//www.bt.cn/static/new/images/i2pic4_03.png',
    title: '一键安装软件及部署源码',
  },
];

</script>

<template>

  <swiper
      :modules="[Autoplay,EffectFade,Mousewheel]"
      class="baota-swiper"
      :loop="true"
      :autoplay="true"
      :effect="'fade'"
      :fade-effect="{crossFade:true}"
      :mousewheel="true"
  >
    <swiper-slide class="baota-swiper-item" v-for="item in swiperList">
      <a class="baota-swiper-a" href="https://www.bt.cn/u/1lohGU" target="_blank">
        <img class="bg" :src="item.bg" :alt="item.title"/>
      </a>
    </swiper-slide>
  </swiper>

</template>

<style scoped>

.baota-swiper {
  width: 100%;
}

.baota-swiper .baota-swiper-item .bg {
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

</style>
