<template>
  <div>
    <!-- <h1>Pagina Home Protegida (visible solamente para usuarios autenticados)</h1> -->
    <h1 class="text-center py-4">Lista de Cursos</h1>
    <v-row row--dense>
      <v-col v-for="(recurso, index) in recursos" :key="index" cols="12" sm="4">
        <Cards :recurso="recurso" />
      </v-col>
    </v-row>

    <div></div>
  </div>
</template>
<script>
import Cards from "@/components/Cards.vue";

export default {
  name: "Home",

  components: { Cards },

  computed: {
    recursos() {
      return this.$store.getters.get_recursos;
    },
  },

  created() {
    this.$store.dispatch("getCursos");
   
  },
  
};
</script>



<style>
</style>