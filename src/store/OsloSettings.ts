/*
Tijdens testen lijkt het alsof dit niets doet maar de gegevens gaan mee met het document.
Als je je test document lokaal saved en daar in test zal de instelling blijven.
We gebruiken daarom localstorage om dit over te dragen naar verschillende bestanden.
*/
// because office settings doesn't flow over documents we use localstorage to make up for this.
export function initSettings() {
    let setting = JSON.parse(localStorage.getItem("defintionOTDSetting"));
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
    let setting = JSON.parse(localStorage.getItem("defintionOTDSetting"));
    if (setting === null){
        return false;
    }
    return setting;
}
// function to check the user setting
export function initUserCount(){

}
