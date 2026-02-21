export const situation2 = {
  id: "job_interview",
  title: "Unit 2: Job Interview",
  scoring: ["impression", "reputation"],

  characters: {
    player: "Student",
    hr: "Ms. Green",
    mark: "Mark"
  },

  initialState: {
    impression: 0,       // Impression of employer
    reputation: 10,      // Professional Reputation
    budget: 100,
    time: 100
  },

  nodes: {

    // 🎬 Step 1 – Cut-scene
    intro: {
      type: "chat",
      messages: [
        {
          speaker: "Mark",
          text: `Good luck today! You have an interview for the position of Logistics Coordinator at GlobalLogix. Show them your skills and professionalism.`
        }
      ],
      options: [
        {
          text: "Enter the interview room",
          next: "greeting"
        }
      ]
    },

    // 👋 Step 2 – Greeting
    greeting: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Green",
          text: `Good morning. Please, have a seat. Could you introduce yourself?`
        }
      ],
      options: [
        {
          text: `Good morning, Ms. Green. My name is [Player Name]. I am applying for the position of Logistics Coordinator. I have experience in transport arrangements and client communication.`,
          effects: { reputation: 15, impression: 15 },
          next: "responsibilities"
        },
        {
          text: `Hi, I’m [Player Name]. I want this job because it’s cool and I like logistics.`,
          effects: { reputation: -5, impression: -10 },
          next: "responsibilities"
        },
        {
          text: `Good morning. My name is [Player Name]. I studied logistics at university and I am responsible, motivated, and detail-oriented.`,
          effects: { reputation: 10, impression: 10 },
          next: "responsibilities"
        }
      ]
    },

    // 📦 Step 3 – Job responsibilities
    responsibilities: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Green",
          text: `What responsibilities did you have in your previous job?`
        }
      ],
      options: [
        {
          text: `I coordinated shipments, booked transport, and dealt with urgent issues.`,
          effects: { reputation: 15, impression: 15 },
          next: "problem_solving"
        },
        {
          text: `I did some paperwork and helped in the office.`,
          effects: { reputation: 0, impression: -5 },
          next: "problem_solving"
        },
        {
          text: `I was in charge of inventory reports, I instructed warehouse staff, and I streamlined documentation processes.`,
          effects: { reputation: 20, impression: 20 },
          next: "problem_solving"
        }
      ]
    },

    // 🚚 Step 4 – Problem-solving
    problem_solving: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Green",
          text: `Imagine a truck with urgent goods is delayed. What would you do?`
        }
      ],
      options: [
        {
          text: `I would immediately contact the client, provide updates, and rearrange transport if necessary.`,
          effects: { reputation: 15, impression: 20 },
          next: "closing"
        },
        {
          text: `I would wait and see. Maybe the truck arrives later.`,
          effects: { reputation: -10, impression: -15, time: -10 },
          next: "closing"
        },
        {
          text: `I would deal with the warehouse team to organize a new delivery and ensure the client is informed.`,
          effects: { reputation: 10, impression: 15 },
          next: "closing"
        }
      ]
    },

    // 🤝 Step 5 – Closing
    closing: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Green",
          text: `Thank you. Do you have any questions for us?`
        }
      ],
      options: [
        {
          text: `Yes, could you tell me more about the team and training opportunities at GlobalLogix?`,
          effects: { reputation: 10, impression: 10 },
          next: "result"
        },
        {
          text: `No, everything is clear. Thank you.`,
          effects: { reputation: 0, impression: 0 },
          next: "result"
        },
        {
          text: `Yes, when can I have my vacation?`,
          effects: { reputation: -10, impression: -10 },
          next: "result"
        }
      ]
    },

    // 🏁 Final Feedback
    result: {
      type: "final-feedback",
      thresholds: { excellent: 55, good: 30 },
      feedback: {
        excellent: "Excellent! You showed professionalism and strong communication skills. The HR manager was very impressed.",
        good: "Good job. You gave some solid answers, but remember to be more specific and confident.",
        poor: "That wasn’t your best performance. You need to focus on highlighting your skills and experience."
      }
    }

  }
};
