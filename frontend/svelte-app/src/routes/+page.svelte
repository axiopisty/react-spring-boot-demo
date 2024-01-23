<script>
  import Issue from "./Issue.svelte";

  export let data;

  $: issues = data.issues;

</script>


<h1>Bug Tracker</h1>
<a href="/issue/new">Create New Issue</a>

{#if issues.length === 0}
  <p>No bugs found!</p>
{:else}
  <h2>Issues</h2>
  <table>
    <thead>
      <tr>
        <th></th>
        <th>Status</th>
        <th>Assignee</th>
        <th>Reporter</th>
        <th>Summary</th>
        <th>Details</th>
      </tr>
    </thead>
    <tbody>
      {#each issues as issue (issue.id)}
        <Issue issue="{issue}"/>
      {/each}
    </tbody>
  </table>
{/if}