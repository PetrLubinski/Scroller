class Scroller {
    constructor(rootSelector) {
        const rootElement = document.querySelector(rootSelector);
        this.sections = document.querySelectorAll('section');
        this.isThrottled = false;
        this.sectionsArr = Array.prototype.slice.call(this.sections);
        this.currentSectionIndex = 0;
        const visibleSection = this.sectionsArr.findIndex(this.isVisible);
        //console.log(this.isVisible(this.sectionsArr[0]));
        console.log(visibleSection);
        this.drawMenu();
        this.handleMenu();
        this.myEvent = new Event('onFour');

    }
    listenScroll = (e) => {
        if (this.isThrottled) return;
        this.isThrottled = true;

        setTimeout(() => { this.isThrottled = false }, 1000);

        const direction = e.deltaY > 0 ? 1 : -1;
        console.log(e.deltaY)
        this.scroll(direction);
    }
    scroll = (direction) => {
        if (direction === 1) {
            const isLastSection = this.currentSectionIndex === this.sections.length - 1;
            if (isLastSection) {

                return;
            };
        } else if (direction === -1) {
            const firstSection = this.currentSectionIndex === 0;
            if (firstSection) return;
        }
        this.currentSectionIndex += direction;
        if (this.currentSectionIndex === this.sections.length - 1) {
            document.dispatchEvent(this.myEvent);
        }
        this.scrollToCurrentSection();
    }
    scrollToCurrentSection = (initial = this.currentSectionIndex) => {
        this.sections[initial].scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }
    isVisible(el) {
        const rect = el.getBoundingClientRect();
        console.log(rect);
        const elemTop = rect.top;
        const elemBottom = Math.floor(rect.bottom);
        return (elemTop >= 0) && (elemBottom <= window.innerHeight);
    }
    drawMenu = () => {
        this.navigation = document.createElement('aside');
        this.navigation.className = "navigation";
        this.navigation.innerHTML = '';
        document.body.appendChild(this.navigation);
        let index = 1;
        this.sections.forEach(() => {
            this.navigation.innerHTML += `<div class="item__button">${index}</div> `
            index++;
        })
    }
    handleMenu = () => {
        const items = document.querySelectorAll('.item__button');
        items.forEach(item => {
            item.addEventListener('click', (e) => {
                const index = Number(e.target.textContent);
                this.scrollToCurrentSection(index - 1);
                this.currentSectionIndex = index - 1;
                if (this.currentSectionIndex === this.sections.length - 1) {
                    document.dispatchEvent(this.myEvent)
                }
            })
        })
    }

}