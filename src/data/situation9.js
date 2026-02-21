export const situation9 = {
  id: "enquiry_email_check",
  title: "Unit 9: Enquiry E-mail",
  scoring: ["reputation"],

  characters: {
    player: "Student",
    colleague: "John Smith",
    mark: "Mark"
  },

  initialState: {
    reputation: 50
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
          text: "This afternoon, your colleague drafted a formal enquiry e-mail to a supplier."
        },
        {
          speaker: "System",
          text: "He is unsure about some phrases and asks you to check them before sending. Your task is to identify if there are mistakes, correct them politely, and explain why. If you make the right correction, your Professional Reputation increases. If you miss a mistake or give a wrong explanation, you lose points."
        },
        {
          speaker: "John Smith",
          text: "Good afternoon! I’ve just drafted an enquiry e-mail to our supplier, but I’m not sure about some parts. Could you check it with me, please?"
        }
      ],
      options: [
        {
          text: "Of course, let’s go through it together.",
          next: "email_text"
        }
      ]
    },

    // =========================
    // EMAIL TEXT
    // =========================

    email_text: {
      type: "chat",
      messages: [
        {
          speaker: "System",
          text:
`Dear Sir/Madams,

I am writing to enquiring about the availability of 100 car batteries (SKU: BAT-100).
We want to know do you have any information on delivery times.

I wait for your answer very soon!

Yours faithfully,
John Smith`
        }
      ],
      options: [
        { text: "Check the greeting", next: "greeting" }
      ]
    },

    // =========================
    // STEP 1 — GREETING
    // =========================

    greeting: {
      type: "chat",
      messages: [
        {
          speaker: "John Smith",
          text: "The greeting is 'Dear Sir/Madams'. Is this correct?"
        }
      ],
      options: [
        {
          text: "It should be 'Dear Sir/Madam'. We don’t use plural in formal letters.",
          effects: { reputation: +5 },
          next: "grammar1"
        },
        {
          text: "Yes, it’s correct, because we are addressing many people.",
          effects: { reputation: -5 },
          next: "grammar1"
        }
      ]
    },

    // =========================
    // STEP 2 — ENQUIRE
    // =========================

    grammar1: {
      type: "chat",
      messages: [
        {
          speaker: "John Smith",
          text: "Next: 'I am writing to enquiring about…' Is that okay?"
        }
      ],
      options: [
        {
          text: "Yes, it’s fine, ‘enquiring’ makes it sound more polite.",
          effects: { reputation: -5 },
          next: "grammar2"
        },
        {
          text: "It should be 'I am writing to enquire about…' — after 'to' we use the base verb.",
          effects: { reputation: +5 },
          next: "grammar2"
        }
      ]
    },

    // =========================
    // STEP 3 — INDIRECT QUESTION
    // =========================

    grammar2: {
      type: "chat",
      messages: [
        {
          speaker: "John Smith",
          text: "Then I wrote: 'We want to know do you have any information on delivery times.' Does this look correct?"
        }
      ],
      options: [
        {
          text: "It should be 'We would like to know if you have any information on delivery times.' In indirect questions we use 'if' instead of changing word order.",
          effects: { reputation: +5 },
          next: "grammar3"
        },
        {
          text: "Yes, it’s okay, this is a direct question style, so it works.",
          effects: { reputation: -5 },
          next: "grammar3"
        }
      ]
    },

    // =========================
    // STEP 4 — CLOSING PHRASE
    // =========================

    grammar3: {
      type: "chat",
      messages: [
        {
          speaker: "John Smith",
          text: "I ended it with: 'I wait for your answer very soon!' Is that formal enough?"
        }
      ],
      options: [
        {
          text: "Yes, it’s fine. It shows you are waiting and that’s clear.",
          effects: { reputation: -5 },
          next: "closing"
        },
        {
          text: "It would be better to write 'I look forward to your reply.' It’s the standard polite phrase.",
          effects: { reputation: +5 },
          next: "closing"
        }
      ]
    },

    // =========================
    // STEP 5 — YOURS FAITHFULLY
    // =========================

    closing: {
      type: "chat",
      messages: [
        {
          speaker: "John Smith",
          text: "Finally, I wrote: 'Yours faithfully'. Or should it be 'Yours sincerely'?"
        }
      ],
      options: [
        {
          text: "You didn’t write the name of the recipient, so 'Yours faithfully' is correct.",
          effects: { reputation: +5 },
          next: "result"
        },
        {
          text: "'Yours sincerely' is always better in business letters.",
          effects: { reputation: -5 },
          next: "result"
        }
      ]
    },

    // =========================
    // FINAL FEEDBACK
    // =========================

    result: {
      type: "final-feedback",
      thresholds: {
        excellent: 35,
        good: 25
      },
      feedback: {
        excellent:
          "Excellent job! You identified every mistake and explained clearly. This shows strong professional writing skills.",
        good:
          "Good work overall. You corrected most of the mistakes, but some explanations were not precise. Pay attention to business style.",
        poor:
          "This time you missed important errors. Wrong e-mail style can damage the company’s reputation. Focus on correct formal phrases."
      }
    }

  }
};
