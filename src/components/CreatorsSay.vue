<script setup>
const props = defineProps({
  heading: { type: String, default: 'What Creators Say About' },
  logoSrc: { type: String, default: '/_assets/media/nix-logo.png' },
  logoAlt: { type: String, default: 'NIX' },
  items: {
    type: Array,
    default: () => ([
      {
        title: 'Unboxing Lucent',
        subtitle: 'Ambience Desk Lamp',
        imageSrc: '/_assets/media/unboxing-lucent.png',
        imageAlt: 'Unboxing Lucent',
        handle: '@briansolid',
        videoSrc: '/_assets/media/@briansolid.mp4',
      },
      {
        title: 'NIX 7-in-1',
        subtitle: 'Travel Kit',
        imageSrc: '/_assets/media/87a8e6a9f535bb8886e75ed44ae3bcf2.png',
        imageAlt: 'Travel Kit',
        handle: '@scefsko',
        videoSrc: '/_assets/media/@scefsko.mp4',
      },
      {
        title: 'Smartwatch',
        subtitle: 'Anti Random',
        imageSrc: '/_assets/media/90e8314b2d7be4ead6dca45bab9bcaa7.png',
        imageAlt: 'Smartwatch',
        handle: '@marcoput',
        videoSrc: '/_assets/media/@marcoput.mp4',
      },
      {
        title: 'Keyboard iPad',
        subtitle: 'Buat WFC',
        imageSrc: '/_assets/media/608e5d4c9705f2fd8c8296cbf78634bc.png',
        imageAlt: 'Keyboard iPad at cafe',
        handle: '@edwinyg',
        videoSrc: '/_assets/media/@edwinyg.mp4',
      },
    ])
  }
})
</script>

<template>
  <section class="creators">
    <h2 class="creators__heading">
      <span class="creators__heading-text">{{ heading }}</span>
      <img :src="logoSrc" :alt="logoAlt" class="creators__logo" />
    </h2>

    <div class="creators__grid">
      <article v-for="(it, i) in items" :key="i" class="creator-card">
        <div class="creator-card__media">
          <video
            v-if="it.videoSrc"
            :src="it.videoSrc"
            :poster="it.imageSrc"
            autoplay
            muted
            loop
            playsinline
            preload="metadata"
          />
          <img v-else :src="it.imageSrc" :alt="it.imageAlt" />
          <!-- <span class="creator-card__brand">nix</span>
          <div class="creator-card__overlay">
            <h3 class="creator-card__title">{{ it.title }}</h3>
            <p class="creator-card__subtitle">{{ it.subtitle }}</p>
          </div> -->
        </div>
        <p class="creator-card__handle">{{ it.handle }}</p>
      </article>
    </div>
  </section>
</template>

<style scoped>
.creators {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.creators__heading {
  display: flex;
  align-items: baseline;
  justify-content: center;
  gap: 15px;
  margin: 50px;
}
.creators__heading-text {
    color: #ffffff;
    font-weight: 400;
    font-size: 45px;
}
.creators__logo {
  height: 30px;
  width: auto;
  /* transform: translateY(3px); */
}

.creators__grid {
  display: grid;
  grid-template-columns: repeat(4, 260px);
  justify-content: center;
  gap: 24px;
}

.creator-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 12px;
}

.creator-card__media {
  position: relative;
  width: 100%;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: 0 2px 12px rgba(0,0,0,0.2);
}
.creator-card__media img,
.creator-card__media video {
  display: block;
  width: 100%;
  height: 100%;
  aspect-ratio: 4 / 6; 
  object-fit: cover;
}

.creator-card__brand {
  position: absolute;
  top: 10px;
  left: 12px;
  font-size: 12px;
  font-weight: 600;
  color: #eaeaea;
  text-transform: lowercase;
  letter-spacing: 0.02em;
}

.creator-card__overlay {
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  padding: 16px 16px 18px;
  background: linear-gradient(0deg, rgba(0,0,0,0.65) 0%, rgba(0,0,0,0.35) 40%, rgba(0,0,0,0) 75%);
  color: #fff;
}
.creator-card__title {
  margin: 0 0 4px;
  font-size: 20px;
  font-weight: 700;
}
.creator-card__subtitle {
  margin: 0;
  font-size: 14px;
  color: #e0e0e0;
}

.creator-card__handle {
    margin: 0;
    color: #ffffff;
    font-size: 24px;
}

/* Responsive */
@media (max-width: 1200px) {
  .creators__grid { grid-template-columns: repeat(3, 280px); }
}
@media (max-width: 960px) {
  .creators__grid { grid-template-columns: repeat(2, 280px); gap: 22px; }
}
@media (max-width: 640px) {
  .creators__grid { grid-template-columns: repeat(1, min(340px, 92vw)); }
  .creator-card__media img,
  .creator-card__media video { aspect-ratio: 4 / 6; }
}
</style>