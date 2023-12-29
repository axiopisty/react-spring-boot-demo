package com.github.axiopisty.demo.bug.tracker.issue;

import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

public interface IssueService {
  
  Mono<Issue> create(Issue issue);
  
  Mono<Issue> update(Issue issue);
  
  Mono<Issue> getById(Long id);
  
  Flux<Issue> getAll();
  
  Mono<Void> deleteById(Long id);
}
