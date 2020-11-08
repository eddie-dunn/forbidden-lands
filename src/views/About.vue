<script>
import { SET_PAGE_TITLE } from "@/store/store-types"
import { DEBUG_KEY, BETA_KEY } from "@/util/const"

export default {
  name: "about_page",
  data() {
    return {
      debugClicks: 0,
      buildVersion: __APP_VERSION__,
    }
  },
  mounted() {
    this.$store.commit(SET_PAGE_TITLE, "About FLC")
  },

  methods: {
    debugClick() {
      this.debugClicks++
      console.log(6 - this.debugClicks) // eslint-disable-line no-console
      if (this.debugClicks > 5) {
        const debugOn = window.sessionStorage.getItem(DEBUG_KEY)
        debugOn
          ? window.sessionStorage.removeItem(DEBUG_KEY)
          : window.sessionStorage.setItem(DEBUG_KEY, "on")

        // Let beta depend on debug toggling for now; remove this once we have
        // an options page where users can opt in to beta
        const betaOn = debugOn // window.sessionStorage.getItem(BETA_KEY)
        betaOn
          ? window.sessionStorage.removeItem(BETA_KEY)
          : window.sessionStorage.setItem(BETA_KEY, "on")
        window.location.reload()
      }
    },
  },
}
</script>

<template>
  <div class="about">
    <h1>Welcome!</h1>
    <div class="long-text">
      <p>
        Welcome to the Forbidden Lands Companion. The purpose of this app is to
        serve as an assistant for people playing the role playing game
        <a href="https://frialigan.se/en/games/forbidden-lands/" target="_blank"
          >Forbidden Lands</a
        >
        by Fria Ligan.
      </p>

      <h2>Features</h2>

      <ul>
        <li>
          Creating a new character from scratch, where the app will keep track
          of character creation rules
        </li>
        <li>Creating a new character from pre-made templates</li>
        <li>Inventory and encumbrance management</li>
        <li>Adding Experience and Reputation points</li>
        <li>Spending Experience on Skills & Talents</li>
        <li>Language support for both Swedish and English</li>
        <li>
          Import/export of your data for backup and for when you wish to move it
          between devices
        </li>
        <li>A dice roller, of course :)</li>
      </ul>

      <h2>How to use</h2>
      <p>A character can be in three different modes:</p>

      <ul>
        <li>
          'New': A newly created character. Rules for creating a new character
          will apply for validation. Creating a character from a template may
          violate normal character creation rules, but you may still activate
          such characters.
        </li>
        <li>
          'Active': Once you tap a new character and select activate, it will be
          moved to a separate list for characters you are actively playing. You
          cannot freely reasign abilities, skills or talents in this mode;
          instead you will need to assign XP points and then spend these points
          to add/increase skills and talents.
        </li>
        <li>
          'Inactive': You may set an 'active' character as inactive. Inactive
          characters may be freely modified and won't be validated against
          character creation rules.
        </li>
      </ul>

      <p>
        Usage should otherwise be fairly self-explanatory. If you come across
        something confusing, or have other questions, comments, improvement
        suggestions, feature requests, bug reports etc, please go to
        <a href="https://gitlab.com/eddie-dunn/forbidden-lands/" target="_blank"
          >the repo hosting the project</a
        >
        or
        <a href="mailto:forbidden.lands.companion@gmail.com">email me</a>.
      </p>

      <h2>Technical Details</h2>

      <p>
        The Player Companion uses fairly modern technology so if you are using
        an old browser it may not work for you. I don't own any Apple devices so
        if you are experiencing problems on iOS or in Safari,
        <a href="https://gitlab.com/eddie-dunn/forbidden-lands/" target="_blank"
          >please submit a bug report.</a
        >
        Non-evergreen browsers such as Internet Explorer are not supported.
      </p>

      <p>
        The app is a
        <a
          href="https://en.wikipedia.org/wiki/Progressive_web_applications"
          target="_blank"
          >Progressive Web App</a
        >
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
        My thanks go out to
        <a href="https://frialigan.se/en/startpage/" target="_blank"
          >Fria Ligan</a
        >
        for letting me use their images in the portrait gallery and to Ayathor
        for assisting with implementing character creation from templates.
      </p>

      <p>
        Icons that I haven't made myself have been downloaded from
        <a href="https://game-icons.net/" target="_blank">Game-icons.net</a> and
        <a href="https://material.io/resources/icons/" target="_blank"
          >Material design</a
        >.
      </p>

      <!-- spacer -->
    </div>
    <button class="version-footer" @click="debugClick">
      {{ buildVersion }}{{ $debugMode ? "_DEBUG" : "" }}
    </button>
  </div>
</template>

<style lang="less" scoped>
li {
  margin-bottom: 0.5rem;
}
.about {
  margin: 1rem;
}
.long-text {
  text-align: left;
  max-width: 75ch;
  margin: 1rem auto;
}

.version-footer {
  //unstyle button
  background: none;
  color: inherit;
  border: none;
  padding: 0;
  font: inherit;
  cursor: vertical-text;
  outline: inherit;

  margin-top: 5vh;
  margin-bottom: 2rem;
  font-size: 0.8rem;
}
</style>
