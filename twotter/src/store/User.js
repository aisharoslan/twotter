// User state module
export const UserModule = {
    namespaced: true,

    state: {
        user: null
    },
    
    getters: {
    },
    
    // mutations are function affect the STATE - only called by actions, not directly - convention all caps
    mutations: {
        SET_USER(state, user) { // user we pass in
          state.user = user;
        }
    },
    
    // actions are functions that you call throughout your application that calls mutations, commit - helper obj to reference mutation
    actions: {
        setUser({ commit }, user) {
          commit('SET_USER', user);
        }
    },
}