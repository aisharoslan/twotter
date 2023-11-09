<!-- vue router 
single page application, not refreshing/loading new page, still same page, so we fake diff pages using js and changing elements, but it's actually j one page as far as browser is concerned, it's j dynamically changing all the time with fake links, router - library/tools to pretend to go to diff pages, even twitter is a diff page, just changing content and url changes but browser doesnt change page - using router !  vue cli will auto give u the compatible router -->
<!-- State Management with Vuex - Vue's version of Redux -->
<template>
  <div id="app">
    <nav>
      <router-link to="/">
        <div class="navigation__logo">
          Twotter
        </div>
      </router-link>
      <div class="navigation__user" v-if="user">
        {{ user.username }} <!-- trying to load this before user is set - error, so just add the v-if="user" to check if user exists yet or nah -->
      </div>
    </nav>
    <!-- <UserProfile/> -->
    <router-view/> <!-- going to be injected with whatever page we're on based on router under the nav bar -->
  </div>
</template>

<script>
// import { reactive } from 'vue'; // vue composition api
// import UserProfile from "./components/UserProfile"; // it's a page now, not a component anymore, so won't be rendered as a component
import { useStore } from 'vuex';
import { computed } from 'vue';

export default {
  name: 'App',
  // components: { UserProfile },
  setup() {
    // const state = reactive({
    //   user: {
    //     username: 'Shasbrna_19'
    //   }
    // })
    const store = useStore(); //useStore() func to give me store rather than import the whole store like in index.js of router

    const user = computed(() => store.state.User.user); // this user var holds our user from the store, existing within UserModule

    return {
      user
    }
  }
}
</script>

<style lang="scss"> // need this lang for global scss styling
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  min-height: 100vh;
  background-color: #F3F5FA;

  nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 5%;
    background-color: rebeccapurple;
    color: white;

    .navigation__logo {
      font-weight: bold;
      font-size: 24px;
    }

    .navigation__user {
      font-weight: bold;
    }
  }
}
</style>