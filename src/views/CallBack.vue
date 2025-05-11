<template>
  <div class="redirect-page">
    <div class="redirect-content">
    <div class="redirect-wheel">

    </div>
    <div class="redirect-text">
      You'll be redirected to <strong>Model TPP,</strong> don't close this window
    </div>
  </div>
  <div class="powered-by">
    Powered by
    <img class="powered-by-img" src="../assets/AlWhite.png" alt="AlTareq" />
  </div>
  </div>
</template>


<script>
import api from '../api';


export default {

  async created() {

    console.log(this.$route.query)
    if(!this.$route.query.code) {
      this.$router.push('failed')
      return;
    }
    const config = {
      method: 'post',
      url: `/callback`,
      data: this.$route.query
    }
    const response = await api.request(config)
    console.log(response)

    if(response.state === 200 || response.status === 201 ) {
      if(response.data.consent_status === 'AwaitingAuthorization') {
        this.$router.push(`/multi-auth/${this.$route.query.state}`);
      }
      else if(response.data.scope === 'accounts') {
      this.$router.push(`/success/${this.$route.query.state}`);
      }
      else if (response.data.scope === 'payments' && response.data.payment_type === 'SIP') {
        this.$router.push(`/sip-success/${this.$route.query.state}`);
      }
      else if (response.data.scope === 'payments' && response.data.payment_type === 'VRP') {
        this.$router.push(`/vrp-success/${this.$route.query.state}`);
      }
    }
    else {
      this.$router.push('failed')
    }
  }
}

</script>
