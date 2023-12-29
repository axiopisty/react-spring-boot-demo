package com.github.axiopisty.demo.bug.tracker.issue.internal;

import com.github.axiopisty.demo.bug.tracker.issue.Issue;
import org.springframework.stereotype.Component;

@Component
public class IssueMapper {
  
  public Issue toDto(IssueEntity issue) {
    return new Issue(
      issue.getId(),
      issue.getSummary(),
      issue.getDetails(),
      issue.getStatus(),
      issue.getReporter(),
      issue.getAssignee()
    );
  }
  
  public IssueEntity toEntity(Issue issue) {
    return new IssueEntity(
      issue.id(),
      issue.summary(),
      issue.details(),
      issue.status(),
      issue.reporter(),
      issue.assignee()
    );
  }
  
}
