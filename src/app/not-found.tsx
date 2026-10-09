import { ArrowLeft } from "lucide-react";
import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "페이지를 찾을 수 없어요 | 장은재",
};

// 없는 주소로 들어왔을 때 보이는 페이지.
// Next 기본 404는 라이트 모드에서 body 배경을 흰색으로 바꿔 헤더가 안 보이므로, 사이트 톤에 맞게 직접 만든다
export default function NotFound() {
  return (
    <main className="mx-auto flex min-h-[calc(100vh-5rem)] max-w-5xl flex-col items-center justify-center px-6 pb-24 text-center">
      <p className="bg-linear-to-br from-sky-100 via-sky-200 to-cyan-300 bg-clip-text text-7xl font-extrabold tracking-tight text-transparent md:text-8xl">
        404
      </p>
      <h1 className="mt-6 text-xl font-bold text-text-primary md:text-2xl">
        찾으시는 페이지가 없어요
      </h1>
      <p className="mt-3 text-sm leading-7 text-text-secondary md:text-base">
        주소가 바뀌었거나 잘못 입력된 것 같아요.
      </p>
      <Link
        href="/"
        className="group mt-8 inline-flex items-center gap-2 rounded-[1rem] border-2 border-white/10 bg-[#0f1b3d] px-4.5 py-2.5 text-sm font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:border-sky-300/35 hover:bg-[#13234d] hover:shadow-[0_10px_20px_rgba(15,23,42,0.16)]"
      >
        <ArrowLeft
          className="h-3.5 w-3.5 transition-transform duration-200 group-hover:-translate-x-0.5"
          aria-hidden="true"
        />
        메인으로 돌아가기
      </Link>
    </main>
  );
}
