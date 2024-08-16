const deleteButtons = document.querySelectorAll(".delete");

deleteButtons.forEach(button =>{
    button.addEventListener("click", function(event){
        deleteRecord(event);
    });
});

function deleteRecord(event){
    const record= event.target.closest(".record");
    if (record){
        record.remove();
    }
}


const myLibrary=[];

function Book(title,author,pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
}