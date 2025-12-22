import type {ReactNode} from 'react';
import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';
import Link from '@docusaurus/Link';
import React, { useState } from 'react';

type FeatureItem = {
  title: string;
  icon: string;
  description: ReactNode;
};

type ModuleItem = {
  title: string;
  subtitle: string;
  description: string;
  topics: string[];
};

type TechCategory = {
  category: string;
  technologies: string[];
};

type RAGStep = {
  step: number;
  title: string;
  description: string;
};

const FeatureList: FeatureItem[] = [
  {
    title: 'RAG-Powered AI Chatbot',
    icon: '🤖',
    description: (
      <>
        Intelligent Q&A system powered by <strong>GPT-4o-mini</strong> and <strong>Qdrant vector database</strong>.
        Get instant, contextually relevant answers from the entire textbook content using advanced
        Retrieval-Augmented Generation (RAG) technology.
      </>
    ),
  },
  {
    title: 'Text Selection Q&A',
    icon: '📝',
    description: (
      <>
        Select any text in the textbook and ask questions about it instantly. Our interactive
        selection feature allows you to dive deeper into specific concepts and get clarifications
        on-demand, making learning more engaging and efficient.
      </>
    ),
  },
  {
    title: 'Content Personalization',
    icon: '🎯',
    description: (
      <>
        Three difficulty levels adapt to your knowledge: <strong>Simplified</strong> (beginner-friendly),
        <strong>Standard</strong> (balanced depth), and <strong>Advanced</strong> (expert-level).
        Content dynamically adjusts to match your learning pace and background.
      </>
    ),
  },
  {
    title: 'Urdu Translation',
    icon: '🌐',
    description: (
      <>
        Full bilingual support with seamless <strong>Urdu translation</strong> powered by GPT-4o-mini.
        Intelligent caching using MD5 hashing ensures fast, cost-effective translations while
        preserving technical accuracy and context.
      </>
    ),
  },
  {
    title: 'Comprehensive Curriculum',
    icon: '📚',
    description: (
      <>
        Four in-depth modules covering <strong>ROS 2</strong>, <strong>Gazebo & Unity</strong>,
        <strong>NVIDIA Isaac</strong>, and <strong>Vision-Language-Action (VLA)</strong> models.
        From fundamentals to cutting-edge AI robotics implementations.
      </>
    ),
  },
];

const ModuleList: ModuleItem[] = [
  {
    title: 'Module 1',
    subtitle: 'ROS 2 (Robotic Nervous System)',
    description: 'Master the Robot Operating System for modern robotics development',
    topics: ['Nodes & Topics', 'Services & Actions', 'Launch Files', 'TF2 Transforms'],
  },
  {
    title: 'Module 2',
    subtitle: 'Gazebo & Unity (Digital Twin)',
    description: 'Build realistic simulation environments for robot testing',
    topics: ['Physics Simulation', 'URDF Models', 'Sensor Integration', 'Unity ML-Agents'],
  },
  {
    title: 'Module 3',
    subtitle: 'NVIDIA Isaac (AI-Robot Brain)',
    description: 'Leverage GPU-accelerated AI for intelligent robot behaviors',
    topics: ['Isaac Sim', 'Isaac Gym', 'Reinforcement Learning', 'Synthetic Data'],
  },
  {
    title: 'Module 4',
    subtitle: 'Vision-Language-Action (VLA)',
    description: 'Next-gen AI models that understand vision, language, and actions',
    topics: ['RT-1/RT-2 Models', 'Multimodal Learning', 'Policy Networks', 'Real-world Deployment'],
  },
];

const TechStack: TechCategory[] = [
  {
    category: 'Frontend',
    technologies: ['Docusaurus', 'React', 'TypeScript'],
  },
  {
    category: 'Backend',
    technologies: ['FastAPI', 'SQLAlchemy', 'Pydantic'],
  },
  {
    category: 'AI & ML',
    technologies: ['OpenAI GPT-4o-mini', 'Qdrant Vector DB'],
  },
  {
    category: 'Database',
    technologies: ['PostgreSQL/SQLite', 'MD5 Caching'],
  },
  {
    category: 'Deployment',
    technologies: ['GitHub Pages', 'Railway/Vercel'],
  },
];

const RAGSteps: RAGStep[] = [
  {
    step: 1,
    title: 'Your Question',
    description: 'Ask anything about Physical AI, robotics, or textbook content',
  },
  {
    step: 2,
    title: 'Embedding Search',
    description: 'Question is converted to embeddings and searched in Qdrant vector DB',
  },
  {
    step: 3,
    title: 'Context Retrieval',
    description: 'Most relevant textbook sections are retrieved based on semantic similarity',
  },
  {
    step: 4,
    title: 'AI Response',
    description: 'GPT-4o-mini generates accurate answers using retrieved context',
  },
];

function Feature({title, icon, description}: FeatureItem) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3" className={styles.featureTitle}>{title}</Heading>
        <p className={styles.featureDescription}>{description}</p>
      </div>
    </div>
  );
}

function Module({title, subtitle, description, topics}: ModuleItem) {
  return (
    <div className={clsx('col col--6')}>
      <div className={styles.moduleCard}>
        <div className={styles.moduleHeader}>
          <span className={styles.moduleNumber}>{title}</span>
          <Heading as="h3" className={styles.moduleTitle}>{subtitle}</Heading>
        </div>
        <p className={styles.moduleDescription}>{description}</p>
        <ul className={styles.moduleTopics}>
          {topics.map((topic, idx) => (
            <li key={idx}>{topic}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

function TechStackCategory({category, technologies}: TechCategory) {
  return (
    <div className={styles.techCategory}>
      <h4 className={styles.techCategoryTitle}>{category}</h4>
      <div className={styles.techTags}>
        {technologies.map((tech, idx) => (
          <span key={idx} className={styles.techTag}>{tech}</span>
        ))}
      </div>
    </div>
  );
}

function RAGStep({step, title, description}: RAGStep) {
  return (
    <div className={styles.ragStep}>
      <div className={styles.ragStepNumber}>{step}</div>
      <h4 className={styles.ragStepTitle}>{title}</h4>
      <p className={styles.ragStepDescription}>{description}</p>
    </div>
  );
}

export default function HomepageFeatures(): ReactNode {
  return (
    <>
      {/* Key Features Section */}
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" className={styles.sectionTitle}>
              Key Features
            </Heading>
            <p className={styles.sectionSubtitle}>
              An intelligent, interactive learning platform powered by cutting-edge AI technology
            </p>
          </div>
          <div className="row">
            {FeatureList.map((props, idx) => (
              <Feature key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* Course Modules Section */}
      <section className={styles.modulesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" className={styles.sectionTitleLight}>
              Course Modules
            </Heading>
            <p className={styles.sectionTitleLight}>
              A comprehensive curriculum covering the full spectrum of Physical AI and Humanoid Robotics
            </p>
          </div>
          <div className="row">
            {ModuleList.map((props, idx) => (
              <Module key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className={styles.techStackSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" className={styles.sectionTitle}>
              Technology Stack
            </Heading>
            <p className={styles.sectionSubtitle}>
              Built with modern, production-ready technologies for performance and scalability
            </p>
          </div>
          <div className={styles.techStackGrid}>
            {TechStack.map((props, idx) => (
              <TechStackCategory key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* How RAG Works Section */}
      <section className={styles.ragSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <Heading as="h2" className={styles.sectionTitleLight}>
              How RAG-Powered AI Works
            </Heading>
            <p className={styles.sectionSubtitleLight}>
              Understanding the intelligent Q&A system behind your learning experience
            </p>
          </div>
          <div className={styles.ragStepsContainer}>
            {RAGSteps.map((props, idx) => (
              <RAGStep key={idx} {...props} />
            ))}
          </div>
        </div>
      </section>

      {/* Authentication section removed - use Python 3.11 to re-enable */}


      {/* Call to Action Section */}
      <section className={styles.ctaSection}>
        <div className="container">
          <div className={styles.ctaContent}>
            <Heading as="h2" className={styles.ctaTitle}>
              Ready to Master Physical AI?
            </Heading>
            <p className={styles.ctaDescription}>
              Start your journey into the world of humanoid robotics and AI-powered systems
            </p>
            <div className={styles.ctaButtons}>
              <Link
                className={clsx('button button--primary button--lg', styles.ctaButton)}
                to="/docs/intro">
                Start Learning
              </Link>
              <Link
                className={clsx('button button--secondary button--lg', styles.ctaButtonSecondary)}
                to="/docs/chapter-01/intro">
                View Chapter 1
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
