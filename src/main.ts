import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import axios from "axios";
import VueAxios from "vue-axios";
import { Quasar, Notify } from "quasar";
import UUID from "vue3-uuid";

// Import icon libraries
import "@quasar/extras/material-icons/material-icons.css";

// Import Quasar css
import "quasar/src/css/index.sass";

import App from "./App.vue";
import Default from "./layouts/default/Default.vue";
import Card from "./components/CardItem.vue";
import SkeletonCard from "./components/SkeletonCardItem.vue";
import Breadcrumb from "./components/BreadCrumb.vue";
import Onboarding from "./layouts/onboarding/OnboardingLayout.vue";
import router from "./router";

import "./assets/main.css";

const pinia = createPinia();
pinia.use(piniaPluginPersistedstate);

const app = createApp(App);

app
  .component("CardItem", Card)
  .component("SkeletonCardItem", SkeletonCard)
  .component("BreadCrumb", Breadcrumb)
  .component("LayoutDefault", Default)
  .component("LayoutOnboarding", Onboarding);

app.use(Quasar, {
  plugins: {
    Notify,
  }, // import Quasar plugins and add here
});
app.use(UUID);
app.use(pinia);
app.use(router);
app.use(VueAxios, axios);
app.mount("#app");
