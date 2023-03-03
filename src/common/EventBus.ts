const eventBus = {
  on(event: string, callback: Function) {
    document.addEventListener(event, (e) => callback((e as CustomEvent).detail));
  },
  dispatch(event: string, data?: unknown) {
    document.dispatchEvent(new CustomEvent(event, { detail: data }));
  },
  remove(event: string, callback: EventListenerOrEventListenerObject) {
    document.removeEventListener(event, callback);
  },
};

export default eventBus;
