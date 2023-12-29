package com.github.axiopisty.demo.bug.tracker.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Missing request body", code = HttpStatus.BAD_REQUEST)
public class RequestBodyMissingException extends RuntimeException {}
