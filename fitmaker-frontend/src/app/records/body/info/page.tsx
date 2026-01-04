"use client";

import { useState } from "react";
import { Section } from "@/components/section";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";

export default function BodyInfoPage() {
    const [date, setDate] = useState(new Date().toISOString().slice(0, 10));

    return (
        <div className="max-w-3xl space-y-8">

            <Section title="기록 날짜">
                <Input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                />
            </Section>

            <Section title="오늘의 신체 정보">
                <div className="space-y-4">
                    <div>
                        <Label>체중(kg)</Label>
                        <Input placeholder="예: 62.5" />
                    </div>

                    <div>
                        <Label>체지방률(%)</Label>
                        <Input placeholder="예: 12.0" />
                    </div>

                    <div>
                        <Label>근육량(kg)</Label>
                        <Input placeholder="예: 31.5" />
                    </div>

                    <div>
                        <Label>허리둘레(cm)</Label>
                        <Input placeholder="예: 72" />
                    </div>
                </div>
            </Section>

            <Section title="컨디션 메모 (선택)">
                <Textarea placeholder="오늘 컨디션을 적어주세요." rows={4} />
            </Section>

            <Button className="w-full">저장하기</Button>

            <button
                className="
          fixed bottom-5 right-5 bg-blue-600
          text-white px-5 py-3 rounded-full shadow-lg
          hover:bg-blue-700 transition
        "
            >
                💬 신체 AI 분석
            </button>
        </div>
    );
}
