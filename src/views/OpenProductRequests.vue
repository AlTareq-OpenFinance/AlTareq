<template>
  <div class="text-section">
    <h1 class="text-section-title">
      Open Product Request
    </h1>
    <p>
      Please test the resources below for ModelBank:
    </p>
    <button @click="getProducts" class="thirdButton">
      Get Products
    </button>
  </div>
  <pre v-if="displayedJson" class="code-section">
    <img class="codeCopyIcon" @click="copy" src="../assets/icons/copy.svg" alt="copy" />
    {{ displayedJson }}
  </pre>
</template>


<script>
import api from '../api';

export default {
  data() {
    return {
      displayedJson: undefined
    }
  },
  methods: {
    async getProducts() {
      const config = {
        method: 'get',
        url: `/open-data/products`,
      }
      const response = await api.request(config)
      console.log(response.data)
      this.displayedJson = response.data
    },
    async copy() {
      await navigator.clipboard.writeText(
        JSON.stringify(this.displayedJson, null, 2)
      )
    }
  }
}
</script>