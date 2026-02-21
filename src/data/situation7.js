export const situation7 = {
  id: "loading_instructions",
  title: "Unit 7: Loading Instructions",
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

    // ========================
    // 🎬 INTRO (FULL CAT-SCENE)
    // ========================

    intro: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "This afternoon, your company needs to ship an urgent order. You must give clear and safe loading instructions to the warehouse worker, John Miller. The way you formulate and sequence your instructions will affect safety, timing, and professional reputation."
        }
      ],
      options: [
        { text: "Review the cargo options", next: "cargo_choice" }
      ]
    },

    // ========================
    // CHOOSE CARGO TYPE
    // ========================

    cargo_choice: {
      type: "chat",
      messages: [
        { speaker: "System", text: "Select the cargo you are supervising:" }
      ],
      options: [
        { text: "Heavy Barrels (Liquids)", next: "barrels_info" },
        { text: "Crates with protruding nails", next: "crates_info" },
        { text: "Mixed Load (Fragile + Hazardous)", next: "mixed_info" }
      ]
    },

    // ========================
    // 🔵 PATH 1 – HEAVY BARRELS
    // ========================

    barrels_info: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Description of cargo: 4 barrels with liquid (oil), one drum with chemicals (hazardous materials)."
        }
      ],
      options: [
        {
          text: "Align the load on the pallet and secure the barrels with straps. Do not forget to label the drum as hazardous.",
          effects: { reputation: +25, time: -5 },
          next: "barrels_good"
        },
        {
          text: "Just put the barrels together and send them quickly. We’ll label later.",
          effects: { reputation: -15, time: -20 },
          next: "barrels_bad"
        }
      ]
    },

    barrels_good: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "Got it. I’ll secure the load and add the hazardous label."
        }
      ],
      options: [
        { text: "Finish loading instructions", next: "result" }
      ]
    },

    barrels_bad: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "Are you sure? That sounds risky, but okay…"
        }
      ],
      options: [
        { text: "Finish loading instructions", next: "result" }
      ]
    },

    // ========================
    // 🟢 PATH 2 – CRATES
    // ========================

    crates_info: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Description of cargo: 6 wooden crates, one of them has protruding nails, some boxes without markings."
        }
      ],
      options: [
        {
          text: "Examine the crates, repair the one with protruding nails, and place warning markings. Then stack them carefully.",
          effects: { reputation: +20, time: -10 },
          next: "crates_good"
        },
        {
          text: "Just stack the crates quickly; we’ll deal with the nails later.",
          effects: { reputation: -10, time: -15 },
          next: "crates_bad"
        }
      ]
    },

    crates_good: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "Alright, I’ll fix the crate and make sure the markings are visible."
        }
      ],
      options: [
        { text: "Finish loading instructions", next: "result" }
      ]
    },

    crates_bad: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "Okay, but the nails might cause damage during transport."
        }
      ],
      options: [
        { text: "Finish loading instructions", next: "result" }
      ]
    },

    // ========================
    // 🟡 PATH 3 – MIXED LOAD
    // ========================

    mixed_info: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text: "Description of cargo: A chest with metal tools, 2 bales of fabric, one cask with chemicals (hazardous)."
        }
      ],
      options: [
        {
          text: "Place the chest at the bottom, stack the bales on top, and secure them. Keep the cask separate and label it as hazardous.",
          effects: { reputation: +15, time: -10 },
          next: "mixed_good"
        },
        {
          text: "Put everything together on one pallet to save time.",
          effects: { reputation: -20, time: -25 },
          next: "mixed_bad"
        }
      ]
    },

    mixed_good: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "Good plan. I’ll load the chest first, then add the bales, and handle the cask separately."
        }
      ],
      options: [
        { text: "Finish loading instructions", next: "result" }
      ]
    },

    mixed_bad: {
      type: "chat",
      messages: [
        {
          speaker: "John Miller",
          text: "Hmm… mixing hazardous with other goods? I’ll try to find time for this next week."
        }
      ],
      options: [
        { text: "Finish loading instructions", next: "result" }
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
        excellent: "Excellent job! Your instructions were clear, professional, and safety-oriented. That’s exactly how a logistician should communicate with warehouse staff.",
        good: "Good effort. Some of your instructions were correct, but not always precise or complete. Clearer imperatives and attention to safety details will improve your communication.",
        poor: "This was not your best attempt. Unsafe or vague instructions can cause damage and delays. Focus on giving structured, professional loading instructions next time."
      }
    }

  }
};
