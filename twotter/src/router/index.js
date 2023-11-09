import { createRouter, createWebHistory } from 'vue-router';
import store from '../store';
import { users } from "../assets/users";
import HomeView from '../views/HomeView.vue';
import UserProfile from "../views/UserProfile";
import AdminView from "../views/AdminView";

const routes = [ // routes is just a variable storing an array of router objects
  {
    path: '/',
    name: 'HomeView',
    component: HomeView // this reads from the import above
  },
  {
    path: '/user/:userId', // : says userId is a vairblae
    name: 'UserProfile',
    component: UserProfile
  },
  {
    path: '/admin',
    name: 'AdminView',
    component: AdminView,
    // if there's meta info, check that requiresAdmin is true
    meta: {
      requiresAdmin: true
    }
  }
  // {
  //   path: '/about',
  //   name: 'about',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  // }
]

const router = createRouter({ // this is where router is created
  history: createWebHistory(),
  routes
})

// router guard - redirect before/after if user not allowed on certain page
// to - where u wanna go, from - where you came from, next - where you're redirected to
router.beforeEach(async(to,from,next) => {
  const user = store.state.User.user // user form store state, default is null

  if (!user) {
    // if no user, fetch from api - rls
    // await is async call
    await store.dispatch('User/setUser', users[0])// dispatch func to call actions in store, pass in the values it needs, need the User/ once create module but within module no need User/
  }

  const isAdmin = true; 
  const requiresAdmin = to.matched.some(record => record.meta.requiresAdmin);

  if (requiresAdmin && !isAdmin) next({ name: 'HomeView' });
  else next();
})

export default router
