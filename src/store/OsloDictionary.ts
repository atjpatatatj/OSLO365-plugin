export function getDictionaryItems() {
    let Dictionary = JSON.parse(localStorage.getItem("Dictionary"));
    if(Dictionary == null) Dictionary = []; //if it's empty make a new one
    return Dictionary
}
//Gets existing dictionary from storage and adds item
export function addToDictionary(data: any) {
    let Dictionary = getDictionaryItems();
    if(!Dictionary.includes(data.label)){ //FIXME broken
        Dictionary.push(data);
        localStorage.setItem("Dictionary", JSON.stringify(Dictionary));
        document.getElementById("button").innerHTML = data.label+ " is goed toegevoegd!";
        const myTimeout = setTimeout(changeButtonBack, 2000);
    }
    else {
        document.getElementById("button").innerHTML = data.label + " zit al in uw woordenboek";
        const myTimeout = setTimeout(changeButtonBack, 2000);
    }
}
function changeButtonBack(){
    document.getElementById("button").innerHTML = "Toevoegen aan woordenboek";
}
export function deleteFromDictionary(data: any){
    let Dictionary = getDictionaryItems();
    let position = Dictionary.indexOf(data.label);
    Dictionary.splice(position,1);
    localStorage.setItem("Dictionary", JSON.stringify(Dictionary));
    location.reload();
    document.getElementById("button").innerHTML = data.label+ " is verwijderd!";
    const myTimeout = setTimeout(changeButtonBack, 2000);
}