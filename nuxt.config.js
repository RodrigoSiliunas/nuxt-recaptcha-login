export default {
  // Global page headers: https://go.nuxtjs.dev/config-head
  head: {
    title: "Captcha Login",
    htmlAttrs: {
      lang: "pt-BR",
    },
    meta: [
      { charset: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { hid: "description", name: "description", content: "" },
      { name: "format-detection", content: "telephone=no" },
    ],
    link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
  },

  // Global CSS: https://go.nuxtjs.dev/config-css
  css: ["normalize.css/normalize.css"],

  // Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
  plugins: ["@/plugins/acessor"],

  // Auto import components: https://go.nuxtjs.dev/config-components
  components: [{ path: "@/components", pathPrefix: false }],

  // Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
  buildModules: [
    // https://go.nuxtjs.dev/typescript
    "@nuxt/typescript-build",
  ],

  // Modules: https://go.nuxtjs.dev/config-modules
  modules: [
    // https://go.nuxtjs.dev/bootstrap
    "bootstrap-vue/nuxt",
    // https://go.nuxtjs.dev/axios
    "@nuxtjs/axios",
    // https://github.com/nuxt-community/community-modules/tree/master/packages/toast
    "@nuxtjs/toast",
    // https://dev.auth.nuxtjs.org/
    "@nuxtjs/auth-next",
    // https://github.com/nuxt-community/recaptcha-module
    "@nuxtjs/recaptcha",
  ],

  // Axios module configuration: https://go.nuxtjs.dev/config-axios
  axios: {
    baseURL: "http://127.0.0.1:5000",
  },
  // Axios module configuration: https://go.nuxtjs.dev/config-axios

  auth: {
    strategies: {
      local: {
        token: {
          property: "success.access_token",
          global: true,
          // required: true,
          type: "Bearer",
        },
        user: {
          property: "success.profile",
          autoFetch: false,
        },
        endpoints: {
          login: { url: "/api/login", method: "post" },
          logout: { url: "/api/logout", method: "delete" },
          user: { url: "/api/auth", method: "get" },
        },
      },
    },
  },

  toast: {
    position: "top-center",
    register: [
      // Register custom toasts
      {
        name: "my-error",
        message: "Oops...Something went wrong",
        options: {
          type: "error",
        },
      },
    ],
  },

  recaptcha: {
    hideBadge: true, // Hide badge element (v3 & v2 via size=invisible)
    siteKey: "6Ld4wLcfAAAAAEhawK84Ib0qXKzqpqqL6nW-slX7", // Site key for requests
    version: 2, // Version
    size: "normal", // Size: 'compact', 'normal', 'invisible' (v2)
  },

  // Build Configuration: https://go.nuxtjs.dev/config-build
  build: {},
};
