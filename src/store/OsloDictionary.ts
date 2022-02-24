//TODO function to get items from dictionary
export function getDictionaryItems() {
    let Dictionary = JSON.parse(localStorage.getItem("Dictionary"));
    if(Dictionary == null) Dictionary = []; //if it's empty make an new one
    return Dictionary
}
//TODO don't add item if it already exists
//Gets existing dictionary from storage and adds item
export function addToDictionary(data: any) {
    let Dictionary = getDictionaryItems();
    Dictionary.push(data);
    localStorage.setItem("Dictionary", JSON.stringify(Dictionary));
    console.log("added "+data.label.toLowerCase()+" to dictionary");
    getDictionaryItems();
}
//TODO delete item from dictionary