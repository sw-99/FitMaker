package com.fitmaker.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import com.fitmaker.service.GeminiService;

@RestController
@RequestMapping("/api/test/gemini")
@RequiredArgsConstructor
public class GeminiTestController {

    private final GeminiService geminiService;

    @GetMapping
    public ResponseEntity<?> testGemini() {

        String prompt = "체중 70kg, 체지방률 20%인 사람의 피트니스 상태를 간단히 분석해줘.";
        String result = geminiService.generateText(prompt);
        return ResponseEntity.ok(result);
    }
}
