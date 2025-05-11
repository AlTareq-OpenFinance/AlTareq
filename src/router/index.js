import { createRouter, createWebHistory } from "vue-router";
import PageWrapper from "../layouts/PageWrapper.vue";

import ConsentSetup from "../views/ConsentSetup.vue"
import RedirectScreen from "../views/RedirectScreen.vue"

// BDSP
import DataPermissions from "../views/DataPermissions.vue"
import BankDataRequests from "../views/BankDataRequests.vue"

// SIP
import SIPpermissions from "../views/SIPPermissions.vue"
import SIPRequest from "../views/SIPRequest.vue"

// Multi Payments
import VRPPermissions from "../views/VRPPermissions.vue"
import VRPRequests from "../views/VRPRequests.vue"


import OpenProductRequests from "../views/OpenProductRequests.vue"

// Callback
import CallBack from "../views/CallBack.vue"
import Success from "../views/Success.vue"
import VRPSuccess from "../views/VRPSuccess.vue"
import SIPSuccess from "../views/SIPSuccess.vue"


import Failed from "../views/Failed.vue"

import NotFound from "../views/NotFound.vue"

const routes = [
  {
    path: "/",
    component: PageWrapper,
    children: [

      {
        path: "",
        name: "consent-setup",
        component: ConsentSetup,
      },

      
      {
        path: "/data-permissions",
        name: "data-permissions",
        component: DataPermissions,
      },

      {
        path: "/sip-permissions",
        name: "sip-permissions",
        component: SIPpermissions,
      },

      {
        path: "/vrp-permissions",
        name: "vrp-permissions",
        component: VRPPermissions,
      },

      {
        path: "/callback",
        name: "callback",
        component: CallBack,  
      },

      {
        path: "/success/:state",
        name: "success",
        component: Success,  
      },

      {
        path: "/vrp-success/:state",
        name: "vrp-success",
        component: VRPSuccess,  
      },

      {
        path: "/sip-success/:state",
        name: "sip-success",
        component: SIPSuccess,
      },

      {
        path: "/failed",
        name: "failed",
        component: Failed,  
      },



      {
        path: "/bank-data-requests/:state",
        name: "bank-data-requests",
        component: BankDataRequests,  
      },

      {
        path: "/sip-request/:state",
        name: "sip-request",
        component: SIPRequest  
      },

      {
        path: "/vrp-requests/:state",
        name: "vrp-requests",
        component: VRPRequests  
      },


      {
        path: "/open-product-requests",
        name: "open-product-requests",
        component: OpenProductRequests,  
      },

      {
        path: "/:catchAll(.*)",
        name: "not-found",
        component: NotFound
      },
    ],
  },
  {
    path: "/redirect-screen",
    name: "redirect-screen",
    component: RedirectScreen,
  },
];

const router = createRouter({
  scrollBehavior(to, from, savedPosition) {
    // always scroll to top
    return { top: 0 }
  },
  history: createWebHistory(),
  routes,
});
export default router;
