<script lang="ts">
import Vue from "vue"
import Component from "vue-class-component"

import UrlStorage from "@/localStorage"

import { CharData } from "@/characterData"

import IconButton from "@/components/base/IconButton.vue"
import FLButton from "@/components/base/FLButton.vue"
import Modal from "@/components/Modal.vue"

function validate(url: any) {
  const regex = /^.*(\.jpg|\.jpeg|\.png|\.svg)\??/
  return url.match(regex)
}

function importAll(r: any) {
  return r.keys().map(r)
}

const IMAGES = importAll(
  require.context("../assets/portraits", false, /\.(png|jpe?g|svg)$/)
)
const PLACEHOLDER = require("@/assets/300x500-placeholder.png")
const getRandomPictureFromGallery = (gallery: string[]) =>
  gallery[~~(Math.random() * gallery.length)]

const AppProps = Vue.extend({
  props: {
    portrait: {
      required: true,
    },
    viewOnly: {
      type: Boolean,
    },
    charData: {
      default: null,
      type: Object,
    },
  },
  watch: {
    selected_portrait: {
      immediate: true,
      handler(newVal) {
        this.$emit("pickedPicture", newVal)
      },
    },
  },
})

@Component({
  components: {
    FLButton,
    IconButton,
    Modal,
  },
})
export default class PicturePicker extends AppProps {
  showModal: boolean = false
  showGallery: boolean = true
  showGetUrl: boolean = false
  urlStore = new UrlStorage()

  pictures: string[] = IMAGES
  imgUrl: string = ""
  externalImage: string = ""
  //"https://via.placeholder.com/400x600.png?text=Click+to+select+portrait"

  // for now, set a picture at random with getRandomPictureFromGallery
  selected_portrait = this.portrait || getRandomPictureFromGallery(IMAGES)

  showPicker() {
    if (this.viewOnly) return
    this.showModal = true
  }
  closePicker() {
    this.showModal = false
  }
  selectImage(id: string) {
    this.selected_portrait = id
    this.showModal = false
    // this.$emit("pickedPicture", this.selected_portrait)
  }
  urlButtonClicked() {
    this.urlStore.add(this.imgUrl)
    this.externalImage = this.imgUrl
    this.imgUrl = ""
  }
  deleteUrl(index: number) {
    this.urlStore.remove(index)
  }
  getPlaceHolder() {
    return this.pictures[~~(Math.random() * this.pictures.length)]
  }
  galleryClicked() {
    this.showGallery = true
    this.showGetUrl = false
  }
  getUrlClicked() {
    this.showGallery = false
    this.showGetUrl = true
  }

  get searchHref() {
    if (!this.charData) {
      return ""
    }
    const q = `${this.charData.kin}+${this.charData.profession}`
    return `https://duckduckgo.com/?q=${q}&ia=images&iax=images&atb=v119-1`
  }
  get warning(): string {
    if (this.imgUrl && !validate(this.imgUrl)) {
      return "Url should have filetype 'jpg', 'png' or 'svg'; it might not work otherwise."
    }
    return ""
  }
}
</script>

<template>
  <div class="picture-picker">
    <Modal
      v-if="showModal"
      @close="closePicker()"
      :toggleBodyOverflow="true"
      :title="$t('Select picture')"
    >
      <div slot="header">
        <div class="tab-bar">
          <div
            @click.self="galleryClicked"
            :class="['tab', showGallery ? 'tab--active' : '']"
          >
            {{ $t("Gallery") }}
          </div>
          <div
            @click.self="getUrlClicked"
            :class="['tab', showGetUrl ? 'tab--active' : '']"
          >
            {{ $t("Get from URL") }}
          </div>
        </div>
      </div>
      <div class="modal-body" slot="body">
        <div class="gallery-view">
          <div class="url-view" v-if="showGetUrl">
            <FLButton v-if="searchHref" :href="searchHref" target="_blank">
              Search images online
            </FLButton>
            <form class="url-view-form" v-on:submit.prevent="urlButtonClicked">
              <input
                :placeholder="$t('Enter external URL') + '...'"
                id="external url"
                v-model="imgUrl"
              />
              <FLButton @click="urlButtonClicked">
                {{ $t("Get") }}
              </FLButton>
              <div v-if="warning" class="url-view-form-warn">{{ warning }}</div>
            </form>
            <div class="picture-grid">
              <div
                class="picture-container"
                v-for="(url, index) in urlStore.storage"
                v-bind:key="url + index"
              >
                <img
                  :src="url"
                  @click="selectImage(url)"
                  :alt="'picture' + index"
                  :class="[
                    'portrait',
                    url === selected_portrait ? 'portrait-selected' : '',
                  ]"
                />
                <FLButton
                  class="delete-button"
                  type="danger"
                  @click="deleteUrl(index)"
                >
                  {{ $t("Delete") }}
                </FLButton>
              </div>
            </div>
          </div>
          <div v-if="showGallery">
            <div class="picture-grid">
              <div v-for="source in pictures" :key="source">
                <img
                  :key="source"
                  :src="source"
                  @click="selectImage(source)"
                  :class="[
                    'portrait',
                    source === selected_portrait ? 'portrait-selected' : '',
                  ]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>

    <div class="img-box">
      <img
        @click="showPicker()"
        v-if="selected_portrait || true"
        class="portrait chosen-portrait"
        :src="selected_portrait || getPlaceHolder()"
        alt="Character Portrait"
      />
      <img v-else class="chosen-portrait portrait placeholder" src="" />
      <IconButton class="edit-icon" icon="edit" @click="showPicker" />
    </div>
  </div>
</template>

<style lang="less" scoped>
@import "~Style/colors.less";

.picture-picker {
  display: flex;
  justify-content: center;
  align-items: center;
}

.img-box {
  position: relative;
  box-shadow: @box-shadow-normal;
  margin: 2rem 0.5rem;
}

.edit-icon {
  position: absolute;
  bottom: -6px;
  right: -6px;
  border-radius: 50%;
  padding: 5px;
  color: @color-text;
  background: @color-main;
  background: white;
  box-shadow: @box-shadow-normal;
}

.delete-button {
  position: absolute;
  bottom: 0;
}

.picture-container {
  position: relative;
  min-width: 30ch;
}

.gallery-view {
  overflow-y: auto;
  max-height: 99%;
}

.url-view {
  margin: 2rem;
  img > {
    max-width: 100%;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  &-form {
    display: flex;
    flex-wrap: wrap;
    margin: 1rem 0;
    input > {
      margin-right: 1rem;
      display: inline-block;
      flex-grow: 1;
    }
    .url-view-form-warn {
      flex: 1 0 100%;
      color: @pastel-red;
    }
  }
}
.external-image-viewer {
  width: 100%;
}

.tab-bar {
  padding-left: 1rem;
  position: sticky;
  top: 0;
  background: @color-background;
  text-align: left;
}

.tab {
  background: @color-background;
  color: @pastel-green;
  padding: 0.5rem;
  margin-right: 5px;
  border-top: solid 1px @pastel-green;
  border-left: solid 1px @pastel-green;
  border-right: solid 1px @pastel-green;
  display: inline-block;
  cursor: pointer;
  &:active {
    transform: translateY(3px);
    background: @pastel-green;
    color: white;
    // outline: solid 3px @pastel-green;
    // transform: translate(2px, 2px);
    // transform: translateX(2px);
  }
  &--active {
    background: @pastel-green;
    color: white;
  }
}

.picture-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  padding: 5px;
  img > {
    max-width: calc(100% - 10px);
    max-height: 400px;
    margin: 5px;
    cursor: pointer;
  }
}

.portrait-selected {
  // border: dotted 3px #0000004a;
  border: solid 2px @pastel-red;
}

.portrait {
  cursor: pointer;
  &:active {
    transform: translateY(2px);
  }
  &:hover {
    outline: solid 3px @pastel-green;
  }
}

.chosen-portrait {
  // box-shadow: 2px 2px 5px;
  max-width: 100%;
  // max-height: 100%;
  max-height: 500px;
  height: auto;
  display: block;
  margin: 0 auto;
  // cursor: cell;
}

.placeholder {
  height: 500px;
  width: 300px;
}

// Tooltip from http://www.menucool.com/tooltip/css-tooltip
// =============================================================================
.tooltip {
  display: inline-block;
  position: relative;
  border-bottom: 1px dotted #666;
  text-align: left;
}

.tooltip h3 {
  margin: 12px 0;
}

.tooltip .top {
  min-width: 200px;
  max-width: 400px;
  top: -20px;
  left: 50%;
  transform: translate(-30%, -100%);
  padding: 10px 20px;
  color: #ffffff;
  background-color: @pastel-green;
  font-weight: normal;
  font-size: 14px;
  border-radius: 8px;
  position: absolute;
  z-index: 99999999;
  box-sizing: border-box;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
  display: none;
}

.tooltip:hover .top {
  display: block;
}

.tooltip .top i {
  position: absolute;
  top: 100%;
  left: 30%;
  margin-left: -15px;
  width: 30px;
  height: 15px;
  overflow: hidden;
}

.tooltip .top i::after {
  content: "";
  position: absolute;
  width: 15px;
  height: 15px;
  left: 50%;
  transform: translate(-50%, -50%) rotate(45deg);
  background-color: @pastel-green;
  box-shadow: 0 1px 8px rgba(0, 0, 0, 0.5);
}
</style>
