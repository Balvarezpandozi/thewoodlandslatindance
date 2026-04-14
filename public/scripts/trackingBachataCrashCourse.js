const visitorId = localStorage.getItem("visitorId");

if (!visitorId) {
  const newId = crypto.randomUUID();
  localStorage.setItem("visitorId", newId);
}

navigator.sendBeacon(
  "/track",
  JSON.stringify({
    visitorId: localStorage.getItem("visitorId"),
    type: "visit",
    url: "/bachata-crash-course",
  }),
);

document.querySelectorAll("a").forEach((btn) => {
  btn.addEventListener("click", () => {
    navigator.sendBeacon(
      "/track",
      JSON.stringify({
        visitorId: localStorage.getItem("visitorId"),
        type: "click",
        url: "/bachata-crash-course",
      }),
    );
  });
});
