/**
 * saveIssue - create/edit issue in the backend database
 * @param issue - the issue to save.
 * @param issue.id - the id of the issue to save. Only available for edits.
 * @param issue.status - the status of the issue. Only available for edits.
 * @param issue.assignee - the assignee of the issue. Only available for edits.
 * @param issue.reporter - the reporter of the issue.
 * @param issue.summary - the summary of the issue.
 * @param issue.details - the description of the issue.
 * @returns a promise that resolves to the persisted issue if
 * the issue is successfully saved, otherwise resolves to an
 * object with an error message and the issue that failed to be
 * saved.
 */
const saveIssue = async ({setError, issue}) => {
  let persistedIssue = {};
  try {
    const method = issue.id && issue.id > 0 ? 'PUT' : 'POST';
    let options = {
      method: `${method}`,
      body: JSON.stringify(issue),
      headers: {
        'Content-Type': 'application/json'
      }
    };

    /*
     * See IssueController.java for the backend code that handles
     * this request.
     */
    const res = await fetch('/api/issue', options);

    if (!res.ok) {
      persistedIssue = {
        error: 'Error saving issue',
        newIssue: issue,
      };
      console.error('Error saving issue: ', issue);
    } else {
      persistedIssue = await res.json();
    }
  } catch (error) {
    console.error('Error saving issue: ', error);
    setError('Error saving issue')
  }
  return persistedIssue
}

/**
 * getIssueById - get an issue by its id
 * @param id - the id of the issue to get
 * @returns a promise that resolves to the http response
 * body returned by the backend. If the issue is successfully
 * retrieved, the body will be the issue object.
 */
const getIssueById = async ({setError, id}) => {
  /*
   * See IssueController.java for the backend code that handles
   * this request.
   */
  try {
    const res = await fetch(`/api/issue/${id}`)
    return await res.json()
  } catch (error) {
    console.error('Error getting issue by id: ', error);
    setError('Error getting issue by id: ' + id)
  }
}

/**
 * getAllIssues - get all issues from the backend database
 * @returns a promise that resolves to the http response
 * body returned by the backend. If the issues are successfully
 * retrieved, the body will be an array of issue objects.
 */
const getAllIssues = async ({setError}) => {
  try {
    /*
     * See IssueController.java for the backend code that handles
     * this request.
     */
    const res = await fetch(`/api/issues`)
    return await res.json()
  } catch (error) {
    console.error('Error getting all issues: ', error);
    setError('Error getting all issues')
  }
}

/**
 * deleteIssue - delete an issue from the backend database
 * @param id - the id of the issue to delete
 */
const deleteIssue = async ({setError, id}) => {
  try {
    /*
     * See IssueController.java for the backend code that handles
     * this request.
     */
    await fetch(`/api/issue/${id}`, {method: 'DELETE',});
  } catch (error) {
    console.error(`Error deleting issue ${id}: `, error);
    setError('Error deleting issue')
  }
}

/**
 * BackendService - a service that provides methods for interacting
 * with the bug tracker backend. All backend interactions commence
 * in IssueController.java
 */
export const BackendService = {
  saveIssue,
  getAllIssues,
  getIssueById,
  deleteIssue,
}
