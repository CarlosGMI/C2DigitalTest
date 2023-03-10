// import Swiper JS
import Swiper, { Pagination } from 'swiper';
// import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';

class Lookbook extends HTMLElement {
    constructor() {
      super();
      this.carouselElement = this.querySelector(".lookbook__carousel");
      this.hotspots = this.querySelectorAll("[data-hotspot-id]");
      this.carousel = this.initializeCarousel();
      console.log(this.carousel);
    }

    connectedCallback() {
      this._attachWatchers();
    }

    disconnectedCallback() {
      this._detachWatchers();
    }

    initializeCarousel() {
      if (!this.carouselElement) {
        return;
      }

      return new Swiper('.swiper', {
        modules: [Pagination],
        pagination: {
          el: '.swiper-pagination',
          type: 'bullets',
          clickable: true,
        },
      });
    }

    _handleHotspotClick(event) {
      const hotspot = event.currentTarget;
      const hotspotId = hotspot.dataset.hotspotId || 0;

      if (this.carousel) {
        this.carousel.slideTo(hotspotId)
      }
    }

    _attachWatchers() {
      for (const hotspot of this.hotspots) {
        hotspot.addEventListener("click", (event) => {
          const hotspot = event.currentTarget;
          const hotspotId = hotspot.dataset.hotspotId || 0;

          if (this.carousel) {
            this.carousel.slideTo(hotspotId)
          }
        });
      }
    }
}

window.customElements.get('look-book') || window.customElements.define('look-book', Lookbook)
