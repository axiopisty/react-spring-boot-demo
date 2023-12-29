package com.github.axiopisty.demo.bug.tracker.exceptions;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ResponseStatus;

@ResponseStatus(reason = "ID should be specified on PUT requests", code = HttpStatus.BAD_REQUEST)
public class IdNotSpecifiedOnPutRequestException extends RuntimeException {}
