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