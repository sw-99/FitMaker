"use client";

import Image from "next/image";
import { useState } from "react";
import { Section } from "@/components/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";

export default function BodyRecordPage() {
    const [frontImage, setFrontImage] = useState<string | null>(null);
    const [sideImage, setSideImage] = useState<string | null>(null);

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, type: "front" | "side") => {
        const file = e.target.files?.[0];
        if (!file) return;

        const preview = URL.createObjectURL(file);
        if (type === "front") setFrontImage(preview);
        else setSideImage(preview);
    };

    return (
        <div className="px-4 py-8 max-w-5xl mx-auto">
            <h1 className="text-2xl font-semibold mb-6">신체 정보 기록</h1>

            {/* GRID: 모바일=1열 / 데스크탑=2열 */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                {/* LEFT COLUMN */}
                <div className="space-y-8">

                    {/* 날짜 */}
                    <Section title="기록 날짜">
                        <Input
                            type="date"
                            defaultValue={new Date().toISOString().slice(0, 10)}
                        />
                    </Section>

                    {/* 신체 정보 입력 */}
                    <Section title="오늘의 신체 정보">
                        <div className="space-y-4">
                            <div>
                                <Label className="mb-1">체중(kg)</Label>
                                <Input placeholder="예: 62.5" />
                            </div>
                            <div>
                                <Label className="mb-1">체지방률(%)</Label>
                                <Input placeholder="예: 12.0" />
                            </div>
                            <div>
                                <Label className="mb-1">근육량(kg)</Label>
                                <Input placeholder="예: 31.5" />
                            </div>
                            <div>
                                <Label className="mb-1">허리둘레(cm)</Label>
                                <Input placeholder="예: 72" />
                            </div>
                        </div>
                    </Section>

                    {/* 메모 */}
                    <Section title="컨디션 메모 (선택)">
                        <Textarea placeholder="오늘 컨디션을 적어주세요." rows={4} />
                    </Section>
                </div>

                {/* RIGHT COLUMN (사진 업로드) */}
                <div className="space-y-8">

                    <Section title="신체 사진 업로드">

                        {/* 전신 정면 */}
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">전신 정면 (선택)</Label>

                            <Card className="w-full aspect-[3/4] flex items-center justify-center border rounded-lg overflow-hidden bg-muted">
                                {frontImage ? (
                                    <div className="relative w-full h-full">
                                        <Image src={frontImage} alt="front" fill className="object-cover" />
                                        <button
                                            className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs"
                                            onClick={() => setFrontImage(null)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="front-upload"
                                        className="w-full h-full flex items-center justify-center cursor-pointer text-gray-600"
                                    >
                                        + 이미지 업로드
                                    </label>
                                )}
                                <input
                                    id="front-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, "front")}
                                />
                            </Card>
                        </div>

                        {/* 전신 측면 */}
                        <div className="space-y-2">
                            <Label className="text-sm text-gray-600">전신 측면 (선택)</Label>

                            <Card className="w-full aspect-[3/4] flex items-center justify-center border rounded-lg overflow-hidden bg-muted">
                                {sideImage ? (
                                    <div className="relative w-full h-full">
                                        <Image src={sideImage} alt="side" fill className="object-cover" />
                                        <button
                                            className="absolute top-2 right-2 bg-black/60 text-white px-2 py-1 rounded text-xs"
                                            onClick={() => setSideImage(null)}
                                        >
                                            삭제
                                        </button>
                                    </div>
                                ) : (
                                    <label
                                        htmlFor="side-upload"
                                        className="w-full h-full flex items-center justify-center cursor-pointer text-gray-600"
                                    >
                                        + 이미지 업로드
                                    </label>
                                )}
                                <input
                                    id="side-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => handleImageUpload(e, "side")}
                                />
                            </Card>
                        </div>

                    </Section>

                    <Button className="w-full">저장하기</Button>
                </div>
            </div>

            {/* FLOATING AI BUTTON */}
            <button
                className="
        fixed bottom-5 right-5
        bg-blue-600 text-white px-5 py-3 rounded-full shadow-lg
        hover:bg-blue-700 transition
      "
            >
                💬 신체 AI 분석
            </button>
        </div>
    );
}
