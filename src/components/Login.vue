
  <template>
  <div>
    
    <v-form @submit.prevent="Login">
      <v-container>
        <h1 class="mt-6 mb-6"> Login de Usuario</h1>
        <v-row>
          <v-col cols="12" md="8">
            <v-text-field
              v-model="email"
              label="E-mail"
              required
            ></v-text-field>
          </v-col>
 </v-row>
 <v-row>
           <v-col cols="12" md="8">
            <v-text-field
              v-model="password"
              label="Password"
              type="password"
              required
            ></v-text-field>
          </v-col>
        </v-row>
      </v-container>

      <v-container class="text-center">
        <v-btn color="success" class="mr-4" @click="Login"> Iniciar </v-btn>

        <v-btn color="error" class="mr-4"> Limpiar Formulario </v-btn>

        <v-btn color="warning"> Limpiar Validacion </v-btn>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebaseApp from "@/config/firebase.js";
import { mapActions } from "vuex";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  name: "Login",

  props: {
    msg: String,
  },

  methods: {
    Login() {
      const auth = getAuth(firebaseApp);

      signInWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;
          this.$store.commit("Guardar_email", this.email);
          this.$router.push("/");

          console.log(user);
        })

        .catch((error) => {
          console.log(error);
          const errorCode = error.code;

          const errorMensaje = error.Message;

          console.log(`error código ${errorCode}: ${errorMensaje}`);
        });
    },
    GuardarEmail() {
      this.$store.commit("Guardar_email", this.email);
      this.email = "";
    },
    ...mapActions(["setEmail"]),
  },
};
</script>



<style scoped lang="scss">
h3 {
  margin: 40px 0 0;
}

ul {
  list-style-type: none;

  padding: 0;
}

li {
  display: inline-block;

  margin: 0 10px;
}

a {
  color: #42b983;
}
</style>
