<template>
  <div class="text-section">
    <h1 class="text-section-title">
      Bank Data Requests
    </h1>
    <p>
      Please test the resources below:
    </p>
    <!-- <button @click="getConsent" class="thirdButton">
      Get Consent
    </button> -->
    <!-- <br> -->
    <button @click="getParties" class="thirdButton">
      Get Parties
    </button>
    <br>
    <button @click="getAccounts" class="thirdButton">
      Get Accounts
    </button>
  </div>
  <div v-if="accounts" class="text-section">
    <h1 class="text-section-title">
      Select Account
    </h1>

    <div v-for="account in accounts.Data.Account">
      <button @click="selectAccount(account.AccountId)" class="thirdButton">
        {{ account.AccountId }}
        <br />
        {{ account.AccountHolderName }}
        <br />
        {{ account.AccountSubType }}
      </button>
      <br>
    </div>
  </div>
  <div v-if="accountId" class="text-section">
    <h1 class="text-section-title">
      {{ accountId }}
    </h1>
    <button class="thirdButton" @click="getBankData('balances')">
      Get Balances
    </button>
    <br />
    <button class="thirdButton" @click="getBankData('transactions')">
      Get Transactions
    </button>
    <br />
    <button class="thirdButton" @click="getBankData('direct-debits')">
      Get Direct Debits
    </button>
    <br />
    <button class="thirdButton" @click="getBankData('beneficiaries')">
      Get Beneficiaries
    </button>
    <br />
    <button class="thirdButton" @click="getBankData('scheduled-payments')">
      Get Scheduled Payments
    </button>
    <br />
    <button class="thirdButton" @click="getBankData('standing-orders')">
      Get Standing Orders
    </button>
    <br />
    <button class="thirdButton" @click="getBankData('product')">
      Get Product
    </button>

  </div>
  <pre v-if="jsonData" class="code-section">
    <img class="codeCopyIcon" @click="copy" src="../assets/icons/copy.svg" alt="copy" />
    {{ jsonData }}
  </pre>
</template>




<script>
import api from '../api';

export default {
  data() {
    return {
      state: undefined,
      accounts: undefined,
      jsonData: undefined,
      accountId: undefined,
    };
  },
  created() {
    if (!this.$route.params.state) {
      this.$router.push('error')
    }
    this.state = this.$route.params.state
  },
  methods: {
    async copy() {
      await navigator.clipboard.writeText(
        JSON.stringify(this.jsonData, null, 2)
      )
    },
    async getConsent() {
      const config = {
        method: 'get',
        url: `/check-consent/${this.state}`,
      }
      const response = await api.request(config)
      if (response.status === 200) {
        this.jsonData = response.data
      }
      else {
        this.$router.push('error')
      }
    },
    async getParties() {
      const config = {
        method: 'get',
        url: `/bank-data/${this.state}/parties`,
      }
      const response = await api.request(config)
      if (response.status === 200) {
        this.jsonData = response.data
      }
      else {
        this.$router.push('error')
      }
    },
    async getAccounts() {
      const config = {
        method: 'get',
        url: `/bank-data/${this.state}/accounts`,
      }
      const response = await api.request(config)
      if (response.status === 200) {
        this.jsonData = response.data
        this.accounts = response.data
      }
      else {
        this.$router.push('error')
      }
    },
    async getBankData(val) {

      const config = {
        method: 'get',
        url: `/bank-data/${this.state}/accounts/${this.accountId}/${val}`,
      }
      const response = await api.request(config)
      if (response.status === 200) {
        this.jsonData = response.data
      }
      else {
        this.$router.push('error')
      }
    },
    selectAccount(val) {
      this.accountId = val
    },
    clearAccountId() {
      const { accountId, ...removedAccountId } = this.$route.query;

      this.$router.push({
        path: this.$route.path,
        query: removedAccountId
      });

    }
  }
}

</script>
