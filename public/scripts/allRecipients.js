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
