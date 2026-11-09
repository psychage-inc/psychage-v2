// Preview-only route subtree. Mounted in App.tsx at /preview/conditions/schizophrenia/*,
// registered ONLY when import.meta.env.VITE_PREVIEW_MODE === 'true' (Layer-1 isolation). The
// whole tree lives behind the token gate (Layer-2). Default export so App.tsx can lazy-import it.
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { PreviewGate } from './PreviewGate';
import ConditionHubPage from './ConditionHubPage';
import ConditionPartPage from './ConditionPartPage';

export default function PreviewConditionRoutes() {
    return (
        <PreviewGate>
            <Routes>
                <Route index element={<ConditionHubPage />} />
                <Route path=":slug" element={<ConditionPartPage />} />
            </Routes>
        </PreviewGate>
    );
}
