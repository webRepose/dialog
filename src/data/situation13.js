export const situation13 = {
  id: "handling_last_mile_delivery_complaint",
  title: "Unit 13: Handling a Last-Mile Delivery Complaint",
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
    // INTRO
    // =========================

    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "You are at your office. Your phone rings. On the line is an angry Ms. Emily Vance. Your task is to calm the client down, investigate the situation, and propose a solution using professional vocabulary and complaint-handling strategies."
        },
        {
          speaker: "Ms. Emily Vance",
          text: "Hello! This is Emily Vance. This is an absolute disgrace! My client in a rural area has not received his order - an expensive, handmade vase. This is a complete delivery failure, and I demand an explanation! It’s just one constant delivery delay with you!"
        }
      ],
      options: [
        {
          text: "A. Ms. Vance, I sincerely apologize for this inconvenience and fully understand your frustration. Thank you for bringing this to our attention. To help you quickly, could you share the tracking number and the delivery address for the parcel?",
          next: "tracking_details"
        },
        {
          text: "B. Well, you have to understand, last-mile delivery to rural areas is always challenging. Perhaps the courier simply couldn’t find the address. These things happen.",
          effects: { satisfaction: -20, reputation: -15, time: -10 },
          next: "client_angrier"
        }
      ]
    },

    // =========================
    // BAD RESPONSE PATH
    // =========================

    client_angrier: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Perhaps?! My client paid for the delivery! It’s your job to find the addresses!"
        }
      ],
      options: [
        { text: "Continue discussion", next: "tracking_details" }
      ]
    },

    // =========================
    // TRACKING DETAILS
    // =========================

    tracking_details: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Alright, the tracking number is 789XY... The delivery address is the “Sunny Meadows” farm, it’s outside the town. I see in the app that there was one attempted delivery - a missed delivery - but no one called my client!"
        }
      ],
      options: [
        {
          text: "A. We have a few options to resolve this immediately. If we reschedule the delivery for tomorrow, we will use a driver familiar with that area and ensure they call the recipient 30 minutes prior. Alternatively, if your client prefers, we can redirect the parcel to a secure automated locker in the nearest town. He can pick it up at his convenience using a code.",
          next: "locker_concern"
        },
        {
          text: "B. Well, we can try to send it again tomorrow. Hopefully, we’ll have better luck.",
          effects: { satisfaction: -15, reputation: -10, time: -15 },
          next: "client_demands_guarantee"
        }
      ]
    },

    // =========================
    // WEAK PROPOSAL PATH
    // =========================

    client_demands_guarantee: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Hopefully? I need guarantees! This vase is very fragile, it needed a white glove service!"
        }
      ],
      options: [
        { text: "Continue discussion", next: "final_warning" }
      ]
    },

    final_warning: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "This situation is very disappointing. I’m considering changing logistics providers."
        }
      ],
      options: [
        { text: "End call", next: "result" }
      ]
    },

    // =========================
    // PROFESSIONAL SOLUTION PATH
    // =========================

    locker_concern: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Thank you for offering options. The automated locker is a good idea, but I’m worried about the item’s safety. What if the vase arrives as damaged goods?"
        }
      ],
      options: [
        {
          text: "A. I assure you the parcel will be handled with extra care. If the item is damaged upon pickup, we’ll process a full refund immediately. To avoid such issues in the future for your valuable items, I highly recommend selecting our white glove service. The courier will unpack and set up the item, and it requires a signature. We can also use geofencing to provide your clients with accurate delivery window notifications.",
          effects: { satisfaction: +40, reputation: +30, time: -15 },
          next: "client_relaxed"
        },
        {
          text: "B. Don’t worry, it’s probably fine. Just tell your client to wait for tomorrow.",
          effects: { satisfaction: -25, reputation: -20, time: -20 },
          next: "client_switching"
        }
      ]
    },

    client_switching: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Probably? This is unacceptable. I will consider switching logistics partners."
        }
      ],
      options: [
        { text: "End call", next: "result" }
      ]
    },

    client_relaxed: {
      type: "chat",
      messages: [
        {
          speaker: "Ms. Emily Vance",
          text: "Thank you so much! Now I feel confident. Let’s redirect the parcel to the automated locker, and I will definitely look into the white glove service option for future orders. Thank you for your help and professional approach!"
        }
      ],
      options: [
        { text: "Finalize solution", next: "result" }
      ]
    },

    // =========================
    // FINAL FEEDBACK
    // =========================

    result: {
      type: "final-feedback",
      thresholds: {
        excellent: 80,
        good: 60
      },
      feedback: {
        excellent:
          "Brilliant work! You handled a difficult complaint perfectly. You used apologies and empathy to calm the client, expertly applied the First Conditional to propose solutions, and gave thoughtful recommendations for preventing future problems. This is exactly how we build long-term client relationships. Our reputation is strengthened!",
        good:
          "Good job overall. You solved the client’s problem, but you could have been more proactive from the start. Remember, offering alternative solutions before the client asks shows true service commitment.",
        poor:
          "We need to work on your communication skills under pressure. Making excuses and being passive only makes the situation worse. Next time, move straight to apologies, fact-finding, and actively proposing solutions. Remember the tools we have to improve last-mile delivery."
      }
    }

  }
};
