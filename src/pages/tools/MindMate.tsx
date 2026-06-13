import { Helmet } from 'react-helmet-async';
import ChatLayout from '@/features/chat/ChatLayout';

export default function MindMatePage() {
  return (
    <>
      <Helmet>
        <title>Psychage AI — Psychage</title>
        <meta
          name="description"
          content="Chat with Psychage AI, your intelligent mental health education companion. Get evidence-based answers, discover curated resources, and explore mental wellness topics 24/7."
        />
      </Helmet>
      <ChatLayout />
    </>
  );
}
