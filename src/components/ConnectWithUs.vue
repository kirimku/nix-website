<script setup>
const instagramUrl = '#'
</script>

<template>
  <section class="connect-with-us" aria-labelledby="cwu-title">
    <div class="cwu-inner">
      <figure class="cwu-figure">
        <img
          src="/_assets/media/about-us.png"
          alt="NIX headset in moody lighting"
        />
      </figure>

      <div class="cwu-content">
        <h2 id="cwu-title" class="cwu-title">Connect With Us</h2>
        <div class="cwu-actions">
          <a :href="instagramUrl" class="cwu-circle" aria-label="Instagram">
            <svg class="cwu-instagram" viewBox="0 0 24 24" aria-hidden="true">
              <rect x="3" y="3" width="18" height="18" rx="5" ry="5" fill="none" stroke="currentColor" stroke-width="1.6" />
              <circle cx="12" cy="12" r="4" fill="none" stroke="currentColor" stroke-width="1.6" />
              <circle cx="17" cy="7" r="1.2" fill="currentColor" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.connect-with-us {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 24px;
}

.cwu-inner {
  display: grid;
  grid-template-columns: 560px 1fr;
  align-items: center;
  gap: 48px;
}

.cwu-figure {
  /* width: 100%; */
  /* max-width: 560px; */
  aspect-ratio: 4 / 5;
  margin: 51px;
  overflow: hidden;
  border-top-right-radius: 120px 120px;
}
.cwu-figure img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}

.cwu-content {
  display: flex;
  flex-direction: column;
  /* align-items: center; */
  /* justify-content: center; */
}

.cwu-title {
  color: #fff;
  font-weight: 500;
  letter-spacing: 0.01em;
  font-size: clamp(28px, 3vw, 40px);
  line-height: 1.2;
}

.cwu-actions {
  margin-top: 28px;
  display: flex;
  /* justify-content: center; */
}

.cwu-circle {
  width: 60px;
  height: 60px;
  border: 2px solid rgba(255, 255, 255, 0.9);
  border-radius: 50%;
  display: grid;
  place-items: center;
  color: rgba(255, 255, 255, 0.95);
  text-decoration: none;
  transition: transform 0.2s ease, border-color 0.2s ease, color 0.2s ease;
}
.cwu-circle:hover {
  transform: translateY(-2px);
  border-color: #8fd0ff;
  color: #8fd0ff;
}
.cwu-instagram {
  width: 28px;
  height: 28px;
}

@media (max-width: 1200px) {
  .cwu-inner { grid-template-columns: 500px 1fr; gap: 40px; }
  .cwu-figure { max-width: 500px; }
}

@media (max-width: 960px) {
  .cwu-inner {
    grid-template-columns: 1fr;
    gap: 28px;
  }
  .cwu-figure {
    order: 1;
    justify-self: center;
    border-top-right-radius: 80px 80px;
    max-width: min(92vw, 520px);
    aspect-ratio: 4 / 5;
  }
  .cwu-content { order: 2; }
}
</style>