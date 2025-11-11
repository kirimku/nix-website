<script setup>
import ProductHero from './components/ProductHero.vue'
import WeAreNix from './components/WeAreNix.vue'
import ProductCategory from './components/ProductCategory.vue'
import CreatorsSay from './components/CreatorsSay.vue'
import SoftwareDownload from './components/SoftwareDownload.vue'
import ConnectWithUs from './components/ConnectWithUs.vue'
import { products } from './data/products'
</script>

<template>
  <main class="sections">
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
    />

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
  padding: 24px 0 64px;
}
</style>
