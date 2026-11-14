import { Helmet } from 'react-helmet-async';
import { useNavigate } from 'react-router-dom';
import ChatLayout from '@/features/chat/ChatLayout';
import { MindMateConsentGate } from '@/components/ai/MindMateConsentGate';

export default function MindMatePage() {
  const navigate = useNavigate();
  return (
    <>
      <Helmet>
        <title>Psychage AI — Psychage</title>
        <meta
          name="description"
          content="Chat with Psychage AI, your intelligent mental health education companion. Get evidence-based answers, discover curated resources, and explore mental wellness topics 24/7."
        />
      </Helmet>
      <MindMateConsentGate onDecline={() => navigate('/tools')}>
        {(onConsentLost) => <ChatLayout onConsentLost={onConsentLost} />}
      </MindMateConsentGate>
    </>
  );
}
