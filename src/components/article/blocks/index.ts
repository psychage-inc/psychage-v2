// Article Block Components — reusable interactive elements for article content
export { ArticleCallout } from './ArticleCallout';
export { ArticleChart } from './ArticleChart';
export { ComparisonTable } from './ComparisonTable';
export { StatCard } from './StatCard';
export { ArticleAccordion } from './ArticleAccordion';
export { ArticleTabs } from './ArticleTabs';
export { QuoteBlock } from './QuoteBlock';
export { HighlightBox } from './HighlightBox';
export { ProgressSteps } from './ProgressSteps';
export { BeforeAfter } from './BeforeAfter';
export { MythVsFactBlock } from './MythVsFactBlock';
export { RelatedToolsBlock } from './RelatedToolsBlock';
export { DiagramBlock } from './DiagramBlock';

// Re-export components from parent article directory for backward compatibility
export { default as KeyFacts } from '../KeyFacts';
export { default as SummaryBox } from '../SummaryBox';
export { default as PracticalExercise } from '../PracticalExercise';
export { default as SparkMoment } from '../SparkMoment';

// Types
export type { CalloutVariant, ArticleCalloutProps } from './ArticleCallout';
export type { ChartType, ChartDataPoint, ArticleChartProps } from './ArticleChart';
export type { ComparisonItem, ComparisonTableProps } from './ComparisonTable';
export type { StatItem, StatCardProps } from './StatCard';
export type { AccordionItem, ArticleAccordionProps } from './ArticleAccordion';
export type { TabItem, ArticleTabsProps } from './ArticleTabs';
export type { QuoteBlockProps } from './QuoteBlock';
export type { HighlightBoxProps } from './HighlightBox';
export type { StepItem, ProgressStepsProps } from './ProgressSteps';
export type { BeforeAfterPanel, BeforeAfterProps } from './BeforeAfter';
export type { MythVsFactBlockProps } from './MythVsFactBlock';
export type { RelatedToolsBlockProps, RelatedTool } from './RelatedToolsBlock';
export type { DiagramBlockProps, DiagramType, DiagramNode, DiagramConnection } from './DiagramBlock';

// Re-exported types from parent article directory
export type { KeyFact } from '../KeyFacts';
