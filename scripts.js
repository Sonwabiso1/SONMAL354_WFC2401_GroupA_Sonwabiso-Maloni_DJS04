// Import necessary data from data.js
import { books, authors, genres, BOOKS_PER_PAGE } from "./data.js";

// Define BookPreview Web Component
class BookPreview extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const { author, id, image, title } = this.dataset;

    this.innerHTML = `
      <button class="preview" data-preview="${id}">
        <img class="preview__image" src="${image}" />
        <div class="preview__info">
          <h3 class="preview__title">${title}</h3>
          <div class="preview__author">${authors[author]}</div>
        </div>
      </button>
    `;
  }
}

customElements.define("book-preview", BookPreview);

// Global state object to maintain the current state
const state = {
  page: 1,
  matches: books,
  filters: {
    genre: "any",
    author: "any",
    title: "",
  },
};

// Function to create book preview element
const createBookPreview = ({ author, id, image, title }) => {
  const element = document.createElement("book-preview");
  element.dataset.author = author;
  element.dataset.id = id;
  element.dataset.image = image;
  element.dataset.title = title;
  return element;
};

// Function to render book previews
const renderBookPreviews = (books, container) => {
  const fragment = document.createDocumentFragment();
  books.slice(0, BOOKS_PER_PAGE).forEach((book) => {
    fragment.appendChild(createBookPreview(book));
  });
  container.appendChild(fragment);
};

// Function to create option element for select input
const createOption = (value, text) => {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;
  return option;
};

const initializeSelectOptions = (selectElement, options, defaultOption) => {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createOption("any", defaultOption));
  Object.entries(options).forEach(([id, name]) => {
    fragment.appendChild(createOption(id, name));
  });
  selectElement.appendChild(fragment);
};

// Function to update theme
const updateTheme = (theme) => {
  if (theme === "night") {
    document.documentElement.style.setProperty("--color-dark", "255, 255, 255");
    document.documentElement.style.setProperty("--color-light", "10, 10, 20");
  } else {
    document.documentElement.style.setProperty("--color-dark", "10, 10, 20");
    document.documentElement.style.setProperty(
      "--color-light",
      "255, 255, 255"
    );
  }
};

const handleThemeChange = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const { theme } = Object.fromEntries(formData);
  updateTheme(theme);
  document.querySelector("[data-settings-overlay]").open = false;
};

// Function to filter books based on filters
const filterBooks = (filters) => {
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

// Function to handle search form submission
const handleSearchFormSubmit = (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  state.filters = Object.fromEntries(formData);
  state.page = 1;
  state.matches = filterBooks(state.filters);
  renderSearchResults();
  document.querySelector("[data-search-overlay]").open = false;
};

// Function to render search results
const renderSearchResults = () => {
  const listItems = document.querySelector("[data-list-items]");
  listItems.innerHTML = "";
  renderBookPreviews(state.matches, listItems);
  updateShowMoreButton();
};

// Function to update "Show More" button
const updateShowMoreButton = () => {
  const listButton = document.querySelector("[data-list-button]");
  const remaining = state.matches.length - state.page * BOOKS_PER_PAGE;
  listButton.disabled = remaining <= 0;
  listButton.innerHTML = `
    <span>Show more</span>
    <span class="list__remaining"> (${remaining > 0 ? remaining : 0})</span>
  `;
};

const handleShowMoreClick = () => {
  state.page += 1;
  const listItems = document.querySelector("[data-list-items]");
  renderBookPreviews(
    state.matches.slice(
      state.page * BOOKS_PER_PAGE,
      (state.page + 1) * BOOKS_PER_PAGE
    ),
    listItems
  );
  updateShowMoreButton();
};

// Function to handle book preview click
const handleBookPreviewClick = (event) => {
  const previewId = event.target.closest(".preview")?.dataset?.preview;
  if (previewId) {
    const book = books.find((book) => book.id === previewId);
    if (book) {
      document.querySelector("[data-list-active]").open = true;
      document.querySelector("[data-list-blur]").src = book.image;
      document.querySelector("[data-list-image]").src = book.image;
      document.querySelector("[data-list-title]").innerText = book.title;
      document.querySelector("[data-list-subtitle]").innerText = `${
        authors[book.author]
      } (${new Date(book.published).getFullYear()})`;
      document.querySelector("[data-list-description]").innerText =
        book.description;
    }
  }
};

// Function to initialize the application
const initializeApp = () => {
  renderBookPreviews(
    state.matches,
    document.querySelector("[data-list-items]")
  );

  initializeSelectOptions(
    document.querySelector("[data-search-genres]"),
    genres,
    "All Genres"
  );
  initializeSelectOptions(
    document.querySelector("[data-search-authors]"),
    authors,
    "All Authors"
  );

  if (
    window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
  ) {
    updateTheme("night");
  } else {
    updateTheme("day");
  }

  document
    .querySelector("[data-list-button]")
    .addEventListener("click", handleShowMoreClick);
  document
    .querySelector("[data-list-items]")
    .addEventListener("click", handleBookPreviewClick);
  document
    .querySelector("[data-settings-form]")
    .addEventListener("submit", handleThemeChange);
  document
    .querySelector("[data-search-form]")
    .addEventListener("submit", handleSearchFormSubmit);

  document
    .querySelector("[data-search-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-search-overlay]").open = false;
    });

  document
    .querySelector("[data-settings-cancel]")
    .addEventListener("click", () => {
      document.querySelector("[data-settings-overlay]").open = false;
    });

  document
    .querySelector("[data-header-search]")
    .addEventListener("click", () => {
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
};

// Initialize the app on DOMContentLoaded
document.addEventListener("DOMContentLoaded", initializeApp);
