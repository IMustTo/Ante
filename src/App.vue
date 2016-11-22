<template>

  <div class="container" id="container">
    <keep-alive>
      <router-view></router-view>
    </keep-alive>
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
};
</script>

<style>
@import "./assets/css/weui.css";

body,
html {
  height: 100%;

  -webkit-tap-highlight-color: transparent;
}
body {
  font-family: -apple-system-font,Helvetica Neue,Helvetica,sans-serif;
}
ul {
  list-style: none;
}
.page,
body {
  background-color: #f8f8f8;
}
.link {
  color: #1aad19;
}
.container {
  overflow: hidden;
}
.container,
.page {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.page {
  z-index: 1;

  overflow-y: auto;

  -webkit-overflow-scrolling: touch;
}

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
