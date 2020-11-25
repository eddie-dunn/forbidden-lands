<template>
  <div class="sandbox">
    <ExpandableSection label="Combat View" saveStateId="combat-test">
      <Combat :charData="caesar" />
    </ExpandableSection>

    <ExpandableSection label="DiceRoller Combat" saveStateId="dice-combat">
      <DiceCombat :charData="caesar" />
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
    <ExpandableSection label="Buttons" saveStateId="__icon-test">
      <div class="sandbox-grid">
        <h4>FLButton</h4>
        <FLButton>Base button</FLButton>
        <FLButton type="danger">Danger button</FLButton>
        <FLButton type="cancel">Cancel button</FLButton>
        <FLButton type="main" :disabled="true">Disabled button</FLButton>
        <FLButton type="ghost">Ghost button</FLButton>
        <FLButton type="ghost" color="danger">Ghost button danger</FLButton>
        <FLButton type="ghost" :disabled="true">Ghost button disabled</FLButton>
        <h4>IconButton</h4>
        <IconButton icon="check" color="main"></IconButton>
        <IconButton icon="delete" color="danger" @click="click"></IconButton>
        <IconButton icon="add" :disabled="true"></IconButton>
        <IconButton icon="chat_bubble">With text</IconButton>
      </div>
    </ExpandableSection>

    <ExpandableSection label="Vue app info" class="text-center">
      <img alt="Vue logo" src="../assets/logo.png" />
      <HelloWorld msg="Welcome to Your Vue.js + TypeScript App" />
    </ExpandableSection>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import { SET_PAGE_TITLE } from "@/store/store-types"

import { DiceCombat } from "@/components/dice/combat/DiceCombat.vue"
import HelloWorld from "@/components/HelloWorld.vue"
import ExpandableSection from "@/components/ExpandableSection.vue"
import FLButton from "@/components/base/FLButton.vue"
import NavDrawer from "@/components/base/NavDrawer.vue"
import Modal from "@/components/Modal.vue"
import { Notification, notify } from "@/util/notifications"
import DiceRoller from "@/components/dice/DiceRoller.vue"
import SvgIcon from "@/components/SvgIcon.vue"
import IconButton from "@/components/base/IconButton.vue"
import { Combat } from "@/components/combat/CombatBox.vue"
import { Caesar } from "Tests/unit/data/personas"

@Component({
  components: {
    Combat,
    DiceCombat,
    DiceRoller,
    ExpandableSection,
    FLButton,
    HelloWorld,
    IconButton,
    Modal,
    NavDrawer,
    SvgIcon,
  },
})
export class Sandbox extends Vue {
  modalOpen = false
  diceModalOpen = false
  navOpen = false

  caesar = Caesar

  mounted() {
    this.$store.commit(SET_PAGE_TITLE, "Sandbox")
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
  click() {
    /* eslint-disable-next-line no-console */
    console.log("CLICK!")
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

export default Sandbox
</script>

<style lang="less" scoped>
@import "~Style/colors.less";

.sandbox {
  margin: 1rem 1rem 20vh 1rem;
}

.sandbox-content {
  margin: 1rem;
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

.sandbox-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(calc(40% - 11px), 1fr));
  grid-gap: 10px;
  margin: 5px;
  h4 {
    grid-column-start: 1;
    grid-column-end: -1;
    margin: 0.2rem;
  }
}
</style>
