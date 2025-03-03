const accordion = document.querySelector(".accordion");
const add = document.getElementById("add");
const remove = document.getElementById("remove");

function saveAccordionState() {
    const state = [];
    document.querySelectorAll(".accordion-item").forEach((item, index) => {
        const body = item.querySelector(".accordion-body");
        state.push({
            index: index,
            active: body.classList.contains("active")
        });
    });
    localStorage.setItem("accordionState", JSON.stringify(state));
}

function restoreAccordionState() {
    const state = JSON.parse(localStorage.getItem("accordionState"));
    if (state) {
        state.forEach((itemState) => {
            const item = document.querySelectorAll(".accordion-item")[itemState.index];
            if (item) {
                const body = item.querySelector(".accordion-body");
                if (itemState.active) {
                    body.classList.add("active");
                    body.style.maxHeight = body.scrollHeight + "px";
                } else {
                    body.classList.remove("active");
                    body.style.maxHeight = "0";
                }
            }
        });
    }
}

function addAccordionEventListener(header, body) {
    header.addEventListener("click", (event) => {
        const currentBodies = document.querySelectorAll(".accordion-body");
        // Check if Ctrl key is pressed
        if (!event.ctrlKey) {
            currentBodies.forEach((b) => {
                if (b !== body) {
                    b.classList.remove("active");
                    b.style.maxHeight = "0";
                }
            });
        }
        body.classList.toggle("active");
        if (body.classList.contains("active")) {
            body.style.maxHeight = body.scrollHeight + "px";
        } else {
            body.style.maxHeight = "0";
        }
        saveAccordionState();
    });
}

// Apply event listeners to existing accordion headers and bodies
document.querySelectorAll(".accordion-header").forEach((header) => {
    const body = header.nextElementSibling;
    addAccordionEventListener(header, body);
});

add.addEventListener("click", () => {
    const newItem = document.createElement("div");
    newItem.classList.add("accordion-item");
    newItem.innerHTML = `
        <div class="accordion-header">New Section</div>
        <div class="accordion-body"><p>This is a new accordion body.</p></div>
    `;
    accordion.appendChild(newItem);
    const newHeader = newItem.querySelector(".accordion-header");
    const newBody = newItem.querySelector(".accordion-body");
    addAccordionEventListener(newHeader, newBody);
    saveAccordionState();
});

remove.addEventListener("click", () => {
    const lastItem = accordion.lastElementChild;
    if (lastItem) {
        accordion.removeChild(lastItem);
        saveAccordionState();
    }
});

restoreAccordionState();
