let myLibrary = [];

const reading = 'Reading';
const planToRead = 'Plan to Read';
const completed = 'Completed';

const bookForm = document.querySelector('.book-form');
const bookTitle = document.getElementById('title');
const bookAuthor = document.getElementById('author');
const bookPages = document.getElementById('pages');
const bookStatus = document.getElementById('status');
const bookshelf = document.querySelector('.bookshelf');

// Constructor
function Book(title, author, pages, status) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
}

// Function that takes the user's input and stores the new book objects into an array (myLibrary)
function addBookToLibrary() {
    const newBook = new Book(bookTitle.value, bookAuthor.value, bookPages.value, bookStatus.value);
    myLibrary.push(newBook);

    // After adding the book to the library, display the books
    displayBooks();

    // Clear and close the form
    clearForm();
    closeForm();
}

// Display Books
function displayBooks() {
    // Calls the function to clear the bookshelf
    clearBookShelf();

    for(let i = 0; i < myLibrary.length; i++) {
        // Card
        const card = document.createElement('div');
        card.classList.add('card');

        // Card Info (not buttons)
        const cardTitle = document.createElement('p');
        const cardAuthor = document.createElement('p');
        const cardPages = document.createElement('p');

        cardTitle.textContent = myLibrary[i]['title'];
        cardAuthor.textContent = myLibrary[i]['author'];
        cardPages.textContent = `${myLibrary[i]['pages']} pages`;

        // Card Status Button
        const cardStatusButton = document.createElement('button');
        cardStatusButton.textContent = myLibrary[i]['status'];
        cardStatusButton.type = 'button';
        cardStatusButton.onclick = changeReadingStatus;

        if (myLibrary[i]['status'] === reading) {
            cardStatusButton.classList.add('reading');
        } else if (myLibrary[i]['status'] === planToRead) {
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
        card.appendChild(cardStatusButton);
        card.appendChild(cardRemoveButton);
    }
}

// On button click, change it to the next select option; re-display the bookshelf
function changeReadingStatus() {
    // get the index of the card
    const cardIndex = parseInt(this.parentElement.dataset.index);

    // Reading -> Plan to Read -> Completed
    if (this.textContent === reading) {
        myLibrary[cardIndex]['status'] = planToRead;
    } else if (this.textContent === planToRead) {
        myLibrary[cardIndex]['status'] = completed;
    } else {
        myLibrary[cardIndex]['status'] = reading;
    }

    displayBooks();
}

// On button click, remove the card from the array; re-display the bookshelf
function removeCard() {
    const cardIndex = parseInt(this.parentElement.dataset.index);

    myLibrary.splice(cardIndex, 1);

    displayBooks();
}

// Clear the bookshelf
function clearBookShelf() {
    bookshelf.innerHTML = '';
}

// Form Functions (open, close, clear)
function openForm() {
    bookForm.style.display = 'block';
}

function closeForm() {
    bookForm.style.display = 'none';
}

function clearForm() {
    bookTitle.value = '';
    bookAuthor.value = '';
    bookPages.value = '';
    bookStatus.value = '';
}

// TESTING
const theHobbit = new Book('The Hobbit', 'J.R.R. Tolkien', '295', planToRead);
const pog = new Book('Pog Book', 'Pog Author', '69', reading);
myLibrary.push(theHobbit, pog);
displayBooks();