import {error, trace} from "../utils/Utils";
import {AppConfig} from "../utils/AppConfig";
import {IOsloItem} from "../oslo/IOsloItem";
import {getDictionaryItems} from "./OsloDictionary";
import {initSettings} from "./OsloSettings";

export class OsloStore {
  private static instance: OsloStore;
  private store: any;
  private osloItems = [];

  private constructor() {
    this.init();
  }

  public static getInstance(): OsloStore {
    if (!OsloStore.instance) {
      OsloStore.instance = new OsloStore();
    }

    return OsloStore.instance;
  }

  // Fetches all the data from the Oslo database
  public init() {
    trace("Initializing store");
    initSettings(); // bring settings to new documents
    const items = OsloStore.getLocalOsloItems();
    if (items.length > 1) { //checks if we can init from localstorage
      trace("Store already active. " + items.length + " definitions stored in store");
    }
    else{
      this.updateStore();
    }
  }
  public updateStore(){
    this.httpRequest("GET", AppConfig.dataFileUrl)
        .then((json: string) => {
          if (!json) {
            error("Oslo data empty");
          }
          const data = JSON.parse(json); //convert to usable JSON
          const cleandata = data["hits"]["hits"]; //filter out stuff we don't really need

          cleandata.map((item) => this.storeItem(item));
          localStorage.setItem("osloitems", JSON.stringify(this.osloItems));
          console.log(this.osloItems.length + " definitions stored on osloStore");
        })
        .catch((error) => {
          trace("Error: " + error);
        });
  }

  //Function to retrieve the data from an url
  private async httpRequest(verb: "GET" | "PUT", url: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      const request = new XMLHttpRequest();

      // Callback after request.send()
      request.onload = function (event) {
        if (request.status === 200) {
          // HTTP request successful, resolve the promise with the response body
          resolve(request.response);
        } else {
          // HTTP request failed
          error(`Error after ${verb} from ${url} : ${request.status} ${request.statusText}`);
          resolve(null);
        }
      };

      request.open(verb, url, true /* async */);
      request.send();
    });
  }
  //gets oslo items from our localstorage
  private static getLocalOsloItems() {
    let osloitems = JSON.parse(localStorage.getItem("osloitems"));
    if(osloitems == null) osloitems = []; //if it's empty make a new one
    return osloitems
  }

  // Function to search the keyword in the oslo store
  public osloStoreLookup(phrase: string, useExactMatching: boolean): IOsloItem[] {
    if (!phrase) {
      return null;
    }
    //clean
    phrase = phrase.toLowerCase().trim();
    // new list
    const matches: IOsloItem[] = [];

    let items = OsloStore.getLocalOsloItems();
    // loop for possible matches
    for (const item of items) {
      if (typeof item.label === "string") {
        //FIXME 4 objects are incomplete so we filter them out
        let possible = item.label.toLowerCase();
        let result = possible.search(phrase); // returns position of word in the label
        if (result >= 0) {
          // -1 is no match, so everything on position 0 to infinity is a match
          matches.push(item);
        }
      }
    }
    return OsloStore.sorter(matches);
  }
  //sorts items to show dictionary items first
  private static sorter(items){
    let dictionaryItems = [];
    let i = 0;
    for (const item of items){
      let isDictionaryItem = OsloStore.isDictionaryItem(item.label);
      if (isDictionaryItem){
        items.splice(i,1); // delete the dictItem from the lists and add them to another list
        dictionaryItems.push(item);
      }
      i++
    }
    return dictionaryItems.concat(items); // now we have 2 lists. We add the non-dict items at the end of the list so the dict items are in the beginning of the list
  }
  // function to store item in oslo store
  private storeItem(item) {
    let dictionaryItem = OsloStore.isDictionaryItem(item["_source"]["prefLabel"]); // checks if item is in dictionary
    let osloEntry: IOsloItem = {
      // new oslo object
      label: item["_source"]["prefLabel"],
      keyphrase: item["_source"]["id"],
      description: item["_source"]["definition"],
      reference: item["_source"]["context"],
      isDictionaryItem : dictionaryItem,
    };
    // this.store.commit("addItem", osloEntry);
    this.osloItems.push(osloEntry);
  }
  //function checks if it's in dictionary
  private static isDictionaryItem(itemName) :boolean{
    let dictionary = getDictionaryItems();
    let isDictionaryItem = false;
    for (const DictionaryItem of dictionary) {
      if (JSON.stringify(DictionaryItem.label) === JSON.stringify(itemName)){
        isDictionaryItem = true;
        break;
      }
    }
    return isDictionaryItem; // true or false
  }

  public getStore() {
    return this.store;
  }
  public getItems() {
    return OsloStore.getLocalOsloItems();
  }
  public getRandomDefinition(){
    let items = OsloStore.getLocalOsloItems();
    let randomInt = Math.floor(Math.random() * items);
    return items[randomInt];
  }
}
