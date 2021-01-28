<template lang="pug">
  div
    vs-sidebar(v-model="activeTab" reduce open right)
      template(#logo)
        img(src="https://s1.bukalapak.com/ast/sigil/preproduction/bukalapak-logo-icon.svg")

      vs-sidebar-item(id="import-funretro" to="/")
        template(#icon)
          img(src="/images/funretro-icon.png" style="width:20px;height:20px")
        | Import Funretro
      vs-sidebar-item(id="import-metroretro" to="/import-metroretro")
        template(#icon)
          img(src="/images/metroretro-icon.png" style="width:28px;height:28px")
        | Import Metro Retro

      vs-sidebar-item(id="jira-to-confluence" to="/")
        template(#icon): i.bx.bx-traffic-cone
        | JIRA to Confluence
      vs-sidebar-item(id="confluence-to-jira" to="/")
        template(#icon): i.bx.bx-traffic-cone
        | Confluence to JIRA

    .content: nuxt
</template>

<script>
const LOADING_TYPES = [
  'default',
  'waves',
  'corners',
  'border',
  'points',
  'square',
  'gradient',
  'rectangle',
  'circles',
  'square-rotate',
  'scale',
];

export default {
  middleware: 'auth',

  data: () => ({
    activeTab: '',
  }),

  watch: {
    $route: {
      immediate: true,
      handler ({ name = '' } = {}) {
        this.activeTab = name;
      },
    },
  },

  created () {
    this.$vs.load = options => (
      this.$vs.loading({
        type: LOADING_TYPES[Date.now() % LOADING_TYPES.length],
        ...options,
      })
    );
  },
};
</script>
