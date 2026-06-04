async function sendRecipientUpdate(id) {
  const response = await fetch("/adminportal/recipients", {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      recipientId: id,
    }),
  });

  const data = await response.json();
  return data;
}

async function updateRecipient(event) {
  event.target.textContent = "We're updating this...";
  const recipientID = event.target.dataset.id;

  try {
    const response = await sendRecipientUpdate(recipientID);
    if (response.recipient.subscribed) event.target.textContent = "Unsubscribe";
    if (!response.recipient.subscribed) event.target.textContent = "Subscribe";
  } catch {
    event.target.textContent = "Error! Try Again...";
  }
}

const buttons = document.getElementsByClassName("recipientSubscribeButton");
for (const button of buttons) {
  button.addEventListener("click", updateRecipient);
}

// Sorting Logic
//get all recipients
//find current sort state
//sort recipients by condition (opposite to current state)
//take out recipients and replace them in correct order

function getAllRecipientElements() {
  return document.getElementsByClassName("recipient-identifier");
}

function findCurrentSortState() {
  return 1;
}

function sortRecipientsList(recipients, sortingFn) {
  return [...recipients].sort(sortingFn);
}

function replaceRecipientsList(recipients) {
  const tableBody = document.getElementsByTagName("tbody")[0];
  tableBody.replaceChildren(...recipients);
}

function sortRecipients(button, sortingFunction) {
  let ascending = button.dataset.ascending === "true";
  let recipients = getAllRecipientElements();
  recipients = sortRecipientsList(recipients, (a, b) =>
    ascending ? sortingFunction(a, b) : sortingFunction(b, a),
  );
  replaceRecipientsList(recipients);
  button.dataset.ascending = (!ascending).toString();
}

function sortByTimestamp(button) {
  const timestampSorting = (a, b) => {
    return (
      new Date(a.children[0].textContent.trim()) -
      new Date(b.children[0].textContent.trim())
    );
  };
  sortRecipients(button, timestampSorting);
}

function sortByName(button) {
  const nameSorting = (a, b) => {
    return a.children[1].textContent
      .trim()
      .localeCompare(b.children[1].textContent.trim());
  };
  sortRecipients(button, nameSorting);
}

function sortByEmail(button) {
  const emailSorting = (a, b) => {
    return a.children[2].textContent
      .trim()
      .localeCompare(b.children[2].textContent.trim());
  };
  sortRecipients(button, emailSorting);
}

function sortByStatus(button) {
  const statusSorting = (a, b) => {
    return a.children[3].textContent
      .trim()
      .localeCompare(b.children[3].textContent.trim());
  };
  sortRecipients(button, statusSorting);
}
