export const situation6 = {
  id: "picking_packing_labeling",
  title: "Unit 6: Picking, Packing and Labeling",
  scoring: ["reputation"],

  characters: {
    player: "Student",
    john: "John Miller",
    mark: "Mark"
  },

  initialState: {
    reputation: 10,
    time: 100
  },

  nodes: {
    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: `This morning, during a routine inspection in the warehouse, a problem was discovered: a wooden crate with protruding nails was found near the hazardous materials section. The situation is dangerous and must be reported immediately.`
        },
        {
          speaker: "System",
          text: `As a logistician, your task is to handle the case properly: identify the problem, communicate with the warehouse worker, and make sure that a damage report is completed.`
        }
      ],
      options: [
        { text: "Speak to John Miller", next: "path_choice" }
      ]
    },

    path_choice: {
      type: "chat",
      messages: [
        { speaker: "System", text: "Choose how you begin the conversation:" }
      ],
      options: [
        {
          text: "Hello, John. I just inspected the hazardous materials zone. I found a crate with protruding nails very close to the barrels. This could be dangerous.",
          next: "path1"
        },
        {
          text: "Hi John. I think I saw some problem with a crate near the hazardous section. Could you check it?",
          next: "path2"
        },
        {
          text: "John, is everything okay in the hazardous materials area?",
          next: "path3"
        }
      ]
    },

    // ---------------- PATH 1 ----------------
    path1: {
      type: "chat",
      messages: [{ speaker: "John Miller", text: "That’s serious. What should we do first?" }],
      options: [
        {
          text: "Please examine the area carefully and secure the crate. I’ll fill out a damage report. (John: Good idea. I’ll secure the area right away. Please don’t forget the report.)",
          effects: { reputation: 25, time: -5 },
          next: "result"
        },
        {
          text: "Let’s ignore it for now. We will move the crate later. (John: I’m not sure that’s safe… but okay.)",
          effects: { reputation: -10, time: -15 },
          next: "result"
        }
      ]
    },

    // ---------------- PATH 2 ----------------
    path2: {
      type: "chat",
      messages: [{ speaker: "John Miller", text: "Sure, but what’s the exact problem?" }],
      options: [
        {
          text: "It has protruding nails. Please secure it and I’ll fill out a damage report. (John: Alright, I’ll secure the area. Please make sure to file the report.)",
          effects: { reputation: 15, time: -10 },
          next: "result"
        },
        {
          text: "I’m not sure, maybe you can just check. (John: Sorry, I need more details to act properly. I will ask somebody else.)",
          effects: { reputation: -5, time: -20 },
          next: "result"
        }
      ]
    },

    // ---------------- PATH 3 ----------------
    path3: {
      type: "chat",
      messages: [{ speaker: "John Miller", text: "I don’t know. Did you see anything unusual?" }],
      options: [
        {
          text: "Yes, I saw a crate with protruding nails. Please secure it and I’ll write a damage report. (John: Okay, I’ll handle it. Please don’t forget the report.)",
          effects: { reputation: 10, time: -15 },
          next: "result"
        },
        {
          text: "Maybe just check later when you have time. (John: Alright, I’ll try to find some time for this next week.)",
          effects: { reputation: -10, time: -25 },
          next: "result"
        }
      ]
    },

    // ---------------- FINAL FEEDBACK ----------------
    result: {
      type: "final-feedback",
      thresholds: {
        excellent: 35,
        good: 25
      },
      feedback: {
        excellent: "Excellent job! You identified the problem clearly, used professional terminology, and gave precise instructions. This shows strong communication and safety awareness.",
        good: "Good work overall. You managed to address the issue, but some of your instructions were not very clear. Remember: in logistics, clarity and precision ensure safety and efficiency.",
        poor: "This time you missed key steps or gave vague instructions. Incomplete communication can lead to serious risks, especially with hazardous materials. Focus on using correct terminology and giving clear, structured instructions."
      }
    }
  }
};


