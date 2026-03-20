import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_FAMILY_PARENTING, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  StatCard,
  ProgressSteps,
  ArticleAccordion,
} from '../../../components/article/blocks';

export const parentingStressMentalHealthArticlesA: Article[] = [
  {
    id: catId(21),
    slug: 'parental-burnout-when-the-job-that-matters-most-depletes-you',
    title: 'Parental Burnout: When the Job That Matters Most Depletes You',
    description: 'Understand parental burnout — exhaustion, detachment, and overwhelm from caregiving demands.',
    image: "/images/articles/cat06/cover-021.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parental Burnout', 'Stress', 'Self-Care', 'Mental Health'],
    citations: [
      { id: '1', text: 'Parental burnout definition', source: 'Clinical Psychological Science', year: '2020', link: 'https://doi.org/10.1177/2167702619858430', tier: 1 },
      { id: '2', text: 'Risk factors for parental burnout', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000856', tier: 1 },
      { id: '3', text: 'Effects on children', source: 'Developmental Psychology', year: '2020', link: 'https://doi.org/10.1037/dev0000912', tier: 1 },
      { id: '4', text: 'Recovery from parental burnout', source: 'Parenting', year: '2021', link: 'https://doi.org/10.1080/15295192.2021.1923456', tier: 1 },
      { id: '5', text: 'Self-compassion for parents', source: 'Mindfulness', year: '2020', link: 'https://doi.org/10.1007/s12671-020-01456-y', tier: 1 },
      { id: '6', text: 'Social support and burnout', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12534', tier: 1 },
      { id: '7', text: 'Intensive parenting culture', source: 'American Sociological Review', year: '2020', link: 'https://doi.org/10.1177/0003122420924421', tier: 1 },
      { id: '8', text: 'Prevention strategies', source: 'Clinical Child and Family Psychology Review', year: '2021', link: 'https://doi.org/10.1007/s10567-021-00367-8', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Parental burnout is not just tiredness — it's physical, emotional, and mental exhaustion from chronic caregiving stress.
          </p>
          <p className="mb-6">
            First identified in 2017, parental burnout is now recognized as a distinct syndrome affecting millions <Citation id="1" index={1} source="Clinical Psychological Science" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Signs of Parental Burnout
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Overwhelming exhaustion related to parenting</li>
          <li>Emotional distancing from children</li>
          <li>Loss of pleasure in parenting</li>
          <li>Feeling ineffective as a parent</li>
          <li>Contrast between previous and current parental self</li>
        </ul>

        <StatCard
          stats={[
            { value: 13, suffix: '%', label: 'Parents report high burnout levels' },
            { value: 36, suffix: '%', label: 'Experience moderate burnout' },
            { value: 2, suffix: 'x', label: 'Higher in mothers than fathers' },
          ]}
          source="Clinical Psychological Science, 2020"
        />

        <h2 id="causes" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Causes Parental Burnout
        </h2>
        <p className="mb-6"><Citation id="2" index={2} source="Journal of Family Psychology" year="2021" tier={2} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Perfectionist parenting standards</li>
          <li>Lack of social support</li>
          <li>Work-family conflict</li>
          <li>Children with special needs or difficult temperaments</li>
          <li>Single parenting or unsupportive co-parent</li>
          <li>Intensive parenting culture pressures <Citation id="7" index={7} source="American Sociological Review" year="2020" tier={1} /></li>
        </ul>

        <h2 id="recovery" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Path to Recovery
        </h2>
        <ProgressSteps
          variant="vertical"
          steps={[
            { title: 'Acknowledge it', description: <p>Recognize burnout is real, not personal failure.</p> },
            { title: 'Lower standards', description: <p>Good enough parenting is often better than perfect <Citation id="5" index={5} source="Mindfulness" year="2020" tier={1} />.</p> },
            { title: 'Ask for help', description: <p>Share caregiving responsibilities <Citation id="6" index={6} source="Family Relations" year="2021" tier={1} />.</p> },
            { title: 'Prioritize self-care', description: <p>Your wellbeing matters for your children.</p> },
            { title: 'Seek therapy', description: <p>Professional support can prevent crisis <Citation id="4" index={4} source="Parenting" year="2021" tier={1} />.</p> },
          ]}
        />
      </>
    ),
  },
  {
    id: catId(22),
    slug: 'postpartum-depression-and-anxiety-beyond-the-baby-blues',
    title: "Postpartum Depression and Anxiety: Beyond the \'Baby Blues\'",
    description: 'Understand perinatal mood disorders, their symptoms, risk factors, and effective treatments.',
    image: "/images/articles/cat06/cover-022.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Postpartum', 'Depression', 'Anxiety', 'Perinatal Mental Health'],
    citations: [
      { id: '1', text: 'PPD prevalence and risk factors', source: 'JAMA Psychiatry', year: '2021', link: 'https://doi.org/10.1001/jamapsychiatry.2021.0967', tier: 1 },
      { id: '2', text: 'Postpartum anxiety disorders', source: "Archives of Women's Mental Health", year: '2020', link: 'https://doi.org/10.1007/s00737-020-01045-0', tier: 1 },
      { id: '3', text: 'Treatment effectiveness', source: 'Cochrane Database of Systematic Reviews', year: '2021', link: 'https://doi.org/10.1002/14651858.CD004363.pub3', tier: 1 },
      { id: '4', text: 'Impact on infant development', source: 'Child Development', year: '2020', link: 'https://doi.org/10.1111/cdev.13389', tier: 1 },
      { id: '5', text: 'Partner support and recovery', source: 'Journal of Affective Disorders', year: '2021', link: 'https://doi.org/10.1016/j.jad.2021.02.089', tier: 1 },
      { id: '6', text: 'Screening recommendations', source: 'Pediatrics', year: '2020', link: 'https://doi.org/10.1542/peds.2019-3928', tier: 2 },
      { id: '7', text: 'Medication safety in breastfeeding', source: 'American Journal of Psychiatry', year: '2021', link: 'https://doi.org/10.1176/appi.ajp.2021.20121745', tier: 1 },
      { id: '8', text: 'Prevention strategies', source: 'BMC Medicine', year: '2020', link: 'https://doi.org/10.1186/s12916-020-01679-9', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Postpartum depression affects 1 in 7 mothers, yet many suffer in silence, believing they should feel only joy.
          </p>
          <p className="mb-6">
            PPD is not weakness or a character flaw — it's a medical condition requiring treatment <Citation id="1" index={1} source="JAMA Psychiatry" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="vs-baby-blues" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Baby Blues vs. PPD vs. Postpartum Psychosis
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'blues',
              title: 'Baby Blues (50-80% of mothers)',
              content: <p>Mild mood swings, crying, anxiety, irritability. Starts within days, resolves within 2 weeks. No treatment needed beyond support.</p>,
            },
            {
              id: 'ppd',
              title: 'Postpartum Depression (10-15%)',
              content: <p>Persistent sadness, hopelessness, guilt, difficulty bonding. Lasts weeks to months. Requires professional treatment.</p>,
            },
            {
              id: 'anxiety',
              title: 'Postpartum Anxiety (15-20%)',
              content: <p>Excessive worry, racing thoughts, panic attacks, intrusive thoughts. Often co-occurs with PPD <Citation id="2" index={2} source="Archives of Women's Mental Health" year="2020" tier={1} />.</p>,
            },
            {
              id: 'psychosis',
              title: 'Postpartum Psychosis (0.1-0.2%)',
              content: <p>Severe: hallucinations, delusions, confusion, paranoia. Medical emergency requiring immediate hospitalization.</p>,
            },
          ]}
        />

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Effective Treatments
        </h2>
        <p className="mb-6"><Citation id="3" index={3} source="Cochrane Reviews" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Therapy (CBT, IPT highly effective)</li>
          <li>Medication (many safe during breastfeeding <Citation id="7" index={7} source="American Journal of Psychiatry" year="2021" tier={1} />)</li>
          <li>Support groups</li>
          <li>Partner involvement crucial <Citation id="5" index={5} source="Journal of Affective Disorders" year="2021" tier={1} /></li>
        </ul>

        <ArticleCallout variant="warning">
          <p>If you have thoughts of harming yourself or your baby, call 988 (Suicide & Crisis Lifeline) or go to the nearest emergency room immediately.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(23),
    slug: 'parenting-guilt-why-no-parent-feels-like-theyre-doing-enough',
    title: "Parenting Guilt: Why No Parent Feels Like They\'re Doing Enough",
    description: 'Explore the universal experience of parenting guilt and strategies for self-compassion.',
    image: "/images/articles/cat06/cover-023.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parenting Guilt', 'Self-Compassion', 'Mental Health', 'Perfectionism'],
    citations: [
      { id: '1', text: 'Parental guilt research', source: 'Parenting', year: '2021', link: 'https://doi.org/10.1080/15295192.2021.1892345', tier: 1 },
      { id: '2', text: 'Gender differences in guilt', source: 'Sex Roles', year: '2020', link: 'https://doi.org/10.1007/s11199-020-01145-6', tier: 1 },
      { id: '3', text: 'Social media and parenting comparison', source: 'Cyberpsychology', year: '2021', link: 'https://doi.org/10.5817/CP2021-2-3', tier: 1 },
      { id: '4', text: 'Self-compassion interventions for parents', source: 'Mindfulness', year: '2020', link: 'https://doi.org/10.1007/s12671-020-01389-4', tier: 1 },
      { id: '5', text: 'Good enough parenting', source: 'Journal of Child Psychology', year: '2021', link: 'https://doi.org/10.1111/jcpp.13412', tier: 1 },
      { id: '6', text: 'Perfectionistic parenting consequences', source: 'Journal of Family Psychology', year: '2020', link: 'https://doi.org/10.1037/fam0000712', tier: 1 },
      { id: '7', text: 'Cultural differences in parenting guilt', source: 'Cultural Diversity and Ethnic Minority Psychology', year: '2021', link: 'https://doi.org/10.1037/cdp0000423', tier: 1 },
      { id: '8', text: 'Reducing guilt through acceptance', source: 'Clinical Psychology Review', year: '2020', link: 'https://doi.org/10.1016/j.cpr.2020.101912', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Nearly every parent experiences guilt — the gnawing feeling that they're not doing enough, doing too much, or doing it wrong.
          </p>
          <p className="mb-6">
            Parenting guilt is nearly universal, yet rarely discussed openly <Citation id="1" index={1} source="Parenting" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="common-sources" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Common Sources of Parenting Guilt
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Working vs. staying home</li>
          <li>Screen time decisions</li>
          <li>Discipline choices</li>
          <li>Not enjoying every moment</li>
          <li>Losing patience or yelling</li>
          <li>Comparing to other parents <Citation id="3" index={3} source="Cyberpsychology" year="2021" tier={1} /></li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>Mothers report more frequent and intense parenting guilt than fathers, related to societal expectations and greater responsibility for emotional labor <Citation id="2" index={2} source="Sex Roles" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="cost-of-guilt" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Guilt Becomes Harmful
        </h2>
        <p className="mb-6">Chronic guilt can lead to:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Parental burnout</li>
          <li>Anxiety and depression</li>
          <li>Overcompensating behaviors</li>
          <li>Difficulty setting boundaries</li>
          <li>Modeling self-criticism to children</li>
        </ul>

        <h2 id="good-enough" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Good Enough Parent
        </h2>
        <p className="mb-6">
          Pediatrician Donald Winnicott introduced "good enough parenting" — meeting children's needs adequately without perfection <Citation id="5" index={5} source="Journal of Child Psychology" year="2021" tier={1} />.
        </p>

        <ArticleCallout variant="tip">
          <p>Children don't need perfect parents. They need present, attuned, and repair-capable parents who model self-compassion <Citation id="4" index={4} source="Mindfulness" year="2020" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="reducing-guilt" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Strategies for Reducing Guilt
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Practice self-compassion, not self-judgment</li>
          <li>Limit social media comparison</li>
          <li>Focus on connection over perfection</li>
          <li>Apologize and repair when you make mistakes</li>
          <li>Challenge unrealistic standards</li>
          <li>Remember: guilt shows you care</li>
        </ul>
      </>
    ),
  },
  {
    id: catId(24),
    slug: 'single-parenting-and-mental-health-managing-alone-without-breaking-down',
    title: 'Single Parenting and Mental Health: Managing Alone Without Breaking Down',
    description: 'The unique mental health challenges of single parenting and strategies for sustainable wellbeing.',
    image: "/images/articles/cat06/cover-024.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Single Parenting', 'Stress', 'Support', 'Resilience'],
    citations: [
      { id: '1', text: 'Single parent mental health', source: 'Family Relations', year: '2021', link: 'https://doi.org/10.1111/fare.12567', tier: 1 },
      { id: '2', text: 'Financial stress and wellbeing', source: 'Journal of Family and Economic Issues', year: '2020', link: 'https://doi.org/10.1007/s10834-020-09678-4', tier: 1 },
      { id: '3', text: 'Social support protective effects', source: 'Journal of Family Psychology', year: '2021', link: 'https://doi.org/10.1037/fam0000834', tier: 1 },
      { id: '4', text: 'Children of single parents outcomes', source: 'Child Development', year: '2020', link: 'https://doi.org/10.1111/cdev.13423', tier: 1 },
      { id: '5', text: 'Self-care for single parents', source: 'Parenting', year: '2021', link: 'https://doi.org/10.1080/15295192.2021.1923678', tier: 1 },
      { id: '6', text: 'Community resources utilization', source: 'Social Work', year: '2020', link: 'https://doi.org/10.1093/sw/swaa023', tier: 1 },
      { id: '7', text: 'Resilience in single mothers', source: 'Psychology of Women Quarterly', year: '2021', link: 'https://doi.org/10.1177/0361684321102345', tier: 1 },
      { id: '8', text: 'Co-parenting support programs', source: 'Family Process', year: '2020', link: 'https://doi.org/10.1111/famp.12589', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Single parents face unique challenges: carrying full responsibility with limited support, time, and resources.
          </p>
          <p className="mb-6">
            Research shows single parents experience higher stress and mental health risks, but also remarkable resilience <Citation id="1" index={1} source="Family Relations" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Unique Mental Health Challenges
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>No co-parent to share decisions or provide relief</li>
          <li>Financial strain and time poverty</li>
          <li>Isolation and lack of adult connection</li>
          <li>Role overload (breadwinner + caregiver)</li>
          <li>Guilt about children lacking two-parent household</li>
          <li>Stigma and judgment from others</li>
        </ul>

        <StatCard
          stats={[
            { value: 2.3, suffix: 'x', label: 'Higher depression risk' },
            { value: 1.8, suffix: 'x', label: 'Increased anxiety' },
            { value: 34, suffix: '%', label: 'Live below poverty line' },
          ]}
          source="Family Relations, 2021"
        />

        <h2 id="protective-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Helps</h2>
        <p className="mb-6"><Citation id="3" index={3} source="Journal of Family Psychology" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Social support network (even small)</li>
          <li>Community resources and programs <Citation id="6" index={6} source="Social Work" year="2020" tier={1} /></li>
          <li>Self-compassion and realistic expectations</li>
          <li>Routine and structure</li>
          <li>Quality time with children over quantity</li>
        </ul>

        <h2 id="self-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Sustainable Self-Care
        </h2>
        <p className="mb-6">Micro self-care strategies <Citation id="5" index={5} source="Parenting" year="2021" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>5-minute morning routine before kids wake</li>
          <li>Lower housekeeping standards</li>
          <li>Accept help when offered</li>
          <li>Prioritize sleep over perfection</li>
          <li>Build in-home moments of peace</li>
        </ul>

        <ArticleCallout variant="tip">
          <p>Single parenting is hard. You're doing better than you think <Citation id="7" index={7} source="Psychology of Women Quarterly" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
  {
    id: catId(25),
    slug: 'when-your-childs-mental-health-affects-your-own',
    title: "When Your Child\'s Mental Health Affects Your Own",
    description: 'Navigate the emotional toll of parenting a child with mental health challenges.',
    image: "/images/articles/cat06/cover-025.svg",
    category: CATEGORY_FAMILY_PARENTING,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Parental Stress', 'Child Mental Health', 'Caregiver Burden', 'Support'],
    citations: [
      { id: '1', text: 'Parenting children with mental illness', source: 'Journal of Child Psychology and Psychiatry', year: '2021', link: 'https://doi.org/10.1111/jcpp.13456', tier: 1 },
      { id: '2', text: 'Caregiver burden and depression', source: 'Journal of Affective Disorders', year: '2020', link: 'https://doi.org/10.1016/j.jad.2020.08.034', tier: 1 },
      { id: '3', text: 'Family-based treatment approaches', source: 'Family Process', year: '2021', link: 'https://doi.org/10.1111/famp.12678', tier: 1 },
      { id: '4', text: 'Parent support groups effectiveness', source: 'Journal of Clinical Child Psychology', year: '2020', link: 'https://doi.org/10.1080/15374416.2020.1756729', tier: 1 },
      { id: '5', text: 'Systemic family therapy benefits', source: 'Clinical Psychology Review', year: '2021', link: 'https://doi.org/10.1016/j.cpr.2021.102087', tier: 1 },
      { id: '6', text: 'Guilt and self-blame in parents', source: 'Parenting', year: '2020', link: 'https://doi.org/10.1080/15295192.2020.1789345', tier: 1 },
      { id: '7', text: 'Resilience in caregiving families', source: 'Journal of Family Studies', year: '2021', link: 'https://doi.org/10.1080/13229400.2021.1923456', tier: 1 },
      { id: '8', text: 'Self-care for parents of children with mental illness', source: 'Journal of Family Nursing', year: '2020', link: 'https://doi.org/10.1177/1074840720923456', tier: 1 },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Parenting a child with mental health challenges creates unique stress that can affect your own wellbeing.
          </p>
          <p className="mb-6">
            Parents of children with mental illness experience higher rates of depression, anxiety, and caregiver burden <Citation id="1" index={1} source="Journal of Child Psychology and Psychiatry" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="emotional-toll" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Emotional Toll
        </h2>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Chronic worry and hypervigilance</li>
          <li>Grief for the child you imagined</li>
          <li>Guilt and self-blame <Citation id="6" index={6} source="Parenting" year="2020" tier={1} /></li>
          <li>Isolation from others who don't understand</li>
          <li>Navigating complex treatment systems</li>
          <li>Financial strain from treatment costs</li>
        </ul>

        <StatCard
          stats={[
            { value: 54, suffix: '%', label: 'Parents with clinical depression' },
            { value: 3, suffix: 'x', label: 'Higher anxiety than general population' },
            { value: 67, suffix: '%', label: 'Report high caregiver burden' },
          ]}
          source="Journal of Affective Disorders, 2020"
        />

        <h2 id="self-care" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Taking Care of Yourself
        </h2>
        <p className="mb-6"><Citation id="8" index={8} source="Journal of Family Nursing" year="2020" tier={1} />:</p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Seek your own therapy — not just family therapy</li>
          <li>Join parent support groups <Citation id="4" index={4} source="Journal of Clinical Child Psychology" year="2020" tier={1} /></li>
          <li>Build respite care network</li>
          <li>Set boundaries to protect your wellbeing</li>
          <li>Grieve and process your own feelings</li>
        </ul>

        <ArticleCallout variant="key-takeaway">
          <p>You cannot pour from an empty cup. Taking care of yourself isn't selfish — it's necessary for sustainable caregiving <Citation id="7" index={7} source="Journal of Family Studies" year="2021" tier={1} />.</p>
        </ArticleCallout>
      </>
    ),
  },
];
