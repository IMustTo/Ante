<template>

  <div class="container" id="container">
    <transition :name="transitionName">
      <router-view></router-view>
    </transition>
  </div>

</template>

<script>

export default {
  name: 'app',

  data() {
    return {
      transitionName: '',
    };
  },

  watch: {
    $route(to, from) {
      const toDepth = to.path.split('/').length;
      const fromDepth = from.path.split('/').length;
      this.transitionName = toDepth < fromDepth ? 'slideIn' : 'slideOut';
    },
  },
};
</script>

<style>
@import "./assets/css/weui.css";

@-webkit-keyframes a {
  0% {
    -webkit-transform: translate3d(100%,0,0);
            transform: translate3d(100%,0,0);

    opacity: 0;
  }
  to {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);

    opacity: 1;
  }
}
@keyframes a {
  0% {
    -webkit-transform: translate3d(100%,0,0);
            transform: translate3d(100%,0,0);

    opacity: 0;
  }
  to {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);

    opacity: 1;
  }
}
@-webkit-keyframes b {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);

    opacity: 1;
  }
  to {
    -webkit-transform: translate3d(100%,0,0);
            transform: translate3d(100%,0,0);

    opacity: 0;
  }
}
@keyframes b {
  0% {
    -webkit-transform: translateZ(0);
            transform: translateZ(0);

    opacity: 1;
  }
  to {
    -webkit-transform: translate3d(100%,0,0);
            transform: translate3d(100%,0,0);

    opacity: 0;
  }
}
.slideIn {
  -webkit-animation: a .2s forwards;
          animation: a .2s forwards;
}
.slideOut {
  -webkit-animation: b .2s forwards;
          animation: b .2s forwards;
}

</style>
