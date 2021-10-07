<template>
  <div id="edit" class="px-1">
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-card-title>
        <span class="text-h5">Editando el curso: {{ nuevoRecurso.Nombre }}</span>
      </v-card-title>
      <v-text-field
        v-model.trim="nuevoRecurso.Nombre"
        :counter="10"
        :rules="nameRules"
        label="Nombre"
        required
      ></v-text-field>

      <v-text-field
        v-model.trim="nuevoRecurso.Imagen"
        :rules="imagenRules"
        label="URL de la imagen del curso"
        required
      ></v-text-field>

      <v-text-field
        type="Number"
        v-model.trim.number="nuevoRecurso.Cupos"
        :rules="cuposRules"
        label="Cupos del curso"
        required
      ></v-text-field>

      <v-text-field
       
        type="Number"
        v-model.trim.number="nuevoRecurso.Inscritos"
        :rules="inscritosRules"
        label="Inscritos al curso"
        required
      ></v-text-field>

      <v-text-field
        v-model.trim="nuevoRecurso.Duracion"
        :rules="duracionRules"
        label="Duracion del curso"
        required
      ></v-text-field>
      <v-text-field
        type="Number"
        v-model.trim.number="nuevoRecurso.Costo"
        :rules="costoRules"
        label="Costo del curso"
        required
      ></v-text-field>
      <v-text-field
        v-model.trim="nuevoRecurso.Codigo"
        :rules="codigoRules"
        label="Codigo del curso"
        required
      ></v-text-field>

      <v-textarea
        v-model.trim="nuevoRecurso.Descripcion"
        :rules="descripcionRules"
        name="input-7-4"
        label="Descripcion del curso"
      ></v-textarea>

      <template>
        <v-row justify="center">
          <v-date-picker
            v-model="nuevoRecurso.Fecha"
            :rules="fechaRules"
            class="mt-4"
          ></v-date-picker>
        </v-row>
      </template>

      <template>
        <v-container class="px-0" fluid>
          <v-switch
            v-model="nuevoRecurso.Estado"
            :label="`Estado 1: ${nuevoRecurso.Estado.toString()}`"
          ></v-switch>
        </v-container>
      </template>
      <div class="text-center">
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="enviar">
        ACTUALIZAR
      </v-btn>

      <v-btn color="error" class="mr-4" @click="reset">
        LIMPIAR FORMULARIO
      </v-btn>

      <v-btn color="warning" class="mr-4" @click="resetValidation">
        LIMPIAR VALIDACIÓN
      </v-btn>

      <v-btn color="primary" class="mr-4" @click="regresar"> REGRESAR </v-btn>
      </div>
    </v-form>
  </div>
</template>
<script>
export default {
  data: () => ({
    dialog: false,
    valid: false,
    nuevoRecurso: {
      Codigo: "",
      Nombre: "",
      Estado: true,
      Costo: 0,
      Duracion: "",
      Descripcion: "",
      Cupos: 0,
      Inscritos: 0,
      Imagen: "",
      Fecha: "",
    },
    nameRules: [(v) => !!v || "Nombre es requerido"],
    imagenRules: [(v) => !!v || "URL es requerida"],
    cuposRules: [
      (v) =>
        (v !== "" && typeof v === "number") ||
        "El numero de cupos es requerido",
    ],
    inscritosRules: [
      (v) =>
        v !== "" || typeof v === "number" || "numero de inscritos es requerido",
    ],
    duracionRules: [(v) => !!v || "ingrese la duracion"],
    costoRules: [
      (v) => (v !== "" && typeof v === "number") || "el costo es requerido",
    ],
    codigoRules: [(v) => !!v || "ingrese el codigo"],
    descripcionRules: [(v) => !!v || "la descripcion es requerida"],
    fechaRules: [(v) => !!v || "ingrese la fecha"],
  }),
  computed: {
    cursoTerminado() {
      return this.nuevoRecurso.Estado;
    },
    inscritosCurso(){
      return this.nuevoRecurso.Inscritos;
    }
    
  },
  //si curso esta finalzado automaticamente pasa a falso y modifica los inscritos
  watch: {
    cursoTerminado(value) {
      if (!value) {
        this.nuevoRecurso.Inscritos = 0;
      }
    },
    //value toma el valor que toma la computada con el mismo nombre
    inscritosCurso(value){
      if(value > this.nuevoRecurso.Cupos){
         alert("El número de inscritos no debe ser superior a numero de cupos");
         this.nuevoRecurso.Inscritos = this.nuevoRecurso.Cupos
      }
    }

  },
  created() {
    const id = this.$route.params.id;
    const {
      Codigo,
      Nombre,
      Estado,
      Costo,
      Duracion,
      Descripcion,
      Cupos,
      Inscritos,
      Imagen,
      Fecha,
    } = this.$store.getters.get_buscarCurso(id);
    console.log(id);
    this.nuevoRecurso.id = id;
    this.nuevoRecurso.Nombre = Nombre;
    this.nuevoRecurso.Estado = Estado;
    this.nuevoRecurso.Costo = Costo;
    this.nuevoRecurso.Codigo = Codigo;
    this.nuevoRecurso.Duracion = Duracion;
    this.nuevoRecurso.Descripcion = Descripcion;
    this.nuevoRecurso.Cupos = Cupos;
    this.nuevoRecurso.Inscritos = Inscritos;
    this.nuevoRecurso.Imagen = Imagen;
    this.nuevoRecurso.Fecha = Fecha.toDate().toISOString().substr(0, 10);
  },
  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
    regresar() {
      this.$router.push({ name: "Administracion" });
    },
    async enviar() {
      await this.$store.dispatch("editarCursos", {
        ...this.nuevoRecurso,
        Fecha: new Date(this.nuevoRecurso.Fecha),
      });
      this.$router.push({ name: "Administracion" });
      alert("el curso se actualizo correctamente");
    },
   
  },
};
</script>
<style scoped>
#edit {
  margin: 15px;
  padding: 5px;
}
</style>