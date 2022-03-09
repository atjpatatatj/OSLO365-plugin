/*
Tijdens testen lijkt het alsof dit niets doet maar de gegevens gaan mee met het document.
Als je je test document lokaal saved en daar in test zal de instelling blijven.
We gebruiken daarom localstorage om dit over te dragen naar verschillende bestanden.
*/
// because office settings doesn't flow over documents we use localstorage to make up for this.
export function initSettings() {
    let setting = JSON.parse(localStorage.getItem("defintionOTDSetting"));
    if (setting === null){
        disableDefinitionOTD();
    }
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", setting);
    Office.context.document.settings.saveAsync();
}
// enable the setting in localstorage and office settings
export function enableDefintionOTD(){
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", true);
    Office.context.document.settings.saveAsync();
    localStorage.setItem("defintionOTDSetting", JSON.stringify(true)); // save to storage
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
}
// disable the setting in localstorage and office settings
export function disableDefinitionOTD(){
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", false);
    Office.context.document.settings.saveAsync();
    localStorage.setItem("defintionOTDSetting", JSON.stringify(false)); // save to storage
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
}
// function to check the user setting
export function defintionOTDSetting(){
    //we check with localstorage because this is the most accurate. The users setting is only saved when the user saves the document
    let setting = JSON.parse(localStorage.getItem("defintionOTDSetting"));
    if (setting === null){
        return false;
    }
    return setting;
}