export const situation14 = {
  id: "writing_solution_oriented_email_report",
  title: "Unit 14: Writing a Solution-Oriented Email Report",
  scoring: ["clarity", "problemSolving"],

  characters: {
    player: "Student – logistician from GlobalLogix",
    boss: "Mark – boss"
  },

  initialState: {
    clarity: 50,
    problemSolving: 50
  },

  nodes: {

    // =========================
    // STEP 1: INTRO / CAT-SCENE
    // =========================

    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "You have just finished a difficult phone call with an unhappy customer, Mr. Brown, who lives in a rural area and often misses deliveries because no one is home during the day. He is unhappy."
        },
        {
          speaker: "Mark",
          text: "I heard your telephone conversation about the problem with Mr. Brown. He is an important customer. Please write me a short email. Tell me about the problem and your idea for a solution. Be professional and focus on your solution."
        }
      ],
      options: [
        {
          text: "Start writing email",
          next: "subject_choice"
        }
      ]
    },

    // =========================
    // STEP 2: CHOOSING SUBJECT LINE
    // =========================

    subject_choice: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Choose the subject line:"
        }
      ],
      options: [
        {
          text: "Subject: problem with a customer",
          effects: { clarity: -10 },
          next: "opening_choice"
        },
        {
          text: "Subject: Proposal to resolve recurring missed deliveries for Mr. Brown",
          effects: { clarity: +10 },
          next: "opening_choice"
        }
      ]
    },

    // =========================
    // STEP 3: OPENING PARAGRAPH
    // =========================

    opening_choice: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Choose how to start the email body:"
        }
      ],
      options: [
        {
          text: "Dear Mark, I’m writing to summarize the issue with Mr. Brown’s account. The core problem is that his last-mile deliveries to a rural area are resulting in frequent missed deliveries, as no one is available to sign during the delivery window.",
          effects: { clarity: +15, problemSolving: +10 },
          next: "solution_choice"
        },
        {
          text: "Hi Mark, Mr. Brown is really angry again. His packages never arrive because he’s never home. It’s a big problem.",
          effects: { clarity: -15, problemSolving: -5 },
          next: "solution_choice"
        }
      ]
    },

    // =========================
    // STEP 4: PROPOSING SOLUTION
    // =========================

    solution_choice: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Choose how to propose your solution:"
        }
      ],
      options: [
        {
          text: "I suggest we offer him the use of an automated locker in the nearest town as a permanent solution. This would help to ensure he receives his parcels without delays. One possible solution is to also implement geofencing for his future orders to provide more accurate ETAs.",
          effects: { clarity: +25, problemSolving: +15 },
          next: "closing_choice"
        },
        {
          text: "Maybe we can do something different for him. He should pick up his parcels somewhere else.",
          effects: { clarity: -15, problemSolving: -10 },
          next: "closing_choice"
        }
      ]
    },

    // =========================
    // STEP 5: CHOOSING CLOSING
    // =========================

    closing_choice: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Choose how to close the email:"
        }
      ],
      options: [
        {
          text: "So, that’s the idea. What do you think? Thanks.",
          effects: { clarity: -10 },
          next: "result"
        },
        {
          text: "I will prepare a formal proposal for Mr. Brown. Please let me know if you approve this approach. Best regards, [Your Name]",
          effects: { clarity: +10 },
          next: "result"
        }
      ]
    },

    // =========================
    // STEP 6: FINAL FEEDBACK
    // =========================

    result: {
      type: "final-feedback",
      thresholds: {
        excellent: 100,
        good: 70
      },
      feedback: {
        excellent:
          "Mark: Excellent email. You perfectly summarized the last-mile delivery challenge in a rural area and proposed a clear, effective solution using our available tools like the automated locker. Your email was professional, concise, and focused on solving the client’s problem. This is exactly the kind of proactive thinking we need. Approved – please proceed with the proposal to Mr. Brown. Well done.",
        good:
          "Mark: Good effort on this. You’ve identified the main issue of missed deliveries. The solution is on the right track, but next time, try to be more specific earlier in the email. For example, immediately stating the proposed solution in the subject line or opening sentence makes it even more impactful. Keep it up!",
        poor:
          "Mark: Let’s discuss this. The email lacks clarity and a strong, professional tone. We need to focus on factual problem description and propose concrete solutions using the vocabulary and strategies we’ve studied. Please revise it with a clearer structure: 1. Problem, 2. Proposed Solution, 3. Next Steps. Come and see me."
      }
    }

  }
};
