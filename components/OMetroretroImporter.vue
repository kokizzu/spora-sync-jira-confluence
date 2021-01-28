<template lang="pug">
  .retro-importer
    h2 Import Metro Retro to Confluence
    .retro-importer__editor: codemirror(
      v-model="json"
      :options="cmOption"
      )

    div(style="margin-top:24px")
      vs-button(
        square
        flat
        gradient
        color="#2e3540"
        size="default"
        @click.native="doImport"
        ) Import to Confluence
</template>

<script>
import axios from 'axios';

export default {
  data: () => ({
    json: '',
    cmOption: {
      tabSize: 4,
      styleActiveLine: true,
      lineNumbers: true,
      line: true,
      foldGutter: true,
      styleSelectedText: true,
      mode: 'text/javascript',
      keyMap: 'sublime',
      matchBrackets: true,
      showCursorWhenSelecting: true,
      theme: 'idea',
      extraKeys: { Ctrl: 'autocomplete' },
      hintOptions: {
        completeSingle: false,
      },
    },
  }),

  methods: {
    async doImport () {
      await axios.post('/api/post-metroretro', {
        json: window.btoa(this.json),
      });
    },
  },
};

</script>

<style lang="scss" scoped>
.retro-importer {
  &__editor {
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
  }

  /deep/ {
    .CodeMirror {
      height: 450px !important;
    }

    .CodeMirror-hscrollbar,
    .CodeMirror-vscrollbar {
      display: none !important;
    }
  }
}
</style>
