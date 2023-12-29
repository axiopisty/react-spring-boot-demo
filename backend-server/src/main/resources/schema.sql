CREATE TABLE issue (
  id BIGINT AUTO_INCREMENT PRIMARY KEY,
  summary VARCHAR(255),
  details TEXT,
  status VARCHAR(50),
  reporter VARCHAR(100),
  assignee VARCHAR(100)
);