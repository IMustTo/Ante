export const showLoading = () => {

};

export const transitionEnd = (el, fun) => {
  const arr = ['msTransitionEnd', 'mozTransitionEnd', 'oTransitionEnd', 'webkitTransitionEnd', 'transitionend'];
  const handler = {
    handleEvent() {
      arr.forEach((eventName) => {
        el.removeEventListener(eventName, handler, false);
      });
      fun.apply(el, arguments); // eslint-disable-line
    },
  };
  arr.forEach((eventName) => {
    el.addEventListener(eventName, handler, false);
  });
};
