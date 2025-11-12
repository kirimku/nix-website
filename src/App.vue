<script setup>
import { ref, onMounted, onBeforeUnmount, nextTick } from 'vue'
import ProductHero from './components/ProductHero.vue'
import WeAreNix from './components/WeAreNix.vue'
import ProductCategory from './components/ProductCategory.vue'
import CreatorsSay from './components/CreatorsSay.vue'
import SoftwareDownload from './components/SoftwareDownload.vue'
import ConnectWithUs from './components/ConnectWithUs.vue'
import { products } from './data/products'

// Carousel state
const carouselTrack = ref(null)
const currentIndex = ref(0)
const totalSlides = products.length
const isDesktop = ref(false)
const SLIDE_INTERVAL_MS = 5000
const trackMinHeight = ref('')

let mq
let mqHandler
let autoTimer
let visibilityHandler
let scrollHandler
let resizeHandler

function goto(index) {
  if (!carouselTrack.value) return
  currentIndex.value = ((index % totalSlides) + totalSlides) % totalSlides
  const left = currentIndex.value * carouselTrack.value.clientWidth
  carouselTrack.value.scrollTo({ left, behavior: 'smooth' })
}
function next() { goto(currentIndex.value + 1) }
function prev() { goto(currentIndex.value - 1) }
function resetAuto() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = undefined }
  if (isDesktop.value) {
    autoTimer = setInterval(() => next(), SLIDE_INTERVAL_MS)
  }
}

function setTrackHeight() {
  if (!carouselTrack.value) return
  // On desktop, use tallest slide to stabilize layout; on mobile, full viewport
  if (isDesktop.value) {
    const slides = carouselTrack.value.querySelectorAll('.carousel-slide')
    let maxH = 0
    slides.forEach((el) => { maxH = Math.max(maxH, el.scrollHeight) })
    trackMinHeight.value = `${maxH}px`
  } else {
    trackMinHeight.value = '100vh'
  }
}

onMounted(() => {
  mq = window.matchMedia('(min-width: 1024px)')
  mqHandler = () => { isDesktop.value = mq.matches; resetAuto(); setTrackHeight() }
  mq.addEventListener('change', mqHandler)
  mqHandler()

  // Sync current index while scrolling
  scrollHandler = () => {
    if (!carouselTrack.value) return
    const i = Math.round(carouselTrack.value.scrollLeft / carouselTrack.value.clientWidth)
    if (i !== currentIndex.value) currentIndex.value = i
  }
  carouselTrack.value.addEventListener('scroll', scrollHandler, { passive: true })

  // Normalize track height using the tallest slide
  resizeHandler = () => setTrackHeight()
  nextTick(setTrackHeight)
  window.addEventListener('resize', resizeHandler)
  window.addEventListener('load', setTrackHeight)

  visibilityHandler = () => {
    if (document.hidden) {
      if (autoTimer) clearInterval(autoTimer)
    } else {
      resetAuto()
    }
  }
  document.addEventListener('visibilitychange', visibilityHandler)
})

onBeforeUnmount(() => {
  if (autoTimer) clearInterval(autoTimer)
  if (mq && mqHandler) mq.removeEventListener('change', mqHandler)
  if (visibilityHandler) document.removeEventListener('visibilitychange', visibilityHandler)
  if (carouselTrack.value && scrollHandler) carouselTrack.value.removeEventListener('scroll', scrollHandler)
  if (resizeHandler) window.removeEventListener('resize', resizeHandler)
  window.removeEventListener('load', setTrackHeight)
})
</script>

<template>
  <main class="sections">
    <!-- Horizontally swipeable product carousel -->
    <section class="product-carousel" aria-label="Featured products">
      <div class="carousel-track" ref="carouselTrack" :style="{ minHeight: trackMinHeight }">
        <ProductHero
          v-for="p in products"
          :key="p.key"
          :brandLogoSrc="p.brandLogoSrc"
          :brandAlt="p.brandAlt"
          :titleLead="p.titleLead"
          :titleAccent="p.titleAccent"
          :description="p.description"
          :primaryCtaLabel="p.primaryCtaLabel"
          :primaryCtaHref="p.primaryCtaHref"
          :secondaryCtaLabel="p.secondaryCtaLabel"
          :secondaryCtaHref="p.secondaryCtaHref"
          :imageSrc="p.imageSrc"
          :featuresImageSrc="p.featuresImageSrc"
          class="carousel-slide"
        />
      </div>
      <!-- Desktop bottom dot pagination -->
      <div v-if="isDesktop" class="carousel-dots" role="tablist" aria-label="Carousel pagination">
        <button
          v-for="(_, i) in products"
          :key="i"
          class="dot"
          :class="{ active: currentIndex === i }"
          :aria-label="`Go to slide ${i + 1}`"
          @click="goto(i)"
        />
      </div>
    </section>

    <!-- Bottom section -->
    <WeAreNix />

    <!-- Product list / category section -->
    <ProductCategory />

    <!-- Creators section -->
    <CreatorsSay />

    <!-- Software Download section -->
    <SoftwareDownload />

    <!-- Connect With Us section -->
    <ConnectWithUs />
  </main>
</template>

<style scoped>
.sections {
  display: flex;
  flex-direction: column;
  gap: 96px;
  /* padding: 24px 0 64px; */
}

/* Carousel styles */
.product-carousel { position: relative; }
.carousel-track {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  /* Remove default gap between slides to make each slide full-width */
  gap: 0;
  scroll-behavior: smooth;
}
.carousel-track::-webkit-scrollbar { display: none; }
.carousel-slide {
  flex: 0 0 100%;
  scroll-snap-align: start;
}

@media (min-width: 1024px) {
  .carousel-slide { flex-basis: 100%; }
}

/* Mobile: each slide fills the viewport height */
@media (max-width: 1023px) {
  .carousel-slide { 
    /* height: 100svh;  */
    min-height: 100vh; 
  }
}

/* Desktop bottom dots */
.carousel-dots {
  position: absolute;
  bottom: 12px;
  left: 50%;
  transform: translateX(-50%);
  display: none;
  gap: 10px;
  z-index: 5;
}
.dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: rgba(255,255,255,0.32);
  border: 0;
  padding: 0;
  cursor: pointer;
}
.dot.active { background: #fff; }

@media (min-width: 1024px) {
  .carousel-dots { display: flex; }
}
</style>
