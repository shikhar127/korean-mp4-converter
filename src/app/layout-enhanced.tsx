import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MP4를 MP3로 변환 | 무료 온라인 변환기',
  description: '무료 온라인 MP4 to MP3 변환 도구. 빠르고 안전하며 브라우저에서 직접 변환. 파일 업로드 없음. 100% 무료.',

  keywords: [
    'MP4 to MP3',
    'MP4 MP3 변환',
    '무료 변환기',
    '온라인 변환',
    '동영상 MP3 추출',
    '한국어 변환 도구',
    'MP4에서 MP3',
    '동영상 변환기',
    '오디오 추출'
  ],

  // Open Graph for social sharing
  openGraph: {
    title: 'MP4를 MP3로 변환 | 무료 온라인 도구',
    description: '브라우저에서 안전하게 MP4를 MP3로 변환하세요. 서버 업로드 없이 100% 무료.',
    url: 'https://shikhar127.github.io/korean-mp4-converter/',
    siteName: 'Korean MP4 to MP3 Converter',
    locale: 'ko_KR',
    type: 'website',
  },

  // Twitter Card
  twitter: {
    card: 'summary_large_image',
    title: 'MP4를 MP3로 변환 | 무료 온라인 변환기',
    description: '브라우저에서 안전하게 MP4를 MP3로 변환하세요',
  },

  // Verification codes (replace with actual codes)
  verification: {
    google: 'GOOGLE_VERIFICATION_CODE_HERE', // Get from Google Search Console
    other: {
      'naver-site-verification': 'NAVER_VERIFICATION_CODE_HERE', // Get from Naver Search Advisor
    },
  },

  // SEO
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

  // Additional meta
  alternates: {
    canonical: 'https://shikhar127.github.io/korean-mp4-converter/',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Structured Data - WebApplication
  const webAppSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "Korean MP4 to MP3 Converter",
    "applicationCategory": "MultimediaApplication",
    "operatingSystem": "Any",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "KRW"
    },
    "description": "무료 온라인 MP4 to MP3 변환 도구",
    "inLanguage": "ko",
    "url": "https://shikhar127.github.io/korean-mp4-converter/",
    "featureList": [
      "100% 무료",
      "브라우저 내 변환 (파일 업로드 없음)",
      "빠른 변환 속도",
      "개인정보 보호"
    ]
  };

  return (
    <html lang="ko">
      <head>
        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(webAppSchema)
          }}
        />
      </head>
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
