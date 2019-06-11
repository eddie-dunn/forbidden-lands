<script lang="ts">
// TODO: Look into http://youmightnotneedjs.com/#tabs for tabs

import Modal from "@/components/Modal.vue"
import Vue from "vue"
import { Component, Prop, Watch } from "vue-property-decorator"
import { CharacterData, CharacterTalent } from "@/characterData"

import FLNumberInput from "@/components/FLNumberInput.vue"

@Component({
  components: {
    FLNumberInput,
    Modal,
  },
})
export default class XPModal extends Vue {
  @Prop({ required: true }) charData!: CharacterData

  charDataCopy: CharacterData = JSON.parse(JSON.stringify(this.charData))

  tabs: { active: boolean; name: any }[] = []
  newXP = 0
  newRep = 0

  get EXP_DESC(): string[] {
    return (this.$t("XP_DESCR") as string).split("\n\n")
  }
  get REP_DESC(): string[] {
    return (this.$t("REP_DESCR") as string).split("\n\n")
  }

  setActiveTab(activeIndex: number) {
    this.tabs.map((tab, index) => {
      index === activeIndex ? (tab.active = true) : (tab.active = false)
    })
  }

  emitNewXP() {
    this.charDataCopy.reputation += this.newRep
    this.charDataCopy.experience += this.newXP
    this.$emit("updated-chardata", this.charDataCopy)
    this.close()
  }

  mounted() {
    const tabNames = [this.$t("Experience"), this.$t("Reputation")]
    this.tabs = tabNames.map((name, index) => ({
      active: index === 0,
      name,
    }))
    this.charDataCopy.metadata.status = "levelup"
  }

  close() {
    this.$emit("close")
  }
}
</script>

<template>
  <Modal class="xp-modal" @close="close" :maximized="true">
    <div slot="header" class="header">
      <h2>Post session</h2>
      <div class="tab-bar">
        <div
          v-for="(tab, index) in tabs"
          :key="index"
          @click.self="setActiveTab(index)"
          :class="[
            'tab',
            tabs[index] && tabs[index].active ? 'tab--active' : '',
          ]"
        >
          {{ tabs[index].name }}
        </div>
      </div>
    </div>
    <div slot="body" class="modal-body">
      <div :class="tabs[0] && tabs[0].active ? '' : 'hidden'">
        <div>{{ EXP_DESC[0] }}</div>
        <ul>
          <li v-for="(line, index) in EXP_DESC.slice(1, -1)" v-bind:key="index">
            <!-- <input type="checkbox" /> -->
            <span>
              {{ line }}
            </span>
          </li>
        </ul>
        <div class="experience-input">
          <label for="xp-input">Experience gained</label>
          <FLNumberInput
            id="xp-input"
            min="0"
            max="100"
            v-model.number="newXP"
          />
        </div>
      </div>

      <div :class="tabs[1] && tabs[1].active ? '' : 'hidden'">
        <div>{{ REP_DESC[0] }}</div>
        <ul>
          <li v-for="(line, index) in REP_DESC.slice(1, -1)" v-bind:key="index">
            <span>
              {{ line }}
            </span>
          </li>
        </ul>
        <div class="experience-input">
          <label for="rep-input">Reputation gained</label>
          <FLNumberInput
            id="rep-input"
            min="0"
            max="100"
            v-model.number="newRep"
          />
        </div>
      </div>
    </div>

    <div class="modal-button-row" slot="footer">
      <button @click="close" class="button button-cancel">
        {{ $t("Cancel") }}
      </button>
      <button @click="emitNewXP" class="button">OK</button>
    </div>

    <!-- spacer -->
  </Modal>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";
h2 {
  margin: 0rem 1rem 1rem 1rem;
}

.modal-body {
  overflow: auto;
  text-align: left;
  max-width: 70rem;
  padding: 1rem;
  margin: 1rem auto;
  max-width: 60rem;

  ul {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
    li {
      padding: 0.5em;
      text-indent: -0.5rem;
      &:before {
        content: "✥";
      }
    }
  }
}

.experience-input {
  display: flex;
  flex: 1 1 auto;
  align-items: center;
  justify-content: center;
  font-size: 1.2rem;
  margin-bottom: 4rem;
  label {
    margin-right: 1rem;
  }
}

.header {
  border-bottom: solid @pastel-green 5px;
}

.modal-button-row {
  border-top: solid @pastel-green 5px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 0.5rem;
}

.tab {
  background: white;
  color: @pastel-green;
  padding: 0.5rem;
  margin-right: 5px;
  outline: solid 1px @pastel-green;
  display: inline-block;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
    background: @pastel-green;
    color: white;
  }
  &--active {
    background: @pastel-green;
    color: white;
  }
}

.tab-bar {
  text-align: left;
  margin: 0 1rem;
}

.xp-modal {
  margin: 0 auto;
}
</style>
