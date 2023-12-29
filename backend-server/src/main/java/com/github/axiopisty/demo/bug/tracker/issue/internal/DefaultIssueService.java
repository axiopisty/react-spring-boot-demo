package com.github.axiopisty.demo.bug.tracker.issue.internal;

import com.github.axiopisty.demo.bug.tracker.issue.Issue;
import com.github.axiopisty.demo.bug.tracker.issue.IssueStatus;
import com.github.axiopisty.demo.bug.tracker.exceptions.IdNotSpecifiedOnPutRequestException;
import com.github.axiopisty.demo.bug.tracker.exceptions.IdSpecifiedOnPostRequestException;
import com.github.axiopisty.demo.bug.tracker.exceptions.RequestBodyMissingException;
import com.github.axiopisty.demo.bug.tracker.exceptions.ResourceNotFoundException;
import com.github.axiopisty.demo.bug.tracker.issue.IssueService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@Service
@RequiredArgsConstructor
public class DefaultIssueService implements IssueService {
  
  private final IssueMapper issueMapper;
  private final IssueRepository issueRepository;
  
  @Override
  public Mono<Issue> create(Issue issue) {
    /*
     * In a real application I would perform thorough validation. But for this simple
     * example, I'll just do some basic validation and set some default values.
     */
    if(issue == null) {
      return Mono.error(new RequestBodyMissingException());
    }
    if(issue.id() != null) {
      return Mono.error(new IdSpecifiedOnPostRequestException());
    }
    final IssueEntity entity = issueMapper.toEntity(issue);
    entity.setStatus(IssueStatus.OPEN);
    entity.setAssignee("Unassigned");
    return issueRepository.save(entity).map(issueMapper::toDto);
  }
  
  @Override
  public Mono<Issue> update(Issue issue) {
    /*
     * In a real application I would perform thorough validation. But for this simple
     * example, I'll just do some basic validation.
     */
    if(issue == null) {
      return Mono.error(new RequestBodyMissingException());
    }
    if(issue.id() == null) {
      return Mono.error(new IdNotSpecifiedOnPutRequestException());
    }
    final IssueEntity entity = issueMapper.toEntity(issue);
    return issueRepository.save(entity).map(issueMapper::toDto);
  }
  
  @Override
  public Mono<Issue> getById(Long id) {
    return issueRepository.findById(id).map(issueMapper::toDto).switchIfEmpty(Mono.error(new ResourceNotFoundException()));
  }
  
  @Override
  public Flux<Issue> getAll() {
    return issueRepository.findAll().map(issueMapper::toDto);
  }
  
  @Override
  public Mono<Void> deleteById(Long id) {
    return issueRepository.deleteById(id);
  }
  
}
