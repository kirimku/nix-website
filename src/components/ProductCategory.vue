<script setup>
const props = defineProps({
  heading: { type: String, default: 'Our Product Category' },
  categories: {
    type: Array,
    default: () => ([
      {
        title: 'AUDIO & WEARABLES',
        description: 'Lifestyle audio products for active mobility and everyday use.',
        imageSrc: '/_assets/media/13f1bb06b67682d9d1f7b3d944ef940b.png',
        imageAlt: 'Audio & wearables',
      },
      {
        title: 'CHARGING & POWER\nSOLUTIONS',
        description: 'Power products with advanced charging tech.',
        imageSrc: '/_assets/media/1f988bc1fe87e390fdfff0772360c2db.png',
        imageAlt: 'Charging & power solutions',
      },
      {
        title: 'PRODUCTIVITY TOOLS &\nACCESSORIES',
        description: 'Gear designed to boost work efficiency and multitasking.',
        imageSrc: '/_assets/media/22b7859e6277a0bf63f1d8815efe2ced.png',
        imageAlt: 'Productivity tools & accessories',
      },
      {
        title: 'SMART LIGHTING &\nAMBIENCE',
        description: 'Products that enhance mood and space.',
        imageSrc: '/_assets/media/608e5d4c9705f2fd8c8296cbf78634bc.png',
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
  padding: 24px 24px 26px;
  min-height: 360px; /* ensure card is taller than width */
  box-shadow: 0 2px 12px rgba(0,0,0,0.15);
  overflow: hidden;
}

.cat-card__figure {
  background: #efefef;
  border-radius: 18px;
  border-top-right-radius: 100px 100px;
  overflow: hidden;
  margin: 0 0 12px;
  aspect-ratio: 4 / 3; /* make the image area taller */
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
  font-size: 14px;
  letter-spacing: 0.03em;
  line-height: 1.3;
  margin: 0 0 8px;
}

.cat-card__desc {
  font-size: 12px;
  color: #555;
  line-height: 1.5;
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
    aspect-ratio: 4 / 3;
  }
}
</style>