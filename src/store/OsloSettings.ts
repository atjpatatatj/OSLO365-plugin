/*
Tijdens testen lijkt het alsof dit niets doet, maar de gegevens gaan mee met het document.
Als je je test document lokaal saved en daar in test zal de instelling blijven.
We gebruiken daarom localstorage om dit over te dragen naar verschillende bestanden.
*/
// because office settings doesn't flow over documents we use localstorage to make up for this.
import {OsloStore} from "./OsloStore";
import {IOsloCount} from "../oslo/IOsloCount";

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
export function CreateUserCountList(){
    let useCountList = [];
    const osloStore = OsloStore.getInstance();
    let osloItems = osloStore.getItems();
    for (const item of osloItems){
        let osloEntry: IOsloCount = {
            // new IOsloCount object
            label: item.label,
            useCount : 0,
        };
        useCountList.push(osloEntry);
    }
    localStorage.setItem("useCountList", JSON.stringify(useCountList));
    console.log(useCountList);
    return useCountList;
}
