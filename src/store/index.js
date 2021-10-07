import Vue from 'vue';
import Vuex from 'vuex';
import app from '@/config/firebase.js';
import { getFirestore, collection, getDocs, addDoc, doc, updateDoc, deleteDoc, serverTimestamp } from 'firebase/firestore/lite'
const db = getFirestore(app)


Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    recursos: [],
    emails: '',
  },
  mutations: {
    Guardar_recursos(state, recursosNuevos) {
      const array = []
      recursosNuevos.forEach(curso => {
        const data = curso.data()
        array.push({ id: curso.id, ...data })
      });
      state.recursos = array
    },

    Guardar_email(state, email) {
      state.emails = email;
    },
    recurso(state, payload) {
      state.recurso = state.recursos.find(item => item.id === payload)
    },
    editarCurso(state, item) {
      console.log('hola');

      const cursoEditado = state.recursos.find(recurso => recurso.id === item.id)
      console.log(cursoEditado);
      cursoEditado.NombreCurso = item.id;
      cursoEditado.NombreCurso = item.Nombre;
      cursoEditado.EstadoCurso = item.Estado;
      cursoEditado.CostoCurso = item.Costo;
      cursoEditado.CodigoCurso = item.Codigo;
      cursoEditado.DuracioCurso = item.Duracion;
      cursoEditado.DescripcionCurso = item.Descripcion;
      cursoEditado.CuposCurso = item.Cupos;
      cursoEditado.InscritosCurso = item.Inscritos;
      cursoEditado.ImagenCurso = item.Imagen;
      cursoEditado.recursoCurso = item.recurso;
    },
    limpiarEmail(state) {
      state.emails = ""
    }
  },
  // actions: {
  //   async get_recursos({ commit }) {
  //     const { data: recursos } = await axios.get('/recursos.json');

  //     commit('Get_recursos', recursos);
  //   },
  // actions: {
  // get_recursos(context) {
  //   // context.commit('loadingTable')
  //   axios.get('https://prueba-alfa-web-aeb29-default-rtdb.firebaseio.com/cursos.json')
  //     .then((accept) => {
  //       let data = accept.data
  //       let datos = []
  //       Object.values(data).forEach((curso, index) => {
  //         curso.id = Object.keys(data)[index]
  //         datos.push(curso)
  //       })
  //       console.log(datos)
  //       context.commit('Get_recursos', datos)
  //     })
  // }
  actions: {

    async getCursos({ commit }) {
      const referencias = collection(db, "Curso")
      const cursos = await getDocs(referencias)
      commit("Guardar_recursos", cursos);

    },

    async agregarCursos({ dispatch }, cursoNuevo) {
      console.log(cursoNuevo)
      const referencias = collection(db, "Curso")
      //se pasa la referencia y en segundo parametro el objeto que se quiere agregar
      //firestore tiene funcion serverTimestamp , ...(desarma el objeto )y luego el metodo anterior lo agrega la fecha 
      const cursos = await addDoc(referencias, { ...cursoNuevo, Fecha: serverTimestamp() })
      dispatch("getCursos")
      console.log(cursos)

    },

    // CargarBaseDatos({ dispatch }) {
    //     let infoCargada = []
    //     fetch("./recursos.json")
    //         .then(respuesta => respuesta.json())
    //         .then(json => { json.forEach(async element => await dispatch("agregarCursos", element)) })
    //         .catch(error => console.log(error));
    //     console.log(infoCargada)
    //         // Para cada Objeto hace un dispatch(agrega nueva info a firestone)
    // },

    async editarCursos({ dispatch }, recurso) {
      //busca referencia al doc que se quiere editar
      const referencia = doc(db, 'Curso', recurso.id)
      //Editar el doc 
      await updateDoc(referencia, recurso)
      //busca en la base todos los recursos actualizados
      dispatch('getCursos')
    },

    async eliminarCursos({ dispatch }, recursoId) {
      //busca referencia al doc que se quiere editar
      const referencia = doc(db, 'Curso', recursoId)
      //Editar el doc 
      await deleteDoc(referencia)
      //busca en la base todos los recursos actualizados
      dispatch('getCursos')
    }
  },
  getters: {
    get_recursos: (state) => {
      return state.recursos;
    },
    get_email: (state) => {
      return state.emails;
    },
    get_buscarCurso: (state) => (id) => {
      const recurso = state.recursos.find((p) => p.id == id)
      return recurso;
    },
    cantidadCupo:(state) =>{
      return state.recursos.reduce((acu, obj) => acu + parseInt(obj.Cupos), 0);
    }


  },
});
