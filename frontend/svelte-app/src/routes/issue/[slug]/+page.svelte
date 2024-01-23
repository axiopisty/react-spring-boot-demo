<script>
  /** @type {import('./$types').PageData} */
  export let data;
  const {isCreate, title, id} = data;
  const statusOptions = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
</script>

<form>
  <fieldset>
    <legend>{title}</legend>

    {#if !isCreate}
      <div>
        <div>
          <label for="status">Status</label>
          <select name="status">
            {#each statusOptions as statusOption}
              <option value={statusOption}>{statusOption}</option>
            {/each}
          </select>
        </div>
      </div>
    {/if}
  </fieldset>
</form>

<style>

</style>