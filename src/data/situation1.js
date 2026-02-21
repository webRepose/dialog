export const situation1 = {
  id: "cv_cover_letter",
  title: "Unit 1: CV and Cover Letter",
  scoring: ["impression", "reputation"],

  characters: {
    player: "Student",
    mark: "Mark"
  },

  initialState: {
    impression: 0,      // Impression of employer
    reputation: 10,     // Professional Reputation
    // budget: 100,
    time: 100
  },

  nodes: {

    // 🎬 Step 1 – Intro / Cut-scene
    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: `You are looking for a job in logistics. You find a job posting for the position of Logistics Coordinator. Prepare your CV and cover letter carefully.`
        }
      ],
      options: [
        { text: "View job posting", next: "job_posting" }
      ]
    },

    // 📄 Step 2 – Job posting
    job_posting: {
      type: "chat",
      messages: [
        {
          speaker: "HR",
          text: `Job Posting: Logistics Coordinator

Responsibilities:
• Coordinate shipments
• Handle customs documentation
• Communicate with clients

Requirements:
• Degree in logistics or business
• Experience in supply chain management
• Strong communication skills`
        }
      ],
      options: [
        { text: "Prepare CV", next: "cv_template" }
      ]
    },

    // 📝 Step 3 – CV template
    cv_template: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: `Complete your CV:`
        }
      ],
      options: [
        { text: "Choose CV version", next: "cv_choice" }
      ]
    },

    // 🎯 Step 4 – CV choice
    cv_choice: {
      type: "chat",
      messages: [
        { speaker: "System", text: "Choose the CV you would send to the employer:" }
      ],
      options: [
        {
          text: `Education:
BA in Logistics and Supply Chain Management, London Business College (2022)

Work experience:
Coordinated international shipments at EastGate Freight.
Booked transport, handled customs paperwork, and dealt with urgent transport issues.

Skills:
Oversee deliveries, streamline warehouse processes,
provide inventory reports, maintain accuracy in documents.

Additional information:
Fluent in English, strong communication skills,
responsible and detail-oriented.`,
          effects: { reputation: 20, impression: 20 },
          next: "letter_template"
        },
        {
          text: `Education:
BA in Management, City College (2021)

Work experience:
Did paperwork and supported office staff.

Skills:
Good at computers, team player,
sometimes helped with logistics tasks.

Additional information:
Interested in developing skills in logistics.`,
          effects: { reputation: -5, impression: -10 },
          next: "letter_template"
        },
        {
          text: `Education:
BA in Business and Logistics, Global University (2020)

Work experience:
Oversaw daily warehouse operations,
instructed staff, streamlined documentation, ensured compliance.

Skills:
Coordinate shipments, book cargo space,
handle urgent issues, communicate with clients.

Additional information:
Proactive, motivated, able to work under pressure.`,
          effects: { reputation: -5, impression: -10 },
          next: "letter_template"
        }
      ]
    },

    // 📝 Step 5 – Cover letter template
    letter_template: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: `Complete your Cover Letter:`
        }
      ],
      options: [
        { text: "Choose cover letter", next: "cover_letter" }
      ]
    },

    // 🎯 Step 6 – Cover letter choice
    cover_letter: {
      type: "chat",
      messages: [
        { speaker: "System", text: "Choose the cover letter you would send:" }
      ],
      options: [
        {
          text: `Dear Sir or Madam,

I am writing to apply for the position of Logistics Coordinator.
I currently work for EastGate Freight.
My responsibilities include booking cargo space and handling customs paperwork.
I believe I can contribute to your logistics team with my experience in client communication.

Thank you for considering my application.

Best regards,
[Student Name]`,
          effects: { reputation: 20, impression: 20 },
          next: "result"
        },
        {
          text: `Hello,

I want to get the position of Logistics Coordinator.
I currently don’t have much experience.
My responsibilities include some paperwork.
I believe I can contribute to your logistics team with my motivation.

Thank you for considering my application.

See you soon,
[Student Name]`,
          effects: { reputation: -5, impression: -5 },
          next: "result"
        },
        {
          text: `Dear Sir or Madam,

I am writing to apply for the position of Logistics Coordinator.
I currently coordinate shipments and provide inventory reports.
My responsibilities include instructing warehouse teams.
I believe I can contribute to your logistics team with my problem-solving skills.

Thank you for considering my application.

Yours faithfully,
[Student Name]`,
          effects: { reputation: 15, impression: 15 },
          next: "result"
        }
      ]
    },

    // 👔 Step 7 – Final Feedback
    result: {
      type: "final-feedback",
      thresholds: { excellent: 40, good: 25 },
      feedback: {
        excellent: "Excellent CV and cover letter! They highlight your experience and skills perfectly. You’ll make a strong candidate.",
        good: "Good effort. Some parts of your CV and letter are solid, but you should be more specific about your skills.",
        poor: "Your CV and cover letter don’t show enough of your strengths. You need to work on presenting your experience more professionally."
      }
    }

  }
};
