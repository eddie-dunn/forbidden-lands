<template>
  <div class="home">
    <h1>SANDBOX</h1>

    <ExpandableSection label="Vue app info" class="text-center">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </ExpandableSection>

    <ExpandableSection label="Notify" saveStateId="notify-test">
      <div class="sandbox-content">
        <FLButton @click="notifyVue('Info')">Test info</FLButton>
        <FLButton @click="notifyVue(longWarningText, 'warning')">
          Test warning
        </FLButton>
        <FLButton @click="notifyVue('Error', 'error')">Test error</FLButton>
        <FLButton @click="notifyVue('test 2000 ms', null, 2000)">
          Test 2000ms
        </FLButton>
        <FLButton @click="notify()">Test raw notify</FLButton>
      </div>
    </ExpandableSection>

    <ExpandableSection label="Modal">
      <Modal v-if="modalOpen" @close="toggleModal(false)" :maximized="false">
        <div slot="header">
          Modal header
        </div>
        <div slot="body">
          Modal contents
        </div>
        <div slot="footer" class="sandbox-modal-footer">
          <FLButton @click="toggleModal(false)" type="cancel">Cancel</FLButton>
          <FLButton @click="toggleModal(false)">OK</FLButton>
        </div>
      </Modal>
      <div class="sandbox-content">
        <FLButton @click="toggleModal(true)">Open modal</FLButton>
      </div>
    </ExpandableSection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HelloWorld from "@/components/HelloWorld.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"
import Modal from "@/components/Modal.vue"
import { Notification, notify } from "@/util/notifications"

@Component({
  components: {
    HelloWorld,
    ExpandableSection,
    FLButton,
    Modal,
  },
})
export default class Home extends Vue {
  modalOpen = false

  toggleModal(open: boolean) {
    this.modalOpen = open
  }

  notifyVue(
    message: string,
    type?: "info" | "warning" | "error",
    displayTime?: number
  ) {
    this.$notify({
      type: type || "info",
      message,
      displayTime,
    })
  }
  notify() {
    const msg: Notification = {
      type: "error",
      message: "raw notification",
      displayTime: 4000,
    }
    notify(msg)
  }

  get longWarningText() {
    return `Warning: Lorem ipsum dolor sit amet, consectetur adipiscing elit,
    sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut
    enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
    aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit
    in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur
    sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
    mollit anim id est laborum.`
  }
}
</script>

<style lang="less">
.sandbox-content {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 1rem;
  * > {
    margin-right: 1rem;
    margin-bottom: 1rem;
    width: max-content;
  }
}

.sandbox-modal-footer {
  display: flex;
  justify-content: space-between;
  padding: 0.3rem;
}
</style>
