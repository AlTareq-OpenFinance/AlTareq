<template>
  <div class="text-section">
    <h1 class="text-section-title">
      Permission for Payment Setup
    </h1>
    <p>
      We need you permssion to securely take payments on your behalf.
    </p>
    <br/>
    <div style="display: flex; opacity: 80%;">
      <span style="margin-right: auto;">Reference</span>  <span>MY REFERENCE</span>
    </div>


    <h3 class="text-section-title">
      Delegated SCA
    </h3>
    <SelectOptions :options="openFinanceFlows" @output="setOption" />

    <div v-if="selectedOption === 'False'">
    <h3  class="text-section-title">
      Control Parameters
    </h3>
    <p>
      Please set one of the control parameters below:
    </p>
    <InputCurrency placeholder="Max Individual Amount" @output="setMPA" />
  </div>
    <br>


    <div style="display: flex; padding-top: 10px;">
      <img style="width: 25px; margin-right: 10px;" src="../assets/icons/calendar.svg" alt="user" />
      <div style="margin-top: auto; margin-bottom: auto">We can make payments until {{ tomorrow }} </div>
    </div>
    <br/>




    <h2 class="text-section-title">
      Permission to check balance
    </h2>
    


    <p>
      By granting us these payment permissions you are also allowing us the ability to check the available funds before making a payment.
    </p>
  </div>
  <AlTareqButton @click="submit" />
  <div class="primary-button-suptext">
    Continue to <strong>Model Bank</strong> to share your account information under these terms.
  </div>
</template>


<script>
import ToggleText from '../components/ToggleText.vue';
import AlTareqButton from '../components/AlTareqButton.vue';
import SelectOptions from '../components/SelectOptions.vue';
import InputCurrency from '../components/InputCurrency.vue';

import api from '../api';

export default {
  components: {
    ToggleText,
    AlTareqButton,
    SelectOptions,
    InputCurrency,
  },
  data() {
    return {
      selectedOption: undefined,
      openFinanceFlows: [
        {
          description: 'True',
          active: false
        },
        {
          description: 'False',
          active: true
        }
      ],
      max_payment_amount: undefined,
    }
  },
  computed: {
    tomorrow() {
      const today = new Date();
      const tomorrow = new Date(today);
      tomorrow.setDate(today.getDate() + 1);

      const yyyy = tomorrow.getFullYear();
      const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
      const dd = String(tomorrow.getDate()).padStart(2, '0');

      const formatted = `${dd}/${mm}/${yyyy}`;
      return formatted
    }
  },
  methods: {
    setOption(val) {
      this.selectedOption = val
    },
    setMPA(val) {
      this.max_payment_amount = val.data;
    },
    async submit() {
      if(this.max_payment_amount) {
      this.$router.push({ name: 'redirect-screen' });
      const config = {
        method: 'post',
        url: '/vrp-authentication',
        data: {
              maximum_individual_payment_amount: this.max_payment_amount
          }
      }
      console.log(config)
      const response = await api.request(config)
      window.location.href = response.data.redirect
    }
    }
  }
}
</script>