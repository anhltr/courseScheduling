# Course Scheduling System
Course Scheduler System is a web-based application designed to simplify and automate academic scheduling for institutions. It enables administrators to efficiently manage courses, instructors, and time slots while ensuring conflict-free scheduling.

<div style="display: flex; flex-direction: column;"> <div> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" alt="HTML5" width="40" height="40" /> <strong>HTML5</strong> </div> <div> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" alt="CSS3" width="40" height="40" /> <strong>CSS3</strong> </div> <div> <img src="https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" alt="JavaScript" width="40" height="40" /> <strong>JavaScript</strong> </div> </div>

## Features

- Course Management:

   Add and manage courses with details such as name, level, credit hours, duration, section limits, and number of classes.
   Real-time updates to course data.

- Instructor Management:

   Record instructor preferences, teaching loads, and unavailable time slots.
   Limit preferences and unavailable selections to ensure fair scheduling.

- Dynamic Scheduling:

   Automatically generates schedules based on course and instructor data.
   Assigns time slots dynamically, avoiding conflicts and respecting constraints.

- Optimized Time Slot Management:

   Supports multiple day combinations, including M-W, T-Th, M-F, W-F, and 3-hour Saturday slots.
   Prevents overlapping schedules using a conflict-resolution mechanism.

## Getting Started

### Prerequisite
    
  1. Modern web browser.
  2. Git installed on your machine.

###  Intalltion
   
   1. Clone the repository:

      ```
      git clone https://github.com/yourusername/clock-scheduler.git
      cd clock-scheduler
      ```
    
  2. Open the `index.html` file in your web browser to run the application.

## Project Structure
```
├── index.html
├── styles.css
├── main.js
├── assets/
│   └── logo2.jpg
└── README.md
```

## Key Files

- `index.html`: The main entry point of the application. It contains the layout for tabs and forms.
- `styles.css`: Contains the styles for the application, including the layout for forms, tables, and tabs.
- `main.js`:
       - Manages course and instructor data.
       - Generates time slots and schedules dynamically.
       - Updates tables in real-time.

## Usage

1. Course Entry:

    - Navigate to the "Course" tab.
    - Enter details like course name, level, credit hours, duration, section limits, and number of classes.
    - Click "Add Course" to save.

2. Instructor Entry:

    - Navigate to the "Instructor" tab.
    - Add instructor details, including name, teaching load, course preferences, and unavailable time slots.
    - Click "Add Instructor" to save.

3. Generate Schedule:

    - Navigate to the "Data & Schedule" tab.
    - Click "Generate Schedule" to create a conflict-free schedule.
    - View the generated schedule in the table.
  
## Time Slot Details

- Time slots are generated dynamically for:
  - Weekdays: M-W, T-Th, M-F, W-F.
  - Saturday: 3-hour slots only.
- Schedules ensure no opverlapping slots and align with instructor availability.

## Acknowledgments

- HTML5, CSS, JavaScript.
