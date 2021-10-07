<template>
  <div id="listaCurso">
    <v-data-table
      :headers="headers"
      :items="RecursosConFormato"
      sort-by="Nombre"
      class="elevation-1"
      id="tabla"
    >
      <template v-slot:top>
        <v-toolbar flat>
         
           <v-toolbar-title class="mx-auto text-h2" >Administración</v-toolbar-title>
          
          <v-dialog v-model="dialog" max-width="500px">
             
            <template  v-slot:activator="{ on, attrs }">
             
              <v-btn  color="primary" dark  v-bind="attrs" v-on="on">
                Agregar Curso
              </v-btn>
            </template>
            <v-form ref="form" v-model="valid">
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model.trim="editedItem.Codigo"
                          :rules="codigoRules"
                          label="Codigo Curso"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model.trim="editedItem.Nombre"
                          label="Nombre Curso"
                          :rules="nameRules"
                        ></v-text-field>
                      </v-col>
                      
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        type="Number"
                          v-model.trim.number="editedItem.Costo"
                          :rules="costoRules"
                          label="Costo"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                       
                          v-model.trim="editedItem.Duracion"
                          :rules="duracionRules"
                          label="Duración"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model.trim="editedItem.Descripcion"
                          :rules="descripcionRules"
                          label="Descripción"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        type="Number"
                          v-model.trim.number="editedItem.Cupos"
                          label="Cupos"
                          :rules="cuposRules"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                        type="Number"
                          v-model.trim.number="editedItem.Inscritos"
                          :rules="inscritosRules"
                          label="Inscritos"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model.trim="editedItem.Imagen"
                          :rules="imagenRules"
                          label="Imagen"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                  class="mr-4"
                    color="success"
                    
                    @click="dialogoGuardado = true"
                    :disabled="!valid"
                  >
                    Agregar
                  </v-btn>
                  <v-btn color="warning" class="mr-4" @click="reset">
                    Limpiar Formulario
                  </v-btn>
                  <v-btn color="error" class="mr-4" @click="close">
                    Cancelar
                  </v-btn>
                  
                  
                </v-card-actions>
              </v-card>
            </v-form>
          </v-dialog>
          <v-dialog v-model="dialogDelete" max-width="500px">
            <v-card>
              <v-card-title class="text-h5"
                >Esta seguro que desea eliminar el curso
                seleccionado</v-card-title
              >
              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="blue darken-1" text @click="closeDelete"
                  >Cancelar</v-btn
                >
                <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                  >sí,borrar</v-btn
                >

                <div>
                  <div class="text-center">
                    <v-btn
                      v-if="!alert"
                      color="deep-purple accent-4"
                      dark
                      @click="alert = true"
                    >
                      Reset
                    </v-btn>
                  </div>
                </div>

                <v-spacer></v-spacer>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.actions="{ item }">
        <router-link 
        style="text-decoration:none"
          class="mr-2"
          @click="editarCurso(item)"
          :to="{
            name: 'Edit',
            params: {
              id: item.id,
            },
          }"
        >
          <v-icon> mdi-pencil </v-icon>
        </router-link>

        <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
      </template>
      <!-- <template v-slot:no-data>
      <v-btn color="primary" @click="initialize"> Reset </v-btn>
    </template> -->
    </v-data-table >
    <v-row justify="center">
      <v-dialog v-model="dialogoGuardado" persistent max-width="290">
        <v-card>
          <v-card-title class="text-h6"> Desea agregar el curso </v-card-title>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="dialogoGuardado = false">
              Cancelar
            </v-btn>
            <v-btn color="green darken-1" text @click="save"> Agregar </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>

    <div id="alertas">
      <v-alert dense outlined color="purple">
        <v-icon class="icono" color="purple">mdi-account-group</v-icon>
        Cantidad total de alumnos permitidos:
        <strong>{{ cantidadCupos }}</strong> alumnos
      </v-alert>
      <v-alert dense outlined color="blue lighten-1" >
       <v-icon class="icono" color="blue lighten-1">mdi-account-multiple-check</v-icon> 
      Cantidad total de alumnos inscritos:
        <strong>{{ cantidadAlumnosInscritos }}</strong> alumnos
      </v-alert>
      <v-alert dense outlined color="red darken-3">
        <v-icon class="icono" color="red darken-3">mdi-account-clock</v-icon>
        Cantidad total de cupos restantes:
        <strong>{{ cantidadCupos - cantidadAlumnosInscritos }}</strong> alumnos
      </v-alert>
      <v-alert dense outlined color="pink accent-2">
        <v-icon class="icono" color="pink accent-2">mdi-block-helper</v-icon>
        Cantidad total de cursos terminados:
        <strong>{{ cantidadCursosTerminados }}</strong> cursos
      </v-alert>
      <v-alert dense outlined   color="brown darken-1">
        <v-icon class="icono" color="brown darken-1">mdi-bell-ring</v-icon>
        Cantidad total de cursos activos:
        <strong>{{ cantidadCursosTotal - cantidadCursosTerminados }}</strong>
        cursos
      </v-alert>
      <v-alert dense outlined  color="orange darken-4">
        <v-icon class="icono" color="orange darken-4">mdi-bell-ring</v-icon>
        Cantidad total de cursos:
        <strong>{{ cantidadCursosTotal }}</strong> cursos
      </v-alert>
    </div>
  </div>
</template>
<script>
export default {
  props: ["recursos", "item"],
  data: () => ({
    alert: true,
    dialog: false,
    dialogoGuardado: false,
    valid: false,
    dialogDelete: false,
    idEliminado: null,
    headers: [
      {
        text: "Nombre",
        align: "start",
        sortable: false,
        value: "Nombre",
      },
      { text: "Cupos", value: "Cupos" },
      { text: "Inscritos", value: "Inscritos" },
      { text: "Duracion", value: "Duracion" },
      { text: "Costo", value: "Costo" },
      { text: "Terminado", value: "Estado" },
      { text: "Fecha", value: "Fecha" },
      { text: "Acciones", value: "actions", sortable: false },
    ],
    recursosTabla: [
      {
        Codigo: "",
        Nombre: "",
        Estado: true,
        Costo: 0,
        Duracion: "",
        Descripcion: "",
        Cupos: 0,
        Inscritos: 0,
        Imagen: "",
      },
    ],
    editedIndex: -1,
    editedItem: {
      Codigo: "",
      Nombre: "",
      Estado: false,
      Costo: 0,
      Duracion: "",
      Descripcion: "",
      Cupos: 0,
      Inscritos: 0,
      Imagen: "",
    },
    nameRules: [(v) => !!v || "Nombre es requerido"],
    imagenRules: [(v) => !!v || "URL es requerida"],
    cuposRules: [
      (v) =>
        v !== "" || typeof v === "number" || "El numero de cupos es requerido",
    ],
    inscritosRules: [
      (v) =>
        v !== "" || typeof v === "number" || "numero de inscritos es requerido",
    ],
    duracionRules: [(v) => !!v || "ingrese la duracion"],
    costoRules: [
      (v) => v !== "" || typeof v === "number" || "el costo es requerido",
    ],
    codigoRules: [(v) => !!v || "ingrese el codigo"],
    descripcionRules: [(v) => !!v || "la descripcion es requerida"],

    // defaultItem: {
    //   Codigo: "",
    //   Nombre: "",
    //   Estado: true,
    //   Costo: 0,
    //   Duracion: "",
    //   Descripcion: "",
    //   Cupos: 0,
    //   Inscritos: 0,
    //   Imagen: "",
    // },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "Agregando curso" : "Edit Item";
    },
    RecursosConFormato() {
      return this.recursos.map((recurso) => {
        return { ...recurso, Fecha: recurso.Fecha.toDate() };
      });
    },
    cantidadCupos() {
     return this.$store.getters.cantidadCupo
    },
    cantidadAlumnosInscritos() {
      return this.recursos.reduce(
        (acu, obj) => acu + parseInt(obj.Inscritos),
        0
      );
    },
    cantidadCursosTerminados() {
      const terminado = this.recursos.filter((p) =>
        p.Estado === true ? 1 : 0
      );
      return terminado.reduce((acu, obj) => acu + obj.Estado, 0);
    },

    cantidadCursosTotal() {
      const terminado = this.recursos.length;
      return terminado;
    },
    inscritosCurso(){
      return this.editedItem.Inscritos;
    }
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
     inscritosCurso(value){
      if(value > this.editedItem.Cupos){
         alert("El número de inscritos no debe ser superior a numero de cupos");
         this.editedItem.Inscritos = this.editedItem.Cupos
      }
    }
  },
  methods: {
    deleteItem(item) {
      this.editedIndex = this.recursosTabla.indexOf(item);
      // this.editedItem = Object.assign({}, item);
      // console.log(item);
      this.idEliminado = item.id;
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.recursosTabla.splice(this.editedIndex, 1);
      this.closeDelete();
      this.$store.dispatch("eliminarCursos", this.idEliminado);
      alert("El curso fue eliminado correctamente");
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        // this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      this.validate();
      if (this.valid) {
        this.$store.dispatch("agregarCursos", this.editedItem);
        this.dialogoGuardado = false;
        // Object.assign(this.recursosTabla[this.editedIndex], this.editedItem);
      }
      // this.recursosTabla.push(this.editedItem);
      // console.log(this.editedItem);

      this.close();
    },
    validate() {
      this.$refs.form.validate();
    },
     reset () {
        this.$refs.form.reset()
      },
  },
};
</script>
<style scoped>
#tabla{
margin-left: 10px;
padding: 10px;
}
#alertas{
  margin-top: 50px;
  padding: 10px;
  

}
.icono{
  padding-right: 7px;
}
#tituloTabla{
  text-align: center;
}
#botonAgregar{
  text-align: center;
}
</style>