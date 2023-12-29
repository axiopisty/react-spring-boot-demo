package com.github.axiopisty.demo.bug.tracker.issue.internal;

import org.springframework.data.repository.reactive.ReactiveCrudRepository;

public interface IssueRepository extends ReactiveCrudRepository<IssueEntity, Long> {
}
