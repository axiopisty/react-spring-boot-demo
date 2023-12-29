package com.github.axiopisty.demo.bug.tracker.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "Resource not found", code = HttpStatus.NOT_FOUND)
public class ResourceNotFoundException extends RuntimeException {}
