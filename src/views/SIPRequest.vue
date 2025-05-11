<template>
  <div class="text-section">
    <h1 class="text-section-title">
      Payment Initiation
    </h1>
    <p>
      Please test the payment resources below for ModelBank:
    </p>
    <button @click="makePayment" class="thirdButton">
      Make Payment
    </button>

    <div v-if="paymentIds.length > 0">
      <h1 class="text-section-title">
        Payments
      </h1>
      <div v-for="paymentId in paymentIds">
        {{ paymentId }}
        <button @click="getPayment(paymentId)" class="thirdButton">
          Get Payment
        </button>
      </div>

    </div>
  </div>
  <pre v-if="displayedJson" class="code-section">
    <img class="codeCopyIcon" @click="copy" src="../assets/icons/copy.svg" alt="copy" />
    {{ displayedJson }}
  </pre>
</template>


<script>
import api from '../api';
import { decodeJwt } from 'jose';
import InputCurrency from '../components/InputCurrency.vue';


export default {
  components: {
    InputCurrency,
  },
  data() {
    return {
      state: undefined,
      payment_amount: undefined,
      displayedJson: undefined,
      paymentIds: []
    }
  },
  created() {
    if (!this.$route.params.state) {
      this.$router.push('error')
    }
    this.state = this.$route.params.state
  },
  methods: {
    setPA(val) {
      this.payment_amount = val.data;
    },
    async makePayment() {
      const config = {
        method: 'post',
        url: `/bank-service-initiation/${this.state}/make-payment`,
        data: {}
      }
      const response = await api.request(config)
      if (response.status === 201) {
        const jwt = response.data;
        const decoded = decodeJwt(jwt);
        this.displayedJson = decoded
        this.paymentIds.push(decoded.message.Data.PaymentId)
      }
      this.payment_amount = undefined
    },
    async getPayment(id) {
      const config = {
        method: 'get',
        url: `/bank-service-initiation/${this.state}/get-payment/${id}`,
      }
      const response = await api.request(config)
      if (response.status === 200) {
        const jwt = response.data;
        const decoded = decodeJwt(jwt);
        this.displayedJson = decoded
      }
    },
    async copy() {
      await navigator.clipboard.writeText(
        JSON.stringify(this.displayedJson, null, 2)
      )
    }
  }
}
</script>