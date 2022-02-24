export function getDictionaryItems() {
    let Dictionary = JSON.parse(localStorage.getItem("Dictionary"));
    if(Dictionary == null) Dictionary = []; //if it's empty make an new one
    return Dictionary
}
//Gets existing dictionary from storage and adds item
export function addToDictionary(data: any) {
    let Dictionary = getDictionaryItems();
    if(!Dictionary.includes(data.label)){
        Dictionary.push(data.label);
        localStorage.setItem("Dictionary", JSON.stringify(Dictionary));
        console.log("added " + data.label.toLowerCase() + " to dictionary");
        document.getElementById("button").innerHTML = data.label+ " is goed toegevoegd!";
        const myTimeout = setTimeout(changeButtonBack, 2000);
    }
    else {
        console.log("your dictionary already contains " + data.label.toLowerCase());
        document.getElementById("button").innerHTML = data.label + " zit al in uw woordenboek";
        const myTimeout = setTimeout(changeButtonBack, 2000);
    }
}
function changeButtonBack(){
    document.getElementById("button").innerHTML = "Toevoegen aan woordenboek";
}
//TODO delete item from dictionary