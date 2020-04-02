class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');
        this.currentSectionIndex = 0;
        this.isThrottled = false;
    }
    listenScroll = (e) => {
        if (this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => { this.isThrottled = false }, 1000);

        const direction = e.wheelDelta < 0 ? 1 : -1;
        console.log(e.wheelDelta)
        this.scroll(direction);
    }
    scroll = (direction) => {
        if (direction === 1) {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) return;
        } else if (direction === -1) {
            const firstSection = this.currentSectionIndex === 0;
            if (firstSection) return;
        }
        this.currentSectionIndex += direction;
        this.scrollToCurrentSection();
    }
    scrollToCurrentSection = () => {
        this.sections[this.currentSectionIndex].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

}