class Book {
    constructor(title, author, pages, read) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.read = read;
    }
}

class Library {
    constructor() {
        this.books = [];
        this.initializeEventListeners();
    }

    initializeEventListeners() {
        document.querySelector("#new-entry").addEventListener("click", () => {
            document.querySelector("#modal").classList.remove("display-none");
        });

        document.querySelector("#entry-form").addEventListener("submit", (event) => {
            event.preventDefault();
            const title = document.getElementById("title").value;
            const author = document.getElementById('author').value;
            const pages = document.getElementById('pages').value;
            const read = document.getElementById('read').checked;
            this.addBookToLibrary(title, author, pages, read);
            document.querySelector("#modal").classList.add("display-none");
        });

        document.querySelector("#cancel").addEventListener("click", () => {
            document.querySelector("#modal").classList.add("display-none");
        });
    }

    addBookToLibrary(title, author, pages, read) {
        const newBook = new Book(title, author, pages, read);
        const exists = this.books.some(book => book.title === newBook.title && book.author === newBook.author);

        if (exists) {
            alert(`The book "${newBook.title}" by ${newBook.author} already exists in the Book Log.`);
            return;
        }

        this.books.push(newBook);
        this.displayRecords();
    }

    displayRecords() {
        const container = document.querySelector(".container");
        container.innerHTML = "";

        this.books.forEach((book, index) => {
            const record = document.createElement("div");
            record.classList.add("record");

            const entry = document.createElement("div");
            entry.classList.add("entry");
            entry.innerHTML = `
                <span class="title">
                    <h3>Title:</h3>
                    <p>${book.title}</p>
                </span>
                <span class="author">
                    <h3>Author Name:</h3>
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
                    <input type="radio" name="status-${index}" value="not-read" ${!book.read ? "checked" : ""}>
                    Not Read
                </label>
                <button type="button" class="delete" data-index="${index}">&#10060;</button>
            `;

            record.appendChild(entry);
            container.appendChild(record);
        });

        this.addDeleteEventListeners();
    }

    addDeleteEventListeners() {
        const deleteButtons = document.querySelectorAll(".delete");
        deleteButtons.forEach(button => {
            button.addEventListener("click", (event) => {
                this.deleteRecord(event);
            });
        });
    }

    deleteRecord(event) {
        const index = event.target.getAttribute("data-index");
        this.books.splice(index, 1);
        this.displayRecords();
    }
}

const myLibrary = new Library();

myLibrary.addBookToLibrary("It", "Stephen King", 1138, true);
myLibrary.addBookToLibrary("Harry Potter and the Sorcerer's Stone", "J.K. Rowling", 309, true);
