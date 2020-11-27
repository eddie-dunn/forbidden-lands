<script lang="ts">
import Vue from "vue"

export default Vue.extend({
  name: "Fallback",
  props: {
    error: Error,
  },
  methods: {
    downloadBackup: () => {
      alert("NOT IMPLEMENTED")
    },
  },
  created() {
    throw this.error
  },
})
</script>

<template>
  <div class="home">
    <p>Unfortunately, the app encountered an unexpected error. :(</p>
    <p>
      If you require assistance, please do the following:
    </p>

    <ol>
      <li v-if="false">
        <button @click="downloadBackup">Download backup</button>
      </li>
      <li>
        Copy the full stack trace below and save it to a file:
      </li>
      <li>
        <pre class="stack-trace"
          >{{ String(error) }}{{ String(error.stack) }}
          </pre
        >
      </li>

      <li>
        Send an email to
        <a href="mailto:forbidden.lands.companion@gmail.com"
          >forbidden.lands.companion@gmail.com</a
        >
        with the data attached.
      </li>
    </ol>
  </div>
</template>

<style scoped lang="less">
.stack-trace {
  max-height: 300px;
  overflow: auto;
}
</style>
