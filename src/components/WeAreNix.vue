<script setup>
const props = defineProps({
  logoSrc: { type: String, default: '/_assets/media/nix-logo.png' },
  logoAlt: { type: String, default: 'NIX' },
  imageSrc: { type: String, default: '/_assets/media/we-are-nix.png' },
  imageAlt: { type: String, default: 'NIX product lineup' },
  title: { type: String, default: 'We Are' },
})
</script>

<template>
  <section class="about">
    <div class="about__content">
      <h2 class="about__title">
        <span class="about__title-text">{{ title }}</span>
        <img :src="logoSrc" :alt="logoAlt" class="about__logo" />
      </h2>
      <p class="about__lead">
        NIX is an electronic lifestyle brand offering modern tech essentials – from wearables to chargers, and desk accessories.
      </p>
      <p class="about__body">
        More than a product, NIX is a statement for those who live with purpose, style, and forward momentum. Designed to power up your work, wellness, and everyday flow with tech that looks sharp and works smarter.
      </p>
    </div>

    <div class="about__visual">
      <img :src="imageSrc" :alt="imageAlt" class="about__image" />
    </div>
  </section>
</template>

<style scoped>
.about {
  display: grid;
  grid-template-columns: 1.05fr 1fr;
  gap: 48px;
  align-items: center;
}

.about__content {
  max-width: 680px;
}

.about__title {
  display: inline-flex;
  align-items: baseline;
  gap: 14px;
  margin: 0 0 20px;
  color: #e7e7e7;
}

.about__title-text {
  font-weight: 300;
  font-size: clamp(32px, 5vw, 52px);
  letter-spacing: 0.01em;
}

.about__logo {
  height: 35px;
  width: auto;
  display: inline-block;
  /* transform: translateY(2px); */
}

.about__lead {
  color: #ffffff;
  font-size: 22px;
  /* line-height: 1.8; */
  margin: 0 0 14px;
}

.about__body {
  color: #ffffff;
  font-size: 22px;
  /* line-height: 1.8; */
}

.about__visual {
  border-radius: 0px 100px 0px 0px;
  overflow: hidden;
  background: #1a1a1a;
}

.about__image {
  display: block;
  width: 100%;
  height: auto;
}

/* Responsive */
@media (max-width: 960px) {
  .about {
    grid-template-columns: 1fr;
  }
  .about__content {
    max-width: 720px;
  }
  .about__logo {
    height: 26px;
  }
}

@media (max-width: 640px) {
  .about {
    gap: 32px;
  }
  .about__title-text {
    font-size: 30px;
  }
  .about__logo {
    height: 24px;
  }
  .about__lead,
  .about__body {
    font-size: 17px;
    line-height: 1.7;
  }
}

@media (max-width: 420px) {
  .about__title-text {
    font-size: 26px;
  }
  .about__logo {
    height: 22px;
  }
  .about__lead,
  .about__body {
    font-size: 16px;
    line-height: 1.65;
  }
}
</style>