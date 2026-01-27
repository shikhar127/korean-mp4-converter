import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'MP4에서 MP3 변환기 - 무료 온라인 MP4 MP3 변환',
  description:
    '무료 온라인 MP4에서 MP3 변환기. 브라우저에서 바로 MP4 동영상을 MP3 오디오로 변환하세요. 파일 업로드 없이 안전하게 변환됩니다.',
  keywords:
    'MP4 MP3 변환, MP4에서 MP3, 동영상 변환기, 오디오 추출, 무료 변환기, 온라인 변환기',
  openGraph: {
    title: 'MP4에서 MP3 변환기 - 무료 온라인 변환',
    description:
      '브라우저에서 바로 MP4 동영상을 MP3 오디오로 변환하세요. 서버 업로드 없이 안전하게 변환됩니다.',
    type: 'website',
    locale: 'ko_KR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'MP4에서 MP3 변환기 - 무료 온라인 변환',
    description:
      '브라우저에서 바로 MP4 동영상을 MP3 오디오로 변환하세요. 서버 업로드 없이 안전하게 변환됩니다.',
  },
  robots: {
    index: true,
    follow: true,
  },
  other: {
    'naver-site-verification': 'NAVER_VERIFICATION_CODE_HERE',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-50 text-gray-900 min-h-screen flex flex-col">
        {children}
      </body>
    </html>
  );
}
