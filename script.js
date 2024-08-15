let myLibrary = [new Book("The Hobbit", "JRR Tolkien", "297", "N")];
const table = document.querySelector("table");

function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    /* this.info = () => {
        infoString = title + " by " + author + ", " + pages + " pages, "
        if (this.read === true) return infoString + " already read"
        else return infoString + "not read yet" */
}

addBookToLibrary = (title, author, pages, read) => {
    const book = new Book(title, author, pages, read);
    myLibrary.push(book);
    table.textContent = "";
    displayLibrary();
}

displayLibrary = () => {
    // Create header
    const row = document.createElement("tr");
    Object.keys(new Book()).forEach((key) => {
        const header = document.createElement('th');
        header.setAttribute('scope', 'col');
        header.textContent = key.toUpperCase();
        row.appendChild(header);
    });
    table.appendChild(row);

    const header = document.createElement('th');
    header.setAttribute('scope', 'col');
    header.textContent = "";
    row.appendChild(header);

    // myLibrary.forEach((book) => displayBook(book));
    myLibrary.forEach((book, index) => {
        const row = document.createElement("tr");
        row.setAttribute("data-row-number", index);

        Object.keys(book).forEach((key) => {

            const prop = document.createElement("td");
            prop.textContent = book[key];
            row.appendChild(prop);
        })

        const trashBtn = document.createElement("button");
        const trashIcon = document.createElement("i");
        trashIcon.setAttribute("class", "fa fa-trash");
        trashBtn.appendChild(trashIcon);
        trashBtn.addEventListener("click", (e) => {
            myLibrary.splice(index, 1)
            table.textContent = "";
            displayLibrary();
        });
        row.appendChild(trashBtn);

        const toggleReadBtn = document.createElement("button");
        toggleReadBtn.textContent = "Toggle Read";
        toggleReadBtn.addEventListener("click", (e) => {
            if (myLibrary[index].read === "Y") {
                myLibrary[index].read = "N";
                e.currentTarget.previousSibling.previousSibling.textContent = "N"
            }
            else {
                myLibrary[index].read = "Y";
                e.currentTarget.previousSibling.previousSibling.textContent = "Y"
            }
        })
        row.appendChild(toggleReadBtn);

        table.appendChild(row);
    });
}

const newBookBtn = document.querySelector("#new-book")
const dialog = document.querySelector("#insert-book");
const addBookBtn = dialog.querySelector("#confirmBtn");

newBookBtn.addEventListener("click", () => {
    dialog.showModal();
})


addBookBtn.addEventListener('click', (e) => {
    const form = document.querySelector("#book-form");
    // needs the name attribute in the form fields to create key value pair
    const data = Object.fromEntries(new FormData(form).entries());
    if (data.read === "on") {
        data.read = "Y"
    }
    else {
        data.read = "N"
    }
    addBookToLibrary(data.title, data.author, data.pages, data.read);
    e.preventDefault();
    dialog.close();
  });

displayLibrary();
//abook = new Book("The Hobbit", "JRR Tolkien", "297", false)