const students = [
  {
    ID: 1,
    name: "Alice",
    age: 21,
    grade: "9.0",
    degree: "Btech",
    email: "alice@example.com",
  },
  {
    ID: 2,
    name: "Bob",
    age: 22,
    grade: "8",
    degree: "MBA",
    email: "bob@example.com",
  },
  {
    ID: 3,
    name: "Charlie",
    age: 20,
    grade: "8.5",
    degree: "Arts",
    email: "charlie@example.com",
  },
];

const studentForm = document.getElementById("studentForm");
const studentTable = document.getElementById("studentTable");
const searchInput = document.getElementById("search");

// Function to display students in the table
function displayStudents() {
  const tbody = studentTable.querySelector("tbody");
  tbody.innerHTML = "";

  students.forEach((student, index) => {
    const row = tbody.insertRow();
    row.innerHTML = `
                    <td>${student.ID}</td>
                    <td>${student.name}</td>
                    <td>${student.email}</td>
                    <td>${student.age}</td>
                    <td>${student.grade}</td>
                    <td style="display:flex; justify-content:space-between;">
                    <div>${student.degree}</div>
                    <div>
                        <i class="fa-regular fa-pen-to-square edit-btn" onclick="editStudent(${index})"></i>
                        <i onclick="deleteStudent(${index})" class="fa fa-trash delete-btn"></i>
                    </div>
                    </td>
                `;
  });
}

// Function to add a new student
function addStudent(studentData) {
  students.push(studentData);
  displayStudents();
  studentForm.reset();
}

// Function to edit a student
function editStudent(index) {
  const student = students[index];
  document.getElementById("name").value = student.name;
  document.getElementById("age").value = student.age;
  document.getElementById("grade").value = student.grade;
  document.getElementById("degree").value = student.degree;
  document.getElementById("email").value = student.email;

  // Replace 'Add Student' button with 'Edit Student' button
  const addButton = document.querySelector('button[type="submit"]');
  addButton.textContent = "Edit Student";
  addButton.onclick = function () {
    students[index] = {
      ...student,
      name: document.getElementById("name").value,
      age: document.getElementById("age").value,
      grade: document.getElementById("grade").value,
      degree: document.getElementById("degree").value,
      email: document.getElementById("email").value,
    };
    addButton.textContent = "Add Student";
    addButton.onclick = function () {
      addStudent(getFormData());
    };
    displayStudents();
    studentForm.reset();
  };
}

// Function to delete a student
function deleteStudent(index) {
  students.splice(index, 1);
  displayStudents();
}



// Function to get form data
function getFormData() {
  return {
    ID: students.length + 1,
    name: document.getElementById("name").value,
    age: document.getElementById("age").value,
    grade: document.getElementById("grade").value,
    degree: document.getElementById("degree").value,
    email: document.getElementById("email").value,
  };
}

studentForm.addEventListener("submit", function (event) {
  event.preventDefault();
  const formData = getFormData();
  addStudent(formData);
});
// Function to filter students by name, email, or degree
function searchStudents(query) {
    const filteredStudents = students.filter(
      (student) =>
        student.name.toLowerCase().includes(query.toLowerCase()) ||
        student.email.toLowerCase().includes(query.toLowerCase()) ||
        student.degree.toLowerCase().includes(query.toLowerCase())
    );
    displayStudents(filteredStudents);
  }
searchInput.addEventListener("input", function () {
  searchStudents(searchInput.value);
});
displayStudents();

