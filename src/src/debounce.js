export default (func, wait = 1000, immediate = true) => {
  let timeout;
  return () => {
    let context = this;
    let args = arguments;
    let later = () => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args)
      }
    }
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if(immediate && ! timeout) {
      func.apply(context.args);
    }
  }
}