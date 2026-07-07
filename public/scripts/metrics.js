// Sorting Logic
//get all metrics
//find current sort state
//sort recipients by condition (opposite to current state)
//take out recipients and replace them in correct order

function getAllInteractionElements() {
  return document.getElementsByClassName("interaction-identifier");
}

function findCurrentSortState() {
  return 1;
}

function sortInteractionsList(interactions, sortingFn) {
  return [...interactions].sort(sortingFn);
}

function replaceInteractionsList(interactions) {
  const tableBody = document.getElementsByTagName("tbody")[0];
  tableBody.replaceChildren(...interactions);
}

function sortInteractions(button, sortingFunction) {
  let ascending = button.dataset.ascending === "true";
  let interactions = getAllInteractionElements();
  interactions = sortInteractionsList(interactions, (a, b) =>
    ascending ? sortingFunction(a, b) : sortingFunction(b, a),
  );
  replaceInteractionsList(interactions);
  button.dataset.ascending = (!ascending).toString();
}

function sortByVisitorId(button) {
  const nameSorting = (a, b) => {
    return a.children[0].textContent
      .trim()
      .localeCompare(b.children[0].textContent.trim());
  };
  sortInteractions(button, nameSorting);
}

function sortByTimestamp(button) {
  const timestampSorting = (a, b) => {
    return (
      new Date(a.children[1].textContent.trim()) -
      new Date(b.children[1].textContent.trim())
    );
  };
  sortInteractions(button, timestampSorting);
}

function sortByUrl(button) {
  const nameSorting = (a, b) => {
    return a.children[2].textContent
      .trim()
      .localeCompare(b.children[2].textContent.trim());
  };
  sortInteractions(button, nameSorting);
}

function sortByType(button) {
  const nameSorting = (a, b) => {
    return a.children[3].textContent
      .trim()
      .localeCompare(b.children[3].textContent.trim());
  };
  sortInteractions(button, nameSorting);
}
