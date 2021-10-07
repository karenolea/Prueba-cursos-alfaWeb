<template>
  <div>
   
    <v-form>
      
      <v-container>
         <h1 class="  mt-6 mb-6">Registro de Usuario</h1>
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
        <v-btn color="success" class="mr-4" @click.prevent="registrar">
          Registrar
        </v-btn>

        <v-btn color="error" class="mr-4" @click="reset">
          Limpiar Formulario
        </v-btn>

        <v-btn color="warning" @click="resetValidation">
          Limpiar Validacion
        </v-btn>
      </v-container>
    </v-form>
  </div>
</template>
<script>
import firebaseApp from "@/config/firebase.js";

import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";

export default {
  data() {
    return {
      email: "",

      password: "",
    };
  },

  name: "Registrar",

  props: {
    msg: String,
  },

  methods: {
    registrar() {
      const auth = getAuth(firebaseApp);

      createUserWithEmailAndPassword(auth, this.email, this.password)
        .then((userCredential) => {
          const user = userCredential.user;

          this.$router.push("/login");

          console.log(user);
        })

        .catch((error) => {
          const errorCode = error.code;

          const errorMensaje = error.Message;

          console.log(`error código ${errorCode}: ${errorMensaje}`);
        });
    },

    reset() {},

    resetValidation() {},
  },
};
</script>



<style scoped lang="scss">


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