import { createApp } from "vue";
import { createPinia } from "pinia";
import piniaPluginPersistedstate from "pinia-plugin-persistedstate";
import axios from "axios";
import VueAxios from "vue-axios";

// @ts-ignore
import LvInput from "lightvue/input";
// @ts-ignore
import LvTextarea from "lightvue/textarea";
// @ts-ignore
import LvButton from "lightvue/button";
// @ts-ignore
import LvCard from "lightvue/card";
// @ts-ignore
import LvBadge from "lightvue/badge";
// @ts-ignore
import LvCollapsible from 'lightvue/collapsible';

import UUID from "vue3-uuid";

// @ts-ignore
import { Quasar, Notify } from "quasar";
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

app
  .component('LvInput', LvInput)
  .component('LvTextarea', LvTextarea)
  .component('LvButton', LvButton)
  .component('LvCard', LvCard)
  .component('LvBadge', LvBadge)
  .component('LvCollapsible', LvCollapsible)

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
