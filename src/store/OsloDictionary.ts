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