import type {
  Conversation,
  ConversationListItem,
} from '../types/chat.types';

// ============================================================
// MOCK MODE FLAG — flip to false when real API is ready
// ============================================================
const USE_MOCK = true;

// ============================================================
// MOCK RESPONSES
// ============================================================

const MOCK_RESPONSES: Record<string, string> = {
  default: `That's a thoughtful question. Let me share some educational information that might help.

Mental health is a spectrum, and it's completely normal to have questions about what you're experiencing. Here are a few things worth knowing:

**Understanding Your Experience**

Everyone's mental health journey is unique. What you're feeling is valid, and taking the time to learn more about it is a positive step.

**Key Points to Consider:**

- Mental health conditions are common — they affect roughly 1 in 5 adults in any given year
- Seeking information is itself a healthy behavior
- There's no single "normal" — mental wellness looks different for everyone
- Professional support can make a meaningful difference

**What You Can Do Next**

If you'd like to explore this further, Psychage has several tools that might help:

1. **Clarity Score** — A quick wellness assessment across 5 dimensions
2. **Symptom Navigator** — An educational tool to understand symptoms better
3. **Provider Directory** — Find mental health professionals near you

Would you like to learn more about any of these, or is there something specific I can help you understand?

---

*This is educational information only and does not constitute a diagnosis or medical advice. If you're in crisis, please reach out to a crisis helpline immediately.*`,

  anxiety: `Anxiety is one of the most common mental health experiences, and understanding it can be really empowering.

**What Is Anxiety?**

At its core, anxiety is your brain's alarm system. It's designed to protect you from danger — the "fight or flight" response. The challenge is that sometimes this alarm goes off when there isn't an immediate threat, or it stays on longer than needed.

**Common Experiences**

People with anxiety often describe:

- Racing thoughts or difficulty concentrating
- Physical sensations like a racing heart, muscle tension, or stomach discomfort
- Persistent worry about future events
- Difficulty sleeping or restlessness
- Avoidance of situations that trigger worry

**What the Research Shows**

Anxiety disorders affect approximately 19% of adults annually. They're highly treatable — cognitive behavioral therapy (CBT) has strong evidence, with studies showing significant improvement in 60-80% of cases.

**Practical Steps**

Some evidence-based strategies that many people find helpful:

1. **Diaphragmatic breathing** — Breathe in for 4 counts, hold for 4, exhale for 6
2. **Grounding techniques** — The 5-4-3-2-1 method engages your senses to bring you back to the present
3. **Regular movement** — Even 20 minutes of walking has measurable effects on anxiety
4. **Sleep hygiene** — Consistent sleep schedules support emotional regulation

Would you like to explore any of these in more detail? Psychage also has a **Breathwork tool** and a **Grounding Exercise** if you'd like to try something interactive.

---

*This is educational information, not a diagnosis. If anxiety is significantly impacting your daily life, speaking with a mental health professional can be very helpful.*`,

  depression: `Depression is one of the most widely studied mental health conditions, and there's a lot of helpful information I can share.

**Understanding Depression**

Depression is more than feeling sad. It's a persistent pattern that affects how you feel, think, and handle daily activities. It typically involves changes in mood, energy, sleep, appetite, and interest in things you used to enjoy.

**What It Can Look Like**

Depression manifests differently for different people, but common experiences include:

- Persistent low mood or a feeling of emptiness
- Loss of interest in activities that used to bring pleasure
- Changes in sleep — either sleeping much more or having difficulty sleeping
- Fatigue or low energy, even after rest
- Difficulty concentrating or making decisions
- Changes in appetite or weight
- Feelings of worthlessness or excessive guilt

**Important Context**

- Major depressive disorder affects approximately 8% of adults in any given year
- Depression is not a character flaw or weakness — it involves real changes in brain chemistry and function
- It's one of the most treatable mental health conditions when properly addressed
- Recovery is not linear — ups and downs are normal

**Evidence-Based Approaches**

Research supports several approaches:

1. **Behavioral activation** — Gradually re-engaging with activities, even when motivation is low
2. **Cognitive restructuring** — Learning to identify and reframe negative thought patterns
3. **Physical activity** — Regular exercise has been shown to have effects comparable to medication for mild-to-moderate depression
4. **Social connection** — Maintaining relationships, even when the impulse is to withdraw

Would you like to explore any of these topics further? The **Clarity Journal** on Psychage includes structured thought records based on cognitive restructuring principles.

---

*This is educational content, not a clinical diagnosis. If you're experiencing persistent symptoms, please consider speaking with a mental health professional. If you're in crisis, help is available now.*`,
};

function getResponseForMessage(message: string): string {
  const lower = message.toLowerCase();
  if (
    lower.includes('anxiety') ||
    lower.includes('anxious') ||
    lower.includes('worried') ||
    lower.includes('panic') ||
    lower.includes('nervous')
  ) {
    return MOCK_RESPONSES.anxiety;
  }
  if (
    lower.includes('depress') ||
    lower.includes('sad') ||
    lower.includes('empty') ||
    lower.includes('hopeless') ||
    lower.includes('down')
  ) {
    return MOCK_RESPONSES.depression;
  }
  return MOCK_RESPONSES.default;
}

// ============================================================
// MOCK STREAMING
// ============================================================

async function* streamMockResponse(userMessage: string): AsyncGenerator<string> {
  const fullResponse = getResponseForMessage(userMessage);
  const words = fullResponse.split(' ');

  for (let i = 0; i < words.length; i++) {
    const word = words[i];
    const delay =
      word.endsWith('.') || word.endsWith('?') || word.endsWith('!')
        ? Math.random() * 40 + 30
        : word.startsWith('**')
          ? Math.random() * 20 + 15
          : Math.random() * 25 + 10;

    await new Promise((resolve) => setTimeout(resolve, delay));
    yield words[i] + (i < words.length - 1 ? ' ' : '');
  }
}

// ============================================================
// PUBLIC API
// ============================================================

export async function* sendMessage(
  message: string,
  _conversationId?: string,
): AsyncGenerator<string> {
  if (USE_MOCK) {
    yield* streamMockResponse(message);
    return;
  }

  // Real API (uncomment when backend supports SSE):
  // const response = await fetch('/api/ai/chat', { ... });
  // Parse SSE stream...
}

export async function getConversations(): Promise<ConversationListItem[]> {
  if (USE_MOCK) {
    return [
      {
        id: 'conv-1',
        title: 'What is anxiety and how does it affect the body?',
        updatedAt: new Date(Date.now() - 1000 * 60 * 30),
        messageCount: 6,
        preview: 'Anxiety is one of the most common mental health experiences...',
      },
      {
        id: 'conv-2',
        title: 'Understanding the difference between stress and burnout',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 3),
        messageCount: 4,
        preview: 'While stress and burnout share some similarities...',
      },
      {
        id: 'conv-3',
        title: 'How can I improve my sleep hygiene?',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
        messageCount: 8,
        preview: 'Sleep hygiene refers to the habits and environmental factors...',
      },
      {
        id: 'conv-4',
        title: 'What does depression actually feel like?',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
        messageCount: 10,
        preview: 'Depression is more than just feeling sad...',
      },
      {
        id: 'conv-5',
        title: 'Find a therapist who speaks Bengali',
        updatedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 7),
        messageCount: 3,
        preview: 'I can help you search our Provider Directory...',
      },
    ];
  }
  return [];
}

export async function getConversation(id: string): Promise<Conversation | null> {
  if (USE_MOCK) {
    return {
      id,
      title: 'What is anxiety?',
      messages: [
        {
          id: 'msg-1',
          role: 'user',
          content: 'What is anxiety?',
          timestamp: new Date(Date.now() - 1000 * 60 * 35),
        },
        {
          id: 'msg-2',
          role: 'assistant',
          content: MOCK_RESPONSES.anxiety,
          timestamp: new Date(Date.now() - 1000 * 60 * 34),
          sources: [
            {
              id: 's1',
              title: 'Understanding Anxiety Disorders',
              url: '/learn/anxiety-stress/understanding-anxiety-disorders',
              snippet: "Anxiety is your brain's natural alarm system...",
              type: 'article',
            },
            {
              id: 's2',
              title: 'Breathwork for Anxiety',
              url: '/tools/breathwork',
              snippet: 'Evidence-based breathing techniques...',
              type: 'tool',
            },
          ],
          suggestedFollowUps: [
            'What are grounding techniques?',
            'How do I know if my anxiety needs professional help?',
            'Tell me about cognitive behavioral therapy',
          ],
        },
      ],
      createdAt: new Date(Date.now() - 1000 * 60 * 35),
      updatedAt: new Date(Date.now() - 1000 * 60 * 30),
      messageCount: 2,
    };
  }
  return null;
}

export async function deleteConversation(_id: string): Promise<boolean> {
  if (USE_MOCK) return true;
  return true;
}
