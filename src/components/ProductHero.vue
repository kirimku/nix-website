<script setup>
import { computed, ref, onMounted, onBeforeUnmount } from 'vue'

const props = defineProps({
  brandLogoSrc: { type: String, default: '' },
  brandAlt: { type: String, default: 'Brand' },
  titleLead: { type: String, default: 'Rytm' },
  titleAccent: { type: String, default: 'Headphone' },
  description: { type: String, default: 'A sleek & lightweight headphone for your daily life. Designed for clarity and simplicity, NIX Rytm makes every beat feel effortless. Style and performance, perfectly in sync.' },
  primaryCtaLabel: { type: String, default: 'Buy Now' },
  primaryCtaHref: { type: String, default: '#' },
  secondaryCtaLabel: { type: String, default: 'Shop All' },
  secondaryCtaHref: { type: String, default: '#' },
  imageSrc: { type: String, default: '/images/87e22a62965f141aa08e93699b0b3527.jpg' },
  imageAlt: { type: String, default: 'Product image' },
  /** If provided, features are displayed as a single horizontal image */
  featuresImageSrc: { type: String, default: '' },
  features: {
    type: Array,
    default: () => ([
      { icon: '/_assets/images/2d0b56e7e51cf11036ad8734bdb67e2d.png', title: 'BLUETOOTH', subtitle: '5.4' },
      { icon: '/_assets/images/725b756a69a7d4c235070e51acd85560.png', title: 'STYLISH COLOR', subtitle: 'OPTION' },
      { icon: '/_assets/images/e53c4bd8da5e491d9ab09e7cf0daf874.png', title: 'CLEAN, MINIMALISTIC', subtitle: '& LIGHT DESIGN' },
    ]),
  }
})

const brandVisible = computed(() => !!props.brandLogoSrc)

// Intersection-based reveal animation (slide-up)
const rootEl = ref(null)
const isVisible = ref(false)
let io

onMounted(() => {
  io = new IntersectionObserver(
    ([entry]) => {
      if (entry.isIntersecting) {
        isVisible.value = true
        // Only animate once per section
        if (io) io.disconnect()
      }
    },
    { threshold: 0.15 }
  )
  if (rootEl.value) io.observe(rootEl.value)
})

onBeforeUnmount(() => {
  if (io) io.disconnect()
})
</script>

<template>
  <section ref="rootEl" class="hero" :class="{ 'is-visible': isVisible }">
    <div class="hero__inner">
      <header class="hero__header"></header>

      <div class="hero__content">
        <div class="hero__copy">
          <!-- Brand above product title -->
          <slot name="brand">
            <img v-if="brandVisible" :src="brandLogoSrc" :alt="brandAlt" class="hero__brand reveal-up" />
          </slot>
          <h1 class="hero__title reveal-up">
            <span class="hero__title-lead">{{ titleLead }}</span>
            <span class="hero__title-accent">{{ titleAccent }}</span>
          </h1>
          <p class="hero__desc reveal-up">{{ description }}</p>
          <div class="hero__cta reveal-up">
            <a :href="primaryCtaHref" class="btn btn--primary">{{ primaryCtaLabel }}</a>
            <a :href="secondaryCtaHref" class="btn btn--secondary">{{ secondaryCtaLabel }}</a>
          </div>
        </div>

        <div class="hero__visual">
          <img :src="imageSrc" :alt="imageAlt" class="hero__image reveal-up" />
          <!-- Features strip shown below product image on the right side -->
          <template v-if="featuresImageSrc">
            <img :src="featuresImageSrc" alt="" class="hero__features-image reveal-up" />
          </template>
          <template v-else>
            <ul role="list" class="hero__features-list reveal-up">
              <li v-for="(f, i) in features" :key="i" class="feature">
                <span class="feature__icon-wrap">
                  <img :src="f.icon" alt="" class="feature__icon" />
                </span>
                <div class="feature__text">
                  <div class="feature__title">{{ f.title }}</div>
                  <div class="feature__subtitle">{{ f.subtitle }}</div>
                </div>
              </li>
            </ul>
          </template>
        </div>
      </div>
    </div>
  </section>
  
</template>

<style scoped>
.hero {
  background: #0e0e0f;
  color: #fff;
  padding: 48px 0 32px;
  height: 100%;
  position: relative;
}
.hero__inner {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
  height: 100%;
  display: flex;
  flex-direction: column;
}
.hero__header {
  display: none;
}
.hero__brand {
  height: 44px;
  margin: 4px 0 70px;
}

@media (max-width: 768px) {
  /* Show brand on mobile at the top of the slide */
  .hero { padding-top: 72px; }
  .hero__brand {
    display: block;
    position: absolute;
    top: 12px;
    left: 24px;
    transform: none;
    height: 28px;
    width: auto;
    margin: 0;
    z-index: 3;
  }
}

.hero__content {
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  gap: 32px;
  align-items: center;
  /* allow content to shrink within viewport */
  min-height: 0;
}
.hero__title {
  margin: 0 0 16px;
}
.hero__title-lead {
  display: block;
  font-size: 64px;
  letter-spacing: 0.5px;
  font-weight: 400;
}
.hero__title-accent {
  display: block;
  font-size: 88px;
  font-weight: 700;
  letter-spacing: 0.4px;
}
.hero__desc {
  margin: 18px 0 26px;
  max-width: 560px;
  color: #cfcfcf;
  font-size: 18px;
  line-height: 1.7;
}
.hero__cta { display: flex; gap: 16px; }

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 44px;
  padding: 0 22px;
  border-radius: 22px;
  font-weight: 600;
  font-size: 16px;
  text-decoration: none;
}
.btn--primary { background: #fff; color: #111; }
.btn--secondary { background: #2f2f31; color: #e4e4e4; }

.hero__visual { text-align: center; }
.hero__image { width: 100%; max-width: 480px; filter: drop-shadow(0 12px 32px rgba(0,0,0,0.35)); }

.hero__features-image {
  display: block;
  width: 100%;
  max-width: 440px;
  margin: 20px auto 0;
  object-fit: contain;
}
.hero__features-list {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin: 20px 0 0;
  padding: 0;
  list-style: none;
}
.feature {
  display: flex;
  align-items: center;
  gap: 14px;
}
.feature__icon-wrap {
  height: 44px;
  width: 44px;
  border-radius: 50%;
  background: #171717;
  display: grid;
  place-items: center;
  border: 1px solid #2a2a2a;
}
.feature__icon { height: 24px; width: 24px; object-fit: contain; }
.feature__title {
  font-size: 13px;
  color: #a7a7a7;
  margin-bottom: 2px;
}
.feature__subtitle {
  font-size: 13px;
  color: #ededed;
}

/* Slide-up reveal animation */
.reveal-up {
  opacity: 0;
  transform: translateY(24px);
  transition: transform 600ms cubic-bezier(0.22, 1, 0.36, 1), opacity 600ms ease;
  will-change: transform, opacity;
}
.hero.is-visible .reveal-up {
  opacity: 1;
  transform: translateY(0);
}
/* Staggering for nicer effect */
.hero.is-visible .hero__brand.reveal-up { transition-delay: 0ms; }
.hero.is-visible .hero__title.reveal-up { transition-delay: 0ms; }
.hero.is-visible .hero__desc.reveal-up { transition-delay: 80ms; }
.hero.is-visible .hero__cta.reveal-up { transition-delay: 140ms; }
.hero.is-visible .hero__image.reveal-up { transition-delay: 80ms; }
.hero.is-visible .hero__features-image.reveal-up,
.hero.is-visible .hero__features-list.reveal-up { transition-delay: 200ms; }

@media (prefers-reduced-motion: reduce) {
  .reveal-up {
    opacity: 1;
    transform: none;
    transition: none;
  }
}

@media (max-width: 960px) {
  .hero { padding: 32px 0 24px; }
  .hero__content { grid-template-columns: 1fr; align-items: center; height: 100%; }
  .hero__visual { order: -1; }
  .hero__title-lead { font-size: clamp(24px, 6.5vmin, 40px); }
  .hero__title-accent { font-size: clamp(30px, 8.5vmin, 54px); }
  .hero__desc { font-size: clamp(14px, 3vmin, 17px); line-height: 1.6; }
  .btn { height: 40px; font-size: 15px; padding: 0 18px; }
  .hero__brand {         
    height: 32px;
    margin: 7px 0 80px; 
  }
  /* constrain image to fit viewport */
  .hero__image {
    height: auto;
    max-height: 42vh;
    width: auto;
    max-width: min(92vw, 480px);
    object-fit: contain;
  }
  .hero__features-image { max-height: 20vh; object-fit: contain; }
  .hero__features-list {
    max-height: 22vh;
    overflow: hidden;
    gap: 16px;
  }
  .feature__icon-wrap { height: 40px; width: 40px; }
  .feature__icon { height: 22px; width: 22px; }
}

/* Small mobile refinements */
@media (max-width: 640px) {
  .hero { padding: 28px 0 22px; }
  .hero__title-lead { font-size: clamp(22px, 6.5vmin, 36px); }
  .hero__title-accent { font-size: clamp(26px, 8vmin, 44px); }
  .hero__desc { max-width: none; }
  .hero__cta { flex-direction: column; gap: 12px; align-items: center; }
  .btn { width: 90%; max-width: 360px; min-width: 0; height: 40px; font-size: 15px; }
  .hero__image { max-width: 380px; max-height: 40vh; }
  /* hide features on small phones to ensure full-screen fit */
  .hero__features-image, .hero__features-list { display: none; }
}

@media (max-width: 420px) {
  .hero__title-lead { font-size: clamp(20px, 6.2vmin, 32px); }
  .hero__title-accent { font-size: clamp(24px, 7.6vmin, 40px); }
  .hero__image, .hero__features-image { max-width: 320px; }
}
</style>