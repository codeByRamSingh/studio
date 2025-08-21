

export type Student = {
    id: number;
    studentId: string;
    studentName: string;
    fatherName: string;
    motherName: string;
    address: string;
    email: string;
    phone: string;
    caste: string;
    religion: string;
    gender: string;
    physicallyDisabled: boolean;
    course: string;
    session: string;
    courseFee: number;
    feeHistory: { amount: number; date: Date }[];
};

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

export let students: Student[] = [
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
        gender: 'Male',
        physicallyDisabled: false,
        course: 'ITI Electrician',
        session: 'Fall Semester 2024',
        courseFee: 15000,
        feeHistory: [
            { amount: 10000, date: new Date('2024-08-15') }
        ]
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
        gender: "Female",
        physicallyDisabled: false,
        course: "ITI Fitter",
        session: "Batch A 2024",
        courseFee: 12000,
        feeHistory: []
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
    },
    {
        id: 2,
        courseCode: "ELEC-02",
        courseName: "ITI Electrical",
        subjects: ["Advanced Circuit Theory", "Power Systems", "Industrial Automation"],
        sessions: [
            {
                id: 1,
                name: "2024 Full Year",
                startDate: new Date("2024-07-01"),
                endDate: new Date("2025-06-30"),
            },
            {
                id: 2,
                name: "2025 Full Year",
                startDate: new Date("2025-07-01"),
                endDate: new Date("2026-06-30"),
            }
        ]
    },
    {
        id: 3,
        courseCode: "FIT-01",
        courseName: "ITI Fitter",
        subjects: ["Workshop Calculations", "Engineering Drawing", "Lathe Operations"],
        sessions: [
            {
                id: 1,
                name: "Batch A 2024",
                startDate: new Date("2024-09-01"),
                endDate: new Date("2025-08-31"),
            },
            {
                id: 2,
                name: "Batch B 2024",
                startDate: new Date("2024-09-01"),
                endDate: new Date("2025-08-31"),
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

export const notices: {
  id: number;
  title: string;
  date: Date;
  content: string;
  audience: string[];
}[] = [
  {
    id: 1,
    title: "Library Books Due Date Extension",
    date: new Date("2024-08-28T10:00:00"),
    content: "The due date for all borrowed library books has been extended to September 30th, 2024. No late fees will be charged until this date.",
    audience: ["Student", "Staff"],
  },
  {
    id: 2,
    title: "Holiday Announcement: Gandhi Jayanti",
    date: new Date("2024-08-27T15:30:00"),
    content: "The institute will remain closed on October 2nd, 2024, on account of Gandhi Jayanti. All classes and administrative activities will be suspended.",
    audience: ["Student", "Staff", "Admin", "Trust"],
  },
  {
    id: 3,
    title: "Scholarship Application Deadline",
    date: new Date("2024-08-25T11:00:00"),
    content: "Students are reminded that the deadline to apply for the annual merit scholarship is September 10th, 2024. Please submit your applications to the administrative office.",
    audience: ["Student"],
  },
  {
    id: 4,
    title: "Updated Canteen Menu",
    date: new Date("2024-08-22T09:00:00"),
    content: "The campus canteen has updated its menu starting from September 1st, 2024. A wider variety of healthy and delicious options are now available.",
    audience: ["Student", "Staff"],
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
