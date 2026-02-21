export const situation11 = {
  id: "choosing_mode_of_transport",
  title: "Unit 11: Choosing the Right Mode of Transport",
  scoring: ["satisfaction", "reputation"],

  characters: {
    player: "Student – logistician from GlobalLogix",
    client: "Mr. Robert Chen – new potential client, owner of EcoWood",
    mark: "Mark – boss"
  },

  initialState: {
    satisfaction: 50,
    reputation: 50,
    time: 100
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
          text: "You have a meeting with Mr. Robert Chen, a new client. His company, «EcoWood», needs to ship 10 containers of wooden furniture from Ho Chi Minh City, Vietnam, to a distribution center in Dresden, Germany. He is not sure about the best mode of transport. Your task is to advise him professionally."
        },
        {
          speaker: "Mr. Robert Chen",
          text: "Good morning. Thank you for seeing me on such a gloomy day. I hope the weather hasn’t caused any delays with your other shipments?"
        }
      ],
      options: [
        {
          text: "Good morning, Mr. Chen. It’s a pleasure to meet you. Yes, the rain is slowing things down a bit, but we’re used to managing these conditions. I hope your journey here wasn’t too difficult? Shall we get started?",
          next: "discussion"
        },
        {
          text: "Hey, don’t worry about the weather. By the way, you look tired, long flight? So, what do you want to ship?",
          effects: { satisfaction: -15, reputation: -10, time: -5 },
          next: "negative_start"
        }
      ]
    },

    // =========================
    // STEP 2: NEGATIVE START PATH
    // =========================

    negative_start: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Robert Chen",
          text: "I see… I would prefer to focus on business matters. Professional communication is very important to me."
        }
      ],
      options: [
        { text: "Continue meeting", next: "discussion" }
      ]
    },

    // =========================
    // STEP 3: DISCUSSION OF NEEDS
    // =========================

    discussion: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Robert Chen",
          text: "- Thank you. So, as I mentioned, we need to ship furniture from Vietnam to Germany. Cost is important, but we also need a reasonable transit time. The goods are non-perishable, but we want to avoid damage. What mode of transport would you recommend?"
        }
      ],
      options: [
        {
          text: "For a route from Asia to Central Europe, the most cost-effective solution is often intermodal or multimodal transport. I suggest using a container ship to a major European port like Rotterdam – a key logistics hub. From there, we can use a block train directly to Dresden. This combination is efficient and reliable.",
          effects: { satisfaction: +20, reputation: +15, time: -15 },
          next: "train_explanation"
        },
        {
          text: "The cheapest option is sea freight all the way. We can use a container ship to Hamburg, and then LGVs by road to Dresden. It has a long transit time, but it saves money.",
          effects: { satisfaction: 0, reputation: +5, time: -10 },
          next: "road_concern"
        }
      ]
    },

    // =========================
    // STEP 3B: ROAD CONCERN PATH
    // =========================

    road_concern: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Robert Chen",
          text: "Road transport from Hamburg? That seems less reliable due to traffic. I’m worried about flexibility and potential delays on the last leg."
        }
      ],
      options: [
        { text: "Proceed with this solution", next: "result_road" }
      ]
    },

    // =========================
    // STEP 4: TRAIN EXPLANATION PATH
    // =========================

    train_explanation: {
      type: "chat",
      messages: [
        {
          speaker: "Student",
          text: "Certainly. Using a block train is more efficient for large volumes than multiple single-wagon shipments. It reduces handling at the port – containers are moved from the ship by grappler lifts directly onto the train. This is faster and safer than transferring to many unaccompanied trailers for road transport. While road offers great flexibility for final delivery, rail is more predictable for long inland hauls."
        },
        {
          speaker: "Mr. Robert Chen",
          text: "That makes sense. So, the containers themselves are standard? What about equipment like swap-bodies?"
        }
      ],
      options: [
        {
          text: "Yes, we use standard ISO containers, which are compatible with ships, trains, and trucks. Swap-bodies are more common for intra-European road-rail transport, but for this intercontinental shipment, standard containers are perfect. I will prepare a detailed quote for this multimodal solution via Rotterdam and the block train.",
          effects: { satisfaction: +30, reputation: +25, time: -20 },
          next: "client_positive"
        },
        {
          text: "I think so... yes, standard containers should be fine. I’ll need to check with my manager about the train part. I’ll get back to you.",
          effects: { satisfaction: +5, reputation: 0, time: -20 },
          next: "client_uncertain"
        }
      ]
    },

    // =========================
    // CLIENT POSITIVE FEEDBACK
    // =========================

    client_positive: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Robert Chen",
          text: "Excellent. You’ve been very informative. I look forward to receiving the quote. This seems like a well-structured solution for mutual benefit."
        }
      ],
      options: [
        { text: "Finalize consultation", next: "result_train" }
      ]
    },

    client_uncertain: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Robert Chen",
          text: "I see. Please get back to me with confirmed details. I need a reliable partner."
        }
      ],
      options: [
        { text: "End meeting", next: "result_train" }
      ]
    },

    // =========================
    // STEP 5: FINAL FEEDBACK
    // =========================

    result_train: {
      type: "final-feedback",
      thresholds: {
        excellent: 75,
        good: 55
      },
      feedback: {
        excellent: "Mark: Brilliant consultation! You used small talk perfectly to build rapport, demonstrated deep knowledge of modes of transport, and recommended a smart multimodal solution. Explaining the role of a hub and the efficiency of a block train showed real expertise. The client is very impressed.",
        good: "Mark: Good job on the technical advice. You chose a reasonable mode of transport. However, remember that initial small talk sets the tone. Being more engaging from the start can make the client feel more comfortable and secure the deal faster.",
        poor: "Mark: We need to work on client interactions. Choosing an unsuitable mode of transport without considering cost or making inappropriate personal comments damages our credibility. Always assess the client’s needs first and maintain professional small talk."
      }
    },

    result_road: {
      type: "final-feedback",
      thresholds: {
        excellent: 75,
        good: 55
      },
      feedback: {
        excellent: "Mark: Despite choosing a riskier road option, your explanation and client interaction were strong. The client is satisfied with your professionalism.",
        good: "Mark: The client is okay with your choice, but multimodal transport would have been more optimal. Work on explaining the pros and cons clearly.",
        poor: "Mark: Choosing road transport led to concerns about delays. Consider efficiency and reliability when advising clients."
      }
    }

  }
};