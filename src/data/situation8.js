export const situation8 = {
  id: "hazardous_shipment_enquiry",
  title: "Unit 8: Hazardous Shipment Enquiry",
  scoring: ["reputation", "satisfaction"],

  characters: {
    player: "Student",
    john: "John Miller",
    smith: "Mr. Smith",
    mark: "Mark"
  },

  initialState: {
    reputation: 10,
    satisfaction: 0,
    time: 100
  },

  nodes: {

    // ========================
    // 🎬 INTRO
    // ========================

    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "This afternoon, a new client, Mr. Smith, contacts your company."
        },
        {
          speaker: "Mr. Smith",
          text: "Good afternoon. I need to ship a drum with hazardous chemicals. Could your company arrange safe transportation and advise me about packaging requirements?"
        }
      ],
      options: [
        {
          text: "Hello, Mr. Smith. Dangerous goods are very complicated to transport and it will be very expensive for you.",
          effects: { satisfaction: -30, reputation: -20, time: -10 },
          next: "client_lost"
        },
        {
          text: "Hello, Mr. Smith. Thank you for your enquiry. We can handle hazardous shipments, but I suggest we first discuss details with our safety specialist.",
          next: "client_responds"
        }
      ]
    },

    // ========================
    // ❌ CLIENT LEAVES
    // ========================

    client_lost: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Smith",
          text: "Oh, I see. If it’s too difficult and expensive, I’d better look for another company."
        }
      ],
      options: [
        { text: "End conversation", next: "result" }
      ]
    },

    // ========================
    // ✅ CLIENT RESPONDS
    // ========================

    client_responds: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Smith",
          text: "That sounds good. Could you explain what packaging will be required?"
        }
      ],
      options: [
        { text: "Let me check with our safety officer first.", next: "consult_john" }
      ]
    },

    // ========================
    // ✅ CONSULT JOHN
    // ========================

    consult_john: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "You contact the safety officer to confirm safe packaging procedures."
        }
      ],
      options: [
        {
          text: "John, could you advise me on safe packaging for hazardous chemicals?",
          next: "john_correct"
        },
        {
          text: "John, is it really necessary to use special packaging? Can’t we just ship the drum directly?",
          next: "john_wrong_attempt"
        }
      ]
    },

    john_correct: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "Hazardous materials must be shipped in UN-certified containers. The drums should be secured on pallets and clearly labeled as HAZARDOUS. Documentation must follow international safety standards."
        }
      ],
      options: [
        { text: "Thank you, I’ll inform the client.", next: "return_to_client" }
      ]
    },

    john_wrong_attempt: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "I’m afraid I can’t approve such an approach. Without certified packaging and proper labels, the shipment cannot be accepted."
        }
      ],
      options: [
        { text: "Understood. Could you advise me on safe packaging requirements?", next: "john_correct" }
      ]
    },

    // ========================
    // 🔁 RETURN TO CLIENT
    // ========================

    return_to_client: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Smith",
          text: "Could you explain what packaging will be required?"
        }
      ],
      options: [
        {
          text: "Hazardous materials must be in UN-certified containers and clearly labeled. Our warehouse can provide the packaging and documentation.",
          effects: { satisfaction: 35, reputation: 30, time: -20 },
          next: "client_positive"
        },
        {
          text: "Just bring the drum and our security staff will prepare your cargo for shipment.",
          effects: { satisfaction: 10, reputation: 15, time: -15 },
          next: "client_neutral"
        }
      ]
    },

    client_positive: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Smith",
          text: "Perfect, I feel confident working with you."
        }
      ],
      options: [
        { text: "Finalize the agreement", next: "result" }
      ]
    },

    client_neutral: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Smith",
          text: "It sounds good. I hope everything will be handled according to modern safety requirements."
        }
      ],
      options: [
        { text: "Confirm shipment details", next: "result" }
      ]
    },

    // ========================
    // 🏁 FINAL FEEDBACK
    // ========================

    result: {
      type: "final-feedback",
      thresholds: {
        excellent: 40,
        good: 25
      },
      feedback: {
        excellent: "Excellent job! You communicated clearly, used correct terminology, consulted the right specialist, and gained the client’s trust. That’s exactly what we expect from a professional logistician.",
        good: "Good effort. You managed to keep the client interested, but some answers lacked detail. Next time, be more precise about packaging and emphasize safety requirements.",
        poor: "This was not your best attempt. Unsafe or vague instructions can make clients leave. Always confirm details with experts and use professional logistics terms."
      }
    }

  }
};
