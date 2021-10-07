<template>
  <v-app>
    <the-navbar></the-navbar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>



<script>
import Navbar from "@/components/Navbar.vue";
import {mapActions} from 'vuex'
export default {
  name: "App",

  components: { "the-navbar": Navbar },

  data: () => ({
    //
  }),
   methods:{
    ...mapActions(["get_recursos"])

  },
};
</script>