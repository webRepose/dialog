export const situation4 = {
  id: "warehousing_call",
  title: "Unit 4: Warehousing",
  scoring: ["satisfaction", "reputation"],

  characters: {
    player: "Student",
    brown: "Mr. Brown",
    mark: "Mark"
  },

  initialState: {
    satisfaction: 0,   // Customer Satisfaction
    reputation: 10,    // Professional Reputation
    budget: 100,
    time: 100
  },

  nodes: {

    // 🎬 Step 1 – Cut-scene
intro: {
  type: "chat",
  messages: [
    {
      speaker: "System",
      text: `Your phone is ringing. It’s a potential client from “FreshGoods”. Your task is to handle this call professionally, answer all questions about our warehouse facilities, and hopefully, secure a new client for GlobalLogix.`
    }
  ],
  options: [
    {
      text: "Answer the call",
      next: "answer_call"
    }
  ]
},
    // 📞 Step 2 – Answering the call
    answer_call: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Brown",
          text: `Hello, is this the logistics department of GlobalLogix?`
        }
      ],
      options: [

        {
          text: `Yes, hello. Logistics department, [your name] speaking. How can I help you today?`,
          effects: { reputation: 10, satisfaction: 10 },
          next: "customer_needs"
        },

        {
          text: `Yeah, logistics. What’s up?`,
          effects: { reputation: -10, satisfaction: -5 },
          next: "customer_needs"
        },

        {
          text: `Good morning. This is GlobalLogix warehousing team. My name is [your name]. What can I do for you?`,
          effects: { reputation: 15, satisfaction: 15 },
          next: "customer_needs"
        }

      ]
    },

    // 📦 Step 3 – Finding out needs
    customer_needs: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Brown",
          text: `My name is Brown from FreshGoods. I’m calling about your storage services. We have a shipment of high-value perishable goods arriving next week.`
        }
      ],
      options: [

        {
          text: `I understand. Could you tell me if you require cold storage warehouse facilities for your goods?`,
          effects: { reputation: 15, satisfaction: 15 },
          next: "cold_storage"
        },

        {
          text: `Okay. We have space. How many pallets do you need?`,
          effects: { reputation: -5, satisfaction: -10 },
          next: "cold_storage"
        },

        {
          text: `Perishable goods? Just to confirm, you need frozen storage, correct?`,
          effects: { reputation: 5, satisfaction: 10 },
          next: "cold_storage"
        }

      ]
    },

    // ❄ Step 4 – Cold storage question
    cold_storage: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Brown",
          text: `Do you have a dedicated cold storage warehouse with temperature tracking?`
        }
      ],
      options: [

        {
          text: `Uh, I think so? We have a big fridge room where we keep some frozen stuff.`,
          effects: { reputation: -10, satisfaction: -15 },
          next: "cross_docking"
        },

        {
          text: `Yes, we have cold storage. The temperature is controlled there.`,
          effects: { reputation: 5, satisfaction: 5 },
          next: "cross_docking"
        },

        {
          text: `Sure. Our modern cold storage warehouse is equipped with 24/7 digital temperature tracking and alarm systems. We can maintain consistent temperatures from -30°C to +5°C to suit various perishable goods.`,
          effects: { reputation: 20, satisfaction: 20 },
          next: "cross_docking"
        }

      ]
    },

    // 🚛 Cross-docking
    cross_docking: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Brown",
          text: `What about cross-docking?`
        }
      ],
      options: [

        {
          text: `Yes, we offer a dedicated cross-docking service. Goods are transferred from inbound to outbound vehicles in under 12 hours, minimizing storage and speeding up your dispatch.`,
          effects: { reputation: 15, satisfaction: 15 },
          next: "weekend_question"
        },

        {
          text: `Cross-docking? We mostly just store everything in the storage zone for a while before sending it out.`,
          effects: { reputation: -10, satisfaction: -15 },
          next: "weekend_question"
        },

        {
          text: `We do cross-docking, if the schedule allows. It’s usually pretty fast.`,
          effects: { reputation: 5, satisfaction: 5 },
          next: "weekend_question"
        }

      ]
    },

    // 🕒 Step 5 – Weekend question
    weekend_question: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Brown",
          text: `...does receiving area operate on weekends?`
        }
      ],
      options: [

        {
          text: `I’m sorry, could you repeat that? I didn’t quite catch what you said.`,
          effects: { reputation: 5, satisfaction: 5 },
          next: "closing"
        },

        {
          text: `What? Say that again, please.`,
          effects: { reputation: -5, satisfaction: 5 },
          next: "closing"
        },

        {
          text: `Receiving area is well equipped.`,
          effects: { reputation: -15, satisfaction: -15 },
          next: "closing"
        }

      ]
    },

    // 📞 Step 6 – Ending call
    closing: {
      type: "chat",
      messages: [
        {
          speaker: "Mr. Brown",
          text: `Thank you for your help. I’ll send you an email with our requirements. Have a good day!`
        }
      ],
      options: [

        {
          text: `Okay, bye.`,
          effects: { reputation: -10, satisfaction: -5 },
          next: "result"
        },

        {
          text: `No problem. Send the details and we’ll take a look. Bye.`,
          effects: { reputation: 5, satisfaction: 5 },
          next: "result"
        },

        {
          text: `You’re welcome, Mr. Brown. I’ll be looking forward to your email and will follow up promptly. Thank you for calling GlobalLogix. Have a great day!`,
          effects: { reputation: 15, satisfaction: 10 },
          next: "result"
        }

      ]
    },

    // 🏁 Final Feedback
result: {
  type: "final-feedback",
  thresholds: { excellent: 80, good: 50 },
  feedback: {
    excellent: "Outstanding! You gave accurate information and sounded like a real expert. Mr. Brown has just emailed me – he is very impressed.",
    good: "You managed the basics well, but overlooked a few details. Keep in mind that clients expect precise answers about our facilities. Let’s go over the warehouse types again.",
    poor: "Accurate knowledge of our services is key to building trust with clients. Let’s make sure there’s no confusion - please refresh your knowledge of the warehouse vocabulary."
  }
}
  }
};
