import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

let page = 1;
let matches = books;

const starting = document.createDocumentFragment();

for (const { author, id, image, title } of matches.slice(0, BOOKS_PER_PAGE)) {
  const element = document.createElement("button");
  element.classList = "preview";
  element.setAttribute("data-preview", id);

  element.innerHTML = `
        <img
            class="preview__image"
            src="${image}"
        />
        
        <div class="preview__info">
            <h3 class="preview__title">${title}</h3>
            <div class="preview__author">${authors[author]}</div>
        </div>
    `;

  starting.appendChild(element);
}

let allHtmlElements = {
  dataListItems: document.querySelector("[data-list-items]"),
  dataSearchGenre: document.querySelector("[data-search-genres]"),
  dataSearchAuthor: document.querySelector("[data-search-authors]"),
  dataListButton: document.querySelector("[data-list-button]"),
  dataSettingCancel: document.querySelector("[data-settings-cancel]"),
  dataSettingOverlay: document.querySelector("[data-settings-overlay]"),
  dataSearchCancel: document.querySelector("[data-search-cancel]"),
  dataSearchOverlay: document.querySelector("[data-search-overlay]"),
  dataListMessage: document.querySelector("[data-list-message]"),
  dataSearchForm: document.querySelector("[data-search-form]"),
  dataSettingForm: document.querySelector("[data-settings-form]"),
  dataListMessage: document.querySelector("[data-list-message]"),
  resultList: document.querySelector("[data-list-items]"),
  showMoreButton: document.querySelector("[data-list-button]"),
};
allHtmlElements.dataListItems.appendChild(starting);

const genreHtml = document.createDocumentFragment();

const firstGenreElement = document.createElement("option");
firstGenreElement.value = "any";
firstGenreElement.innerText = "All Genres";
genreHtml.appendChild(firstGenreElement);

for (const [id, name] of Object.entries(genres)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  genreHtml.appendChild(element);
}

allHtmlElements.dataSearchGenre.appendChild(genreHtml);

const authorsHtml = document.createDocumentFragment();

const firstAuthorElement = document.createElement("option");
firstAuthorElement.value = "any";
firstAuthorElement.innerText = "All Authors";
authorsHtml.appendChild(firstAuthorElement);

for (const [id, name] of Object.entries(authors)) {
  const element = document.createElement("option");
  element.value = id;
  element.innerText = name;
  authorsHtml.appendChild(element);
}
allHtmlElements.dataSearchAuthor.appendChild(authorsHtml);
/*

/**
 * a function that Sets CSS custom properties for a color scheme based on the specified mode.
 * @param {boolean} isDark - A boolean indicating whether the color scheme
 * should be set to dark mode
 *
 */ /*
const setColorSchemeProperties = (isDark) => {
  const darkColor = "255, 255, 255";
  const lightColor = "10, 10, 20";

  document.documentElement.style.setProperty(
    "--color-dark",
    isDark ? darkColor : lightColor
  );
  document.documentElement.style.setProperty(
    "--color-light",
    isDark ? lightColor : darkColor
  );
};
/**
 * a function that checks what theme the user selected and
 * calls the function setColorSchemeProperties() to set the color scheme .
 */ /*
const handlePreferredColorScheme = () => {
  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    dataSettingTheme.value = "night"; // Set the data attribute value
    setColorSchemeProperties(true); // Set dark color scheme
  } else {
    setColorSchemeProperties(false); // Set light color scheme
  }
};
handlePreferredColorScheme();*/

/*
const dataSettingTheme = document.querySelector('[data-settings-theme]')
if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
       dataSettingTheme.value = 'night'
    document.documentElement.style.setProperty('--color-dark', '255, 255, 255');
    document.documentElement.style.setProperty('--color-light', '10, 10, 20');
} else {
    dataSettingTheme.value = 'day'
    document.documentElement.style.setProperty('--color-dark', '10, 10, 20');
    document.documentElement.style.setProperty('--color-light', '255, 255, 255');
}
*/

if (matches.length - page * BOOKS_PER_PAGE > 0) {
  //dataListButton.disabled === true && matches.length - page * BOOKS_PER_PAGE;
  allHtmlElements.dataListButton.innerText = ` Show more ${
    matches.length - page * BOOKS_PER_PAGE
  }`;
} else {
  0;
}

/*dataListButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      matches.length - page * BOOKS_PER_PAGE > 0
        ? matches.length - page * BOOKS_PER_PAGE
        : 0
    })</span>
`;
*/

const handleDatasearchOverlay = () => {
  allHtmlElements.dataSearchOverlay.open = false;
};
allHtmlElements.dataSearchCancel.addEventListener(
  "click",
  handleDatasearchOverlay
);

allHtmlElements.dataSettingCancel.addEventListener("click", () => {
  allHtmlElementsdataSettingOverlay.open = false;
});

document.querySelector("[data-header-search]").addEventListener("click", () => {
  document.querySelector("[data-search-overlay]").open = true;
  document.querySelector("[data-search-title]").focus();
});

document
  .querySelector("[data-header-settings]")
  .addEventListener("click", () => {
    document.querySelector("[data-settings-overlay]").open = true;
  });

document.querySelector("[data-list-close]").addEventListener("click", () => {
  document.querySelector("[data-list-active]").open = false;
});
/**
 * Handles the submission of a form.
 *
 * @param {Event} event - The form submission event object.
 */
const formHandle = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const theme = formData.get("theme");

  // Define color variables for day and night themes
  const dayColors = {
    "--color-dark": "10, 10, 20",
    "--color-light": "255, 255, 255",
  };

  const nightColors = {
    "--color-dark": "255, 255, 255",
    "--color-light": "10, 10, 20",
  };

  const themeColors = theme === "day" ? dayColors : nightColors;

  for (const [property, value] of Object.entries(themeColors)) {
    document.documentElement.style.setProperty(property, value);
  }
  allHtmlElements.dataSettingOverlay.open = false;
};

allHtmlElements.dataSettingForm.addEventListener("submit", formHandle);

const result = [];
page = 1;
matches = result;

/**
 * Handle form submission.
 *
 * @param {Event} event - The form submission event.
 */
const handleFormSubmission = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const filters = Object.fromEntries(formData);
  const filteredBooks = filterBooks(books, filters);
  updateResults(filteredBooks);
};

/**
 * Filter an array of books based on criteria.
 *
 * @param {Array} books - The array of books to filter.
 * @param {Object} filters - An object containing filter criteria.
 * @returns {Array} - An array of filtered books.
 */
const filterBooks = (books, filters) => {
  return books.filter((book) => {
    const genreMatch =
      filters.genre === "any" || book.genres.includes(filters.genre);

    const titleMatch =
      filters.title.trim() === "" ||
      book.title.toLowerCase().includes(filters.title.toLowerCase());

    const authorMatch =
      filters.author === "any" || book.author === filters.author;

    return genreMatch && titleMatch && authorMatch;
  });
};
/**
 * Update the results based on the filtered books.
 *
 * @param {Array} filteredBooks - The array of filtered books.
 */
const updateResults = (filteredBooks) => {
  // Clear the existing results
  allHtmlElements.resultList.innerHTML = "";

  // Check if there are no filtered books
  if (filteredBooks.length === 0) {
    allHtmlElements.dataListMessage.classList.add("list__message_show");
  } else {
    allHtmlElements.dataListMessage.classList.remove("list__message_show");
  }

  // Determine the range of books to display based on pagination
  const startIndex = (page - 1) * BOOKS_PER_PAGE;
  const endIndex = startIndex + BOOKS_PER_PAGE;

  // Create and append elements for the filtered books within the specified range
  const fragment = document.createDocumentFragment();
  for (let i = startIndex; i < endIndex && i < filteredBooks.length; i++) {
    const book = filteredBooks[i];

    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", book.id);

    element.innerHTML = `
      <img
        class="preview__image"
        src="${book.image}"
      />
      <div class="preview__info">
        <h3 class="preview__title">${book.title}</h3>
        <div class="preview__author">${authors[book.author]}</div>
      </div>
    `;

    fragment.appendChild(element);
  }

  resultList.appendChild(fragment);

  // Update the "Show more" button state
  const remainingBooks = filteredBooks.length - endIndex;
  allHtmlElements.showMoreButton.disabled = remainingBooks <= 0;
  allHtmlElements.showMoreButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${
      remainingBooks > 0 ? remainingBooks : 0
    })</span>
  `;

  // Scroll to the top of the page
  window.scrollTo({ top: 0, behavior: "smooth" });
  allHtmlElements.dataSearchOverlay.open = false;
};
allHtmlElements.dataSearchForm.addEventListener("submit", handleFormSubmission);
/**
 * Handles the behavior for displaying and updating the list of items.
 *
 * This function is responsible for managing the behavior related to displaying and updating
 * the list of items based on filtering and pagination. It handles the addition of new items,
 * pagination controls, and item display based on the 'matches' data.
 *
 * @function
 * @returns {void}
 */
const newDataListHandle = () => {
  const fragment = document.createDocumentFragment();

  for (const { author, id, image, title } of matches.slice(
    page * BOOKS_PER_PAGE,
    (page + 1) * BOOKS_PER_PAGE
  )) {
    const element = document.createElement("button");
    element.classList = "preview";
    element.setAttribute("data-preview", id);

    element.innerHTML = `
            <img
                class="preview__image"
                src="${image}"
            />
            
            <div class="preview__info">
                <h3 class="preview__title">${title}</h3>
                <div class="preview__author">${authors[author]}</div>
            </div>
        `;

    fragment.appendChild(element);
  }

  allHtmlElements.dataListItems.appendChild(fragment);
  page += 1;
};

allHtmlElements.dataListButton.addEventListener("click", newDataListHandle);

/**
 * Handles the click event on preview items, displaying additional book details.
 *
 * This function is designed to be triggered when a preview item is clicked. It searches for
 * the clicked item's data-preview attribute in the event path and retrieves the corresponding
 * book's information from the 'books' array. It then updates the details view elements to
 * display the book's image, title, author, publication year, and description.
 *
 * @function
 * @param {Event} event - The click event that triggered this function.
 * @returns {void}
 */
const newDataListItemsHandle = (event) => {
  const pathArray = Array.from(event.path || event.composedPath());
  let active = null;

  for (const node of pathArray) {
    if (active) break;

    if (node?.dataset?.preview) {
      let result = null;

      for (const singleBook of books) {
        if (result) break;
        if (singleBook.id === node?.dataset?.preview) result = singleBook;
      }

      active = result;
    }
  }

  if (active) {
    document.querySelector("[data-list-active]").open = true;
    document.querySelector("[data-list-blur]").src = active.image;
    document.querySelector("[data-list-image]").src = active.image;
    document.querySelector("[data-list-title]").innerText = active.title;
    document.querySelector("[data-list-subtitle]").innerText = `${
      authors[active.author]
    } (${new Date(active.published).getFullYear()})`;
    document.querySelector("[data-list-description]").innerText =
      active.description;
  }
};

allHtmlElements.dataListItems.addEventListener("click", newDataListItemsHandle);
