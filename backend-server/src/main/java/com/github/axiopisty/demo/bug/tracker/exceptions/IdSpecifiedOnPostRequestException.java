package com.github.axiopisty.demo.bug.tracker.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "ID should not be specified on POST requests", code = HttpStatus.BAD_REQUEST)
public class IdSpecifiedOnPostRequestException extends RuntimeException {}
