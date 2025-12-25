package com.fitmaker.domain.ai.client;

import com.google.genai.Client;
import com.google.genai.types.GenerateContentResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class GeminiClientService {


    public String generateText(String prompt) {
        Client client = new Client();

        GenerateContentResponse response =
                client.models.generateContent(
                        "gemini-2.5-flash",
                        "오늘 며칠이야?",
                        null);

        System.out.println(response.text());

        return response.text();
    }
}
