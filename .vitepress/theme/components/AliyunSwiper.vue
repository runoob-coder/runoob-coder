<script setup lang="ts">
import {Swiper, SwiperSlide} from 'swiper/vue'
import 'swiper/css'
import 'swiper/css/effect-fade'
import 'swiper/css/parallax'
import {Autoplay, EffectFade, Mousewheel, Parallax} from 'swiper/modules';

// https://www.aliyun.com/minisite/goods?userCode=xnll3b0k

const swiperList = [
  {
    bg: '//img.alicdn.com/imgextra/i1/O1CN01nTXEWK23vh3yqbRp0_!!6000000007318-2-tps-638-244.png',
    title: '通义灵码 智能编码助手',
    subtitle: '面向用户上线个人和企业版产品～',
    link: '//tongyi.aliyun.com/lingma/pricing?userCode=xnll3b0k'
  },
  {
    bg: '//img.alicdn.com/imgextra/i4/O1CN01jUT1461dwRwyZBmZd_!!6000000003800-2-tps-638-244.png',
    title: '云服务器ECS省钱攻略',
    subtitle: '五种权益，限时发放，不容错过！',
    link: '//www.aliyun.com/daily-act/ecs/activity_selection?userCode=xnll3b0k'
  },
  {
    bg: '//img.alicdn.com/imgextra/i2/O1CN01sIdMDi1tdhh9yH0mz_!!6000000005925-2-tps-638-244.png',
    title: '一键打造你的专属AI应用',
    subtitle: '手把手玩转热门AI大模型',
    link: '//dashi.aliyun.com/activity/aigc?userCode=xnll3b0k'
  },
  {
    bg: '//img.alicdn.com/imgextra/i1/O1CN01JOLCyL1MysL7GoLbX_!!6000000001504-2-tps-638-244.png',
    title: '最新活动中心',
    subtitle: '上云必抢你先知，最新活动劲爆优惠不错过！',
    link: '//www.aliyun.com/activity?userCode=xnll3b0k'
  },
  {
    bg: '//img.alicdn.com/imgextra/i1/O1CN01f5qvO71PWQpVjxkzd_!!6000000001848-2-tps-638-244.png',
    title: '畅玩热门游戏',
    subtitle: '幻兽帕鲁、雾锁王国，1分钟超快部属联机服务器！',
    link: '//developer.aliyun.com/special/ecs/huanshou?userCode=xnll3b0k'
  },
];

</script>

<template>

  <swiper
      :modules="[Autoplay,EffectFade,Mousewheel,Parallax]"
      class="aliyun-swiper"
      :loop="true"
      :autoplay="true"
      :effect="'fade'"
      :fade-effect="{crossFade:true}"
      :mousewheel="true"
      :parallax="true"
  >
    <swiper-slide class="aliyun-swiper-item" v-for="item in swiperList">
      <a class="aliyun-swiper-a" :href="item.link" target="_blank" data-swiper-parallax="-23%">
        <div class="text">
          <span class="title" data-swiper-parallax="-100" data-swiper-parallax-scale="1.8"
                data-swiper-parallax-duration="600">
            {{ item.title }}
          </span>
          <span class="subtitle" data-swiper-parallax="-300" data-swiper-parallax-x="200">{{ item.subtitle }}</span>
        </div>
        <img class="bg" :src="item.bg" alt=""/>
      </a>
    </swiper-slide>
  </swiper>

</template>

<style scoped>

/*@media (min-width: 1280px) {
  .VPDoc .aside[data-v-aec31f69] {
    display: block;
  }
}*/

.aliyun-swiper {
  width: 100%;
  border-radius: 8px;
  margin: 10px 0;
}

.aliyun-swiper .aliyun-swiper-item .text {
  width: 100%;
  height: 100%;
  display: inline-block;
  padding: 10px 20px;
  position: absolute;
  left: 0;
  top: 0;
  background-color: rgba(0, 0, 0, .08);
}

.aliyun-swiper .aliyun-swiper-item .bg {
  z-index: -1;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.aliyun-swiper .aliyun-swiper-item .text span {
  text-align: left;
  color: #fff;
  display: block;
  width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
  text-shadow: .5px .5px 1.8px #222;
}

.aliyun-swiper .aliyun-swiper-item .title {
  font-size: 16px;
  font-weight: 600;
}

.aliyun-swiper .aliyun-swiper-item .subtitle {
  line-height: 20px;
  font-size: 14px;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

</style>
