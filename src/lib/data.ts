

export const users = [
  {
    id: 1,
    username: "admin",
    password: "admin",
    role: "Admin",
  },
   {
    id: 2,
    username: "STU1",
    password: "rama123",
    role: "Student",
  },
   {
    id: 3,
    username: "STU2",
    password: "seeta123",
    role: "Student",
  }
];

export let students = [
    {
        id: 1,
        studentId: 'STU1',
        studentName: 'Rama',
        fatherName: 'Dasaratha',
        motherName: 'Kausalya',
        address: 'Ayodhya',
        email: 'rama@example.com',
        phone: '1234567890',
        caste: 'General',
        religion: 'Hindu',
        dob: '2005-01-01',
        gender: 'Male',
        course: 'Electrician',
        fee: 50000,
    },
    {
        id: 2,
        studentId: "STU2",
        studentName: "Seeta",
        fatherName: "Janaka",
        motherName: "Sunayana",
        address: "Mithila",
        email: "seeta@example.com",
        phone: "0987654321",
        caste: "General",
        religion: "Hindu",
        dob: "2006-02-15",
        gender: "Female",
        course: "Fitter",
        fee: 45000
    }
];

export let courses: {
    id: number;
    courseCode: string;
    courseName: string;
    subjects: string[];
    sessions: { id: number; name: string; startDate: Date; endDate: Date; }[];
}[] = [
    {
        id: 1,
        courseCode: "ELEC-01",
        courseName: "ITI Electrician",
        subjects: ["Basic Electrical Engineering", "Wiring Practices", "Motor Controls"],
        sessions: [
            {
                id: 1,
                name: "Fall Semester 2024",
                startDate: new Date("2024-08-15"),
                endDate: new Date("2024-12-20"),
            },
            {
                id: 2,
                name: "Spring Semester 2025",
                startDate: new Date("2025-01-10"),
                endDate: new Date("2025-05-25"),
            }
        ]
    }
];


export const events = [
  {
    id: 1,
    title: "Annual Tech Fest 2024",
    date: new Date("2024-09-15T09:00:00"),
    description: "A full day of tech talks, workshops, and competitions. Open to all departments.",
    location: "Main Auditorium",
  },
  {
    id: 2,
    title: "Workshop: Introduction to Welding",
    date: new Date("2024-09-20T14:00:00"),
    description: "A hands-on workshop for beginners in the mechanical department.",
    location: "Workshop B",
  },
  {
    id: 3,
    title: "Guest Lecture on Entrepreneurship",
    date: new Date("2024-10-05T11:00:00"),
    description: "Join us to hear from successful local entrepreneurs.",
    location: "Seminar Hall",
  },
  {
    id: 4,
    title: "Campus Placement Drive",
    date: new Date("2024-10-22T10:00:00"),
    description: "Final year students are invited for the campus placement drive by leading companies.",
    location: "Admin Block",
  },
];

export const notices = [
  {
    id: 1,
    title: "Library Books Due Date Extension",
    date: new Date("2024-08-28T10:00:00"),
    content: "The due date for all borrowed library books has been extended to September 30th, 2024. No late fees will be charged until this date.",
  },
  {
    id: 2,
    title: "Holiday Announcement: Gandhi Jayanti",
    date: new Date("2024-08-27T15:30:00"),
    content: "The institute will remain closed on October 2nd, 2024, on account of Gandhi Jayanti. All classes and administrative activities will be suspended.",
  },
  {
    id: 3,
    title: "Scholarship Application Deadline",
    date: new Date("2024-08-25T11:00:00"),
    content: "Students are reminded that the deadline to apply for the annual merit scholarship is September 10th, 2024. Please submit your applications to the administrative office.",
  },
  {
    id: 4,
    title: "Updated Canteen Menu",
    date: new Date("2024-08-22T09:00:00"),
    content: "The campus canteen has updated its menu starting from September 1st, 2024. A wider variety of healthy and delicious options are now available.",
  },
];

export const resources = [
  {
    id: 1,
    title: "Thermodynamics Lecture Notes",
    subject: "Mechanical Engineering",
    type: "PDF",
    sharedBy: "Mr. Sharma",
    date: new Date("2024-08-27T14:00:00"),
    link: "#",
  },
  {
    id: 2,
    title: "Circuit Theory Problem Set",
    subject: "Electrical Engineering",
    type: "Document",
    sharedBy: "Ms. Gupta",
    date: new Date("2024-08-26T11:20:00"),
    link: "#",
  },
  {
    id: 3,
    title: "C++ Programming Video Tutorial",
    subject: "Computer Science",
    type: "Video Link",
    sharedBy: "Amit Kumar",
    date: new Date("2024-08-25T18:00:00"),
    link: "#",
  },
  {
    id: 4,
    title: "Blueprint Reading Guide",
    subject: "Civil Engineering",
    type: "PDF",
    sharedBy: "Mr. Singh",
    date: new Date("2024-08-24T09:45:00"),
    link: "#",
  },
  {
    id: 5,
    title: "Automobile Engineering Practicals",
    subject: "Automobile Engineering",
    type: "PDF",
    sharedBy: "Priya Sharma",
    date: new Date("2024-08-23T16:15:00"),
    link: "#",
  },
];

export const studyGroups = [
  {
    id: 1,
    name: "Thermodynamics Challengers",
    subject: "Mechanical Engineering",
    members: 4,
    focus: "Problem solving and exam preparation for Thermodynamics.",
  },
  {
    id: 2,
    name: "Code Wizards",
    subject: "Computer Science",
    members: 3,
    focus: "Competitive programming and Data Structures & Algorithms in C++.",
  },
  {
    id: 3,
    name: "Circuit Breakers",
    subject: "Electrical Engineering",
    members: 5,
    focus: "Weekly review of circuit theory concepts and lab work.",
  },
];
