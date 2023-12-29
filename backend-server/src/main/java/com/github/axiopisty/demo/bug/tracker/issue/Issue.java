package com.github.axiopisty.demo.bug.tracker.issue;

public record Issue(
  Long id,
  String summary,
  String details,
  IssueStatus status,
  String reporter,
  String assignee
) {}
