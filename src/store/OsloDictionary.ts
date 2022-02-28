import {IOsloItem} from "../oslo/IOsloItem";

//gets all items from your localstorage dictionary
export function getDictionaryItems() {
    let dictionary = JSON.parse(localStorage.getItem("dictionary"));
    if(dictionary == null) dictionary = []; //if it's empty make a new one
    return dictionary.sort();
}
//Gets existing dictionary from storage and adds item
export function addToDictionary(data: any) {
    let dictionary = getDictionaryItems();
    let duplicate = false;
    for (const item of dictionary) {
        if (item.label === data.label){ // match items? don't add same item twice.
            document.getElementById("button").innerHTML = data.label + " zit al in uw woordenboek"; // confirmation to user
            const myTimeout = setTimeout(changeButtonBack, 2000); // confirmation done
            duplicate = true;
            break;
        }
    }
    if(!duplicate){ // not in dictionary already? go ahead and add!
        dictionary.push(data);
        localStorage.setItem("dictionary", JSON.stringify(dictionary));
        document.getElementById("button").innerHTML = data.label+ " is goed toegevoegd!"; // confirmation to user
        const myTimeout = setTimeout(changeButtonBack, 2000); // confirmation done
    }
}
// function to change the button text back to normal
function changeButtonBack(){
    document.getElementById("button").innerHTML = "Toevoegen aan woordenboek";
}
// delete item from your dictionary
export function deleteFromDictionary(data: any){
    let dictionary = getDictionaryItems();
    let i = 0;
    for (const item of dictionary) {
        if (item.label === data.label){ // find the index of the item that needs to be removed
            dictionary.splice(i,1);// delete 1 item on index position
            localStorage.setItem("dictionary", JSON.stringify(dictionary)); // save to storage
            document.getElementById("button").innerHTML = data.label+ " is verwijderd!"; // confirmation to user
            const myTimeout = setTimeout(changeButtonBack, 2000); // confirmation done
            location.reload(); // refresh page to load new list without removed item
            break; //loop ends item found
        }
        i++
    }
}
// Searches a given phrase in the dictionary.
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
