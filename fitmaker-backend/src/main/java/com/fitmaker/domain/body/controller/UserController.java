package com.fitmaker.domain.body.controller;

import com.fitmaker.domain.body.dto.UserDto;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/api/users")
public class UserController {

    @GetMapping
    public List<UserDto> getUsers() {
        return List.of(
                new UserDto(1L, "홍길동", "hong@example.com"),
                new UserDto(2L, "김영희", "kim@example.com")
        );
    }
}
