<template>
    <div class="page-container">
        <div class="logo-container">
            <img class="tpp-logo" src="../assets/modelTPP.png" alt="AlTareq" />
            <div class="logo-divider">

            </div>
            <img class="altareq-logo" src="../assets/AlTareq.png" alt="AlTareq" />
        </div>
        <ProgressBar  />
        <router-view />
    </div>
</template>

<script>
import ProgressBar from '../components/ProgressBar.vue'

export default {
    components: {
        ProgressBar,
    },
    computed: {
        route() {
            return this.$route.name
        },
    }
}
</script>