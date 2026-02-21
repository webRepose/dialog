export const situation5 = {
  id: "orders_inventory",
  title: "Unit 5: Orders and Inventory Management",
  scoring: ["reputation", "satisfaction"],

  characters: {
    player: "Student",
    john: "John Miller",
    mark: "Mark"
  },

  initialState: {
    satisfaction: 0,
    reputation: 10,
    time: 100
  },

  nodes: {

    // 🎬 STEP 1 – Cut-scene
intro: {
  type: "chat",
  messages: [
    {
      speaker: "System",
      text: `This morning, you received an urgent email from a key client, Ms. Anna Davis - procurement manager from QuickMart Retail. Before replying to Ms. Davis, you decide to clarify the information with the warehouse worker John Miller.`
    },
    {
      speaker: "System",
      text: `--- Email from Ms. Anna Davis ---
From: Anna Davis <a.davis@quickmart-retail.com>
To: sales@smartstorageltd.com
Subject: Urgent Enquiry: Stock Availability and Delivery – SKU #A578B2

Dear Sir or Madam,
I am writing to enquire about the availability and delivery terms for 500 units of product SKU #A578B2.
We urgently need this stock for an upcoming promotional campaign and would appreciate your prompt confirmation regarding:
1. Your current stock level for this SKU.
2. The expected lead time if we place a purchase order today.
Thank you in advance for your attention to this matter. I look forward to your reply.

Best regards,
Anna Davis
Procurement Manager
QuickMart Retail
--- End of Email ---`
    }
  ],
  options: [
    { text: "Call John Miller", next: "path_choice" }
  ]
},
    // Выбор первого вопроса (3 пути)
    path_choice: {
      type: "chat",
      messages: [
        { speaker: "System", text: "Choose how you begin the conversation:" }
      ],
      options: [
        {
          text: "Hello, John. This is [Name of student] from the office. We’ve just received an urgent order from a client for 500 units of SKU #A578B2. Could you tell me how many units are in stock right now?",
          next: "path1_step2"
        },
        {
          text: "Good afternoon, John. This is [Name of student] from the office. I have a client request for 500 units of SKU #A578B2. Do we have enough stock for this order?",
          next: "path2_step2"
        },
        {
          text: "Hello, John. [Name of student] from the office. A client has asked about SKU #A578B2. Can you tell me about recent shipments?",
          next: "path3_step2"
        }
      ]
    },

    // ========================
    // 🔵 PATH 1
    // ========================
    path1_step2: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "Let me check. We have 180 units in stock in Warehouse A. The rest are in the next batch." }
      ],
      options: [
        { text: "When will the next batch arrive?", next: "path1_step3a" },
        { text: "When will the next batch arrive and how many units will it include?", next: "path1_final" }
      ]
    },

    path1_step3a: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The next batch is expected in 10 days." }
      ],
      options: [
        { text: "How many units will it include?", next: "path1_final" },
        { text: "Will it be enough to complete the 500 units order?", next: "path1_final" }
      ]
    },

    path1_final: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The next batch is 320 units, expected in 10 days. Enough to complete the 500 units order." }
      ],
      options: [
        {
          text: "Thank you for your time, John. I’ll proceed with the client’s order.",
          effects: { reputation: 25, satisfaction: 20, time: -5 },
          next: "result"
        }
      ]
    },

    // ========================
    // 🟢 PATH 2
    // ========================
    path2_step2: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "Not at the moment. We don’t have the full 500 units available." }
      ],
      options: [
        { text: "Could you tell me how many units we have in stock?", next: "path2_step3" },
        { text: "When will the next batch arrive and how many units will it include?", next: "path2_final" }
      ]
    },

    path2_step3: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "Currently 180 units." }
      ],
      options: [
        { text: "When will the next batch arrive?", next: "path2_step4" },
        { text: "When will the next batch arrive and how many units will it include?", next: "path2_final" }
      ]
    },

    path2_step4: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The next batch will arrive in 10 days." }
      ],
      options: [
        { text: "How many units will it include?", next: "path2_final" },
        { text: "Will it be enough to complete the order?", next: "path2_final" }
      ]
    },

    path2_final: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The next batch is 320 units, expected in 10 days. Enough to complete the 500 units order." }
      ],
      options: [
        {
          text: "Thank you for your time, John. I’ll proceed with the client’s order.",
          effects: { reputation: 20, satisfaction: 20, time: -10 },
          next: "result"
        }
      ]
    },

    // ========================
    // 🟡 PATH 3
    // ========================
    path3_step2: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The last shipment was received last week, and another one is scheduled soon." }
      ],
      options: [
        { text: "How many units did we get in the last shipment?", next: "path3_step3a" },
        { text: "When will the next shipment arrive?", next: "path3_step3b" }
      ]
    },

    path3_step3a: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The last shipment brought 180 units." }
      ],
      options: [
        { text: "How much is left in warehouse?", next: "path3_step4a" },
        { text: "How many units will it include?", next: "path3_step4b" }
      ]
    },

    path3_step3b: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The next shipment is expected in 10 days." }
      ],
      options: [
        { text: "How much is left in warehouse?", next: "path3_step4a" },
        { text: "How many units will it include?", next: "path3_step4b" }
      ]
    },

    path3_step4a: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "All of them is left in warehouse A." }
      ],
      options: [
        { text: "How many units will it include?", next: "path3_final" }
      ]
    },

    path3_step4b: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The next shipment is 320 units." }
      ],
      options: [
        { text: "How much is left in warehouse?", next: "path3_final" }
      ]
    },

    path3_final: {
      type: "chat",
      messages: [
        { speaker: "John Miller", text: "The next shipment is 320 units." }
      ],
      options: [
        {
          text: "Thank you for your time, John. I’ll proceed with the client’s order.",
          effects: { reputation: 10, satisfaction: 15, time: -15 },
          next: "result"
        }
      ]
    },

    // ========================
    // 🏁 FINAL FEEDBACK
    // ========================
    result: {
      type: "final-feedback",
      thresholds: { excellent: 35, good: 25 },
      feedback: {
        excellent: "Excellent job! You used professional terminology confidently and asked clear, well-structured questions. You obtained all the necessary details quickly, which shows strong communication skills with warehouse staff. That’s exactly what our clients expect.",
        good: "Good effort. You managed to get most of the information, but some of your questions were not precise enough. Remember: professional terms and clear, logical phrasing help you receive complete answers faster. Keep practicing to improve your efficiency.",
        poor: "This time you missed key information and your questions lacked clarity. Remember, incomplete or vague communication can delay client orders. Focus on using the correct terminology and asking structured questions to get full answers in a short time."
      }
    }

  }
};
