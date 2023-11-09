import { createStore } from 'vuex';
import { UserModule } from './User';

export default createStore({
  state: {},
  getters: {},
  // mutations are function affect the STATE - only called by actions, not directly - convention all caps
  mutations: {},
  // actions are functions that you call throughout your application that calls mutations, commit - helper obj to reference mutation
  actions: {},
  modules: { // modularizing store
    User: UserModule // module named User
  }
})
