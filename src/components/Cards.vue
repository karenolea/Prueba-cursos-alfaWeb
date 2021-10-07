<template>
  <div>
    <v-container class="grey lighten-5">
      <v-card class="mx-auto" max-width="400" color="grey lighten-4">
        <v-card white flat align="center" justify="center" class="py-2">
          <v-img
            :src="recurso.Imagen"
            gradient="to top, rgba(0,0,0,.44), rgba(0,0,0,.44)"
            height="250px"
            max-width="200px"
            aspect-ratio="2"
          >
          </v-img>
        </v-card>
        <v-card-text>
          <v-list-item-title class="py-1">{{
            recurso.Nombre
          }}</v-list-item-title>
          <v-list-item-subtitle>información</v-list-item-subtitle>
          <v-timeline align-top dense>
            <v-timeline-item color="purple darken-2" small>
              <v-row class="pt-1">
                <v-col cols="6">
                  <span><strong>Costo:</strong></span>
                  <v-spacer></v-spacer>
                  <span><strong>Duracion:</strong></span>
                </v-col>

                <v-col>
                  <strong>{{ recurso.Costo }}</strong>

                  <div class="text-caption">{{ recurso.Duracion }}</div>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="green accent-3" small>
              <v-row class="pt-1">
                <v-col cols="6">
                  <span><strong>Cupos:</strong></span>
                  <v-spacer></v-spacer>
                  <span><strong>Completado:</strong></span>
                </v-col>

                <v-col>
                  <strong>{{ recurso.Cupos }}</strong>

                  <div class="text-caption">
                    {{ recurso.Completado }}
                  </div>
                </v-col>
              </v-row>
            </v-timeline-item>
            <v-timeline-item color="purple darken-2" small>
              <v-row class="pt-1">
                <v-col cols="6">
                  <span><strong>Fecha de Registro:</strong></span>

                  <v-spacer></v-spacer>

                  <div class="text-caption">{{ recurso.Fecha }}</div>
                </v-col>
              </v-row>
            </v-timeline-item>

            <v-timeline-item color="green accent-3" small>
              <v-row class="pt-1">
                <v-col cols="6">
                  <strong>Descripción:</strong>

                  <v-spacer></v-spacer>

                  <div class="text-caption">{{ recurso.Descripcion }}</div>
                </v-col>
              </v-row>
            </v-timeline-item>
          </v-timeline>
        </v-card-text>
      </v-card>
    </v-container>
  </div>
</template>

  

<script>
export default {
  name: "Cards",
  props: ["recurso"],
  computed: {},
};
</script>

<style>
</style>