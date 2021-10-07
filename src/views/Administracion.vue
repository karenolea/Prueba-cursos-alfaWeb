
  <template>
  <div id="administracion">
    <ListaCursos :recursos="recursos"></ListaCursos>
    
  </div>
</template>

<script>
import ListaCursos from "@/components/ListaCursos.vue";
export default {
  components: {
    ListaCursos,
  },
  
  computed: {
    recursos() {
      return this.$store.getters.get_recursos;
    },
  },
  created() {
    this.$store.dispatch("getCursos");
  },

}
</script>


<style>
#administracion{
  margin: 50px;
}
</style>