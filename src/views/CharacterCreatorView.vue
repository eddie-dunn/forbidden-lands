<template>
  <div class="character-creator">
    <CharacterCreatorMain :charName="id" />
  </div>
</template>

<script>
// @ is an alias to /src
import CharacterCreatorMain from "@/components/CharacterCreatorMain.vue"

export default {
  name: "character_creator",
  components: {
    CharacterCreatorMain,
  },
  props: {
    id: String,
  },
}
</script>

<style lang="less">
// button::-moz-focus-inner {
//   border: 0;
// }

&::-moz-focus-outer {
  border: 0;
}

button,
.button {
  &::-moz-focus-inner {
    border: 0;
  }
  outline: 0;
  text-decoration: none;
  padding: 0.5em 2em;
  border-radius: 2em;
  border: none;
  display: inline-block;
  color: #fff;
  background-color: #4fc08d;
  transition: all 0.15s ease;
  box-sizing: border-box;
  border: 1px solid #4fc08d;
  cursor: pointer;

  &:active {
    // box-shadow: none;
    transform: translateY(2px);
  }
  &:hover {
    color: #42b983;
    background-color: #fff;
    // box-shadow: 0px -5px 5px rgba(255, 229, 255, 0.4) inset;
  }
}
</style>
