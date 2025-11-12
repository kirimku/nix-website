<script setup>
const props = defineProps({
  heading: { type: String, default: 'Our Product Category' },
  categories: {
    type: Array,
    default: () => ([
      {
        title: 'AUDIO & WEARABLES',
        description: 'Lifestyle audio products for active mobility and everyday use.',
        imageSrc: '/_assets/media/7529e0eeae333004ea539c89d0abfae9.png',
        imageAlt: 'Audio & wearables',
      },
      {
        title: 'CHARGING & POWER SOLUTIONS',
        description: 'Power products with advanced charging tech.',
        imageSrc: '/_assets/media/charger.png',
        imageAlt: 'Charging & power solutions',
      },
      {
        title: 'PRODUCTIVITY TOOLS & ACCESSORIES',
        description: 'Gear designed to boost work efficiency and multitasking.',
        imageSrc: '/_assets/media/dd02e67a2266005fd9c99c6364b4271d.png',
        imageAlt: 'Productivity tools & accessories',
      },
      {
        title: 'SMART LIGHTING & AMBIENCE',
        description: 'Products that enhance mood and space.',
        imageSrc: '/_assets/media/c5e74de7731f79153e6250e8c7ebf0a7.png',
        imageAlt: 'Smart lighting & ambience',
      }
    ])
  }
})
</script>

<template>
  <section class="category">
    <h2 class="category__heading">{{ heading }}</h2>
    <div class="category__grid">
      <article v-for="(c,i) in categories" :key="i" class="cat-card">
        <div class="cat-card__figure">
          <img :src="c.imageSrc" :alt="c.imageAlt" />
        </div>
        <h3 class="cat-card__title" v-html="c.title.replace(/\n/g,'<br/>')"></h3>
        <p class="cat-card__desc">{{ c.description }}</p>
      </article>
    </div>
  </section>
  
</template>

<style scoped>
.category {
  display: flex;
  flex-direction: column;
  gap: 28px;
}

.category__heading {
  text-align: center;
  color: #e7e7e7;
  font-weight: 600;
  font-size: clamp(22px, 3.2vw, 32px);
}

.category__grid {
  display: grid;
  grid-template-columns: repeat(4, 240px);
  justify-content: center;
  gap: 24px;
}

.cat-card {
  background: #fff;
  color: #151515;
  /* border-radius: 24px; */
  /* Large rounded corners to match design */
  border-top-right-radius: 70px 70px;
  border-bottom-left-radius: 70px 70px;
  padding: 24px;
  /* min-height: 360px;  */
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  overflow: hidden;
}

.cat-card__figure {
  background: #efefef;
  border-radius: 0px;
  border-top-right-radius: 46px 46px;
  overflow: hidden;
  margin: 0 0 12px;
  aspect-ratio: 4 / 4; /* make the image area taller */
}
.cat-card__figure img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cat-card__title {
  text-transform: uppercase;
  font-weight: 700;
  font-size: 17px; /* Increased font size */
  letter-spacing: 0.03em;
  line-height: 1.3;
  margin: 0 0 8px;
  text-align: center; /* Centered text */
}

.cat-card__desc {
  font-size: 14px; /* Increased font size */
  color: #555;
  line-height: 1.5;
  text-align: center; /* Centered text */
}

/* Responsive */
@media (max-width: 1200px) {
  .category__grid {
    grid-template-columns: repeat(3, 240px);
  }
}

@media (max-width: 960px) {
  .category__grid {
    grid-template-columns: repeat(2, 240px);
    gap: 22px;
  }
}

@media (max-width: 640px) {
  .category {
    gap: 20px;
  }
  .category__heading {
    font-size: 22px;
  }
  .category__grid {
    grid-template-columns: repeat(1, min(320px, 92vw));
    gap: 20px;
    justify-content: center;
  }
  .cat-card {
    padding: 20px 20px 22px;
    border-top-right-radius: 80px 80px;
    border-bottom-left-radius: 80px 80px;
    min-height: 420px; /* slightly taller on mobile for balance */
  }
  .cat-card__figure {
    border-top-right-radius: 72px 72px;
    aspect-ratio: 4 / 4;
  }
}
</style>