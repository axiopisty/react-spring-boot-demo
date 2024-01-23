// import '@lib/BackendService.js';
import {error} from '@sveltejs/kit';

/** @type {import('./$types').PageLoad} */
export async function load({ fetch, params}) {

  function isInt(value) {
    if (isNaN(value)) {
      return false;
    }
    const x = parseFloat(value);
    return (x | 0) === x;
  }


  /**
   * getIssueById - get an issue by its id
   * @param id - the id of the issue to get
   * @returns a promise that resolves to the http response
   * body returned by the backend. If the issue is successfully
   * retrieved, the body will be the issue object.
   */
  const getIssueById = async ({id}) => {
    /*
     * See IssueController.java for the backend code that handles
     * this request.
     */
    try {
      const res = await fetch(`/api/issue/${id}`)
      return await res.json()
    } catch (error) {
      console.error('Error getting issue by id: ', error);
    }
  }


  let id;
  if(isInt(params.slug)) {
    id = parseInt(params.slug);
    const issue = getIssueById({id})
    console.log(issue);
  } else if (params.slug === 'new') {
    id = 0;
  } else {
    id = undefined;
  }

  const isCreate = !id || id === 0;
  const title = isCreate ? 'Create new issue' : `Edit issue: ${id}`;

  return {
    isCreate,
    title,
    id
  }



}