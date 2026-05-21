const eventTitle = document.getElementById("eventTitle");
const eventDate = document.getElementById("eventDate");
const addBtn = document.getElementById("addBtn");
const eventList = document.getElementById("eventList");

let events = [];
let editIndex = null;

function renderEvents() {
    eventList.innerHTML = "";

    const sortedEvents = [...events].sort(
        (a, b) => new Date(a.date) - new Date(b.date)
    );

    sortedEvents.forEach((event, index) => {
        const card = document.createElement("div");
        card.className = "event-card";

        card.innerHTML = `
      <div class="event-info">
        <h3>${event.title}</h3>
        <p>📅 ${event.date}</p>
      </div>

      <div class="actions">
        <button class="edit-btn" onclick="editEvent(${index})">
          Edit
        </button>

        <button class="delete-btn" onclick="deleteEvent(${index})">
          Delete
        </button>
      </div>
    `;

        eventList.appendChild(card);
    });
}

addBtn.addEventListener("click", () => {
    const title = eventTitle.value.trim();
    const date = eventDate.value;

    if (!title || !date) {
        alert("Please fill all fields");
        return;
    }

    if (editIndex === null) {
        events.push({ title, date });
    } else {
        events[editIndex] = { title, date };
        editIndex = null;
        addBtn.textContent = "Add Event";
    }

    eventTitle.value = "";
    eventDate.value = "";

    renderEvents();
});

function deleteEvent(index) {
    events.splice(index, 1);
    renderEvents();
}

function editEvent(index) {
    eventTitle.value = events[index].title;
    eventDate.value = events[index].date;

    editIndex = index;
    addBtn.textContent = "Update Event";
}

renderEvents();