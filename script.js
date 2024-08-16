const formButton = document.querySelector("#new-entry");
const modal=document.querySelector("#modal");
const addBook=document.querySelector("#submit");

function deleteRecord(event){
    const index=event.target.getAttribute("data-index");
    myLibrary.splice(index,1);
    displayRecords();
}


const myLibrary=[];

function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
};

formButton.addEventListener("click", function(){
    modal.classList.remove("display-none");
});

document.getElementById("entry-form").addEventListener("submit", function(event){
    event.preventDefault();
    const title=document.getElementById("title").value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const read = document.getElementById('read').checked;
    addBookToLibrary(title,author,pages,read);
    modal.classList.add("display-none");
});

function addBookToLibrary(title,author,pages,read){
    const book=new Book(title,author,pages,read);
    for (let i=0; i<myLibrary.length; i++){
        if (book.title === myLibrary[i].title && book.author===myLibrary[i].author){
            alert(`The book "${book.title}" by ${book.author} already exists in Book Log.`)
            return;
        }
    }
    myLibrary.push(book);
    displayRecords();
}

function displayRecords(){
    const container=document.querySelector(".container");
    container.innerHTML="";
    myLibrary.forEach((book, index)=>{
        const record=document.createElement("div");
        record.classList.add("record");
        const entry=document.createElement("div");
        entry.classList.add("entry");
        entry.innerHTML=`<span class="title">
                    <h3>Title:</h3>
                    <p>${book.title}</p>
                </span>
                <span class="author">
                    <h3>Author Name: </h3>
                    <p>${book.author}</p>
                </span>
                <span class="pages">
                    <h3>Number of Pages:</h3>
                    <p>${book.pages}</p>
                </span>
                <label>
                    <input type="radio" name="status-${index}" value="read" ${book.read ? "checked" : ""}>
                    Read
                </label>
                <br>
                    <label>
                        <input type="radio" name="status-${index}" value="not-read" ${!book.read? "checked" : ""}>
                        Not Read
                    </label>
                    <button type="button" class="delete" data-index="${index}"> &#10060;</button>`;
            record.appendChild(entry);
            container.appendChild(record);
    });
    const deleteButtons = document.querySelectorAll(".delete");
    deleteButtons.forEach(button =>{
        button.addEventListener("click", function(event){
            deleteRecord(event);
        });
    });

}

addBookToLibrary("It", "Stephen King", 1138, true);
addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, true);


