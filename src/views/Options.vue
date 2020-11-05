<script lang="ts">
import Vue from "vue"
import { Component } from "vue-property-decorator"
import { SET_PAGE_TITLE } from "@/store/store-types"
import Backup from "@/components/Backup.vue"
import LocaleChanger from "@/components/LocaleChanger.vue"
import { FLButton } from "src/components/base/FLButton.vue"

@Component({
  components: {
    Backup,
    FLButton,
    LocaleChanger,
  },
})
export default class DiceView extends Vue {
  mounted() {
    this.$store?.commit(SET_PAGE_TITLE, "Options")
  }
  update() {
    // window.location.replace("/")
    window.location.reload()
  }
}
</script>

<template>
  <div class="options">
    <h2>{{ $t("Language") }}</h2>
    <LocaleChanger />

    <h2>Data</h2>
    <Backup />
    <h2>Update app</h2>
    <FLButton type="danger" @click="update">Update</FLButton>
  </div>
</template>

<style scoped lang="less">
.options {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  text-align: left;
  margin: 1rem;
}

.options-language {
  margin: 1rem;
}
</style>
