package com.example.rungiwo.exception;

import java.time.Instant;
import java.util.List;

public record ApiError(
        Instant timestamp,
        String code,
        String message,
        List<String> details
) {}
