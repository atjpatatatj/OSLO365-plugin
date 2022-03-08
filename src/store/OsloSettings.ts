/*
Tijdens testen lijkt het alsof dit niets doet maar de gegevens gaan mee met het document.
Als je je test document lokaal saved en daar in test zal de instelling blijven
 */
export function enableDefintionOTD(){
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", true);
    Office.context.document.settings.saveAsync();
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
}
export function disableDefinitionOTD(){
    Office.context.document.settings.set("Office.AutoShowTaskpaneWithDocument", false);
    Office.context.document.settings.saveAsync();
    console.log('Current value for mySetting: ' + Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument'));
}
export function defintionOTDSetting(){
    let setting = Office.context.document.settings.get('Office.AutoShowTaskpaneWithDocument');
    if (setting === null){
        return true;
    }
    return setting;
}