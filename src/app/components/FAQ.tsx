'use client';

import { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: '파일이 서버에 업로드되나요?',
    answer: '아니요. 모든 변환은 브라우저에서 직접 처리됩니다. 파일이 서버로 전송되지 않아 100% 안전합니다. 귀하의 파일은 귀하의 컴퓨터를 떠나지 않습니다.'
  },
  {
    question: '파일 크기 제한이 있나요?',
    answer: '브라우저 메모리에 따라 다르지만, 일반적으로 500MB 이하의 파일을 권장합니다. 큰 파일은 변환 시간이 더 오래 걸릴 수 있습니다.'
  },
  {
    question: '어떤 형식을 지원하나요?',
    answer: '현재 MP4 동영상 파일을 MP3 오디오 파일로 변환하는 것을 지원합니다. 입력: MP4, 출력: MP3 (128kbps 기본 설정).'
  },
  {
    question: '변환 속도가 느린데요?',
    answer: '변환 속도는 파일 크기와 컴퓨터 성능에 따라 달라집니다. 브라우저에서 직접 처리하므로 안전하지만 큰 파일은 시간이 걸릴 수 있습니다. 데스크톱 브라우저에서 더 빠르게 변환됩니다.'
  },
  {
    question: '모바일에서도 사용할 수 있나요?',
    answer: '네, 모바일 브라우저에서도 사용 가능합니다. 다만 큰 파일(100MB 이상)은 성능상 데스크톱 사용을 권장합니다.'
  },
  {
    question: '비용이 있나요?',
    answer: '완전 무료입니다. 숨겨진 비용이나 제한이 없으며, 회원가입도 필요 없습니다. 무제한으로 사용하실 수 있습니다.'
  },
  {
    question: '음질은 어떤가요?',
    answer: 'MP3 파일은 128kbps 비트레이트로 변환되며, 일반적인 음악 감상에 충분한 품질입니다. 원본 MP4의 오디오 품질이 낮으면 MP3도 그에 맞춰집니다.'
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  // Structured Data for FAQ
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": FAQ_ITEMS.map(item => ({
      "@type": "Question",
      "name": item.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": item.answer
      }
    }))
  };

  return (
    <section className="max-w-4xl mx-auto px-4 py-12">
      {/* Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(faqSchema)
        }}
      />

      <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">
        자주 묻는 질문
      </h2>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => (
          <div
            key={index}
            className="bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden"
          >
            <button
              onClick={() => setOpenIndex(openIndex === index ? null : index)}
              className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
              aria-expanded={openIndex === index}
            >
              <span className="font-semibold text-gray-800 pr-4">
                {item.question}
              </span>
              <svg
                className={`w-5 h-5 text-gray-500 transition-transform ${
                  openIndex === index ? 'transform rotate-180' : ''
                }`}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {openIndex === index && (
              <div className="px-6 pb-4 text-gray-600 leading-relaxed">
                {item.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Additional SEO content */}
      <div className="mt-12 text-center text-sm text-gray-500">
        <p>
          이 도구는 100% 무료이며 브라우저에서 직접 변환을 수행하여
          귀하의 개인정보를 보호합니다. 파일은 서버에 업로드되지 않습니다.
        </p>
      </div>
    </section>
  );
}
