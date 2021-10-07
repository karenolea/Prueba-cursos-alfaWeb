    <template>
  <!-- <div>
      <v-toolbar color="deep-purple" dark prominent>
        <v-app-bar-nav-icon></v-app-bar-nav-icon>

        <v-toolbar-title>Cursos AlfaWEB</v-toolbar-title>

        <v-spacer></v-spacer>

        <router-link to="/"
          ><v-btn icon class="text-decoration-overlin">Home</v-btn></router-link
        >

        <v-spacer></v-spacer>

        <router-link to="/login"
          ><v-btn icon class="text-decoration-overlin"
            >Login
          </v-btn></router-link
        >

        <v-spacer></v-spacer>

        <router-link to="/registrar"
          ><v-btn icon class="text-decoration-overlin"
            >Registrar</v-btn
          ></router-link
        >

        <v-spacer></v-spacer>

        <router-link :to="{ name: 'Administracion' }"
          ><v-btn icon class="text-decoration-overlin"
            >Administracion
          </v-btn></router-link
        >

        <v-spacer></v-spacer>

        <v-btn icon @click="logout">
          <v-icon> {{ email }}</v-icon>
        </v-btn>
        <v-btn icon @click="logout">
          <v-icon> mdi-export</v-icon>
        </v-btn>
      </v-toolbar>
    </div> -->

  <div>
    <v-card class="mx-auto overflow-hidden">
      <v-app-bar color=" deep-purple darken-1" dark>
        <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
        <v-toolbar-title>Cursos AlfaWeb</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-btn class="px-5" v-if="email" text color="white" x-small @click="logout">
          <v-list-item >{{ email }} </v-list-item>
          <v-icon class="px-5"> mdi-export</v-icon>
        </v-btn>
        <!-- <v-btn v-else icon >
          <v-icon> mdi-export</v-icon>
        </v-btn> -->
      </v-app-bar>
    </v-card>

    <v-navigation-drawer v-model="drawer" absolute temporary class="blue-grey lighten-5">
      <v-list dense nav class="text-center">
        <v-list-item-group
          v-model="group"
          class="deep-purple--text text--accent-4  "
        >
          <v-list-item-title class="my-1">
            <router-link style="text-decoration:none" to="/"
              ><v-btn  class="text-decoration-overlin white--text" block color="deep-purple lighten-1"
                >Home</v-btn
              ></router-link
            >
          </v-list-item-title>

          <v-list-item-title class="my-1">
            <router-link style="text-decoration:none" to="/login"
              ><v-btn class="text-decoration-overlin  white--text" block color="deep-purple lighten-1"
                >Login
              </v-btn></router-link
            >
          </v-list-item-title>

          <v-list-item-title class="my-1">
            <router-link style="text-decoration:none" to="/registrar"
              ><v-btn class="text-decoration-overlin  white--text" block color="deep-purple lighten-1"
                >Registrar</v-btn
              ></router-link
            >
          </v-list-item-title>

          <v-list-item-title class="my-1">
            <router-link style="text-decoration:none" :to="{ name: 'Administracion' }"
              ><v-btn class="text-decoration-overlin  white--text" block color="deep-purple lighten-1"
                >Administración
              </v-btn></router-link
            >
          </v-list-item-title>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
  </div>
</template>
    
 
  
  

<script>
import { getAuth, signOut } from "firebase/auth";
export default {
  data: () => ({
    drawer: false,
    group: null,
  }),
  methods: {
    logout() {
      const autenticacion = getAuth();
      signOut(autenticacion)
        .then(() => {
          alert("sesion cerrada");
          this.$store.commit("limpiarEmail")
          if (this.$route !== "/login") {
            this.$router.push({ name: "Login" });
          }
        })
        .catch((error) => console.log(error));
    },
  },
  computed: {
    email() {
      return this.$store.getters.get_email;
    },
  },
};
</script>

<style>
</style>