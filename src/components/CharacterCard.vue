<script lang="ts">
import Vue from "vue"
import { CharacterData } from "@/characterData"

export default Vue.extend({
  name: "CharacterCreatorCard",
  props: {
    charData: Object as () => CharacterData | null,
    empty: {
      type: Boolean,
      default: false,
    },
  },
  created() {
    this.$on("card-sign", (message: any) => {
      this.sign = message
    })
  },
  data() {
    return {
      sign: "",
    }
  },
  methods: {
    cardClicked() {
      if (!this.charData) {
        this.$router.push(`/character-creator/`)
        return
      }
      this.$router.push(`/character-creator/${this.charData.name}`)
      window.scrollTo(0, 0)
    },
  },
})
</script>

<template>
  <div v-if="!this.charData" class="stat-card row-full">
    <div class="placeholder" @click="cardClicked()">
      <h3>Create new character</h3>
    </div>
  </div>
  <div v-else class="stat-card row-full" @click="cardClicked()">
    <img class="top" :src="charData.portrait" />
    <!-- <div class="portrait top"></div> -->
    <div class="header">
      <div class="card-contents">
        <h3>{{ charData.name }}</h3>
      </div>
    </div>
    <!-- <div class="body">
      {{ charData.kin }}
      {{ charData.class }}
    </div> -->
    <div class="card-footer"></div>
  </div>
</template>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
// @click="$router.push(`/character-creator/${charData.name}`)"
@import "~Style/colors.less";

h1,
h2,
h3 {
  // margin: 40px 0 0;
  width: 100%;
  text-align: center;
  &::first-letter {
    text-transform: uppercase;
  }
}

.placeholder {
  cursor: pointer;
  // background: #fafafa;
  background: @pastel-green;
  color: white;
  border-radius: 0 0 1rem 1rem;
  // max-height: 90%;
  flex-grow: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 400px;
  &:hover {
    background: ~"@{pastel-green}99";
  }
}
.portrait {
  img > {
    object-fit: contain;
    min-width: 200px;
    max-height: 400px;
    // height: 400px;
    display: block;
    margin-left: auto;
    margin-right: auto;
  }
  // width: 400px;
  // width: auto;
  max-width: 400px;
  height: 400px;

  // display: inline-block;
  overflow: hidden;
  cursor: pointer;
}

.top {
  object-fit: cover;
  object-position: top;
  max-height: 400px;
  cursor: pointer;
}

.header {
  flex-grow: 0;
  display: flex;
  align-items: center;
}

.card-contents {
  flex-grow: 1;
  display: flex;
  flex-wrap: wrap;
}

.subtitle {
  font-style: italic;
  text-align: left;
  margin: 0.4rem;
}

.stat-card {
  cursor: pointer;
  // width: 50vw;
  // background: #fafafa;
  // margin: 0.5rem;
  text-align: left;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  flex-basis: 40%;
  // min-width: 18rem;
  justify-content: space-around;
  align-content: space-between;

  // border: solid gray 2px;
  // border: solid rgba(66, 185, 131, 0.3) 2px;
  border: solid #42b98344 3px;
  border-radius: 1rem;
  border-radius: 0 0 1rem 1rem;
  // padding: 1rem;
  // align-content: center;
  // justify-items: baseline;
  // align-items: baseline;
  // box-shadow: 3px 3px 5px 6px #cccccc80;
  height: 100%;
}

// .row-full {
//   width: 100%;
// }
</style>
