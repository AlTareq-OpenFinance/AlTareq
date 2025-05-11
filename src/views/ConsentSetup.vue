<template>
  <div class="text-section">
    <h1 class="text-section-title">
      Choose your option
    </h1>
    <SelectOptions :options="openFinanceFlows" @output="setOption" />
  </div>
  <div class="text-section">
    <h1 class="text-section-title">
      Select your bank
    </h1>
    <p>
    Choose your bank from the list below. You’ll be
    redirected to your bank’s website or app to securely authorize the connection.
    </p>
    <SelectProvider />
  </div>
    <AlTareqButton @click="submit" />
</template>



<script>
import SelectOptions from '../components/SelectOptions.vue';
import SelectProvider from '../components/SelectProvider.vue';
import AlTareqButton from '../components/AlTareqButton.vue';


export default {
  components: {
    SelectOptions,
    SelectProvider,
    AlTareqButton,
  },
  data() {
    return {
      selectedOption: undefined,
      openFinanceFlows: [
        {
          description: 'Bank Data Sharing',
          active: true
        },
        {
          description: 'Single Instant Payment',
          active: true
        },
        {
          description: 'Multi Payment (VRP)',
          active: true
        },
        {
          description: 'Open Product Data',
          active: true
        },
        {
          description: 'Insurance Data Sharing',
          active: false
        },
      ]
    }
  },
  methods: {
    submit() {
      if(this.selectedOption === 'Bank Data Sharing') {
      this.$router.push({name: 'data-permissions'})
      } else if (this.selectedOption === 'Single Instant Payment') {
        this.$router.push({name: 'sip-permissions'})
      } else if (this.selectedOption === 'Multi Payment (VRP)') {
        this.$router.push({name: 'vrp-permissions'})
      } else if (this.selectedOption === 'Open Product Data') {
        this.$router.push({name: 'open-product-requests'})
      }
    },
    setOption(val) {
      this.selectedOption = val
    }
  }
}
</script>