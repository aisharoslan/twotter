<!-- <template>
  <div id="app">
    @{{ user.username }} - {{ fullName }} // Don't need to call data(), readily accessible, the {{}} is to show that it's dynamic
    <strong>Followers: </strong> {{ followers }}
    <button @click="followUser">
      Followers
    </button>
  </div>
</template>
-->

<template>
    <div class="user-profile">
      <div class="user-profile__sidebar">
        <div class="user-profile__user-panel">
          <h1 class="user-profile__username">@{{ state.user.username }}</h1>
          <!-- TEMPLATE CONDITIONALS -->
          <!-- <h2> {{ userId }} </h2> -->
          <div class="user-profile__admin-badge" v-if="state.user.isAdmin">
              Admin
          </div>
          <!-- <div class="user-profile__admin-badge" v-else> // no need attribute
              Not Admin
          </div>
          // can also do v-else-if="condition"
          -->
          <div class="user-profile__follower-count">
            <strong>Followers: </strong> {{ state.followers }}
          </div>
        </div>
        <CreateTwootPanel @add-twoot="addTwoot"/>
      </div>
        <!-- will not refresh when submit form/twoot -->
        <!-- <form class="user-profile__create-twoot" @submit.prevent="createNewTwoot" :class="{ '--exceeded': newTwootCharacterCount > 180 }"> submit event - create new twoot, :class means it's gonna be dynamic, not just an ordinary string or wtv, the : gives dynamic, use the class when the condition has been met! css - turn red if > 180 -->
          <!-- give input fields label! -->
          <!-- <label for="newTwoot"><strong>New Twoot</strong> ( {{ newTwootCharacterCount}}/180)</label> to display how many char out of 180, inside the {{}} only object/attr -->
          <!-- <textarea id="newTwoot" rows="4" v-model="newTwootContent"/> -->
          <!-- v-model is to sync up the input and tag, so value of field is synced up to this v-model textarea "tag"-->
          <!-- create 2 types: a draft and a real instant tweet -->
          <!-- <div class="user-profile__create-twoot-type">
            <label for="newTwootType"><strong>Type: </strong></label>
            <select id="newTwootType" v-model="selectedTwootType"> selecting from a few options -->
              <!-- <option :value="option.value" v-for="(option, index) in twootTypes" :key="index"> each object has a value field (dynamic), sets value as selectedTwootType when u choose type -->
                <!-- {{ option.name }} -->
              <!-- </option> -->
              <!-- referencing code or piece of text, not a literals -->
            <!-- </select>
          </div>
          
          <button> -->
            <!-- Twoot! in html, it'd refresh when u submit - we don't want that, so use event @submit.prevent instead of refreshing
          </button>
        </form>
      </div> -->
      <div class="user-profile__twoots-wrapper">
          <!-- {{ user.twoots[0] }}
          {{ user.twoots[1] }} - you can index it but not good to take out 1 by 1 --> 
          <!-- it's gonna render even the div class itself, so each user.twoots element is stored in the variable twoot, it also needs a key/id for the object or do (twoot, index) instead of just twoot which is unique, loop through the list and render -->
          <!-- so we want to create a twoot component for better org -->
          <!-- <div class="user-profile__twoot" v-for="twoot in user.twoots" :key="twoot.id">
            {{ twoot.content }}
          </div> -->
          <!-- if something happens on screen - is event - e.g. when you click on a link - can trigger an event like click -->
          <TwootItem 
            v-for="twoot in state.user.twoots" 
            :key="twoot.id" 
            :username="state.user.username" 
            :twoot="twoot"
          />
          <!-- favourite is an event we emit to the parent -->
          <!-- passing in props and actual twoot object pulled from the for loop -->
        </div>
    </div>
</template>
  
<script>
import { reactive, computed } from 'vue';
import { useRoute } from 'vue-router'; // gives us a route object we can reference
import { users } from "../assets/users";
import TwootItem from "../components/TwootItem";
import CreateTwootPanel from "../components/CreateTwootPanel";

  export default {
    // order doesn't matter in here
    // name: 'App', // this is like key value pairs/
    name: "UserProfile",
    components: { CreateTwootPanel, TwootItem },
    setup() {
      const route = useRoute();
      // computed property - changes depending on what url we're on
      const userId = computed(() => route.params.userId) // use route object param to get userId
      // in rls, check if userId exists, then fetch from API
      // If (userId) fetchUserFromApi(userId)
      const state = reactive({
        followers: 0, // default state
        user: users[userId.value - 1] || users[0] // need to use .value for computed() properties
        // user: { // user object
        //   id: 1,
        //   username: 'Shasbrna_19',
        //   firstName: 'Aisha',
        //   lastName: 'Sabrina',
        //   email: 'aisharoslan@nyu.edu',
        //   isAdmin: true,
        //   twoots: [
        //     { id: 1, content: 'Twotter is Amazing!' },
        //     { id: 2, content: "Don't forget to subscribe!" }
        //   ]
        // }
      })

      function addTwoot(twoot) {
        state.user.twoots.unshift( { id: state.user.twoots.length + 1, content: twoot });
      }

      return { // return to template to use
        state,
        addTwoot,
        userId
      }
    }
    // data() {
    //   return {
    //     // newTwootContent: '',
    //     // selectedTwootType: 'instant', // default type
    //     // twootTypes: [ // an array of 2 objects
    //     //   { value: 'draft', name: 'Draft' },
    //     //   { value: 'instant', name: 'Instant Twoot' }
    //     // ],
    //     // isLoading: false, // interacting w this to know if loading/not
    //     // all this info below is usually given by API
    //     followers: 0, // default state
    //     user: { // user object
    //       id: 1,
    //       username: 'Shasbrna_19',
    //       firstName: 'Aisha',
    //       lastName: 'Sabrina',
    //       email: 'aisharoslan@nyu.edu',
    //       isAdmin: true,
    //       twoots: [
    //         { id: 1, content: 'Twotter is Amazing!' },
    //         { id: 2, content: "Don't forget to subscribe!" }
    //       ]
    //     }
    //   }
    // },
    // watch: {
    //   // watches a data point - if it changes, runs a function, esp when u have data that changes REACTIVELY based off of other things
    //   followers(newFollowerCount, oldFollowerCount) {
    //     if (oldFollowerCount < newFollowerCount) { // only if gain follower
    //       console.log(`${this.user.username} has gained a follower!`)
    //       // same user component but putting diff data into it
    //     }
    //     // if username or id is diff - then we wanna fetch new user data
    //   }
    // },
    // computed property - 1 data point generated/built reactively from other factors 
    // computed: { 
    //   fullName() {
    //     return `${this.user.firstName} ${this.user.lastName}` // calls the user object in data() - this is a string literal
    //     // another option: this.user.firstName + this.user.lastName
    //   },
    //   // dyanmically update when char count is changed // DYNAMIC STYLING for css - changes style based on whether data is diff or not
    //   newTwootCharacterCount() {
    //     return this.newTwootContent.length; // how many characters in that string or if a list, how many things/objects in that list
    //   }

    // },
    // methods: { // doesn't run by itself, need to call
    //   addTwoot(twoot) {
    //     this.user.twoots.unshift( { id: this.user.twoots.length + 1, content: twoot });
    //   }
    // }
      // followUser() {
      //   this.followers++; // adds followers count by 1
      // },
      // toggleFavourite(id) {
      //   console.log(`Favourited Tweet #${id}`)
      // },
    //   createNewTwoot() {
    //     if (this.newTwootContent && this.selectedTwootType !== 'draft') { 
    //     // check if content is not '' and twoot type is not draft, !== for js, then create new user and add to the FRONT - unshift() in js
    //       this.user.twoots.unshift( {
    //       id: this.user.twoots.length + 1,
    //       content: this.newTwootContent
    //       })
    //     }
    //     this.newTwootContent = ''; // to empty the box after twooting
    //   }
    // },
    // LIFECYCLE HOOK - function built into vue interface that runs during diff stages of component's life cycle (e.g. created/mounted/destroyed)
    // basically mounted just runs when the first component is rendered
    // },
    // mounted() {// runs whatever component is loaded for the first time
    //   this.followUser(); // basically calls the followUser() method IMMEDIATELY
    //   // so in a split second, it will add the 1 to the default 0 
    //   // can also do cool stuff like getting user object from API, make API call
    // }
  };
</script>
  
<!-- scoped keyword makes sure that every class in <style> only pertains to this component, NOT for the root App components, use scss with a library/webpack to compile this scss into normal css, why is scss better? for NESTED classes - good for hierarchy and more specific, e.g. h1 for everyone got, but u want a specific one for a component, install webpack using vue ui, lang="scss" alrdy imports it, so now it puts parent class in style declaration when inspect-->
<style lang="scss" scoped>
  // so now, we nest all in this user-profile
  .user-profile {
    display: grid;
    grid-template-columns: 1fr 3fr;
    // width: 100%;
    grid-gap: 50px;
    padding: 50px 5%;

    // child of user-profile
    .user-profile__user-panel {
      display: flex;
      flex-direction: column;
      // margin-right: 50px;
      padding: 20px;
      background-color: white;
      border-radius: 5px;
      border: 1px solid #DFE3E8;
      margin-bottom: auto;

      h1 {
      margin: 0;
      }
  
      // child of user-panel
      .user-profile__admin-badge {
        background: rebeccapurple;
        color: white;
        border-radius: 5px;
        margin-right: auto;
        padding: 0 10px;
        font-weight: bold;
      }
    }
      // .user-profile__create-twoot {
      //   padding-top: 20px;
      //   display: flex;
      //   flex-direction: column;

      //   &.--exceeded { // use &. for a class
      //     color: red;
      //     border-color: red;

      //     button {
      //       background-color: red;
      //       border: none;
      //       color: white;
      //     }
      //   }
      // }
     
    .user-profile__twoots-wrapper {
      display: grid;
      grid-gap: 10px;
      margin-bottom: auto;
    }
  }
  
</style>
  