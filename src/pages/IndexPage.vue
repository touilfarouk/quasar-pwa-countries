<template>
  <q-page padding>
    <q-btn
      round
      icon="refresh"
      title="Atualizar"
      color="primary"
      class="q-mb-md"
      @click="fetchCountries"
    />

    <q-inner-loading :showing="loading">
      <q-spinner />
    </q-inner-loading>

    <div
      v-if="error"
      class="text-red"
    >
      {{ error }}
    </div>

    <div class="countries-grid">
      <q-card
        v-for="country in countries"
        :key="country.name"
        class="country-card row items-center"
      >
        <q-card-section class="col">
          <div class="text-subtitle1">
            {{ country.name }}
          </div>
          <div class="text-caption text-grey">
            População: {{ country.population.toLocaleString() }}
          </div>
          <div class="text-caption">
            Região: {{ country.region }}
          </div>
        </q-card-section>

        <img
          class="country-flag q-mr-md"
          :src="country.flag"
          :alt="country.name"
        >
      </q-card>
    </div>
  </q-page>
</template>

<script setup>
import { onMounted } from 'vue'
import { useCountries } from '@/composables/useCountries'

const { countries, loading, error, fetchCountries } = useCountries()

onMounted(fetchCountries)
</script>

<style scoped>
.countries-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
}

.country-card {
  min-width: 0;
}

.country-flag {
  width: auto;
  height: 80px;
}

@media (min-width: 600px) {
  .countries-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (min-width: 1024px) {
  .countries-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }
}
</style>
