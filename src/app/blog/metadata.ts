import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'AI Implementation Blog & Insights | Reilly Design Studio',
  description: 'Expert insights on AI implementation, automation, and business transformation. 30+ years of engineering experience in defense aerospace, enterprise systems, and artificial intelligence.',
  keywords: [
    'AI implementation blog',
    'artificial intelligence insights',
    'business automation blog',
    'enterprise AI consultant',
    'machine learning implementation',
    'AI transformation strategies',
    'defense AI expertise',
    'MIT engineer blog',
    'TS/SCI AI consultant',
    'government AI implementation',
    'DC AI consultant blog',
    'Virginia AI expert',
    'business intelligence insights',
    'automation consulting blog',
    'AI ROI strategies'
  ],
  authors: [{ name: 'Robert D. Reilly' }],
  creator: 'Robert D. Reilly',
  publisher: 'Reilly Design Studio',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  openGraph: {
    title: 'AI Implementation Blog & Expert Insights | Reilly Design Studio',
    description: 'Expert insights on AI implementation, automation, and business transformation from MIT engineer with 30+ years experience in defense aerospace and enterprise systems.',
    url: 'https://reillydesignstudio.com/blog',
    siteName: 'Reilly Design Studio',
    images: [
      {
        url: 'https://reillydesignstudio.com/images/blog/ai-insights-og.jpg',
        width: 1200,
        height: 630,
        alt: 'AI Implementation Blog - Reilly Design Studio',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'AI Implementation Blog & Expert Insights',
    description: 'Expert insights on AI implementation and business transformation from MIT engineer with 30+ years experience.',
    site: '@ReillyDesignStudio',
    creator: '@RobertDReilly',
    images: ['https://reillydesignstudio.com/images/blog/ai-insights-twitter.jpg'],
  },
  alternates: {
    canonical: 'https://reillydesignstudio.com/blog',
  },
  category: 'Technology',
  classification: 'Business Blog',
};