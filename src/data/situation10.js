export const situation10 = {
  id: "negotiating_delivery_deadline",
  title: "Unit 10: Negotiating a Delivery Deadline",
  scoring: ["satisfaction", "reputation"],

  characters: {
    player: "Student",
    client: "Ms. Emily Vance",
    mark: "Mark"
  },

  initialState: {
    satisfaction: 50,
    reputation: 50,
    time: 100
  },

  nodes: {

    // =========================
    // INTRO (FULL CAT-SCENE)
    // =========================

    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Your phone rings. It’s Ms. Emily Vance from TechnoGadgets Inc., a key client. Their order of electronic components for a new product launch is scheduled for delivery this Friday. However, due to a port strike, the shipment has been delayed. Your task is to negotiate a new deadline and keep the client satisfied."
        },
        {
          speaker: "Ms. Emily Vance",
          text: "Hello, this is Emily Vance from TechnoGadgets. I’m calling about our order #TL-789. I need a confirmation that the delivery will be on schedule for Friday. This is extremely urgent for our production line."
        }
      ],
      options: [
        {
          text: "Good afternoon, Ms. Vance. Thank you for your call. I assure you we are prioritizing your order. However, due to an unavoidable delay at the port, I need to discuss a slight adjustment to the schedule. Could we negotiate a new deadline that works for both of us?",
          next: "negotiation"
        },
        {
          text: "Hello. Yeah, about that order... There’s a strike at the port, so it’s going to be late. Not much we can do. Maybe next week?",
          effects: { satisfaction: -40, reputation: -30, time: -20 },
          next: "angry_client"
        }
      ]
    },

    // =========================
    // BAD PATH
    // =========================

    angry_client: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "This is completely unacceptable! We have a contract with a penalty clause for late delivery. I need to speak with your manager immediately!"
        }
      ],
      options: [
        { text: "Escalate case", next: "result" }
      ]
    },

    // =========================
    // NEGOTIATION PATH
    // =========================

    negotiation: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "I understand there are issues, but Friday is the final deadline. Our contract terms are very firm on this. A delay would cause significant losses. What is your proposal?"
        }
      ],
      options: [
        {
          text: "I fully understand your position. To find a solution for mutual benefit, could we find a compromise? We can split the shipment. The first half, which is most critical for your launch, will be delivered by air freight on Friday. The remainder will follow by sea on Monday. This will avoid a complete stockout for you.",
          next: "cost_discussion"
        },
        {
          text: "I’m afraid we have to postpone the entire delivery until next Wednesday. This is the only option due to our current capacity.",
          effects: { satisfaction: -25, reputation: -20, time: -10 },
          next: "client_penalty"
        }
      ]
    },

    // =========================
    // POSTPONEMENT PATH
    // =========================

    client_penalty: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Next Wednesday? That’s too late! I’m afraid we will have to activate the penalty clause and consider other suppliers for future orders."
        }
      ],
      options: [
        { text: "End call", next: "result" }
      ]
    },

    // =========================
    // COMPROMISE PATH
    // =========================

    cost_discussion: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Splitting the shipment... That sounds reasonable. However, air freight is more expensive. Who will cover the extra costs? And I need a written confirmation of the new terms immediately."
        }
      ],
      options: [
        {
          text: "As a gesture of goodwill and to ensure our partnership, GlobalLogix will cover the additional air freight costs. I will send you a written confirmation email within the hour outlining the new conditions: half shipment by air on Friday, the balance by sea on Monday, with no extra charge to you. We will also waive any potential penalty clause for this incident.",
          effects: { satisfaction: +35, reputation: +30, time: -25 },
          next: "client_positive"
        },
        {
          text: "The costs are usually the client’s responsibility. I can send you an email later today with the new dates.",
          effects: { satisfaction: +10, reputation: +5, time: -15 },
          next: "client_neutral"
        }
      ]
    },

    client_positive: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Thank you. This is a flexible solution, and I appreciate you taking responsibility. Please send the confirmation. You’ve handled this situation professionally."
        }
      ],
      options: [
        { text: "Finalize agreement", next: "result" }
      ]
    },

    client_neutral: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "I see. Well, I need to discuss these terms with my director. This isn’t the ideal outcome I was hoping for."
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
        excellent: 70,
        good: 50
      },
      feedback: {
        excellent:
          "Outstanding work! You managed an unavoidable delay perfectly. By being proactive, suggesting a compromise, and offering a mutual benefit, you turned a potential crisis into a demonstration of our reliability. This strengthens our relationship with TechnoGadgets immensely.",
        good:
          "Good job overall. You kept the client onboard and found a solution. However, being more assertive in covering extra costs from the start could have secured their satisfaction faster. Remember, protecting a key relationship is often worth a short-term cost.",
        poor:
          "This was a challenging situation, but we need to do better. Vague communication and a lack of flexible options damage client trust. In the future, always have a clear proposal ready and negotiate from a position of wanting to help, not just inform about problems."
      }
    }

  }
};
