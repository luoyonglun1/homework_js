// A simple array to store our student objects.
// Each student is an object with a name and a grade.
let students = [];

// Get references to our HTML elements
const studentNameInput = document.getElementById('studentName');
const studentGradeInput = document.getElementById('studentGrade');
const addStudentBtn = document.getElementById('addStudentBtn');
const filterGradeInput = document.getElementById('filterGrade');
const filterBtn = document.getElementById('filterBtn');
const resetBtn = document.getElementById('resetBtn');
const studentListContainer = document.getElementById('studentListContainer');
const totalStudentsCount = document.getElementById('totalStudentsCount');

// Function to render the students to the UI
function renderStudents(studentsToRender = students) {
    // Clear the current list in the UI
    studentListContainer.innerHTML = '';
    
    // Check if there are any students to display
    if (studentsToRender.length === 0) {
        studentListContainer.innerHTML = '<p class="text-center text-gray-500 col-span-full mt-4">No students to display.</p>';
        totalStudentsCount.textContent = 0;
        return;
    }

    // Loop through each student and create a card for them
    studentsToRender.forEach((student, index) => {
        // Create the card element
        const studentCard = document.createElement('div');
        studentCard.className = 'bg-gray-100 p-6 rounded-2xl shadow-sm hover:shadow-md transition-shadow';
        
        // Populate the card with student data
        studentCard.innerHTML = `
            <p class="text-lg font-semibold text-gray-800 mb-1">${index + 1}. ${student.name}</p>
            <p class="text-sm text-gray-600">Grade: <span class="font-bold text-gray-800">${student.grade}</span></p>
        `;
        
        // Append the card to the list container
        studentListContainer.appendChild(studentCard);
    });

    // Update the total student count
    totalStudentsCount.textContent = studentsToRender.length;
}

// Function to add a new student
function addStudent() {
    const name = studentNameInput.value.trim();
    const grade = studentGradeInput.value.trim().toUpperCase();

    // Basic validation
    if (name === '' || grade === '') {
        alert("Please enter both a student name and a grade.");
        return;
    }

    // Create a new student object and add it to our array
    const newStudent = { name, grade };
    students.push(newStudent);

    // Clear the input fields
    studentNameInput.value = '';
    studentGradeInput.value = '';

    // Re-render the student list
    renderStudents();
}

// Function to filter students by grade
function filterStudents() {
    const gradeToFilter = filterGradeInput.value.trim().toUpperCase();

    // If the filter input is empty, render all students
    if (gradeToFilter === '') {
        renderStudents();
        return;
    }

    // Filter the students array based on the grade
    const filteredStudents = students.filter(student => student.grade === gradeToFilter);

    // Render the filtered list
    renderStudents(filteredStudents);
}

// Function to reset the student list to the default state
function resetStudents() {
    // Clear the current students array
    students = [];

    // Add the two default students you specified
    students.push({ name: 'lor vengroth', grade: 'C' });
    students.push({ name: 'tep thida', grade: 'A' });

    // Clear the filter input
    filterGradeInput.value = '';

    // Re-render the student list
    renderStudents();
}

// Add event listeners to the buttons
addStudentBtn.addEventListener('click', addStudent);
filterBtn.addEventListener('click', filterStudents);
resetBtn.addEventListener('click', resetStudents);

// Initial rendering of the student list with the default students
// This ensures the two default students are present when the page loads.
resetStudents();