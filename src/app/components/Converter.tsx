'use client';

import { useRef, useState } from 'react';
import { FFmpeg } from '@ffmpeg/ffmpeg';
import { fetchFile, toBlobURL } from '@ffmpeg/util';

type Status = 'idle' | 'loading' | 'converting' | 'done' | 'error';

export default function Converter() {
  const ffmpegRef = useRef<FFmpeg | null>(null);
  const [status, setStatus] = useState<Status>('idle');
  const [progress, setProgress] = useState(0);
  const [errorMsg, setErrorMsg] = useState('');
  const [fileName, setFileName] = useState('');
  const [downloadUrl, setDownloadUrl] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const loadFFmpeg = async () => {
    if (ffmpegRef.current) return ffmpegRef.current;

    const ffmpeg = new FFmpeg();
    ffmpeg.on('progress', ({ progress: p }) => {
      setProgress(Math.round(Math.min(p, 1) * 100));
    });

    const baseURL = 'https://unpkg.com/@ffmpeg/core@0.12.6/dist/umd';
    await ffmpeg.load({
      coreURL: await toBlobURL(`${baseURL}/ffmpeg-core.js`, 'text/javascript'),
      wasmURL: await toBlobURL(
        `${baseURL}/ffmpeg-core.wasm`,
        'application/wasm'
      ),
    });

    ffmpegRef.current = ffmpeg;
    return ffmpeg;
  };

  const convertFile = async (file: File) => {
    if (downloadUrl) {
      URL.revokeObjectURL(downloadUrl);
      setDownloadUrl('');
    }
    setErrorMsg('');
    setProgress(0);
    setFileName(file.name);

    if (!file.name.toLowerCase().endsWith('.mp4')) {
      setStatus('error');
      setErrorMsg('MP4 파일만 지원됩니다. .mp4 파일을 선택해 주세요.');
      return;
    }

    try {
      setStatus('loading');
      const ffmpeg = await loadFFmpeg();

      setStatus('converting');
      await ffmpeg.writeFile('input.mp4', await fetchFile(file));
      await ffmpeg.exec([
        '-i',
        'input.mp4',
        '-vn',
        '-acodec',
        'libmp3lame',
        '-q:a',
        '2',
        'output.mp3',
      ]);

      const data = (await ffmpeg.readFile('output.mp3')) as Uint8Array;
      const blob = new Blob([new Uint8Array(data)], { type: 'audio/mpeg' });
      const url = URL.createObjectURL(blob);
      setDownloadUrl(url);
      setStatus('done');

      // Clean up virtual filesystem
      await ffmpeg.deleteFile('input.mp4');
      await ffmpeg.deleteFile('output.mp3');
    } catch (err) {
      console.error(err);
      setStatus('error');
      setErrorMsg(
        '변환 중 오류가 발생했습니다. 파일이 올바른 MP4 형식인지 확인해 주세요.'
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) convertFile(file);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) convertFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const outputName = fileName.replace(/\.mp4$/i, '.mp3') || 'output.mp3';

  const reset = () => {
    if (downloadUrl) URL.revokeObjectURL(downloadUrl);
    setStatus('idle');
    setProgress(0);
    setErrorMsg('');
    setFileName('');
    setDownloadUrl('');
  };

  return (
    <main className="flex-1 flex items-start justify-center px-4 py-10">
      <div className="w-full max-w-xl">
        {/* Upload area */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          className={`border-2 border-dashed rounded-xl p-10 text-center transition-colors ${
            isDragging
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-300 bg-white'
          }`}
        >
          {status === 'idle' && (
            <>
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M12 16v-8m0 0l-3 3m3-3l3 3M4 16v2a2 2 0 002 2h12a2 2 0 002-2v-2"
                />
              </svg>
              <p className="mt-4 text-gray-600">
                MP4 파일을 여기에 끌어다 놓거나
              </p>
              <label className="mt-3 inline-block cursor-pointer rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition-colors">
                파일 선택
                <input
                  type="file"
                  accept=".mp4,video/mp4"
                  onChange={handleFileChange}
                  className="hidden"
                />
              </label>
              <p className="mt-3 text-xs text-gray-400">
                MP4 파일만 지원 &middot; 모든 처리는 브라우저에서 진행됩니다
              </p>
            </>
          )}

          {status === 'loading' && (
            <div className="py-4">
              <div className="animate-spin mx-auto h-10 w-10 border-4 border-blue-500 border-t-transparent rounded-full" />
              <p className="mt-4 text-gray-600">
                변환 엔진을 불러오는 중입니다...
              </p>
              <p className="mt-1 text-xs text-gray-400">
                처음 실행 시 잠시 시간이 걸릴 수 있습니다
              </p>
            </div>
          )}

          {status === 'converting' && (
            <div className="py-4">
              <p className="text-gray-700 font-medium mb-3">
                변환 중: {fileName}
              </p>
              <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
                <div
                  className="bg-blue-600 h-full rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <p className="mt-2 text-sm text-gray-500">{progress}% 완료</p>
            </div>
          )}

          {status === 'done' && (
            <div className="py-4">
              <svg
                className="mx-auto h-12 w-12 text-green-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
              <p className="mt-3 text-green-700 font-medium">
                변환이 완료되었습니다!
              </p>
              <a
                href={downloadUrl}
                download={outputName}
                className="mt-4 inline-block rounded-lg bg-green-600 px-6 py-2.5 text-white font-medium hover:bg-green-700 transition-colors"
              >
                MP3 다운로드
              </a>
              <button
                onClick={reset}
                className="mt-3 block mx-auto text-sm text-blue-600 hover:underline"
              >
                다른 파일 변환하기
              </button>
            </div>
          )}

          {status === 'error' && (
            <div className="py-4">
              <svg
                className="mx-auto h-12 w-12 text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01M12 3a9 9 0 100 18 9 9 0 000-18z"
                />
              </svg>
              <p className="mt-3 text-red-600 font-medium">{errorMsg}</p>
              <button
                onClick={reset}
                className="mt-4 inline-block rounded-lg bg-blue-600 px-5 py-2.5 text-white font-medium hover:bg-blue-700 transition-colors"
              >
                다시 시도
              </button>
            </div>
          )}
        </div>

        {/* SEO-friendly info section */}
        <section className="mt-8 bg-white rounded-xl p-6 shadow-sm">
          <h2 className="text-lg font-semibold text-gray-800">
            MP4에서 MP3로 변환하는 방법
          </h2>
          <ol className="mt-3 space-y-2 text-sm text-gray-600 list-decimal list-inside">
            <li>위의 &ldquo;파일 선택&rdquo; 버튼을 클릭하거나 MP4 파일을 끌어다 놓으세요.</li>
            <li>자동으로 변환이 시작됩니다. 진행률을 확인하세요.</li>
            <li>변환이 완료되면 &ldquo;MP3 다운로드&rdquo; 버튼을 클릭하세요.</li>
          </ol>
          <h2 className="mt-6 text-lg font-semibold text-gray-800">
            안전하고 빠른 변환
          </h2>
          <p className="mt-2 text-sm text-gray-600">
            이 변환기는 WebAssembly 기술을 사용하여 모든 변환 작업을 사용자의
            브라우저에서 직접 처리합니다. 파일이 외부 서버로 전송되지 않으므로
            개인정보가 완벽하게 보호됩니다. 인터넷 연결 없이도 변환이 가능합니다.
          </p>
        </section>
      </div>
    </main>
  );
}
