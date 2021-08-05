// console.log("Welcome to notes app")
showNotes();
//if user adds a note ass it to local storage
let addBtn = document.getElementById("addBtn")
//getting addBtn element from

//giving it a click event listener
addBtn.addEventListener("click", function (e) {
    //run this functio when clicked
    //e is event object

    //notesObj is array ofstring
    //notes is String
    let addTxt = document.getElementById("addTxt")
    let addTitle = document.getElementById("addTitle")
    //getting items which might be existing in local storage
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    }
    else {
        //if some string is found convert to array
        notesObj = JSON.parse(notes)
    }
    let myObj ={
        title: addTitle.value,
        text: addTxt.value
    }

    //Adding to our notes 
    notesObj.push(myObj)
    //now notesObj is array of objects

    //storing it in local storage
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = ""
    addTitle.value = ""
    // console.log(notesObj)
    showNotes();

})

//function to show notes from local storage
function showNotes() {
    let notes = localStorage.getItem("notes")

    if (notes == null) {
        notesObj = [];
    }
    else {
        //if some string is found convert to array
        notesObj = JSON.parse(notes)
    }

    let html = '';
    notesObj.forEach(function (element, index) {
        //appending title and body of notes to html string
        html += `   <div class="noteCard card my-2 mx-2" style="width: 18rem;">
                
                        <div class="card-body">
                        <h5 class="card-title">(${index+1}) ${element.title}</h5>
                        <p class="card-text">${element.text}</p>
                        <button id="${index}" onclick="deleteNode(this.id)" class="btn btn-primary">Delete</a>
                        </div>
                    </div>
        
        
        
                `
    });

    //populating and showing notes
    let notesElm = document.getElementById("notes")
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    }
    else {
        notesElm.innerHTML = `Nothing to diplay! Kindly start by adding a note`
    }

}


//function to delete note
function deleteNode(index) {
    // console.log('Deleting',index)
    let notes = localStorage.getItem("notes")

    if (notes == null) {
        notesObj = [];
    }
    else {
        //if some string is found convert to array
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index,1)
    //removing one element from notesObj at given index
    

    //this won't work properly until localStorage is updated
    localStorage.setItem("notes", JSON.stringify(notesObj));

    showNotes();

}

//Giving search functionality
let search = document.getElementById("searchTxt")
search.addEventListener("input",function(){
    let inputVal = search.value
    // console.log("Input event fired",inputVal)
    //as input text will change this event will be fired 

    

    //matching note body with search text
    let noteCards = document.getElementsByClassName("noteCard")
     Array.from(noteCards).forEach(function(element){
         let cardTxt = element.getElementsByTagName("p")[0].innerText;  //inner text to convert to string
         //0 as there is only one paragraph
        //  console.log(cardTxt)

        //to show or hide as per search text
        if (cardTxt.includes(inputVal)){
            element.style.display = "block"
        }
        else{
            element.style.display = "none"
        }
     })
})
