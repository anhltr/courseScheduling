let courses = [];
let instructors = [];
let timeSlots = generateTimeSlots();

// Generate time slots from 10 AM to 7:30 PM, filtered by allowed day combinations
function generateTimeSlots() {
 const slots = [];
 const startTime = 10;
 const endTime = 19.5;
 const allowedDays = ["M-W", "T-Th", "M-F", "W-F", "S"];

 const daysCombinations = [
  ["M", "W"],
  ["T", "Th"],
  ["M", "W", "F"],
  ["W", "F"],
  ["S"],
 ];

 daysCombinations.forEach((days) => {
  const dayCombo = days.join("-");

  if (allowedDays.includes(dayCombo)) {
   // Only allow 3-hour slots for "S" (Saturday)
   const durations = dayCombo === "S" ? [3] : [1.5, 3];

   durations.forEach((duration) => {
    for (let time = startTime; time + duration <= endTime; time += 0.5) {
     slots.push({
      days: dayCombo,
      start: timeToString(time),
      end: timeToString(time + duration),
      duration: duration,
     });
    }
   });
  }
 });
 return slots;
}

// Helper function to convert time to AM/PM format
function timeToString(time) {
 let hours = Math.floor(time);
 let minutes = (time - hours) * 60;
 let suffix = hours >= 12 ? "PM" : "AM";
 hours = ((hours + 11) % 12) + 1;
 minutes = minutes === 0 ? "00" : "30";
 return `${hours}:${minutes} ${suffix}`;
}

// Populate unavailable time slots in the form
function populateUnavailableTimeSlots() {
 const container = document.getElementById("unavailableTimeSlots");
 container.innerHTML = "";

 timeSlots.forEach((slot) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = `${slot.days} ${slot.start} - ${slot.end}`;
  checkbox.id = `slot-${slot.days}-${slot.start}-${slot.end}`;

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = `${slot.days} ${slot.start} - ${slot.end}`;

  const wrapper = document.createElement("div");
  wrapper.classList.add("checkbox-wrapper");
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);

  container.appendChild(wrapper);
 });

 // Apply the selection limit for unavailable time slots
 limitCheckboxSelection("unavailableTimeSlots", 5);
}

// Limit the number of selected checkboxes to 5
function limitCheckboxSelection(containerId, maxSelections) {
 const container = document.getElementById(containerId);
 const checkboxes = container.querySelectorAll('input[type="checkbox"]');

 checkboxes.forEach((checkbox) => {
  checkbox.addEventListener("change", () => {
   const selectedCount = Array.from(checkboxes).filter(
    (cb) => cb.checked
   ).length;

   // Disable unchecked checkboxes if the limit is reached
   if (selectedCount >= maxSelections) {
    checkboxes.forEach((cb) => {
     if (!cb.checked) cb.disabled = true;
    });
   } else {
    // Re-enable all checkboxes if the limit is not reached
    checkboxes.forEach((cb) => (cb.disabled = false));
   }
  });
 });
}

// Call populateUnavailableTimeSlots when the page loads
document.addEventListener("DOMContentLoaded", populateUnavailableTimeSlots);

// Add a new course with duplicate check based on name and level
function addCourse() {
 const courseName = document.getElementById("courseName").value.trim();
 const courseLevel = document.getElementById("courseLevel").value;
 const creditHours = document.getElementById("creditHours").value;

 if (!courseName) {
  alert("Please enter a valid course name.");
  return;
 }

 const course = {
  name: courseName,
  level: courseLevel,
  creditHours: parseInt(creditHours),
  duration: parseFloat(document.getElementById("courseDuration").value),
  sectionLimit: document.getElementById("sectionLimit").value,
  numClasses: parseInt(document.getElementById("numClasses").value),
 };

 const courseId = `${courseName}-${courseLevel}`;
 const isDuplicate = courses.some(
  (existingCourse) =>
   `${existingCourse.name}-${existingCourse.level}` === courseId
 );

 if (isDuplicate) {
  alert("This course already exists!");
  return;
 }

 courses.push(course);
 console.log(`Course added: ${course.name} (Level: ${course.level})`);
 updateCourseTable();
 updatePreferences();
 clearCourseForm();
}

// Clear the course form after adding
function clearCourseForm() {
 document.getElementById("courseName").value = "";
 document.getElementById("courseLevel").value = "1000";
 document.getElementById("creditHours").value = "1";
 document.getElementById("courseDuration").value = "1.5";
 document.getElementById("sectionLimit").value = "";
 document.getElementById("numClasses").value = "";
}

// Update the course table
function updateCourseTable() {
 const courseTableBody = document
  .getElementById("courseTable")
  .getElementsByTagName("tbody")[0];
 courseTableBody.innerHTML = "";
 courses.forEach((course) => {
  const row = courseTableBody.insertRow();
  row.innerHTML = `
            <td>${course.name}</td>
            <td>${course.level}</td>
            <td>${course.creditHours}</td>
            <td>${course.duration} hrs</td>
            <td>${course.sectionLimit}</td>
            <td>${course.numClasses}</td>
        `;
 });
}

// Add a new instructor with duplicate check
function addInstructor() {
 const instructorName = document.getElementById("instructorName").value.trim();
 const teachingLoad = document.getElementById("teachingLoad").value;

 if (!instructorName) {
  alert("Please enter a valid instructor name.");
  return;
 }

 const instructor = {
  name: instructorName,
  teachingLoad: teachingLoad,
  preferences: Array.from(
   document.querySelectorAll('#preferences input[type="checkbox"]:checked')
  ).map((checkbox) => checkbox.value),
  unavailableTimeSlots: Array.from(
   document.querySelectorAll(
    '#unavailableTimeSlots input[type="checkbox"]:checked'
   )
  ).map((checkbox) => checkbox.value),
 };

 if (
  instructors.some(
   (existingInstructor) => existingInstructor.name === instructorName
  )
 ) {
  alert("This instructor already exists!");
  return;
 }

 instructors.push(instructor);
 console.log(`Instructor added: ${instructor.name}`);
 updateInstructorTable();
 clearInstructorForm();
}

// Clear the instructor form
function clearInstructorForm() {
 document.getElementById("instructorName").value = "";
 document.getElementById("teachingLoad").value = "0";
 document
  .querySelectorAll('#preferences input[type="checkbox"]')
  .forEach((checkbox) => (checkbox.checked = false));
 document
  .querySelectorAll('#unavailableTimeSlots input[type="checkbox"]')
  .forEach((checkbox) => (checkbox.checked = false));
}

// Update the instructor table
function updateInstructorTable() {
 const instructorTableBody = document
  .getElementById("instructorTable")
  .getElementsByTagName("tbody")[0];
 instructorTableBody.innerHTML = "";
 instructors.forEach((instructor) => {
  const row = instructorTableBody.insertRow();
  row.innerHTML = `
            <td>${instructor.name}</td>
            <td>${instructor.teachingLoad}</td>
            <td>${instructor.preferences.join(", ")}</td>
            <td>${instructor.unavailableTimeSlots.join(", ")}</td>
        `;
 });
}

// Populate course preferences in instructor form as checkboxes
function updatePreferences() {
 const preferencesContainer = document.getElementById("preferences");
 preferencesContainer.innerHTML = "";
 courses.forEach((course) => {
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.value = course.name;
  checkbox.id = `pref-${course.name}`;

  const label = document.createElement("label");
  label.htmlFor = checkbox.id;
  label.textContent = course.name;

  const wrapper = document.createElement("div");
  wrapper.classList.add("checkbox-wrapper");
  wrapper.appendChild(checkbox);
  wrapper.appendChild(label);

  preferencesContainer.appendChild(wrapper);
 });

 // Apply the selection limit for course preferences
 limitCheckboxSelection("preferences", 5);
}

// Generate the schedule with random time slot assignment
function generateSchedule() {
 const scheduleTableBody = document
  .getElementById("scheduleTable")
  .getElementsByTagName("tbody")[0];
 scheduleTableBody.innerHTML = "";

 // Track used time slots to avoid conflicts
 const usedTimeSlots = new Set();

 courses.forEach((course) => {
  const assignedInstructors = instructors.filter((instructor) =>
   instructor.preferences.includes(course.name)
  );

  // Filter available slots for course duration and avoid conflicts
  const availableSlots = timeSlots.filter(
   (slot) =>
    slot.duration === course.duration &&
    !usedTimeSlots.has(`${slot.days}-${slot.start}-${slot.end}`)
  );

  // Randomly assign each section of the course
  for (
   let i = 0;
   i < course.numClasses && i < assignedInstructors.length;
   i++
  ) {
   if (availableSlots.length === 0) break; // No more available slots

   // Pick a random slot
   const randomIndex = Math.floor(Math.random() * availableSlots.length);
   const slot = availableSlots[randomIndex];

   // Remove slot from available slots and mark it as used
   availableSlots.splice(randomIndex, 1);
   usedTimeSlots.add(`${slot.days}-${slot.start}-${slot.end}`);

   const instructor = assignedInstructors[i];
   const row = scheduleTableBody.insertRow();
   row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.level}</td>
                <td>${course.creditHours}</td>
                <td>${course.sectionLimit}</td>
                <td>${instructor.name}</td>
                <td>${slot.days} ${slot.start} - ${slot.end}</td>
            `;
  }
 });
}
