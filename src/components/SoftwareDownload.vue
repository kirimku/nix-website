<script setup>
const downloads = [
  {
    name: 'Prismic Mouse Driver',
    href: '#',
  },
  {
    name: 'Elevé VIA json compatibility file USB',
    href: '#',
  },
  {
    name: 'Elevé json compatibility file Wireless 2.4G',
    href: '#',
  },
]
</script>

<template>
  <section class="software-download" aria-labelledby="sd-title">
    <div class="sd-inner">
      <div class="sd-content">
        <h2 id="sd-title" class="sd-title">Software Download</h2>

        <div class="sd-grid" role="table" aria-label="Software downloads">
          <div class="sd-col sd-col--files" role="columnheader">FILE</div>
          <div class="sd-col sd-col--links" role="columnheader">LINK</div>

          <div class="sd-col sd-col--files" role="cell">
            <ul class="sd-list">
              <li v-for="d in downloads" :key="d.name" class="sd-item">{{ d.name }}</li>
            </ul>
          </div>
          <div class="sd-col sd-col--links" role="cell">
            <ul class="sd-list">
              <li v-for="d in downloads" :key="d.href" class="sd-item">
                <a :href="d.href" class="sd-link">Download Here</a>
              </li>
            </ul>
          </div>
        </div>
      </div>

      <figure class="sd-figure">
        <img
          src="/_assets/media/software.png"
          alt="Keyboard and mouse with hand pressing keys"
        />
      </figure>
    </div>
  </section>
</template>

<style scoped>
.software-download {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.sd-inner {
  display: grid;
  grid-template-columns: 1fr 520px;
  align-items: start;
  gap: 40px;
}

.sd-title {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.2;
}

.sd-grid {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 14px 48px;
}

.sd-col {
  color: rgba(255, 255, 255, 0.88);
}

.sd-col[role='columnheader'] {
  font-size: 13px;
  text-transform: uppercase;
  letter-spacing: 0.08em;
  color: rgba(255, 255, 255, 0.7);
}

.sd-list {
  list-style: none;
  padding: 0;
  margin: 6px 0 0;
  display: grid;
  gap: 8px;
}

.sd-item {
  font-size: clamp(15px, 1.6vw, 18px);
  line-height: 1.6;
}

.sd-link {
  color: #fff;
  text-decoration: none;
  border-bottom: 1px solid rgba(255, 255, 255, 0.28);
  padding-bottom: 2px;
  transition: color 0.2s ease, border-color 0.2s ease;
}
.sd-link:hover {
  color: #8fd0ff;
  border-color: #8fd0ff;
}

.sd-figure {
  /* width: 100%;
  max-width: 560px; */
  aspect-ratio: 3 / 4;
  overflow: hidden;
  border-top-right-radius: 120px 120px;
}
.sd-figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

@media (max-width: 1200px) {
  .sd-inner {
    grid-template-columns: 1fr 460px;
  }
  .sd-grid {
    grid-template-columns: 1fr 200px;
  }
  .sd-figure {
    max-width: 480px;
  }
}

@media (max-width: 960px) {
  .sd-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .sd-figure {
    order: unset;
    justify-self: center;
    border-top-right-radius: 80px 80px;
    max-width: min(92vw, 520px);
    aspect-ratio: 4 / 5;
  }
  .sd-grid {
    grid-template-columns: 1fr 160px;
  }
}
</style>