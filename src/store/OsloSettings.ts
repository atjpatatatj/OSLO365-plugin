/*
Tijdens testen lijkt het alsof dit niets doet, maar de gegevens gaan mee met het document.
Als je je test document lokaal saved en daar in test zal de instelling blijven.
We gebruiken daarom localstorage om dit over te dragen naar verschillende bestanden.
*/
// because office settings doesn't flow over documents we use localstorage to make up for this.
import {OsloStore} from "./OsloStore";
import {IOsloCount} from "../oslo/IOsloCount";
import exp from "constants";

// get the saved setting and saving it in the office settings since it's not carried over as efficiently
export function initSettings() {
    let setting = JSON.parse(localStorage.getItem("definitionOTDSetting"));
    if (setting === null){
        changeDefinitionODSSetting(false);
    }
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", setting);
    Office.context.document.settings.saveAsync();
}
// disable or enable the setting in localstorage and office settings
export function changeDefinitionODSSetting(value: boolean){
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", value);
    Office.context.document.settings.saveAsync();
    localStorage.setItem("definitionOTDSetting", JSON.stringify(value)); // save to storage
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
}
// function to check the user setting
export function definitionODSSetting(){
    //we check with localstorage because this is the most accurate. The users setting is only saved when the user saves the document
    let setting = JSON.parse(localStorage.getItem("definitionOTDSetting"));
    if (setting === null){
        return false;
    }
    return setting;
}
// function to check the user count list
export function getUserCountList(){
    let useCountList = JSON.parse(localStorage.getItem("useCountList"));
    if(useCountList === null) {
        useCountList = CreateUserCountList(); //if it's empty make a new one
    }
    return useCountList.sort();
}
// function to init the list doesn't exist
function CreateUserCountList(){
    let useCountList = [];
    const osloStore = OsloStore.getInstance();
    let osloItems = osloStore.getItems();
    for (const item of osloItems){
        let osloEntry: IOsloCount = {
            // new IOsloCount object
            label: item.label,
            useCount : 0, // new list so everything is set to 0
        };
        useCountList.push(osloEntry);
    }
    localStorage.setItem("useCountList", JSON.stringify(useCountList));
    return useCountList;
}
// function to increase count when item is used
export function increaseCounter(definition: string){
    let useCountList = getUserCountList();
    let i = 0;
    // find item
    for (const item of useCountList){
        if (item.label === definition){
            useCountList[i].useCount++ // increment use
            break; //found it!
        }
        i++
    }
    localStorage.setItem("useCountList", JSON.stringify(useCountList)); // save
}
// function to find the top 5 most used items
export function findTop5MostUsedDefinitions(){
    let useCountList = getUserCountList();
    useCountList.sort(function(a, b){return b.useCount-a.useCount}); // sort the list on useCount
    let top5 = useCountList.slice(0,5); // get the top 5

    let i = 0;
    for (const item of top5){
        if (item.useCount === 0){
            top5.splice(i,5);// delete all items that are zero
        }
        i++
    }
    // prepare data for pie-chart (needs to be in an array with arrays)
    let chartkickData = [];
    for (const item of top5){
        let newDataItem = [];
        newDataItem.push(item.label);
        newDataItem.push(item.useCount);
        chartkickData.push(newDataItem);
    }
    return top5;
}
