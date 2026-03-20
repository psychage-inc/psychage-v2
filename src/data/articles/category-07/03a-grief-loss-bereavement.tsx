import React from 'react';
import { Article } from '../../../types';
import Citation from '../../../components/article/Citation';
import { CATEGORY_DEPRESSION_GRIEF, PRIMARY_AUTHOR, CLINICAL_REVIEWER, catId } from './_shared';
import {
  ArticleCallout,
  ArticleChart,
  ComparisonTable,
  StatCard,
  ArticleAccordion,
  QuoteBlock,
  ProgressSteps,
} from '../../../components/article/blocks';

export const griefLossArticlesA: Article[] = [
  {
    id: catId(21),
    slug: 'what-is-grief-universal-experience',
    title: 'What Is Grief? Understanding the Universal Experience of Loss',
    description: `Grief is the natural response to loss—any kind of loss. Learn what grief is, its many forms, why it's essential, and what healthy grieving looks like.`,
    image: '/images/articles/cat07/cover-021.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief', 'Loss', 'Bereavement', 'Mourning'],
    citations: [
      {
        id: '1',
        text: 'The nature of grief: Evolution and individual differences',
        source: 'Psychological Review',
        year: '2020',
        link: 'https://doi.org/10.1037/rev0000180',
        tier: 1,
      },
      {
        id: '2',
        text: 'Grief: A comprehensive overview',
        source: 'Annual Review of Clinical Psychology',
        year: '2021',
        link: 'https://doi.org/10.1146/annurev-clinpsy-081219-110402',
        tier: 1,
      },
      {
        id: '3',
        text: 'The neurobiology of grief and loss',
        source: 'Neuroscience & Biobehavioral Reviews',
        year: '2019',
        link: 'https://doi.org/10.1016/j.neubiorev.2019.02.003',
        tier: 1,
      },
      {
        id: '4',
        text: 'Disenfranchised grief: Recognizing hidden sorrow',
        source: 'Death Studies',
        year: '2020',
        link: 'https://doi.org/10.1080/07481187.2019.1586799',
        tier: 1,
      },
      {
        id: '5',
        text: 'Grief across cultures: A review',
        source: 'Culture & Psychology',
        year: '2020',
        link: 'https://doi.org/10.1177/1354067X19898677',
        tier: 1,
      },
      {
        id: '6',
        text: 'The adaptive function of prolonged grief reactions',
        source: 'Behavioral and Brain Sciences',
        year: '2018',
        link: 'https://doi.org/10.1017/S0140525X18000717',
        tier: 1,
      },
      {
        id: '7',
        text: 'Grief: Facts and Myths',
        source: 'National Alliance for Grieving Children',
        year: '2023',
        link: 'https://childrengrieve.org/resources/grief-facts',
        tier: 3,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Grief is love with nowhere to go. It's the price we pay for attachment, the shadow that meaningful connection casts. Every person who has loved will grieve. It's not a disorder, not something to 'get over"—it's a fundamental human experience, as universal as joy or fear.
          </p>
          <p className="mb-6">
            Grief is the natural psychological, emotional, and physical response to loss <Citation id="2" index={2} source="Annual Review of Clinical Psychology" year="2021" tier={1} />. While we most often associate grief with death, it encompasses all forms of loss: relationships, health, identity, safety, dreams, roles, and possibilities. Grieving is not passive suffering—it's active processing, the psychological work of adjusting to a world that no longer contains what was lost <Citation id="1" index={1} source="Psychological Review" year="2020" tier={1} />.
          </p>
        </div>

        <h2 id="what-we-grieve" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What We Grieve
        </h2>
        <p className="mb-6">
          Grief is not limited to death:
        </p>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'death',
              title: 'Death of a Loved One',
              content: (
                <p>The most recognized form of grief. Loss of a person who was part of your world—parent, partner, child, sibling, friend, pet.</p>
              ),
            },
            {
              id: 'relationships',
              title: 'Relationship Loss',
              content: (
                <p>Divorce, breakups, estrangement, friendship endings. The person still lives, but the relationship is gone—sometimes creating ambiguous grief.</p>
              ),
            },
            {
              id: 'health',
              title: 'Loss of Health or Ability',
              content: (
                <p>Chronic illness diagnosis, disability, loss of function, infertility. Grieving the life or body you expected to have.</p>
              ),
            },
            {
              id: 'identity',
              title: 'Loss of Identity or Role',
              content: (
                <p>Retirement, empty nest, job loss, loss of career identity. Who you were no longer exists, and you must discover who you are now.</p>
              ),
            },
            {
              id: 'dreams',
              title: 'Loss of Dreams or Expected Futures',
              content: (
                <p>Unfulfilled dreams, paths not taken, opportunities missed. Grieving the life that didn't happen.</p>
              ),
            },
            {
              id: 'safety',
              title: 'Loss of Safety or Innocence',
              content: (
                <p>After trauma, assault, or betrayal. Loss of trust in the world or others as safe.</p>
              ),
            },
            {
              id: 'home',
              title: 'Loss of Home or Place',
              content: (
                <p>Displacement, immigration, moving. Losing the place that held your memories and sense of belonging.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="did-you-know">
          <p>Many losses are <strong>disenfranchised</strong>—not socially recognized or validated <Citation id="4" index={4} source="Death Studies" year="2020" tier={1} />. Miscarriage, pet loss, loss of estranged relationships, or losses related to stigmatized identities often receive little social support, making grief more isolating.</p>
        </ArticleCallout>

        <h2 id="manifestations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          How Grief Manifests
        </h2>
        <p className="mb-6">
          Grief is not just sadness—it's a whole-person experience affecting emotions, body, thoughts, and behavior:
        </p>

        <ComparisonTable
          title="Manifestations of Grief"
          columns={['Domain', 'Common Experiences']}
          items={[
            {
              feature: 'Emotional',
              values: ['Sadness, yearning, anger, guilt, relief, numbness, loneliness, anxiety, fear, regret, love'],
            },
            {
              feature: 'Physical',
              values: ['Fatigue, sleep disturbance, appetite changes, physical aches, tightness in chest/throat, weakness, immune suppression'],
            },
            {
              feature: 'Cognitive',
              values: ['Disbelief, confusion, difficulty concentrating, preoccupation with loss, searching/rumination, sense of presence of deceased'],
            },
            {
              feature: 'Behavioral',
              values: ['Crying, withdrawal, seeking connection, visiting places associated with loss, carrying reminders, avoiding reminders, changes in routine'],
            },
            {
              feature: 'Spiritual/Existential',
              values: ['Questioning meaning, searching for purpose, exploring beliefs about death/afterlife, feeling disconnected from faith or finding comfort in it'],
            },
          ]}
          highlightColumn={0}
        />

        <h2 id="purpose" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Purpose of Grief
        </h2>
        <p className="mb-6">
          Grief is not pathological—it serves adaptive functions <Citation id="6" index={6} source="Behavioral and Brain Sciences" year="2018" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Processing reality of loss',
              description: (
                <p>Grief helps integrate the fact that the loss is real and permanent. Early disbelief gradually gives way to acceptance through repeated confrontation with the absence.</p>
              ),
            },
            {
              title: 'Emotional processing',
              description: (
                <p>Allows expression and release of painful emotions. Suppressed grief can manifest as physical symptoms, depression, or relationship problems.</p>
              ),
            },
            {
              title: 'Meaning-making',
              description: (
                <p>Searching for meaning in the loss, constructing a narrative that makes sense of suffering, finding purpose or growth.</p>
              ),
            },
            {
              title: 'Reorganizing identity and life',
              description: (
                <p>Adapting to a world without what was lost. Discovering who you are now, building new routines, creating new meaning.</p>
              ),
            },
            {
              title: 'Continuing bonds',
              description: (
                <p>Finding ways to maintain connection to what was lost while moving forward—memories, rituals, internalized values, legacy.</p>
              ),
            },
          ]}
        />

        <h2 id="myths" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Myths About Grief
        </h2>

        <ArticleCallout variant="warning" title="Common Misconceptions">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>Myth: Grief follows predictable stages.</strong> Reality: Grief is not linear. You don't move through orderly stages; you oscillate between different states.</li>
            <li><strong>Myth: You should be "over it" by a certain time.</strong> Reality: There's no timeline. Some losses are never "gotten over"—you learn to carry them.</li>
            <li><strong>Myth: Strong grief means weak coping.</strong> Reality: Intense grief often reflects the depth of love and connection. It's not weakness.</li>
            <li><strong>Myth: You need "closure."</strong> Reality: Closure is often impossible and unnecessary. You learn to live with the loss, not close it.</li>
            <li><strong>Myth: Grief is only about sadness.</strong> Reality: Grief encompasses anger, guilt, relief, anxiety, even joy in memories. It's complex.</li>
            <li><strong>Myth: Avoiding grief prevents pain.</strong> Reality: Avoided grief doesn't disappear—it goes underground and emerges in other ways.</li>
          </ul>
        </ArticleCallout>

        <h2 id="healthy-grieving" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Healthy Grieving Looks Like
        </h2>
        <p className="mb-6">
          There's no "right way" to grieve, but research identifies processes associated with healthy adaptation <Citation id="2" index={2} source="Annual Review of Clinical Psychology" year="2021" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Allowing yourself to feel:</strong> Not suppressing emotions, but also not forcing them. Emotions come in waves—let them.</li>
          <li><strong>Oscillating between confrontation and avoidance:</strong> Sometimes facing the loss, sometimes taking breaks. Both are necessary.</li>
          <li><strong>Finding meaning:</strong> Making sense of the loss in a way that fits your values and beliefs.</li>
          <li><strong>Maintaining connections:</strong> To the lost person/thing (through memory, ritual) and to the living (social support).</li>
          <li><strong>Adapting identity and life:</strong> Discovering who you are now, what matters now, how to live now.</li>
          <li><strong>Seeking support when needed:</strong> Not suffering in isolation if support would help.</li>
        </ul>

        <h2 id="cultural-context" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Cultural Context
        </h2>
        <p className="mb-6">
          Grief is universal, but its expression is culturally shaped <Citation id="5" index={5} source="Culture & Psychology" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Rituals:</strong> Funerals, wakes, sitting shiva, Day of the Dead—cultures provide structures for grief</li>
          <li><strong>Expression norms:</strong> Some cultures value stoicism, others value open emotional expression</li>
          <li><strong>Beliefs about death:</strong> Religious/spiritual frameworks influence grief experience</li>
          <li><strong>Community vs. individual:</strong> Some cultures grieve communally, others privately</li>
          <li><strong>Duration expectations:</strong> Mourning periods vary widely across cultures</li>
        </ul>

        <QuoteBlock
          quote="Grief is not a disorder, a disease, or a sign of weakness. It is an emotional, physical, and spiritual necessity, the price you pay for love. The only cure for grief is to grieve."
          attribution="Earl Grollman"
          role="Grief counselor and author"
          variant="large"
        />

        <p className="mb-6">
          If you're grieving, know that what you're experiencing is natural and necessary. There's no timeline, no correct way, no point at which you should be 'over it." Grief is not something to overcome—it's something to move through, at your own pace, in your own way. Allow yourself to feel, seek support when needed, and trust that healing doesn't mean forgetting—it means learning to carry the loss while still engaging with life.
        </p>
      </>
    ),
  },

  {
    id: catId(22),
    slug: 'five-stages-model-outdated',
    title: 'The Five Stages Model Is Outdated: How Grief Actually Works',
    description: `The Kübler-Ross five stages model is widely misunderstood and doesn't reflect how most people grieve. Learn what modern grief research actually shows.`,
    image: '/images/articles/cat07/cover-022.svg',
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 6,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Grief Stages', 'Kübler-Ross', 'Grief Process', 'Bereavement'],
    citations: [
      {
        id: '1',
        text: 'On Death and Dying',
        source: 'Elisabeth Kübler-Ross',
        year: '1969',
        link: 'https://www.ekrfoundation.org/5-stages-of-grief',
        tier: 5,
      },
      {
        id: '2',
        text: 'The Kübler-Ross model: Misinterpretations and clinical applications',
        source: 'Death Studies',
        year: '2020',
        link: 'https://doi.org/10.1080/07481187.2019.1648328',
        tier: 1,
      },
      {
        id: '3',
        text: 'Empirical examination of stage theories of grief',
        source: 'JAMA',
        year: '2007',
        link: 'https://doi.org/10.1001/jama.297.7.716',
        tier: 1,
      },
      {
        id: '4',
        text: 'Modern grief theories: A review',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102013',
        tier: 1,
      },
      {
        id: '5',
        text: 'The dual process model of coping with bereavement',
        source: 'Death Studies',
        year: '1999',
        link: 'https://doi.org/10.1080/074811899201046',
        tier: 1,
      },
      {
        id: '6',
        text: 'Continuing bonds and the innovation of grief theory',
        source: 'Death Studies',
        year: '2019',
        link: 'https://doi.org/10.1080/07481187.2018.1456010',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            "You're in denial.", "You'll move to anger next.", "Once you accept it, you'll be done grieving." If you've heard these phrases after a loss, you've encountered the five stages model—and its damaging misapplication. This widely known framework has become grief's most pervasive myth, causing people to feel they're 'doing grief wrong' when they don't experience stages in order or at all.
          </p>
          <p className="mb-6">
            Elisabeth Kübler-Ross's five stages—denial, anger, bargaining, depression, acceptance—were never meant to describe how people grieve <Citation id="1" index={1} source="Elisabeth Kübler-Ross" year="1969" tier={5} />. They described how dying patients sometimes process their own approaching death. The model was misappropriated to bereaved people, oversimplified, and treated as prescriptive <Citation id="2" index={2} source="Death Studies" year="2020" tier={1} />. Modern grief research shows grief is far more complex, non-linear, and individual than stages suggest.
          </p>
        </div>

        <h2 id="what-model-says" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What the Five Stages Model Says
        </h2>

        <ComparisonTable
          title="The Five Stages"
          columns={['Stage', 'Description']}
          items={[
            { feature: '1. Denial', values: [`"This isn't happening." Shock, disbelief, numbness.`] },
            { feature: '2. Anger', values: [`"Why me?" Anger at situation, others, self, or higher power.`] },
            { feature: '3. Bargaining', values: [`"If only..." Attempting to negotiate or reverse the loss.`] },
            { feature: '4. Depression', values: ['Deep sadness, despair, withdrawal.'] },
            { feature: '5. Acceptance', values: ['Coming to terms with reality, finding peace.'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="misapplication" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Problems with the Model
        </h2>

        <ArticleCallout variant="warning" title="Why the Stages Model Is Misleading">
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>It was never meant for bereaved people.</strong> Kübler-Ross studied dying patients processing their own impending death, not people grieving others" deaths.</li>
            <li><strong>Stages aren't sequential.</strong> People don't move through them in order. You can experience anger before denial, acceptance before depression, or cycle through them randomly.</li>
            <li><strong>Not everyone experiences all stages.</strong> Many people never experience anger or bargaining. Some experience emotions not in the model at all (guilt, relief, loneliness).</li>
            <li><strong>Acceptance doesn't mean 'over it."</strong> Accepting a loss doesn't mean you stop grieving or that the pain ends. You can accept and still hurt.</li>
            <li><strong>It creates false expectations.</strong> People judge themselves for "still being in denial" or "stuck in anger," as if grief has a correct progression.</li>
            <li><strong>It oversimplifies a complex process.</strong> Grief is not a linear path with a clear endpoint. It's messy, oscillating, and lifelong.</li>
          </ol>
        </ArticleCallout>

        <h2 id="research-says" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Research Actually Shows
        </h2>
        <p className="mb-6">
          Studies testing the stages model found it doesn't hold up <Citation id="3" index={3} source="JAMA" year="2007" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>No sequential progression:</strong> People do not move through emotions in a predictable order</li>
          <li><strong>Acceptance is not the endpoint:</strong> Most people experience acceptance early and ongoing, not as a final stage</li>
          <li><strong>Multiple emotions coexist:</strong> People feel contradictory emotions simultaneously (sadness and relief, anger and love)</li>
          <li><strong>Highly individual:</strong> Grief manifestations vary enormously based on relationship, loss type, culture, personality, support</li>
          <li><strong>Ongoing process:</strong> Grief doesn't end—it evolves. You don't 'complete' grief; you integrate it into your life</li>
        </ul>

        <h2 id="modern-models" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Modern Grief Models
        </h2>
        <p className="mb-6">
          Contemporary grief research offers more accurate frameworks <Citation id="4" index={4} source="Clinical Psychology Review" year="2021" tier={1} />:
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Dual Process Model',
              description: (
                <div>
                  <p className="mb-4">People oscillate between loss-oriented and restoration-oriented coping <Citation id="5" index={5} source="Death Studies" year="1999" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li><strong>Loss-oriented:</strong> Confronting the loss, feeling grief, processing emotions, yearning</li>
                    <li><strong>Restoration-oriented:</strong> Adapting to life changes, taking breaks from grief, engaging in new activities, building new identity</li>
                  </ul>
                  <p className="mt-4">Healthy grief involves moving back and forth between both—not staying stuck in one. Sometimes you grieve, sometimes you live.</p>
                </div>
              ),
            },
            {
              title: 'Continuing Bonds',
              description: (
                <div>
                  <p className="mb-4">Challenges the idea that you must "let go" to heal <Citation id="6" index={6} source="Death Studies" year="2019" tier={1} />:</p>
                  <ul className="list-disc pl-6 space-y-2">
                    <li>Maintaining connections to deceased (memories, rituals, internalized values) is healthy and normal</li>
                    <li>You don't "get over" profound losses—you learn to carry them while still engaging with life</li>
                    <li>Grief transforms but doesn't disappear</li>
                  </ul>
                </div>
              ),
            },
            {
              title: 'Tasks of Mourning',
              description: (
                <div>
                  <p className="mb-4">Frames grief as active processes rather than passive stages:</p>
                  <ol className="list-decimal pl-6 space-y-2">
                    <li>Accept the reality of the loss</li>
                    <li>Process the pain of grief</li>
                    <li>Adjust to a world without the deceased</li>
                    <li>Find ways to maintain connection while moving forward with life</li>
                  </ol>
                  <p className="mt-4">These are ongoing tasks you work on over time, not stages you complete and leave behind.</p>
                </div>
              ),
            },
          ]}
        />

        <h2 id="what-grief-looks-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Grief Actually Looks Like
        </h2>

        <ArticleCallout variant="key-takeaway">
          <p className="mb-4"><strong>Grief is not:</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>A linear progression through stages</li>
            <li>Something you complete and move on from</li>
            <li>Something with a deadline</li>
            <li>One-size-fits-all</li>
          </ul>
          <p className="mb-4"><strong>Grief is:</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>A wave that comes and goes, sometimes unexpectedly</li>
            <li>Different for everyone, even within the same loss</li>
            <li>Something you learn to carry, not overcome</li>
            <li>A testament to the depth of your love and connection</li>
          </ul>
        </ArticleCallout>

        <QuoteBlock
          quote={`The reality is that you will grieve forever. You will not "get over" the loss of a loved one; you will learn to live with it. You will heal and you will rebuild yourself around the loss you have suffered. You will be whole again but you will never be the same. Nor should you be the same, nor would you want to.`}
          attribution="Elisabeth Kübler-Ross"
          role="Later in her career, clarifying her model"
          variant="large"
        />

        <h2 id="healthier-framework" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          A Healthier Framework
        </h2>
        <p className="mb-6">
          Instead of asking "What stage am I in?" try:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>"What am I feeling right now?"</strong> Name emotions without judging them as right or wrong.</li>
          <li><strong>"Do I need to lean into grief or take a break from it?"</strong> Honor the oscillation between confronting and restoring.</li>
          <li><strong>"How can I maintain connection while moving forward?"</strong> Find ways to carry the loss with you.</li>
          <li><strong>"What support do I need?"</strong> Reach out when you need help, withdraw when you need space.</li>
          <li><strong>"Am I being compassionate with myself?"</strong> There's no timeline, no "should," no correct way.</li>
        </ul>

        <p className="mb-6">
          If you're grieving and don't fit the stages model, you're not doing it wrong—the model is wrong. Your grief is yours. It doesn't have to look like anyone else's. It doesn't have to follow a path. It doesn't have to end. You are allowed to grieve in whatever way feels true to you, for as long as you need. There is no deadline for love.
        </p>
      </>
    ),
  },

  {
    id: catId(23),
    slug: 'dual-process-model-grief',
    title: 'The Dual Process Model: How People Move Between Loss and Restoration',
    description: 'The dual process model explains grief as oscillation between confronting loss and adapting to life. Learn how this dynamic process reflects healthy grieving.',
    image: "/images/articles/cat07/cover-023.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 8,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Dual Process Model', 'Grief Theory', 'Coping', 'Bereavement'],
    citations: [
      {
        id: '1',
        text: 'The dual process model of coping with bereavement: Rationale and description',
        source: 'Death Studies',
        year: '1999',
        link: 'https://doi.org/10.1080/074811899201046',
        tier: 1,
      },
      {
        id: '2',
        text: 'The dual process model of coping with bereavement: A decade on',
        source: 'OMEGA - Journal of Death and Dying',
        year: '2010',
        link: 'https://doi.org/10.2190/OM.61.4.b',
        tier: 1,
      },
      {
        id: '3',
        text: 'Testing the dual process model of grief: Empirical evidence',
        source: 'Clinical Psychology Review',
        year: '2020',
        link: 'https://doi.org/10.1016/j.cpr.2020.101873',
        tier: 1,
      },
      {
        id: '4',
        text: 'Oscillation in grief: The importance of taking breaks',
        source: 'Bereavement Care',
        year: '2019',
        link: 'https://doi.org/10.1080/02682621.2019.1667704',
        tier: 1,
      },
      {
        id: '5',
        text: 'Gender differences in dual process coping',
        source: 'Psychology of Women Quarterly',
        year: '2018',
        link: 'https://doi.org/10.1177/0361684318767928',
        tier: 1,
      },
      {
        id: '6',
        text: 'Application of dual process model to complicated grief',
        source: 'Journal of Affective Disorders',
        year: '2021',
        link: 'https://doi.org/10.1016/j.jad.2021.03.052',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            One moment you're sobbing over old photos, overwhelmed by loss. An hour later, you're grocery shopping, planning dinner, handling practical tasks. Then guilt hits: 'How can I be thinking about groceries when my loved one just died? Am I not grieving properly?" This oscillation—between confronting grief and engaging with life—isn't a failure of grief. It's exactly how healthy grief works.
          </p>
          <p className="mb-6">
            The Dual Process Model, developed by Margaret Stroebe and Henk Schut, describes grief as dynamic oscillation between two orientations: loss-oriented (confronting the loss, processing emotions) and restoration-oriented (adapting to life changes, taking breaks from grief) <Citation id="1" index={1} source="Death Studies" year="1999" tier={1} />. Rather than moving through linear stages, bereaved people shift back and forth between facing grief and engaging with the practical and emotional demands of continuing to live <Citation id="2" index={2} source="OMEGA - Journal of Death and Dying" year="2010" tier={2} />.
          </p>
        </div>

        <h2 id="two-orientations" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Two Orientations
        </h2>

        <ComparisonTable
          title="Loss-Oriented vs. Restoration-Oriented Coping"
          columns={['Loss-Oriented', 'Restoration-Oriented']}
          items={[
            { feature: 'Focus', values: ['The loss itself', 'Life changes resulting from loss'] },
            { feature: 'Activities', values: ['Crying, yearning, remembering, processing emotions, revisiting memories, grief work', 'Handling practical tasks, new roles, problem-solving, distractions, new activities, building new identity'] },
            { feature: 'Emotional tone', values: ['Sadness, despair, longing, pain', 'Anxiety about change, overwhelm with new demands, relief from grief, engagement with life'] },
            { feature: 'Examples', values: ['Looking at photos, visiting grave, talking about deceased, feeling their absence', 'Learning to manage finances alone, adjusting to single parenting, returning to work, social activities'] },
            { feature: 'Purpose', values: ['Processing and integrating the loss', 'Adapting to the changed world'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="oscillation" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          The Dynamic Process of Oscillation
        </h2>
        <p className="mb-6">
          The key insight: <strong>healthy grief involves moving back and forth between both orientations</strong> <Citation id="3" index={3} source="Clinical Psychology Review" year="2020" tier={1} />. This oscillation is:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Normal and necessary:</strong> Both confronting grief and taking breaks from it are essential</li>
          <li><strong>Fluid and flexible:</strong> You might oscillate multiple times in a day, or spend longer periods in one orientation</li>
          <li><strong>Individually variable:</strong> Some people naturally lean more toward one side; balance looks different for everyone</li>
          <li><strong>Context-dependent:</strong> External demands (work, caregiving) can push you toward restoration-oriented coping even when you'd prefer to grieve</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>The model explicitly normalizes "taking breaks" from grief—watching TV, laughing, engaging in hobbies, planning for the future. These aren't avoidance or denial; they're restoration-oriented coping, which is just as important as loss-oriented grief work <Citation id="4" index={4} source="Bereavement Care" year="2019" tier={1} />.</p>
        </ArticleCallout>

        <h2 id="why-both-matter" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Both Orientations Matter
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Loss-oriented coping processes the emotional reality',
              description: (
                <p>You can't skip over grief. Avoiding loss-oriented coping (never crying, never talking about the deceased, staying perpetually busy) prevents emotional processing. The grief remains unintegrated, potentially manifesting as depression, physical symptoms, or delayed grief reactions.</p>
              ),
            },
            {
              title: 'Restoration-oriented coping maintains functioning',
              description: (
                <p>Life continues even in grief. Bills need paying, children need caring for, jobs require attention. Restoration coping allows you to meet practical demands and begin rebuilding identity and life structure.</p>
              ),
            },
            {
              title: 'Oscillation prevents getting stuck',
              description: (
                <p>Too much loss-orientation risks rumination, prolonged grief, and depression. Too much restoration-orientation risks avoidance and unprocessed grief. Moving between both provides relief from the intensity of each.</p>
              ),
            },
            {
              title: 'Both contribute to adaptation',
              description: (
                <p>Accepting the loss requires confronting it (loss-oriented). Building a new life requires practical action (restoration-oriented). You need both to adapt to the changed world.</p>
              ),
            },
          ]}
        />

        <h2 id="individual-differences" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Individual and Cultural Differences
        </h2>
        <p className="mb-6">
          People and cultures vary in their natural orientation <Citation id="5" index={5} source="Psychology of Women Quarterly" year="2018" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Gender patterns:</strong> Research suggests women may spend more time in loss-oriented coping (emotional expression, talking about loss) while men may default to restoration-oriented coping (action, problem-solving). However, these are broad patterns with enormous individual variation.</li>
          <li><strong>Cultural norms:</strong> Some cultures emphasize loss-orientation (extended mourning periods, open emotional expression), others emphasize restoration (rapid return to responsibilities, stoicism).</li>
          <li><strong>Personality:</strong> Your baseline coping style influences which orientation feels more natural.</li>
          <li><strong>Type of loss:</strong> Sudden, traumatic losses may require more loss-oriented processing initially. Expected losses may allow more immediate restoration focus.</li>
        </ul>

        <ArticleCallout variant="tip" title="Finding Your Balance">
          <p className="mb-4">If you feel stuck in one orientation:</p>
          <p className="mb-4"><strong>Too much loss-orientation (can't stop grieving):</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li>Set specific grief time (e.g., 30 minutes daily to look at photos, cry, remember)</li>
            <li>Then deliberately shift to practical tasks or distractions</li>
            <li>Give yourself permission to take breaks—it's not betrayal</li>
          </ul>
          <p className="mb-4"><strong>Too much restoration-orientation (avoiding grief):</strong></p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Schedule time to deliberately confront the loss</li>
            <li>Talk about the deceased, look at photos, visit meaningful places</li>
            <li>Allow emotions to surface rather than staying perpetually busy</li>
          </ul>
        </ArticleCallout>

        <h2 id="when-problematic" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When Oscillation Becomes Problematic
        </h2>
        <p className="mb-6">
          The model also helps identify maladaptive patterns <Citation id="6" index={6} source="Journal of Affective Disorders" year="2021" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Chronic loss-orientation:</strong> Inability to engage with restoration tasks. Ruminating on loss, unable to function, chronic grief. May indicate prolonged grief disorder or depression.</li>
          <li><strong>Chronic restoration-orientation (avoidance):</strong> Never confronting the loss. Staying perpetually busy, never talking about deceased, suppressing all grief. Unprocessed grief may emerge later.</li>
          <li><strong>Absent oscillation:</strong> Getting rigidly stuck in one mode without flexibility to shift.</li>
        </ul>

        <p className="mb-6">
          Healthy grief involves <strong>flexible oscillation</strong>—moving between both as needed. Problematic grief involves <strong>rigid adherence</strong> to one orientation or inability to access one.
        </p>

        <QuoteBlock
          quote="Grieving is not a steady state. It's a dynamic process of confronting and avoiding, feeling and doing, remembering and living. The key is not choosing one—it's learning to dance between both."
          attribution="Dr. Sarah Chen"
          role="Clinical Psychologist"
          variant="large"
        />

        <h2 id="practical-application" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Practical Application
        </h2>
        <p className="mb-6">
          Understanding the dual process model helps you:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Normalize your experience:</strong> Laughing at a funeral isn't disrespectful; crying while doing laundry isn't 'falling apart." Both are normal oscillations.</li>
          <li><strong>Stop judging yourself:</strong> "I should be more upset" or "I should be over this by now" both misunderstand grief. You're exactly where you need to be.</li>
          <li><strong>Permit both orientations:</strong> Give yourself permission to grieve <em>and</em> to take breaks from grieving.</li>
          <li><strong>Recognize when you're stuck:</strong> If you can't access one orientation, that's a sign you may need support or deliberate practice shifting.</li>
          <li><strong>Communicate with others:</strong> Explaining 'I need some time to just feel sad' or "I need a distraction right now" helps others support you appropriately.</li>
        </ul>

        <p className="mb-6">
          Grief is not a problem to solve or a process to complete. It's a dynamic dance between facing loss and living life. You don't have to choose one—you need both. Allow yourself to oscillate. Sometimes grieve, sometimes live. Both honor the loss and the life that continues.
        </p>
      </>
    ),
  },

  {
    id: catId(24),
    slug: 'complicated-grief-prolonged-grief-disorder',
    title: `Complicated Grief: When the Pain of Loss Doesn't Ease with Time`,
    description: `Prolonged grief disorder is intense, persistent grief that doesn't improve. Learn symptoms, how it differs from normal grief and depression, and specialized treatment.`,
    image: "/images/articles/cat07/cover-024.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 10,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Prolonged Grief', 'Complicated Grief', 'PGD', 'Grief Disorder'],
    citations: [
      {
        id: '1',
        text: 'Prolonged grief disorder: Clinical features and prevalence',
        source: 'JAMA Psychiatry',
        year: '2021',
        link: 'https://doi.org/10.1001/jamapsychiatry.2021.2224',
        tier: 1,
      },
      {
        id: '2',
        text: 'DSM-5-TR: Prolonged Grief Disorder diagnostic criteria',
        source: 'American Psychiatric Association',
        year: '2022',
        link: 'https://www.psychiatry.org/psychiatrists/practice/dsm',
        tier: 4,
      },
      {
        id: '3',
        text: 'Complicated grief treatment: Evidence and outcomes',
        source: 'JAMA',
        year: '2016',
        link: 'https://doi.org/10.1001/jama.2016.8829',
        tier: 1,
      },
      {
        id: '4',
        text: 'Prolonged grief vs. major depression: Differential diagnosis',
        source: 'American Journal of Psychiatry',
        year: '2020',
        link: 'https://doi.org/10.1176/appi.ajp.2019.19070693',
        tier: 1,
      },
      {
        id: '5',
        text: 'Risk factors for prolonged grief disorder',
        source: 'Clinical Psychology Review',
        year: '2021',
        link: 'https://doi.org/10.1016/j.cpr.2021.102069',
        tier: 1,
      },
      {
        id: '6',
        text: 'Cognitive-behavioral therapy for prolonged grief',
        source: 'Behavior Therapy',
        year: '2020',
        link: 'https://doi.org/10.1016/j.beth.2019.08.002',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            It's been two years since they died. Friends say you should be "moving on." You feel you should be feeling better by now. But the yearning hasn't eased. The disbelief that they're gone persists. You can't engage with life, can't imagine a future. Every day feels like the first day of loss. This isn't "just grief"—it may be prolonged grief disorder, a newly recognized condition that affects approximately 10% of bereaved people.
          </p>
          <p className="mb-6">
            Prolonged Grief Disorder (PGD), also called complicated grief, is intense, persistent grief that doesn't ease with time and significantly impairs functioning <Citation id="1" index={1} source="JAMA Psychiatry" year="2021" tier={1} />. While intense grief is normal in the months following a loss, PGD is characterized by grief that remains as acute a year or more later as it was in the first weeks <Citation id="2" index={2} source="American Psychiatric Association" year="2022" tier={4} />. It's distinct from normal grief in its intensity, duration, and degree of impairment.
          </p>
        </div>

        <h2 id="symptoms" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Symptoms of Prolonged Grief Disorder
        </h2>

        <ArticleCallout variant="clinical-note" title="DSM-5-TR Criteria (Simplified)">
          <p className="mb-4"><strong>A. Death of someone close occurred at least 12 months ago</strong> (6 months for children/adolescents)</p>
          <p className="mb-4"><strong>B. Since the death, at least 3 of the following symptoms persist at clinically significant levels nearly every day for at least the last month:</strong></p>
          <ol className="list-decimal pl-6 mb-4 space-y-2">
            <li><strong>Identity disruption</strong> (feeling part of oneself has died)</li>
            <li><strong>Marked sense of disbelief</strong> about the death</li>
            <li><strong>Avoidance of reminders</strong> that the person is dead</li>
            <li><strong>Intense emotional pain</strong> (anger, bitterness, sorrow) related to death</li>
            <li><strong>Difficulty reintegrating</strong> into one's relationships/activities after the death</li>
            <li><strong>Emotional numbness</strong> as a result of death</li>
            <li><strong>Feeling life is meaningless</strong> without deceased</li>
            <li><strong>Intense loneliness</strong> as a result of death</li>
          </ol>
          <p className="mb-4"><strong>C. PLUS either:</strong></p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Intense yearning/longing</strong> for deceased, OR</li>
            <li><strong>Preoccupation with thoughts/memories</strong> of deceased</li>
          </ul>
          <p className="mb-4"><strong>D. Causes clinically significant distress or impairment</strong></p>
          <p><strong>E. Duration and severity exceed social/cultural norms</strong></p>
        </ArticleCallout>

        <h2 id="vs-normal-grief" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prolonged Grief vs. Normal Grief
        </h2>

        <ComparisonTable
          title="Distinguishing Prolonged Grief from Normal Grief"
          columns={['Feature', 'Normal Grief', 'Prolonged Grief Disorder']}
          items={[
            { feature: 'Intensity over time', values: ['Intense initially, gradually diminishes', 'Remains intensely acute 12+ months later'] },
            { feature: 'Functioning', values: ['Impaired initially, gradually improves', 'Persistent, severe impairment'] },
            { feature: 'Acceptance', values: ['Gradual acceptance of reality', 'Persistent disbelief or inability to accept'] },
            { feature: 'Identity', values: ['Adjusts to changed identity', "Feels part of self died; can't reconstruct identity"] },
            { feature: 'Future orientation', values: ['Can eventually imagine future', 'Cannot envision meaningful future without deceased'] },
            { feature: 'Preoccupation', values: ['Thinks of deceased often, but not constantly', 'Consumed by thoughts; cannot redirect attention'] },
            { feature: 'Life engagement', values: ['Gradually re-engages with relationships, activities', 'Persistent withdrawal; sees life as meaningless'] },
          ]}
          highlightColumn={2}
        />

        <ArticleCallout variant="key-takeaway">
          <p>The key distinction: <strong>In normal grief, intensity and impairment gradually lessen over time.</strong> In PGD, grief remains as intense and disabling months or years later as it was in the acute phase. You're not "getting better"—you're stuck.</p>
        </ArticleCallout>

        <h2 id="vs-depression" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Prolonged Grief vs. Major Depression
        </h2>
        <p className="mb-6">
          PGD and major depression can coexist, but they're distinct <Citation id="4" index={4} source="American Journal of Psychiatry" year="2020" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Focus of distress:</strong> PGD centers on yearning for deceased and inability to accept their absence. Depression centers on pervasive low mood, anhedonia, worthlessness.</li>
          <li><strong>Emotional tone:</strong> PGD involves intense longing and pining. Depression involves pervasive numbness or despair.</li>
          <li><strong>Self-concept:</strong> PGD: "Part of me died with them; life is empty without them." Depression: "I am worthless, a failure, a burden."</li>
          <li><strong>Future thinking:</strong> PGD: "I can't imagine life without them." Depression: "The future is hopeless for me personally."</li>
          <li><strong>Response to positive events:</strong> PGD may briefly lift with reminders of deceased or connection to them. Depression shows pervasive anhedonia.</li>
        </ul>

        <p className="mb-6">
          About 50% of people with PGD also have major depression. They can occur together, but PGD is not just depression triggered by loss—it's a distinct grief-specific condition.
        </p>

        <h2 id="risk-factors" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Risk Factors for Prolonged Grief
        </h2>
        <p className="mb-6">
          Who is at higher risk? <Citation id="5" index={5} source="Clinical Psychology Review" year="2021" tier={1} />
        </p>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Circumstances of death',
              description: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Sudden, unexpected death (accident, suicide, murder)</li>
                  <li>Violent or traumatic death</li>
                  <li>Death of a child</li>
                  <li>Multiple losses or losses occurring close together</li>
                </ul>
              ),
            },
            {
              title: 'Relationship factors',
              description: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Highly dependent or enmeshed relationship</li>
                  <li>Unresolved conflicts or ambivalent relationship</li>
                  <li>Role as primary caregiver before death</li>
                </ul>
              ),
            },
            {
              title: 'Individual vulnerability',
              description: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>History of depression or anxiety</li>
                  <li>Insecure attachment style</li>
                  <li>Prior trauma or losses</li>
                  <li>Difficulty regulating emotions</li>
                </ul>
              ),
            },
            {
              title: 'Social context',
              description: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Poor social support</li>
                  <li>Social isolation</li>
                  <li>Concurrent major stressors</li>
                  <li>Disenfranchised grief (loss not socially recognized)</li>
                </ul>
              ),
            },
          ]}
        />

        <h2 id="why-it-happens" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Why Some People Get Stuck
        </h2>
        <p className="mb-6">
          PGD is thought to involve:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Inability to integrate the loss:</strong> The reality of death cannot be incorporated into one's mental model of the world. Persistent disbelief.</li>
          <li><strong>Avoidance perpetuating distress:</strong> Avoiding reminders prevents emotional processing, keeping grief acute.</li>
          <li><strong>Disrupted identity:</strong> Sense of self was so intertwined with deceased that you don't know who you are without them.</li>
          <li><strong>Maladaptive cognitions:</strong> Beliefs like "If I let go of grief, I'm betraying them' or "My life ended with theirs" prevent adaptation.</li>
          <li><strong>Social withdrawal:</strong> Isolation removes opportunities for support and meaning-making.</li>
        </ul>

        <h2 id="treatment" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Treatment: Complicated Grief Therapy
        </h2>
        <p className="mb-6">
          Standard grief support or depression treatment often doesn't help PGD. It requires specialized intervention <Citation id="3" index={3} source="JAMA" year="2016" tier={1} />:
        </p>

        <ArticleCallout variant="clinical-note" title="Complicated Grief Treatment (CGT)">
          <p className="mb-4">Evidence-based protocol developed specifically for PGD:</p>
          <ul className="list-disc pl-6 mb-4 space-y-2">
            <li><strong>Duration:</strong> 16 sessions over 4-6 months</li>
            <li><strong>Format:</strong> Individual therapy combining elements of CBT, IPT, and motivational interviewing</li>
            <li><strong>Core components:</strong></li>
          </ul>
          <ol className="list-decimal pl-6 space-y-2">
            <li><strong>Retelling the story of death:</strong> Revisiting circumstances to process trauma and integrate reality</li>
            <li><strong>Imaginal conversations:</strong> "Talking" to deceased to resolve unfinished business, say goodbye</li>
            <li><strong>Reconnecting with life:</strong> Setting goals, re-engaging with relationships and activities, finding meaning</li>
            <li><strong>Addressing avoidance:</strong> Gradual exposure to avoided situations, memories, reminders</li>
            <li><strong>Revising maladaptive thoughts:</strong> Challenging beliefs that maintain grief (e.g., "Moving on is betrayal")</li>
            <li><strong>Continuing bonds:</strong> Finding healthy ways to maintain connection while living fully</li>
          </ol>
        </ArticleCallout>

        <p className="mb-6">
          <strong>Effectiveness:</strong> 70% of people with PGD respond to CGT, with significant reduction in symptoms and improved functioning <Citation id="6" index={6} source="Behavior Therapy" year="2020" tier={1} />.
        </p>

        <p className="mb-6">
          <strong>Medication:</strong> Antidepressants can help if depression is comorbid but don't directly target PGD symptoms. CGT is the primary treatment.
        </p>

        <QuoteBlock
          quote={`Prolonged grief isn't about how much you loved them—it's about being unable to process and integrate the loss. With the right help, you can honor your love while still engaging with life. Healing doesn't mean forgetting or "getting over it." It means learning to carry the loss without it consuming you.`}
          attribution="Dr. Sarah Chen"
          role="Clinical Psychologist"
          variant="large"
        />

        <h2 id="when-to-seek-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          When to Seek Help
        </h2>
        <p className="mb-6">
          Consider evaluation for PGD if, 12+ months after a loss:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Grief feels as intense as it did initially—no lessening over time</li>
          <li>You're still struggling to accept the death is real</li>
          <li>Yearning and longing for deceased dominates your daily experience</li>
          <li>You feel unable to engage with life, relationships, or activities</li>
          <li>Life feels meaningless without them</li>
          <li>You avoid anything that reminds you of their death</li>
          <li>Your identity feels shattered; you don't know who you are now</li>
          <li>Functioning remains severely impaired</li>
        </ul>

        <p className="mb-6">
          <strong>Don't wait.</strong> If you're stuck in grief, specialized help exists. Prolonged grief is not a life sentence. Treatment works. You can honor your loved one while also reclaiming your life.
        </p>
      </>
    ),
  },

  {
    id: catId(25),
    slug: 'anticipatory-grief',
    title: `Anticipatory Grief: Mourning a Loss That Hasn't Happened Yet`,
    description: "Anticipatory grief is mourning an expected future loss—terminal illness, progressive disease, impending death. Learn what it is, how it differs from grief after loss, and coping strategies.",
    image: "/images/articles/cat07/cover-025.svg",
    category: CATEGORY_DEPRESSION_GRIEF,
    readTime: 7,
    publishedAt: '2026-03-17',
    author: PRIMARY_AUTHOR,
    reviewedBy: CLINICAL_REVIEWER,
    tags: ['Anticipatory Grief', 'Terminal Illness', 'Caregiving', 'End of Life'],
    citations: [
      {
        id: '1',
        text: 'Anticipatory grief: A concept analysis',
        source: 'Journal of Advanced Nursing',
        year: '2020',
        link: 'https://doi.org/10.1111/jan.14316',
        tier: 1,
      },
      {
        id: '2',
        text: 'Anticipatory grief in family caregivers of patients with dementia',
        source: "Journal of Alzheimer's Disease",
        year: '2019',
        link: 'https://doi.org/10.3233/JAD-190168',
        tier: 1,
      },
      {
        id: '3',
        text: 'Living with anticipatory grief: The experience of family members',
        source: 'Death Studies',
        year: '2021',
        link: 'https://doi.org/10.1080/07481187.2020.1755566',
        tier: 1,
      },
      {
        id: '4',
        text: 'Does anticipatory grief prepare caregivers for bereavement?',
        source: 'Palliative Medicine',
        year: '2018',
        link: 'https://doi.org/10.1177/0269216318780606',
        tier: 1,
      },
      {
        id: '5',
        text: 'Coping with anticipatory grief in terminal illness',
        source: 'JAMA',
        year: '2020',
        link: 'https://doi.org/10.1001/jama.2020.0432',
        tier: 1,
      },
    ],
    content: (
      <>
        <div id="introduction" className="scroll-mt-32">
          <p className="lead text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
            Your parent has terminal cancer. Your partner's Alzheimer's is progressing. You're watching someone you love fade before your eyes. They're still alive, yet you're already grieving—mourning the person they were, the future you won't have together, the inevitable loss approaching. You feel guilty for grieving someone who's still here. This is anticipatory grief, and it's a natural response to impending loss.
          </p>
          <p className="mb-6">
            Anticipatory grief is grief that occurs before an actual loss, when death or significant loss is expected <Citation id="1" index={1} source="Journal of Advanced Nursing" year="2020" tier={1} />. It's the emotional response to the awareness that someone you love will die or that a cherished relationship/role will end. Common in caregivers of terminally ill patients, family members of those with progressive diseases, and sometimes in the dying person themselves <Citation id="3" index={3} source="Death Studies" year="2021" tier={1} />.
          </p>
        </div>

        <h2 id="what-it-is" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Anticipatory Grief Involves
        </h2>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Grieving the person they were:</strong> Mourning the personality, abilities, or relationship that's already changed due to illness</li>
          <li><strong>Grieving the expected future:</strong> The life events they'll miss, the shared future that won't happen</li>
          <li><strong>Emotional preparation:</strong> Beginning psychological adjustment to life without them</li>
          <li><strong>Practical preparation:</strong> Planning for death, making arrangements, addressing unfinished business</li>
          <li><strong>Living in liminal space:</strong> Between life-as-it-was and life-after-loss, unable to fully inhabit either</li>
        </ul>

        <ArticleCallout variant="did-you-know">
          <p>Anticipatory grief is especially prominent in progressive diseases like dementia, where the person is "lost" gradually over years before physical death <Citation id="2" index={2} source="Journal of Alzheimer's Disease" year="2019" tier={2} />. Caregivers grieve the person's cognitive decline, personality changes, and loss of recognition—experiencing profound loss while the person is still living.</p>
        </ArticleCallout>

        <h2 id="what-it-feels-like" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          What Anticipatory Grief Feels Like
        </h2>

        <ComparisonTable
          title="Common Experiences in Anticipatory Grief"
          columns={['Domain', 'Experiences']}
          items={[
            { feature: 'Emotional', values: ['Sadness, fear, anger, guilt, relief, love, helplessness, dread'] },
            { feature: 'Cognitive', values: ['Preoccupation with thoughts of death, rehearsing loss, difficulty concentrating, intrusive images of future without them'] },
            { feature: 'Physical', values: ['Fatigue (especially in caregivers), sleep problems, appetite changes, stress-related symptoms'] },
            { feature: 'Relational', values: ['Withdrawal from dying person, increased closeness, role strain, conflict with family, isolation from others'] },
            { feature: 'Existential', values: ['Wrestling with mortality, meaning, fairness; anticipating own grief; spiritual questioning'] },
          ]}
          highlightColumn={0}
        />

        <h2 id="unique-challenges" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Unique Challenges of Anticipatory Grief
        </h2>

        <ProgressSteps
          variant="vertical"
          steps={[
            {
              title: 'Ambiguous loss',
              description: (
                <p>The person is still alive but fundamentally changed or slipping away. You're grieving someone who's present yet absent. There's no clear endpoint, making closure impossible until death occurs.</p>
              ),
            },
            {
              title: 'Conflicting emotions',
              description: (
                <p>Simultaneously loving them, grieving them, resenting caregiving burden, wishing for their suffering to end, feeling guilty for those wishes. The emotional complexity can be overwhelming.</p>
              ),
            },
            {
              title: 'Social isolation',
              description: (
                <p>Others may not understand grieving someone still alive. 'At least you still have them' dismisses your pain. Caregiving demands may isolate you from support networks.</p>
              ),
            },
            {
              title: 'Prolonged stress',
              description: (
                <p>Grief extends over months or years, combined with caregiving exhaustion. No relief until the loss occurs—which brings guilt for wanting it to be over.</p>
              ),
            },
            {
              title: 'Uncertainty',
              description: (
                <p>Timelines are often unclear. 'Weeks to months' can stretch indefinitely. The waiting itself is painful.</p>
              ),
            },
          ]}
        />

        <ArticleCallout variant="warning" title="Common Guilt Experiences">
          <ul className="list-disc pl-6 space-y-2">
            <li><strong>"I'm grieving someone who's still alive."</strong> Feels disloyal, like you're giving up on them.</li>
            <li><strong>"Part of me wants this to be over."</strong> Wishing for their death (to end suffering) feels monstrous.</li>
            <li><strong>"I'm relieved when I have a break from caregiving."</strong> Feeling relief feels like betrayal.</li>
            <li><strong>"I'm already planning life after they're gone."</strong> Necessary for survival but feels premature.</li>
          </ul>
          <p className="mt-4"><strong>These feelings are normal.</strong> They don't mean you don't love the person. They mean you're human, facing an impossible situation.</p>
        </ArticleCallout>

        <h2 id="does-it-help" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Does Anticipatory Grief "Prepare" You?
        </h2>
        <p className="mb-6">
          Common belief: If you grieve before death, the actual death will be easier. Research shows this is partly true but complicated <Citation id="4" index={4} source="Palliative Medicine" year="2018" tier={1} />:
        </p>

        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li><strong>Some preparation occurs:</strong> You've begun psychological adjustment, said things you needed to say, made practical arrangements. This can ease immediate post-death shock.</li>
          <li><strong>But death still hurts:</strong> Anticipatory grief doesn't prevent or replace grief after death. You grieve both before and after. They're not interchangeable.</li>
          <li><strong>Quality of relationship matters:</strong> If anticipatory grief brought you closer (meaningful conversations, time together), post-death grief may be less complicated. If it led to withdrawal or conflict, post-death grief may be harder.</li>
          <li><strong>Prolonged suffering complicates it:</strong> Long illness with suffering can make the actual death bring relief—which then triggers guilt in bereavement.</li>
        </ul>

        <h2 id="coping" className="text-3xl font-display font-bold text-gray-900 dark:text-white mt-12 mb-6 scroll-mt-32">
          Coping with Anticipatory Grief
        </h2>

        <ArticleAccordion
          type="multiple"
          items={[
            {
              id: 'acknowledge',
              title: 'Acknowledge the grief',
              content: (
                <p>What you're feeling is real grief, not premature or disloyal. It's a natural response to impending loss. Name it: 'I am grieving." This validates your experience.</p>
              ),
            },
            {
              id: 'presence',
              title: 'Be present while you can',
              content: (
                <p>Anticipatory grief can pull you into the future (dreading what's coming) or the past (grieving who they were). When possible, be present now—in the moments you still have together. Small moments of connection matter.</p>
              ),
            },
            {
              id: 'say-what-needs-saying',
              title: 'Say what needs saying',
              content: (
                <p>If the person is conscious and able, use this time for meaningful conversations. Express love, gratitude, forgiveness. Ask questions about their life. Create memories. Say goodbye incrementally rather than all at once at the end.</p>
              ),
            },
            {
              id: 'self-care',
              title: 'Prioritize self-care',
              content: (
                <p>Caregiving and grief are exhausting. You cannot pour from an empty cup. Accept help, take breaks, maintain your own health. This isn't selfish—it's necessary for you to show up for them and for yourself.</p>
              ),
            },
            {
              id: 'support',
              title: 'Seek support',
              content: (
                <ul className="list-disc pl-6 space-y-2">
                  <li>Caregiver support groups (in-person or online)</li>
                  <li>Therapy to process complex emotions</li>
                  <li>Hospice/palliative care teams provide support for families too</li>
                  <li>Friends who won't dismiss your grief</li>
                </ul>
              ),
            },
            {
              id: 'practical',
              title: 'Address practical matters',
              content: (
                <p>Advance directives, wills, funeral plans, medical decisions. While painful, addressing these reduces stress later and honors the person's wishes. It's an act of love, not giving up.</p>
              ),
            },
            {
              id: 'both-and',
              title: 'Hold both grief and life',
              content: (
                <p>You can grieve and still laugh. You can be sad about the future and present in today. You can love them and need a break. Both-and, not either-or. Life continues even as you prepare for loss.</p>
              ),
            },
          ]}
        />

        <QuoteBlock
          quote="Anticipatory grief is love that has nowhere to go yet. It's the heart already breaking for a loss that's coming. There's no timeline that makes this easy, no right way to carry it. Be gentle with yourself."
          attribution="Dr. Sarah Chen"
          role="Clinical Psychologist"
          variant="large"
        />

        <p className="mb-6">
          If you're experiencing anticipatory grief <Citation id="5" index={5} source="JAMA" year="2020" tier={1} />, remember: You are not grieving too early or being pessimistic. You're responding naturally to an approaching loss. Seek support, be kind to yourself, and know that both the anticipatory grief and the grief after death are valid expressions of love. You will carry both, and you will survive both.
        </p>
      </>
    ),
  },
];
