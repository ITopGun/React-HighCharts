export default function (fn) {
  const cancelAnimationFrame = window.cancelAnimationFrame;
  const requestAnimationFrame = window.requestAnimationFrame;

  var queued;
  return function (...args) {
    if (queued) cancelAnimationFrame(queued);

    queued = requestAnimationFrame(fn.bind(fn, ...args));
  };
}
