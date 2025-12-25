package com.fitmaker.domain.body.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fitmaker.domain.ai.client.GeminiClientService;

@RestController
@RequestMapping("/api/test/gemini")
@RequiredArgsConstructor
public class AiTestController {

    private final GeminiClientService geminiClientService;

    @GetMapping
    public ResponseEntity<?> testGemini() {
        String prompt = "체중 70kg, 체지방률 20%인 사람의 피트니스 상태를 간단히 분석해줘.";
        String result = geminiClientService.generateText(prompt);
        return ResponseEntity.ok(result);
    }
}
