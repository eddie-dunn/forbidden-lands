<template>
  <div class="home">
    <h1>SANDBOX</h1>

    <ExpandableSection label="Vue app info" class="text-center">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </ExpandableSection>

    <ExpandableSection label="Notify" saveStateId="notify-test">
      <div class="sandbox-content">
        <FLButton type="ghost" @click="notifyVue('Info')">Test info</FLButton>
        <FLButton @click="notifyVue(longWarningText, 'warning')">
          Test warning
        </FLButton>
        <FLButton type="danger" @click="notifyVue('Error', 'error')"
          >Test error</FLButton
        >
        <FLButton type="cancel" @click="notifyVue('test 2000 ms', null, 2000)">
          Test 2000ms
        </FLButton>
        <FLButton @click="notify()">Test raw notify</FLButton>
      </div>
    </ExpandableSection>

    <ExpandableSection label="Modal" saveStateId="modal-test">
      <Modal
        v-if="diceModalOpen"
        @close="diceModalOpen = false"
        title="Dice modal"
      >
        <div slot="header">
          This is an awesome dice modal
        </div>
        <div slot="body" style="height: 100%">
          <DiceRoller style="height: 100%" />
        </div>
      </Modal>
      <Modal
        v-if="modalOpen"
        @close="modalOpen = false"
        :maximized="false"
        title="Title"
      >
        <div slot="header">
          Extra header contents
        </div>
        <div slot="body">
          This is the body contents
        </div>
        <div slot="footer" class="sandbox-modal-footer">
          <FLButton @click="modalOpen = false" type="cancel">Cancel</FLButton>
          <FLButton @click="modalOpen = false">OK</FLButton>
        </div>
      </Modal>
      <div class="sandbox-content">
        <FLButton @click="modalOpen = true">Open modal</FLButton>
        <FLButton @click="diceModalOpen = true">Open Dice Modal</FLButton>
      </div>
    </ExpandableSection>
    <ExpandableSection label="NavDrawer" saveStateId="drawer-test">
      <div @click="navOpen = true" class="show-nav">
        <SvgIcon name="more_vert" title="Show options" />
        <span>Open NavDrawer</span>
      </div>
      <NavDrawer
        @close="navOpen = false"
        :visible="navOpen"
        title="Navbar test"
      >
        This is the navdrawer content.
      </NavDrawer>
    </ExpandableSection>
    <ExpandableSection label="Icons" saveStateId="__icon-test">
    </ExpandableSection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import HelloWorld from "@/components/HelloWorld.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"
import NavDrawer from "@/components/base/NavDrawer.vue"
import Modal from "@/components/Modal.vue"
import { Notification, notify } from "@/util/notifications"
import DiceRoller from "@/components/dice/DiceRoller.vue"
import SvgIcon from "@/components/SvgIcon.vue"

@Component({
  components: {
    DiceRoller,
    HelloWorld,
    ExpandableSection,
    FLButton,
    Modal,
    NavDrawer,
    SvgIcon,
  },
})
export default class Home extends Vue {
  modalOpen = false
  diceModalOpen = false
  navOpen = false

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

<style lang="less" scoped>
@import "~Style/colors.less";

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

.show-nav {
  display: block;
  background: @color-main;
  color: @color-text;
  cursor: pointer;
  text-align: right;
  padding: 0.3rem;
  box-shadow: @box-shadow-normal;
}
</style>
