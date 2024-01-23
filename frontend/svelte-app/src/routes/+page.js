export async function load({fetch}) {
  return {
    "issues": [
      {
        "id": 1,
        "summary": "summary 1",
        "details": "details 1",
        "status": "OPEN",
        "reporter": "reporter 1",
        "assignee": "Unassigned"
      },
      {
        "id": 2,
        "summary": "bar",
        "details": "baz",
        "status": "OPEN",
        "reporter": "foo",
        "assignee": "Unassigned"
      }
    ]
  };
}