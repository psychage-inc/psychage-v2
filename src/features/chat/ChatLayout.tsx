import { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { useChat } from './hooks/useChat';
import ChatSidebar from './ChatSidebar';
import ChatMain from './ChatMain';

export default function ChatLayout() {
  const {
    messages,
    isStreaming,
    activeConversationId,
    sendMessage,
    retryLastMessage,
    startNewChat,
    loadConversation,
    stopStreaming,
  } = useChat();

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isDesktop, setIsDesktop] = useState(false);

  // Track screen size
  useEffect(() => {
    const check = () => setIsDesktop(window.innerWidth >= 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <div className="h-[calc(100dvh-5rem)] flex overflow-hidden bg-white dark:bg-slate-950">
      {/* Desktop sidebar */}
      {isDesktop && (
        <div className="w-[15rem] xl:w-[17.5rem] shrink-0 border-r border-slate-200 dark:border-slate-800">
          <ChatSidebar
            activeConversationId={activeConversationId}
            onNewChat={startNewChat}
            onSelectConversation={loadConversation}
          />
        </div>
      )}

      {/* Mobile sidebar drawer */}
      <AnimatePresence>
        {!isDesktop && sidebarOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-40 bg-black/30"
              onClick={() => setSidebarOpen(false)}
            />
            {/* Drawer */}
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ duration: 0.25, ease: 'easeOut' }}
              className="fixed inset-y-0 left-0 z-50 w-[min(280px,75vw)] shadow-xl"
            >
              <ChatSidebar
                activeConversationId={activeConversationId}
                onNewChat={startNewChat}
                onSelectConversation={loadConversation}
                onClose={() => setSidebarOpen(false)}
                isMobile
              />
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main chat area */}
      <ChatMain
        messages={messages}
        isStreaming={isStreaming}
        onSend={sendMessage}
        onRetry={retryLastMessage}
        onStop={stopStreaming}
        onNewChat={startNewChat}
        onToggleSidebar={() => setSidebarOpen(true)}
        showMobileMenu={!isDesktop}
      />
    </div>
  );
}
