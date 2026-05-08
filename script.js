const bookmarkList = document.getElementById("bookmark-list");
const bookmarkName = document.getElementById("bookmark-name");
const bookmarkUrl = document.getElementById("bookmark-url");

document.addEventListener("DOMContentLoaded", loadBookmark);

document.getElementById("add-bookmark-btn")
  .addEventListener("click", (e) => {
    e.preventDefault();
    const name = document.getElementById("bookmark-name").value.trim();

    const url = document.getElementById("bookmark-url").value.trim();

    if (!name || !url) {
      alert("Please, Enter both bookmark name and bookmark URL.");
      return;
    }

    if (!url.startsWith("https://") && !url.startsWith("http://")) {
      alert("The URL must start with https:// or http://");
      return;
    }

    bookmarkName.value = "";
    bookmarkUrl.value = "";

    addBookmark(name, url);
    saveToStorage(name, url);
  });

function addBookmark(name, url) {
  const li = document.createElement("li");
  const link = document.createElement("a");
  const deleteBtn = document.createElement("button");

  link.href = url;
  link.textContent = name;
  link.target = "_blank";

  deleteBtn.classList.add("delete-btn");
  deleteBtn.textContent = "Delete";

  deleteBtn.addEventListener("click", () => {
    li.remove();
    removeFromStorage(name, url);
  });

  li.appendChild(link);
  li.appendChild(deleteBtn);

  bookmarkList.appendChild(li);
}

function getBookmarkFromStorage() {
  const bookmarks = localStorage.getItem("bookmarks");

  return bookmarks ? JSON.parse(bookmarks) : [];
}

function saveToStorage(name, url) {
  const bookmarks = getBookmarkFromStorage();

  bookmarks.push({name, url});
  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function removeFromStorage(name, url) {
  let bookmarks = getBookmarkFromStorage();

  bookmarks = bookmarks.filter(bookmark => bookmark.url !== url || bookmark.name !== name);

  localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
}

function loadBookmark() {
  const bookmarks = getBookmarkFromStorage();

  bookmarks.forEach((bookmark) => {
    addBookmark(bookmark.name, bookmark.url);
  });
}
