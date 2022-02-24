//TODO function to get items from dictionary
//TODO function to add item to dictionary
//Gets existing dictionary from storage and adds item
export function addToDictionary(data: any) {
    let Dictionary = JSON.parse(localStorage.getItem("Dictionary"));
    if(Dictionary == null) Dictionary = []; //if it's empty make an new one
    Dictionary.push(data);
    localStorage.setItem("Dictionary", JSON.stringify(Dictionary));
    console.log("added "+data.label.toLowerCase()+" to dictionary");
}
//TODO delete item from dictionary