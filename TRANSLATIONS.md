# Adding translations

If you want to add translations to the app there are a few ways to go about this.
I've split them in to [Beginner](#beginner-level), [Advanced](#advanced-level) and [Expert](#expert-level) level. Pick the level you feel most comfortable with, and start hacking away :)

If you run into trouble, feel free to <a href="mailto:forbidden.lands.companion@gmail.com">email me</a>, and I will do my best to help you.

## Beginner level

> Pros: The simplest way to add translations
>
> Cons: You won't be able to see the translations you make, losing out on context which may be important for making the correct translation; you won't know if you make any mistakes in the formatting, as there's no feedback

If you don't know anything about coding the simplest way to add translations is to do the following:

1. Download [`src/locales/en.ts`](https://gitlab.com/eddie-dunn/forbidden-lands/-/raw/master/src/locales/en.ts)
1. Rename the file appropriately (e.g., `se.ts` for Swedish, `de.ts` for German)
1. Translate the _values_ while keeping the keys the same.
   - Keys are on the left hand side, values are on the the right, e.g. `"this is a key": "this is the translated value"`.
   - So a translation to Swedish would be `"this is a key": "detta är det översatta värdet"`
   - See [`src/locales/se.ts`](https://gitlab.com/eddie-dunn/forbidden-lands/-/blob/master/src/locales/se.ts) for an example of how to do it.
1. Send the file to <a href="mailto:forbidden.lands.companion@gmail.com">me</a>, and I will include it in the next update.

If you have some skills in programming, or feel like learning something new, I would strongly recommend that you try running the app locally while working on the translations, since the correct translation can be very dependent on context. Also, it's nice to get visual feedback for every translation you add.

For instructions on how to do this, see the Advanced guide below. If you are totally new to programming it might seem a bit overwhelming at first, but don't worry -- you'll quickly get the hang of it, I'm sure :)

## Advanced level

> Pros: You will get live feedback while working on the translations
>
> Cons: You will need to install and configure some software

1. Download the latest version of source code for the app: https://gitlab.com/eddie-dunn/forbidden-lands/-/archive/master/forbidden-lands-master.zip
2. Extract the zip to a folder on your computer
3. Get the app to run locally by following the steps in [Running Forbidden Lands Companion locally](#running-forbidden-lands-companion-locally)
4. If you feel up for it, add your new language to the app by following the instructions in [Adding a new languate to the app](#adding-a-new-languate-to-the-app)
   - If the process of adding a new language seems too complicated that's alright, just <a href="mailto:forbidden.lands.companion@gmail.com">email me</a> and I will do it for you
5. Open the file for the language you wish to add translations for. Any changes you make in the file will be automatically compiled and loaded, visible for you to see.

## Expert level

> Pros: The best way to add translations ;)
>
> Cons: Complicated, familiarity with Git required

If you know how to use [git], the best way to add a translation is to

1. Clone the repository: `git clone git@gitlab.com:eddie-dunn/forbidden-lands.git`
2. Get the app running locally by following the instructions in [Running Forbidden Lands Companion locally](#running-forbidden-lands-companion-locally)
3. Add your translation file in the `src/locales/` directory by following the instructions in [Adding a new languate to the app](#adding-a-new-languate-to-the-app)
4. Test your translations
5. Create a commit once you are done translating
6. Create a Gitlab [Merge Request] with your changes

## Running Forbidden Lands Companion locally

In order to run the app locally, you will need to install some additional tools:

- [Visual Studio Code][]
- [nodejs][]
- [yarn][]

Once you have installed the tools by following their respective instructions in the links provided above, do the following:

1. Start Visual Studio Code
2. In Visual Studio code click `[File] -> Open folder...`, then find the folder where you extracted the source code, e.g. `Downloads/forbidden-lands-master`.
3. Click `[Terminal] -> New Terminal`
4. Inside the terminal, type `yarn`. This will install all the necessary dependencies for running the app.
5. Once it's finished installing, type `yarn start`.
6. Once the app has been started, open a web browser and navigate to <a href=http://localhost:3000/>http://localhost:3000/</a>.
7. Good job! You are now using a locally running version of Forbidden Lands Companion!

## Adding a new language to the app

> PROTIP: When asked to open files you can always find it by navigating in the File Explorer panel, but a quicker way to open a file in VSCode is to press ctrl+P and then start typing the file name.

1. In Visual Studio Code, use the File Explorer pane on the left to navigate to `src/locales/`.
2. Select the file `en.ts`, copy it (ctrl+c or use the right-click context menu)
3. Paste it (ctr+v, or right-click the `src/locales` folder and click "Paste")
4. Rename the copied file to `<language-code>.ts`, e.g., `de.ts` for German, by right-clicking it and selecting "Rename".
5. Open `src/i18n.ts`
   1. Add an import for your language file below the other imports. E.g., `import de from "@/locales/de"`.
   2. Then add the language inside the `messages` object:
      ```
       messages: {
           en,
           pt,
           se,
           de, // <-- The language you are adding
       },
      ```
6. Open `src/components/LocaleChanger.vue`
   1. Add your language to the `langs` object:
      ```
      langs: [
          //
          { name: "Brazilian", key: "pt" },
          { name: "English", key: "en" },
          { name: "Swedish", key: "se" },
          { name: "German", key: "de" }, // <-- The language you are adding
      ],
      ```
   2. Make sure that the key is the same as the language code for the language you are adding. In this case, we're adding German so the key should be `de`.
7. Now the app is prepared to handle a new language! Follow the instructions in the section [Running Forbidden Lands Companion locally](#running-forbidden-lands-companion-locally) then go to the app and select your language in the dropdown.
8. Open your translations file `<language-code>.ts` (in this example, `de.ts`) and start adding translations. When you save the file the app will reload automatically, displaying the translations you've made.

[merge request]: https://docs.gitlab.com/ee/user/project/merge_requests/creating_merge_requests.html
[gitlab]: https://docs.gitlab.com/ee/gitlab-basics/
[git]: https://en.wikipedia.org/wiki/Git
[visual studio code]: https://code.visualstudio.com/
[nodejs]: https://nodejs.org/en/download/
[yarn]: https://classic.yarnpkg.com/en/docs/install
