import { Node, mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer } from '@tiptap/react';
import CalloutBlockView from '../node-views/CalloutBlockView';

export type CalloutVariant = 'info' | 'warning' | 'tip' | 'note';

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    calloutBlock: {
      insertCallout: (variant?: CalloutVariant) => ReturnType;
    };
  }
}

export const CalloutBlock = Node.create({
  name: 'calloutBlock',
  group: 'block',
  content: 'block+',
  defining: true,

  addAttributes() {
    return {
      variant: {
        default: 'info' as CalloutVariant,
        parseHTML: (element) => (element.getAttribute('data-callout-variant') || 'info') as CalloutVariant,
        renderHTML: (attributes) => ({
          'data-callout-variant': attributes.variant,
        }),
      },
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-callout]' }];
  },

  renderHTML({ HTMLAttributes }) {
    return ['div', mergeAttributes(HTMLAttributes, { 'data-callout': '' }), 0];
  },

  addNodeView() {
    return ReactNodeViewRenderer(CalloutBlockView);
  },

  addCommands() {
    return {
      insertCallout:
        (variant: CalloutVariant = 'info') =>
        ({ commands }) => {
          return commands.insertContent({
            type: this.name,
            attrs: { variant },
            content: [{ type: 'paragraph' }],
          });
        },
    };
  },
});

export default CalloutBlock;
