<script>
  export let issue;
  let {
    id,
    status,
    assignee,
    reporter,
    summary,
    details
  } = issue;
</script>

<tr>
  <td>
    <a href="/issue/{id}">Edit</a>
    <a href="/">Delete</a>
  </td>
  <td>{status}</td>
  <td>{assignee}</td>
  <td>{reporter}</td>
  <td>{summary}</td>
  <td>{details}</td>
</tr>
