import {IOsloItem} from "../oslo/IOsloItem";

export function getDictionaryItems() {
    let dictionary = JSON.parse(localStorage.getItem("dictionary"));
    if(dictionary == null) dictionary = []; //if it's empty make a new one
    return dictionary
}
//Gets existing dictionary from storage and adds item
export function addToDictionary(data: any) {
    let dictionary = getDictionaryItems();
    let duplicate = false;
    for (const item of dictionary) {
        if (item.label === data.label){
            document.getElementById("button").innerHTML = data.label + " zit al in uw woordenboek";
            const myTimeout = setTimeout(changeButtonBack, 2000);
            duplicate = true;
        }
    }
    if(!duplicate){
        dictionary.push(data);
        localStorage.setItem("dictionary", JSON.stringify(dictionary));
        document.getElementById("button").innerHTML = data.label+ " is goed toegevoegd!";
        const myTimeout = setTimeout(changeButtonBack, 2000);
    }
}
function changeButtonBack(){
    document.getElementById("button").innerHTML = "Toevoegen aan woordenboek";
}
export function deleteFromDictionary(data: any){
    let dictionary = getDictionaryItems();
    let i = 0;
    for (const item of dictionary) {
        if (item.label === data.label){
            dictionary.splice(i,1);
            localStorage.setItem("dictionary", JSON.stringify(dictionary));
            document.getElementById("button").innerHTML = data.label+ " is verwijderd!";
            const myTimeout = setTimeout(changeButtonBack, 2000);
            location.reload();
        }
        i++
    }
}
/** Searches a given phrase in the OSLO data set. */
export function searchDict(phrase: string): IOsloItem[] {
    if (!phrase) {
        return null;
    }
    //clean
    phrase = phrase.toLowerCase().trim();
    // new list
    const matches: IOsloItem[] = [];

    let items = getDictionaryItems();
    // loop for possible matches
    for (const item of items) {
        if (typeof item.label === "string") {
            let possible = item.label.toLowerCase();
            let result = possible.search(phrase); // returns position of word in the label
            if (result >= 0) {
                // -1 is no match, so everything on position 0 to infinity is a match
                matches.push(item);
            }
        }
    }
    return matches.sort();
}
