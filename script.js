const events = [
  {id:1,title:"Future Forward: Tech & AI Summit",category:"Technology",date:"2026-11-18T10:00:00",dateLabel:"WED, NOV 18 · 10:00 AM",venue:"The Leela Palace, Chennai",city:"Chennai",price:"₹499",image:"https://images.unsplash.com/photo-1540575467063-178a50c2df87?auto=format&fit=crop&w=1000&q=85",short:"Big ideas, bright minds, and the tech shaping what comes next.",description:"Spend a day with builders, founders and curious minds exploring practical AI, emerging technology and the future of work. Expect thoughtful talks, lively conversations and plenty of opportunities to meet your next collaborator.",featured:true},
  {id:2,title:"Design After Hours",category:"Design",date:"2026-11-18T18:30:00",dateLabel:"WED, NOV 18 · 6:30 PM",venue:"The Folly, Chennai",city:"Chennai",price:"₹299",image:"https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=1000&q=85",short:"A creative playground for people who see the world differently.",description:"An evening for designers, illustrators and creative thinkers. Swap ideas, discover new ways to approach old problems, and meet a community that believes good design should make people feel something.",featured:true},
  {id:3,title:"Sundown Sessions: Live",category:"Music",date:"2026-11-21T17:00:00",dateLabel:"SAT, NOV 21 · 5:00 PM",venue:"Bayview Open Grounds, ECR",city:"Chennai",price:"₹799",image:"https://images.unsplash.com/photo-1501386761578-eac5c94b800a?auto=format&fit=crop&w=1000&q=85",short:"Golden hour, indie sounds, and a night that goes wherever it goes.",description:"Bring your friends or come solo for a laid-back open-air music experience. Local indie artists, sunset skies, food stalls and good company make this a night to remember. Doors open at 5 PM.",featured:true},
  {id:4,title:"Slow Sunday: Mindful Mornings",category:"Wellness",date:"2026-11-22T07:00:00",dateLabel:"SUN, NOV 22 · 7:00 AM",venue:"Semmozhi Poonga, Chennai",city:"Chennai",price:"₹199",image:"https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=1000&q=85",short:"A little movement, a little stillness, a lot more breathing room.",description:"Take a pause from the rush with a gentle guided yoga session, breathing exercises and a mindful walk in the garden. All levels are welcome; bring a mat, water bottle and an open mind.",featured:false},
  {id:5,title:"Makers & Doers Meetup",category:"Community",date:"2026-11-28T11:00:00",dateLabel:"SAT, NOV 28 · 11:00 AM",venue:"The WorkVilla, Chennai",city:"Chennai",price:"Free",image:"https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?auto=format&fit=crop&w=1000&q=85",short:"Meet the people building interesting things, one idea at a time.",description:"A relaxed community meetup for students, makers, founders and anyone with a project in progress. Share what you're working on, ask for feedback, find a teammate or simply get inspired by what others are making.",featured:false},
  {id:6,title:"The Creative Table: Pottery",category:"Design",date:"2026-12-05T15:00:00",dateLabel:"SAT, DEC 05 · 3:00 PM",venue:"Clay Station Studio, Chennai",city:"Chennai",price:"₹649",image:"https://images.unsplash.com/photo-1565193298595-6c8b5d9f4f2b?auto=format&fit=crop&w=1000&q=85",short:"Get your hands messy and make something wonderfully imperfect.",description:"Try a beginner-friendly pottery session led by a local ceramic artist. Learn the basics, shape your own small creation and enjoy a screen-free afternoon. Materials and studio tools are included.",featured:false}
];

const grid = document.getElementById("eventGrid");
const searchInput = document.getElementById("searchInput");
const filters = document.getElementById("categoryFilters");
const resultsLabel = document.getElementById("resultsLabel");
const emptyState = document.getElementById("emptyState");
const eventModal = document.getElementById("eventModal");
const registrationModal = document.getElementById("registrationModal");
const registrationForm = document.getElementById("registrationForm");
const selectedEvent = document.getElementById("selectedEvent");
let activeCategory = "All";
let currentEventId = null;
let toastTimeout;

const getSaved = () => {
  try { return JSON.parse(localStorage.getItem("gatherlySavedEvents") || "[]"); }
  catch { return []; }
};
const getRegistrations = () => {
  try { return JSON.parse(localStorage.getItem("gatherlyRegistrations") || "[]"); }
  catch { return []; }
};
const escapeHTML = value => String(value).replace(/[&<>"']/g, char => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"}[char]));

function renderEvents() {
  const query = searchInput.value.trim().toLowerCase();
  const filtered = events.filter(event => {
    const categoryMatch = activeCategory === "All" || event.category === activeCategory;
    const searchMatch = [event.title,event.category,event.venue,event.city,event.short].join(" ").toLowerCase().includes(query);
    return categoryMatch && searchMatch;
  });
  grid.innerHTML = filtered.map((event,index) => `
    <article class="event-card" style="animation-delay:${index*55}ms">
      <div class="event-cover" style="background-image:url('${event.image}')">
        <span class="event-badge">${event.featured ? "✦ FEATURED" : event.category.toUpperCase()}</span>
        <button class="save-event ${getSaved().includes(event.id) ? "saved" : ""}" data-save="${event.id}" aria-label="${getSaved().includes(event.id) ? "Remove saved event" : "Save event"}" aria-pressed="${getSaved().includes(event.id)}">${getSaved().includes(event.id) ? "♥" : "♡"}</button>
      </div>
      <div class="event-card-content">
        <div class="event-date">${event.dateLabel}</div>
        <h3>${escapeHTML(event.title)}</h3>
        <p>${escapeHTML(event.short)}</p>
        <div class="event-card-meta"><span class="event-location">⌖ &nbsp;${escapeHTML(event.venue)}</span><span class="event-price">${event.price}</span></div>
        <div class="event-card-footer"><span class="event-type">${event.category}</span><button class="event-details-link" data-details="${event.id}">Explore event <span>↗</span></button></div>
      </div>
    </article>`).join("");
  emptyState.hidden = filtered.length > 0;
  grid.hidden = filtered.length === 0;
  resultsLabel.textContent = `${filtered.length} experience${filtered.length === 1 ? "" : "s"} to explore`;
  document.getElementById("eventCount").textContent = String(events.length).padStart(2,"0");
}

function populateEventSelect() {
  selectedEvent.innerHTML = '<option value="">Choose an event</option>' + events.map(event => `<option value="${event.id}">${escapeHTML(event.title)}</option>`).join("");
}
function openEvent(id) {
  const event = events.find(item => item.id === Number(id));
  if (!event) return;
  currentEventId = event.id;
  document.getElementById("modalImage").style.backgroundImage = `url('${event.image}')`;
  document.getElementById("modalCategory").textContent = `${event.category} · ${event.price}`;
  document.getElementById("modalTitle").textContent = event.title;
  document.getElementById("modalDescription").textContent = event.description;
  document.getElementById("modalMeta").innerHTML = `<span>▦ &nbsp;${event.dateLabel}</span><span>⌖ &nbsp;${escapeHTML(event.venue)}</span>`;
  updateCountdown(event);
  eventModal.hidden = false;
  document.body.classList.add("no-scroll");
  document.getElementById("closeModal").focus();
}
function updateCountdown(event) {
  const distance = new Date(event.date).getTime() - Date.now();
  const node = document.getElementById("countdown");
  if (distance <= 0) { node.innerHTML = "This event has started or passed. Check the event details before registering."; return; }
  const days = Math.floor(distance / 86400000);
  const hours = Math.floor((distance % 86400000) / 3600000);
  const mins = Math.floor((distance % 3600000) / 60000);
  node.innerHTML = `Starts in <strong>${days}d ${hours}h ${mins}m</strong>`;
}
function closeDialog(dialog) {
  dialog.hidden = true;
  if (eventModal.hidden && registrationModal.hidden) document.body.classList.remove("no-scroll");
}
function openRegistration(eventId = "") {
  populateEventSelect();
  selectedEvent.value = eventId ? String(eventId) : "";
  clearFormErrors();
  eventModal.hidden = true;
  registrationModal.hidden = false;
  document.body.classList.add("no-scroll");
  document.getElementById("participantName").focus();
}
function showToast(title, message) {
  document.getElementById("toastTitle").textContent = title;
  document.getElementById("toastMessage").textContent = message;
  const toast = document.getElementById("toast");
  toast.classList.add("show");
  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.remove("show"), 5500);
}

filters.addEventListener("click", event => {
  const button = event.target.closest("[data-category]");
  if (!button) return;
  activeCategory = button.dataset.category;
  filters.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip === button));
  renderEvents();
});
searchInput.addEventListener("input", renderEvents);
document.getElementById("resetFilters").addEventListener("click", () => {
  searchInput.value = "";
  activeCategory = "All";
  filters.querySelectorAll(".filter-chip").forEach(chip => chip.classList.toggle("active", chip.dataset.category === "All"));
  renderEvents();
});
grid.addEventListener("click", event => {
  const detailButton = event.target.closest("[data-details]");
  const saveButton = event.target.closest("[data-save]");
  if (detailButton) openEvent(detailButton.dataset.details);
  if (saveButton) {
    const id = Number(saveButton.dataset.save);
    let saved = getSaved();
    saved = saved.includes(id) ? saved.filter(item => item !== id) : [...saved,id];
    localStorage.setItem("gatherlySavedEvents", JSON.stringify(saved));
    renderEvents();
    showToast(saved.includes(id) ? "Event saved" : "Removed from saved", saved.includes(id) ? "Find it again whenever you're ready." : "This event was removed from your saved list.");
  }
});
document.getElementById("closeModal").addEventListener("click", () => closeDialog(eventModal));
document.getElementById("closeRegistration").addEventListener("click", () => closeDialog(registrationModal));
document.getElementById("registerButton").addEventListener("click", () => openRegistration(currentEventId));
[eventModal,registrationModal].forEach(dialog => dialog.addEventListener("click", event => { if (event.target === dialog) closeDialog(dialog); }));
document.addEventListener("keydown", event => {
  if (event.key === "Escape") {
    if (!eventModal.hidden) closeDialog(eventModal);
    if (!registrationModal.hidden) closeDialog(registrationModal);
  }
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
    event.preventDefault(); searchInput.focus(); document.getElementById("events").scrollIntoView({behavior:"smooth"});
  }
});

function clearFormErrors() {
  ["name","email","phone","event"].forEach(key => {
    const field = document.getElementById(({name:"participantName",email:"participantEmail",phone:"participantPhone",event:"selectedEvent"})[key]);
    const error = document.getElementById(`${key}Error`);
    if (field) field.classList.remove("invalid");
    if (error) error.textContent = "";
  });
}
function setError(key,message) {
  const field = document.getElementById(({name:"participantName",email:"participantEmail",phone:"participantPhone",event:"selectedEvent"})[key]);
  field.classList.add("invalid");
  document.getElementById(`${key}Error`).textContent = message;
}
registrationForm.addEventListener("submit", event => {
  event.preventDefault();
  clearFormErrors();
  const name = document.getElementById("participantName").value.trim();
  const email = document.getElementById("participantEmail").value.trim();
  const phone = document.getElementById("participantPhone").value.trim();
  const eventId = Number(selectedEvent.value);
  let valid = true;
  if (name.length < 2 || !/^[\p{L}\p{M} .'-]+$/u.test(name)) { setError("name","Enter a valid name (at least 2 letters)."); valid = false; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) { setError("email","Enter a valid email address."); valid = false; }
  const digits = phone.replace(/\D/g,"");
  if (digits.length < 10 || digits.length > 15) { setError("phone","Enter a phone number with 10–15 digits."); valid = false; }
  if (!events.some(item => item.id === eventId)) { setError("event","Please choose an event."); valid = false; }
  if (!valid) return;
  const chosenEvent = events.find(item => item.id === eventId);
  const registration = {id: (window.crypto && crypto.randomUUID) ? crypto.randomUUID() : `${Date.now()}-${Math.random()}`,name,email,phone,eventId,eventTitle:chosenEvent.title,registeredAt:new Date().toISOString()};
  try {
    const registrations = getRegistrations();
    registrations.push(registration);
    localStorage.setItem("gatherlyRegistrations",JSON.stringify(registrations));
  } catch {
    showToast("Registration couldn't be saved","Your browser storage may be full or disabled. Please try again.");
    return;
  }
  registrationForm.reset();
  closeDialog(registrationModal);
  showToast("You're on the list, "+name.split(" ")[0]+"!",`Your registration for ${chosenEvent.title} has been saved on this device.`);
});

document.getElementById("themeToggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
  const isDark = document.body.classList.contains("dark");
  document.getElementById("themeToggle").textContent = isDark ? "☀" : "☾";
  document.getElementById("themeToggle").setAttribute("aria-label",isDark ? "Switch to light theme" : "Switch to dark theme");
  localStorage.setItem("gatherlyTheme",isDark ? "dark" : "light");
});
try {
  if (localStorage.getItem("gatherlyTheme") === "dark") {
    document.body.classList.add("dark");
    document.getElementById("themeToggle").textContent = "☀";
  }
} catch {}
document.getElementById("newsletterForm").addEventListener("submit", event => {
  event.preventDefault();
  const input = document.getElementById("newsletterEmail");
  const message = document.getElementById("newsletterMessage");
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(input.value.trim())) {
    message.textContent = "Please enter a valid email address.";
    message.style.color = "#ff987d";
    input.focus();
    return;
  }
  let subscribers = [];
  try { subscribers = JSON.parse(localStorage.getItem("gatherlySubscribers") || "[]"); } catch {}
  if (!subscribers.includes(input.value.trim().toLowerCase())) subscribers.push(input.value.trim().toLowerCase());
  localStorage.setItem("gatherlySubscribers",JSON.stringify(subscribers));
  input.value = "";
  message.textContent = "You're subscribed! Keep an eye out for good things.";
  message.style.color = "#a8dfbd";
});
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");
menuToggle.addEventListener("click", () => {
  const open = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded",String(open));
  menuToggle.setAttribute("aria-label",open ? "Close navigation" : "Open navigation");
});
navLinks.querySelectorAll("a").forEach(link => link.addEventListener("click", () => {
  navLinks.classList.remove("open"); menuToggle.setAttribute("aria-expanded","false");
}));
document.getElementById("closeToast").addEventListener("click", () => document.getElementById("toast").classList.remove("show"));
populateEventSelect();
renderEvents();
