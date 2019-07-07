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
        serve as a helper for people playing the role playing game
        <a href="https://frialigan.se/en/games/forbidden-lands/">
          Forbidden Lands
        </a>
        by Fria Ligan.
      </p>
      <h2>Features</h2>
      <p>
        Currently, the app's main features are
      </p>
      <ul>
        <li>
          a character creator, which keeps track of the rules for creating a new
          character
        </li>
        <li>
          giving a character 'active' status, which means that you can modify
          your Willpower, increase XP and/or Reputation and that you will need
          to add XP in order to add/increase skills & talents
        </li>
        <li>
          giving a character 'inactive' status, which means you can freely edit
          it as you like, without any pesky rules to limit your creativity
        </li>
        <li>
          an inventory manager that keeps track of items and encumbrance for you
        </li>
        <li>
          language support for both Swedish and English
        </li>
        <li>
          Import/export of your data if you wish to move it between devices
        </li>
        <li>
          and a dice roller, of course :)
        </li>
      </ul>
      <p>
        Planned features include
      </p>
      <ol>
        <li>
          Releasing source code
        </li>
        <li>
          Several small UI/UX improvements
        </li>
        <li>
          Item templates so that people won't have to enter all item data
          manually when adding stuff to their player character's inventory
        </li>
        <li>
          Tapping/clicking attributes and skills will display a modal suggesting
          dice to be rolled based on attributes, skill level, talents & equipped
          items
        </li>
        <li>
          Multiplayer mode: enable a GM to host a session which players can
          connect to
        </li>
      </ol>

      <h2>How to use</h2>
      <p>
        Usage should be fairly self-explanatory. If you come across something
        confusing, or have other questions, comments, improvement suggestions,
        feature requests, bug reports etc, please go to
        <a href="#">the repo hosting the project</a> (TBA) or
        <a href="mailto:eddie.dunn+flc@gmail.com">email me</a>.
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
        it. In Android Chrome, for example, you open the settings menu and tap
        "Add to Home screen".
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
      <h2>Acknowledgements</h2>
      <p>
        Icons that I haven't made myself have been downloaded from
        <a href="https://game-icons.net/">Game-icons.net</a>.
      </p>
    </div>
  </div>
</template>

<style lang="less" scoped>
.about {
  margin: 1rem;
}
.long-text {
  text-align: left;
  max-width: 75ch;
  margin: 1rem auto;
}
</style>
