export const situation12 = {
  id: "clarifying_container_specifications",
  title: "Unit 12: Clarifying Container Specifications",
  scoring: ["satisfaction", "reputation"],

  characters: {
    player: "Student",
    client: "Ms. Elena Petrova",
    mark: "Mark"
  },

  initialState: {
    satisfaction: 50,
    reputation: 50,
    time: 100
  },

  nodes: {

    // =========================
    // INTRO
    // =========================

    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "You are on a phone call with Ms. Elena Petrova from UralChem. They are exporting a large batch of chemical products internationally for the first time. She is describing the cargo, but her specifications are vague. Your task is to clarify the details to recommend the correct type of container and avoid damage or delays."
        },
        {
          speaker: "Ms. Elena Petrova",
          text: "Hello. We need to ship our chemical products to Hamburg. They are quite large and must be handled carefully. What type of container would you recommend?"
        }
      ],
      options: [
        {
          text: "A. Hello, Ms. Petrova. To recommend the best solution, I need to clarify some details. Is the product liquid, powder, or solid? Are the goods fragile, perishable, or hazardous?",
          next: "cargo_details"
        },
        {
          text: "B. For chemicals, we usually use standard ISO containers. They are fine for most things.",
          effects: { satisfaction: -15, reputation: -10, time: -10 },
          next: "client_unsatisfied"
        }
      ]
    },

    // =========================
    // BAD START
    // =========================

    client_unsatisfied: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Elena Petrova",
          text: "But our products are not standard. I need a more specific answer. Aren’t you going to ask for more details?"
        }
      ],
      options: [
        { text: "Continue discussion", next: "cargo_details" }
      ]
    },

    // =========================
    // CARGO DETAILS
    // =========================

    cargo_details: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Elena Petrova",
          text: "-Of course. It’s a liquid chemical, non-hazardous. It’s not perishable, but it must be kept pure. The units are quite large and very heavy."
        }
      ],
      options: [
        {
          text: "A. Thank you. Could you clarify the exact dimensions? Are the units overwidth or taller than a standard container? This determines whether we need a standard ISO, open-top, or flat-rack container.",
          next: "weight_discussion"
        },
        {
          text: "B. For large liquid goods, we can use a tank container. I’ll arrange it.",
          effects: { satisfaction: -20, reputation: -15, time: -25 },
          next: "wrong_container"
        }
      ]
    },

    // =========================
    // WRONG CONTAINER PATH
    // =========================

    wrong_container: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Elena Petrova",
          text: "A tank container? But our products are in large drums, not in bulk. That wouldn’t be suitable."
        }
      ],
      options: [
        { text: "End call", next: "result" }
      ]
    },

    // =========================
    // WEIGHT DISCUSSION
    // =========================

    weight_discussion: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Elena Petrova",
          text: "The drums are standard size, not overwidth, but they are very heavy. So, a standard container should be fine, right?"
        }
      ],
      options: [
        {
          text: "A. Even for standard drums, weight is critical. We will use a reinforced standard ISO container and ensure proper securing. Heavy-duty forklifts or reach stackers will handle the load safely.",
          effects: { satisfaction: +30, reputation: +25, time: -15 },
          next: "client_confident"
        },
        {
          text: "B. Yes, a standard container is fine.",
          effects: { satisfaction: +10, reputation: +5, time: -10 },
          next: "client_uncertain"
        }
      ]
    },

    client_confident: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Elena Petrova",
          text: "That sounds perfect. Thank you for explaining the handling process. I feel much more confident now."
        }
      ],
      options: [
        { text: "Finalize consultation", next: "result" }
      ]
    },

    client_uncertain: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Elena Petrova",
          text: "I hope everything will be safe. I’m still slightly concerned about the weight."
        }
      ],
      options: [
        { text: "End call", next: "result" }
      ]
    },

    // =========================
    // FINAL FEEDBACK
    // =========================

    result: {
      type: "final-feedback",
      thresholds: {
        excellent: 75,
        good: 55
      },
      feedback: {
        excellent:
          "Excellent work! You used clarifying questions effectively and avoided a costly mistake. By understanding the cargo specifications, you strengthened client trust.",
        good:
          "You completed the task, but you could have clarified specifications more thoroughly. Always confirm dimensions and weight before recommending equipment.",
        poor:
          "This was a risky approach. Recommending unsuitable equipment without clarification could lead to cargo damage and loss of client trust."
      }
    }

  }
};
