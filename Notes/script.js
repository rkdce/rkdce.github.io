// Use the Google Sheets HTML published view via AllOrigins proxy
const HTML_URL = 'https://api.allorigins.win/raw?url=' +
  encodeURIComponent('https://docs.google.com/spreadsheets/d/e/2PACX-1vRay7HkeR8GteSG62LFOmvUeJI0cpCLB2BkS99MXXKSrYMygLMPjWdIvjTioDpAO9Cg5hl5W7xm2a3o/pubhtml?gid=304144960&single=true') +
  '&nocache=' + Date.now();

const classSelect = document.getElementById('classSelect');
const subjectSelect = document.getElementById('subjectSelect');
const searchInput = document.getElementById('searchInput');
const notesContainer = document.getElementById('notesContainer');

let notesData = [];

function fetchAndParseHTMLTable() {
    fetch(HTML_URL)
        .then(res => res.text())
        .then(html => {
            const parser = new DOMParser();
            const doc = parser.parseFromString(html, 'text/html');
            const rows = doc.querySelectorAll('table.waffle tr');
            let notes = [];
            // Skip the first two rows (header and column names)
            for (let i = 2; i < rows.length; i++) {
                const cells = rows[i].querySelectorAll('td');
                if (cells.length >= 5) {
                    notes.push({
                        Class: cells[0].innerText.trim(),
                        Subject: cells[1].innerText.trim(),
                        Title: cells[2].innerText.trim(),
                        Content: cells[3].innerText.trim(),
                        Link: cells[4].innerText.trim()
                    });
                }
            }
            notesData = notes;
            populateDropdowns();
            displayNotes();
            // Hide loading spinner
            document.getElementById('loadingOverlay').style.display = 'none';
        })
        .catch(err => {
            notesContainer.innerHTML = '<p>Failed to load notes. Please check your Google Sheet link.</p>';
            console.error(err);
            // Hide loading spinner on error
            document.getElementById('loadingOverlay').style.display = 'none';
        });
}

function populateDropdowns() {
    const classes = [...new Set(notesData.map(note => note.Class))].sort();
    classSelect.innerHTML = '<option value="">Select Class</option>' +
        classes.map(cls => `<option value="${cls}">${cls}</option>`).join('');
    subjectSelect.innerHTML = '<option value="">Select Subject</option>';
}

function populateSubjects() {
    const selectedClass = classSelect.value;
    const subjects = [...new Set(notesData.filter(note => note.Class === selectedClass).map(note => note.Subject))].sort();
    subjectSelect.innerHTML = '<option value="">Select Subject</option>' +
        subjects.map(sub => `<option value="${sub}">${sub}</option>`).join('');
}

function displayNotes() {
    const selectedClass = classSelect.value;
    const selectedSubject = subjectSelect.value;
    const searchTerm = searchInput.value.toLowerCase();
    let filtered = notesData;
    if (selectedClass) filtered = filtered.filter(note => note.Class === selectedClass);
    if (selectedSubject) filtered = filtered.filter(note => note.Subject === selectedSubject);
    if (searchTerm) {
        filtered = filtered.filter(note =>
            note.Title.toLowerCase().includes(searchTerm) ||
            note.Content.toLowerCase().includes(searchTerm)
        );
    }
    if (filtered.length === 0) {
        notesContainer.innerHTML = '<p>No notes found.</p>';
        return;
    }
    notesContainer.innerHTML = filtered.map(note => `
        <div class="note">
            <h3>${note.Title}</h3>
            <p><strong>Class:</strong> ${note.Class} | <strong>Subject:</strong> ${note.Subject}</p>
            <p>${note.Content}</p>
            ${note.Link ? `<a href="${note.Link}" target="_blank">View Resource</a>` : ''}
        </div>
    `).join('');
}

// Event listeners
classSelect.addEventListener('change', () => {
    populateSubjects();
    displayNotes();
});
subjectSelect.addEventListener('change', displayNotes);
searchInput.addEventListener('input', displayNotes);

// Fetch and initialize
fetchAndParseHTMLTable(); 