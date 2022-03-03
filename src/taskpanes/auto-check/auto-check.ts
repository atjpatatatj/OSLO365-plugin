/* eslint-disable no-undef */
import Vue from "vue";
import root from "./pages/Root.vue";
const VlUiVueComponents = require("@govflanders/vl-ui-vue-components");
import { wordDelimiters } from "../../utils/WordDelimiters";
import { ignoredWords } from "../../utils/IgnoredWords";
import { IOsloItem } from "../../oslo/IOsloItem";
import { OsloStore } from "../../store/OsloStore";

// configuration of the built-in validator
const validatorConfig = {
  inject: true,
  locale: "nl",
};

Vue.use(VlUiVueComponents, {
  validation: validatorConfig,
});

Office.onReady((info) => {
  if (info.host === Office.HostType.Word) {
    const osloStore = OsloStore.getInstance();
    const store = osloStore.getStore();

    var app = new Vue({
      store: store,
      el: "#app",
      render: (h) => h(root),
    });
  }
});

export async function searchDocument() {
  return await Word.run(async (context) => {
    const wordsWithMatches: Word.Range[] = [];

    const range = context.document.body.getRange();
    range.load();
    await context.sync();

    // force cursor to beginning of document so word selection works.
    const start = context.document.body.getRange("Start");
    start.load();
    start.select();
    await context.sync();

    let paragraph = range.paragraphs.getFirstOrNullObject();
    paragraph.load();
    await context.sync();

    while (!paragraph.isNullObject) {
      let ranges = paragraph.split(wordDelimiters, true /* trimDelimiters*/, true /* trimSpacing */);
      ranges.load();

      const wordList: Word.Range[] = [];

      await context.sync().catch(function (error) {
        // If the paragraph is empty, the split throws an error
        ranges = null;
      });

      if (ranges && ranges.items) {
        for (let word of ranges.items) {
          // Collect all the words in the paragraph, so we can search through them
          // We check if the 'word' is longer then 1 characters, if not don't include the word in the wordlist
          // We also check if the word is not in the list of excluded words
          if (
            word.text.length > 1 &&
            !ignoredWords.find((ignoredWord: string) => ignoredWord.toLowerCase() === word.text.toLowerCase())
          ) {
            wordList.push(word);
          }

          await context.sync();
        }
      }
      const store = OsloStore.getInstance()
      for (let word of wordList) {
        if (store.osloStoreLookup(word.text, false).length > 0) {
          wordsWithMatches.push(word);
        }
      }

      paragraph = paragraph.getNextOrNullObject();
      paragraph.load();

      await context.sync();
    }
    return wordsWithMatches;
  });
}

export function getDefinitions(word: Word.Range): IOsloItem[] {
  const store = OsloStore.getInstance()
  return store.osloStoreLookup(word.text, false);
}

export function selectWordInDocument(word: Word.Range, back : boolean) {
  return Word.run(async (context) => {

    const selection = context.document.getSelection();
    selection.load();

    const results = context.document.body.search(word.text);
    context.load(results);

    await context.sync();

    let found = false;
    let index = 0;
    if (results.items.length === 1){
      results.items[0].select();
      await context.sync();
    }
    else{
        if (back === false) {
          while (index <= results.items.length && !found) {
            const position = results.items[index].compareLocationWith(selection);
            await context.sync();
            if (position.value === Word.LocationRelation.containsStart){ // we need this if when the first word shows up multiple times
              results.items[index].select();
              await context.sync();
              break;
            }

            if (position.value !== Word.LocationRelation.after && position.value !== Word.LocationRelation.adjacentAfter) {
              index++;
              continue;
            }

            found = true;
            results.items[index].select();
          }
        }
        if (back === true){
          let index = results.items.length -1;
          while (!found && index >= 0) {
            const position = results.items[index].compareLocationWith(selection);
            await context.sync();
            console.log(position.value);

            if (position.value !== Word.LocationRelation.before && position.value !== Word.LocationRelation.adjacentBefore) {
              if (position.value === Word.LocationRelation.equal) {
                index--;
                results.items[index].select();
                await context.sync();
                break;
              }
              index--;
              continue;
            }

            found = true;
            results.items[index].select();

          }
        }
        await context.sync();
      }
  });
}
