export const situation3 = {
  id: "presenting_company",
  title: "Unit 3: Presenting Your Company",
  scoring: ["satisfaction", "reputation"],

  characters: {
    player: "Student",
    emily: "Emily Carter",
    mark: "Mark"
  },

  initialState: {
    satisfaction: 0,      // Customer Satisfaction
    reputation: 10,       // Professional Reputation
    // budget: 100,
    time: 100
  },

  nodes: {

    // 🎬 Step 1 – Cut-scene
    intro: {
      type: "chat",
      messages: [
        {
          speaker: "Mark",
          text: `Good morning! Today you’ll meet Emily Carter from Brighton Storage Solutions. She wants to learn more about GlobalLogix. Prepare well — this is your first client meeting!`
        }
      ],
      options: [
        {
          text: "Meet the client",
          next: "introduction"
        }
      ]
    },

    // 👋 Step 2 – Introduction
    introduction: {
      type: "chat",
      messages: [
        {
          speaker: "Emily Carter",
          text: `Good morning. You must be the new logistics manager? Emily Carter. Nice to meet you.`
        }
      ],
      options: [
        {
          text: `Good morning, Ms. Carter. My name is [Player Name]. It’s a pleasure to meet you. Thank you for visiting GlobalLogix today.`,
          effects: { reputation: 10, satisfaction: 5 },
          next: "presentation"
        },
        {
          text: `Hey! Emily, right? Cool that you came.`,
          effects: { reputation: -5, satisfaction: -5 },
          next: "presentation"
        },
        {
          text: `Good morning. My name is [Player Name]. I work as a logistics coordinator here. Let me tell you about our company. We are a 3PL provider based in London. We specialise in transport and warehousing.`,
          effects: { reputation: 15, satisfaction: 15 },
          next: "presentation"
        }
      ]
    },

    // 🏢 Step 3 – Company Presentation
    presentation: {
      type: "chat",
      messages: [
        {
          speaker: "Emily Carter",
          text: `Interesting. Could you tell me more about your company?`
        }
      ],
      options: [
        {
          text: `We offer a full range of logistics services. Our main clients are in the retail and automotive sectors. We handle procurement, transport, distribution, and customs clearance.`,
          effects: { reputation: 10, satisfaction: 15 },
          next: "customs_question"
        },
        {
          text: `We are a carrier. We only transport goods by road.`,
          effects: { reputation: -5, satisfaction: -10 },
          next: "customs_question"
        },
        {
          text: `We are a freight forwarder. We arrange transport, book space, and handle documents. We also manage shipments by sea, air, and road.`,
          effects: { reputation: 15, satisfaction: 20 },
          next: "customs_question"
        }
      ]
    },

    // 📦 Step 4 – Customer’s question
    customs_question: {
      type: "chat",
      messages: [
        {
          speaker: "Emily Carter",
          text: `Do you also offer customs support?`
        }
      ],
      options: [
        {
          text: `Yes, we organize customs clearance with the help of our partners.`,
          effects: { reputation: 10, satisfaction: 15 },
          next: "closing"
        },
        {
          text: `No, but we work with reliable service providers for that.`,
          effects: { reputation: 5, satisfaction: 5 },
          next: "closing"
        },
        {
          text: `Not really, we only work in the UK.`,
          effects: { reputation: -10, satisfaction: -15 },
          next: "closing"
        }
      ]
    },

    // 🤝 Step 5 – Closing the meeting
    closing: {
      type: "chat",
      messages: [
        {
          speaker: "Emily Carter",
          text: `Thank you for the presentation. It was very informative.`
        }
      ],
      options: [
        {
          text: `Thank you for visiting us. If you have any questions, I’d be happy to answer them.`,
          effects: { reputation: 10, satisfaction: 10 },
          next: "result"
        },
        {
          text: `It was a pleasure meeting you. I hope to see you again.`,
          effects: { reputation: 5, satisfaction: 5 },
          next: "result"
        },
        {
          text: `Okay, bye.`,
          effects: { reputation: -10, satisfaction: -5 },
          next: "result"
        }
      ]
    },

    // 🏁 Final Feedback
    result: {
      type: "final-feedback",
      thresholds: { excellent: 55, good: 35 },
      feedback: {
        excellent: "Excellent! You impressed the client. Well done, you’re off to a great start at GlobalLogix!",
        good: "Good job overall, but there’s room for improvement. Pay attention to details next time.",
        poor: "That wasn’t your best performance. You need to be more professional in presenting our services."
      }
    }

  }
};
