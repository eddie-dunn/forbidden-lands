<script>
// @ is an alias to /src
import HelloI18n from "@/components/HelloI18n.vue"
export default {
  name: "character_creator",
}
</script>

<template>
  <div class="about">
    <!-- <HelloI18n /> -->
    <h1>Welcome!</h1>
    <div class="long-text">
      <p>
        Welcome to the Forbidden Lands Companion. The purpose of this app is to
        serve as a helper for people playing the role playing game Forbidden
        Lands by Fria Ligan.
      </p>
      <h2>Features</h2>
      <p>
        Currently, the app provides a character creator, which keeps track of
        the rules for creating a new character for you, and a dice roller.
      </p>
      <p>
        The next planned additions are an active character editor (which will
        keep track of the rules for leveling your character, encumberance etc)
        and a free form character editor with no rules so that you can create
        exactly the character you'd like.
      </p>
      <h2>Contribute</h2>
      <p>
        Comments, improvement suggestions, feature requests, bug reports? Go to
        <a href="#">the repo hosting the project</a> or
        <a href="mailto:foo@bar.com">email me</a>.
      </p>
      <p>
        The app uses fairly modern technology so if you are using an old browser
        it may not work for you. I don't own any Apple devices so if you are
        experiencing problems on iOS or in Safari, please submit a bug report.
      </p>
      <p>Internet Explorer is not supported.</p>
      <h2>Technical Details</h2>
      <p>
        The Player Companion is a
        <a href="https://en.wikipedia.org/wiki/Progressive_web_applications">
          Progressive Web App
        </a>
        which means that it can be used offline if your OS and browser supports
        it.
      </p>
      <p>
        It uses the browser's local storage to store your data, which means that
        the characters you save are specific to the browser and device you used
        when you created them. If you wish to move characters between browsers
        or devices you can use the import/export options exposed in the app.
      </p>
      <p>
        Local storage is great, since it means that your data is entirely
        private and you don't need online connectivity to use the app. Beware
        however with clearing browser data as that might mean you will lose all
        the characters you created.
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.long-text {
  text-align: left;
  max-width: 75ch;
  margin: 1rem auto;
}
</style>
