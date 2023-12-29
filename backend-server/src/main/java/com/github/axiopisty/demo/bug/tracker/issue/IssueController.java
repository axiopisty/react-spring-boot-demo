package com.github.axiopisty.demo.bug.tracker.issue;

import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

@RestController
@RequiredArgsConstructor
public class IssueController {

  private final IssueService issueService;
  
  @PostMapping("/api/issue")
  public Mono<Issue> create(@RequestBody Issue issue) {
    return issueService.create(issue);
  }
  
  @PutMapping("/api/issue")
  public Mono<Issue> update(@RequestBody Issue issue) {
    return issueService.update(issue);
  }
  
  @GetMapping("/api/issues")
  public Flux<Issue> getAll() {
    return issueService.getAll();
  }
  
  @GetMapping("/api/issue/{id}")
  public Mono<Issue> getById(@PathVariable Long id) {
    return issueService.getById(id);
  }
  
  @DeleteMapping("/api/issue/{id}")
  public Mono<Void> deleteById(@PathVariable Long id) {
    return issueService.deleteById(id);
  }

}
