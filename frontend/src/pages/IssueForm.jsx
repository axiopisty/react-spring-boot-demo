import React, {useEffect, useState} from 'react';
import {useParams} from "react-router-dom";
import {BackendService} from "../BackendService.js";

const IssueForm = ({
                     statusOptions,
                     submit,
                     cancel,
                     setError,
                     navigate
                   }) => {
  const [issue, setIssue] = useState({});
  const [newId, setNewId] = useState(0);
  const [newStatus, setNewStatus] = useState('');
  const [newAssignee, setNewAssignee] = useState('');
  const [newReporter, setNewReporter] = useState('');
  const [newSummary, setNewSummary] = useState('');
  const [newDetails, setNewDetails] = useState('');

  const isCreate = !issue.id || issue.id === 0
  const title = isCreate ? 'Create new issue' : `Edit issue: ${issue.id}`;

  const cancelHandler = (event) => {
    event.preventDefault();
    cancel();
    clearForm();
  }

  const saveHandler = (event) => {
    event.preventDefault();
    let updatedIssue;
    if (isCreate) {
      updatedIssue = {
        summary: newSummary,
        details: newDetails,
        reporter: newReporter
      };
    } else {
      updatedIssue = {
        id: newId,
        status: newStatus,
        reporter: newReporter,
        assignee: newAssignee,
        summary: newSummary,
        details: newDetails
      }
    }
    submit(updatedIssue);
    clearForm();
  }

  const clearForm = () => {
    setNewId(0);
    setNewStatus('');
    setNewAssignee('');
    setNewReporter('');
    setNewSummary('');
    setNewDetails('');
  }

  const {id} = useParams()

  useEffect(() => {
    if (id) {
      if (id === 'new') {
        setIssue({})
      } else {
        const fetchIssue = async () => {
          try {
            let issueWithId = await BackendService.getIssueById({setError, id});
            if (!issueWithId.id) {
              setError(`Issue with id ${id} not found.`)
              navigate(`/`)
            } else {
              return issueWithId;
            }
          } catch (error) {
            console.error('Error fetching issue: ', error);
            return {};
          }
        }
        fetchIssue().then(setIssue);
      }
    }
  }, [id]);

  useEffect(() => {
    if (!isCreate) {
      setNewId(issue.id);
      setNewStatus(issue.status);
      setNewAssignee(issue.assignee);
      setNewReporter(issue.reporter);
      setNewSummary(issue.summary);
      setNewDetails(issue.details);
    }
  }, [issue]);

  return (
    <form>
      <fieldset>
        <legend>{title}</legend>
        {isCreate ? '' : <div key={"status"}>
          <div>
            <label htmlFor="status">Status</label>
          </div>
          <div>
            <select
              id="status"
              value={newStatus}
              onChange={e => setNewStatus(e.target.value)}
            >
              {statusOptions.map((statusOption) => (
                <option key={statusOption} value={statusOption}>{statusOption}</option>
              ))}
            </select>
          </div>
        </div>}
        {isCreate ? '' : <div key={"assignee"}>
          <div>
            <label htmlFor="assignee">Assignee</label>
          </div>
          <div>
            <input
              id="assignee"
              type="text"
              value={newAssignee}
              onChange={e => setNewAssignee(e.target.value)}
            />
          </div>
        </div>}
        <div key={"reporter"}>
          <div>
            <label htmlFor="reporter">Reporter</label>
          </div>
          <div>
            <input
              id="reporter"
              type="text"
              value={newReporter}
              onChange={e => setNewReporter(e.target.value)}
            />
          </div>
        </div>
        <div key={"summary"}>
          <div>
            <label htmlFor="summary">Summary</label>
          </div>
          <div>
            <input
              id="summary"
              type="text"
              value={newSummary}
              onChange={e => setNewSummary(e.target.value)}
            />
          </div>
        </div>
        <div key={"details"}>
          <div>
            <label htmlFor="details">Details</label>
          </div>
          <div>
          <textarea
            id="details"
            rows={4}
            value={newDetails}
            onChange={e => setNewDetails(e.target.value)}
          />
          </div>
        </div>
        <div key={'actions'}>
          <div>
          </div>
          <div className='actions'>
            <button id={'submit'} type={"button"} className={'btn blue'} onClick={saveHandler}>Save</button>
            <button type={"button"} onClick={cancelHandler} className={'btn red'}>Cancel</button>
          </div>
        </div>
      </fieldset>
    </form>
  )
}

export default IssueForm;