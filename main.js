document.addEventListener('DOMContentLoaded', function () {
    const scroller = new Scroller('#root');
    scroller.scrollToCurrentSection(0);

    document.addEventListener('wheel', (e) => scroller.listenScroll(e));


})
