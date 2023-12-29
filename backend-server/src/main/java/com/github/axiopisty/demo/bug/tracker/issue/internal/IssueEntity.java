package com.github.axiopisty.demo.bug.tracker.issue.internal;

import com.github.axiopisty.demo.bug.tracker.issue.IssueStatus;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;
import org.springframework.data.annotation.Id;
import org.springframework.data.relational.core.mapping.Table;

@Table(name = "issue")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class IssueEntity {
  
  /**
   * The unique identifier for this issue.
   * This is the database primary key.
   */
  @Id
  private Long id;
  
  /**
   * A short summary of the issue.
   */
  private String summary;
  
  /**
   * A longer description of the issue.
   */
  private String details;
  
  /**
   * The current status of the issue.
   */
  private IssueStatus status;
  
  /**
   * The name of the person who reported this issue.
   */
  private String reporter;
  
  /**
   * The person to whom this issue is assigned.
   * In a real application, this would be a foreign key to a user assigned to this issue.
   * But for the sake of simplicity in this example, we'll just store the value as a String.
   */
  private String assignee;
  
}
