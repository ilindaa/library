class Book {
    constructor(title, author, pages, status) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.status = status;
    }
}

// Function that takes the user's input and stores the new book objects into an array (myLibrary)
function addBookToLibrary() {
    const bookTitle = document.getElementById('title');
    const bookAuthor = document.getElementById('author');
    const bookPages = document.getElementById('pages');
    const bookStatus = document.getElementById('status');
    const localLibrary = JSON.parse(localStorage.getItem("library"));
    const newBook = new Book(bookTitle.value, bookAuthor.value, parseInt(bookPages.value), bookStatus.value);
    localLibrary.push(newBook);

    updateLocalLibrary(localLibrary);
    // After adding the book to the library, display the books
    displayBooks();

    closeForm();
}

// Display Books
function displayBooks() {
    const bookshelf = document.querySelector('.bookshelf');
    const reading = 'Reading';
    const planToRead = 'Plan to Read';
    const localLibrary = JSON.parse(localStorage.getItem("library"));
    // Calls the function to clear the bookshelf
    clearBookShelf();

    for(let i = 0; i < localLibrary.length; i++) {
        // Card
        const card = document.createElement('div');
        card.classList.add('card');

        // Card Info (not buttons)
        const cardTitle = document.createElement('p');
        const cardAuthor = document.createElement('p');
        const cardPages = document.createElement('p');

        cardTitle.textContent = localLibrary[i]['title'];
        cardAuthor.textContent = localLibrary[i]['author'];
        cardPages.textContent = `${localLibrary[i]['pages']} pages`;

        cardTitle.id = 'card-title';

        // Card Status Button
        const cardButtonDiv = document.createElement('div');
        cardButtonDiv.classList.add('card-btn-div');
        const cardStatusButton = document.createElement('button');
        cardStatusButton.textContent = localLibrary[i]['status'];
        cardStatusButton.type = 'button';
        cardStatusButton.onclick = changeReadingStatus;

        if (localLibrary[i]['status'] === reading) {
            cardStatusButton.classList.add('reading');
        } else if (localLibrary[i]['status'] === planToRead) {
            cardStatusButton.classList.add('planToRead');
        } else {
            cardStatusButton.classList.add('completed');
        }

        // Card Remove Button
        const cardRemoveButton = document.createElement('button');
        cardRemoveButton.textContent = 'Remove';
        cardRemoveButton.type = 'button';
        cardRemoveButton.onclick = removeCard; 
        cardRemoveButton.classList.add('remove');

        // Add the data attribute based on the current card's index value
        card.dataset.index = i;

        // Add the card to bookshelf, add the card content to the card
        bookshelf.appendChild(card);
        card.appendChild(cardTitle);
        card.appendChild(cardAuthor);
        card.appendChild(cardPages);
        card.appendChild(cardButtonDiv);
        cardButtonDiv.appendChild(cardStatusButton);
        cardButtonDiv.appendChild(cardRemoveButton);
    }
}

// On button click, change it to the next select option; re-display the bookshelf
function changeReadingStatus() {
    const reading = 'Reading';
    const planToRead = 'Plan to Read';
    const completed = 'Completed';
    // get the index of the card
    const cardIndex = parseInt(this.parentElement.parentElement.dataset.index);
    const localLibrary = JSON.parse(localStorage.getItem("library"));

    // Reading -> Plan to Read -> Completed
    if (this.textContent === reading) {
        localLibrary[cardIndex]['status'] = planToRead;
    } else if (this.textContent === planToRead) {
        localLibrary[cardIndex]['status'] = completed;
    } else {
        localLibrary[cardIndex]['status'] = reading;
    }

    updateLocalLibrary(localLibrary);
    displayBooks();
}

// On button click, remove the card from the array; re-display the bookshelf
function removeCard() {
    const cardIndex = parseInt(this.parentElement.parentElement.dataset.index);
    const localLibrary = JSON.parse(localStorage.getItem("library"));

    localLibrary.splice(cardIndex, 1);
    updateLocalLibrary(localLibrary);

    displayBooks();
}

// Clear the bookshelf
function clearBookShelf() {
    const bookshelf = document.querySelector('.bookshelf');
    bookshelf.innerHTML = '';
}

// Form Functions (open, close, clear)
function openForm() {
    const bookFormOverlay = document.querySelector('.form-overlay-bg');
    const bookForm = document.querySelector('.book-form');
    bookForm.style.display = 'block';
    bookFormOverlay.style.display = 'block';
}

function closeForm() {
    const bookFormOverlay = document.querySelector('.form-overlay-bg');
    const bookForm = document.querySelector('.book-form');
    bookForm.style.display = 'none';
    bookFormOverlay.style.display = 'none';
    clearForm();
}

function clearForm() {
    const bookTitle = document.getElementById('title');
    const bookAuthor = document.getElementById('author');
    const bookPages = document.getElementById('pages');
    const bookStatus = document.getElementById('status');
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookStatus.value = '';
}

// If there is a "library" item in localStorage, then display the local storage
// Else, create a "library" with an empty array and load the library with sample books
function runLocalStorage() {
    if (localStorage.getItem("library")) { 
        displayBooks();
    } else { 
        localStorage.setItem("library", JSON.stringify([]));
        addSampleBooksToLibrary();
    }
}

// Updates the "library" in localStorage with the updated library array
function updateLocalLibrary(updatedLibrary) {
    localStorage.setItem("library", JSON.stringify(updatedLibrary));
}

// Adds sample books to the "library" in localStorage and updates it
function addSampleBooksToLibrary() {
    const reading = 'Reading';
    const planToRead = 'Plan to Read';
    const completed = 'Completed';
    const myLibrary = [];

    const test1 = new Book('When Heaven and Earth Changed Places', 'Le Ly Hayslip, Jay Wurts', 464, completed);
    const test2 = new Book('Before the Coffee Gets Cold', 'Toshikazu Kawaguchi', 272, reading);
    const test3 = new Book('Yellow Face', 'R. F. Kuang', 336, planToRead);
    myLibrary.push(test1, test2, test3);

    updateLocalLibrary(myLibrary);
    displayBooks();
}

// Clears the local storage
function clearLocalStorage() {
    if (confirm("Are you sure you want to clear the local storage? This action will restore the library to its original state and refresh the page.\nThis action cannot be undone.")) {
        localStorage.clear();
        location.reload();
    }
}

runLocalStorage();