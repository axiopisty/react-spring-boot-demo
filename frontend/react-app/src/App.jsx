import React, {useEffect, useState} from 'react';
import {Route, Routes, useNavigate} from "react-router-dom";
import {BackendService} from "./BackendService.js";
import Layout from "./components/Layout.jsx";
import NoPage from "./components/NoPage.jsx";
import IssueForm from "./pages/IssueForm.jsx";
import IssueList from "./pages/IssueList.jsx";
import './App.css';

const App = () => {
  const statusOptions = ['OPEN', 'IN_PROGRESS', 'RESOLVED', 'CLOSED'];
  const [statusFilter, setStatusFilter] = useState(statusOptions);
  const [sortConfig, setSortConfig] = useState({id: 'status', direction: 'asc'});
  const [issues, setIssues] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchIssues = async () => {
      try {
        return await BackendService.getAllIssues({setError});
      } catch (error) {
        console.error('Error fetching issues: ', error);
        setError('Error fetching issues. Is the backend service running?');
      }
    }
    fetchIssues().then(setIssues);
  }, []);

  const sortIssues = (config) => {
    setSortConfig(config)
    const {id, direction} = config;
    if (id) {
      const asc = direction === 'asc';
      /* Sort the issues by the id field */
      const sorted = [...issues].sort((a, b) => {
        if (a[id] < b[id]) return asc ? -1 : 1;
        if (a[id] > b[id]) return asc ? 1 : -1;
        return 0;
      });
      setIssues(sorted);
    }
  }

  /*
   * When the application initially loads, fetch the issues from the backend
   * database and cache them locally in the issues store.
   */
  useEffect(() => {
    sortIssues(sortConfig)
  }, [sortConfig]);

  /**
   * deleteHandler - deletes the specified issue from the backend database.
   * @param id - the id of the issue to be deleted
   */
  const deleteHandler = async (id) => {
    try {
      await BackendService.deleteIssue({setError, id});
      setIssues(issues.filter((issue) => issue.id !== id));
    } catch (error) {
      setError('Error deleting issue. Is the backend service running?');
    }
  }

  /**
   * clearIssue - clears the issue being edited in the form.
   */
  const clearIssue = () => {
    navigate('/');
  }

  /**
   * saveIssue - saves the specified issue in the backend database.
   * If saved successfully, stores the persisted issue in the local
   * issue store and clears the issue being edited in the form.
   * @param issue - the issue to be saved in the database
   */
  const saveIssue = (issue) => {
    const save = async () => {
      let persistedIssue = {};
      try {
        persistedIssue = await BackendService.saveIssue({setError, issue});
      } catch (error) {
        console.error('Error saving issue: ', error);
      }
      return persistedIssue;
    }
    save().then((persistedIssue) => {
      /*
       * Check if the issue being saved is a new issue or an existing issue.
       * If it is a new issue, add it to the issues store.
       * If it is an existing issue, replace the existing issue in the issues store
       * without changing the issues ordering in the table.
       */
      if (issue.id === undefined) {
        setIssues(prevIssues => {
          return [...prevIssues, persistedIssue]
        })
      } else {
        setIssues(prevIssues => {
          return prevIssues.map(previousIssue => previousIssue.id === persistedIssue.id ? persistedIssue : previousIssue)
        })
      }
      navigate('/');
    });
  }

  return (
    <>
      {error ?
        <div className={'error'}>
          <button className={'btn dismiss'} onClick={() => setError(null)}>X</button>
          {error}
        </div>
        :
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route
              index
              element={<IssueList
                issues={issues}
                setIssues={setIssues}
                deleteHandler={deleteHandler}
                statusOptions={statusOptions}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                sortConfig={sortConfig}
                setSortConfig={setSortConfig}
              />}/>
            <Route path="issue/:id" element={<IssueForm
              statusOptions={statusOptions}
              submit={saveIssue}
              cancel={clearIssue}
              setError={setError}
              navigate={navigate}
            />}/>
            <Route path="*" element={<NoPage/>}/>
          </Route>
        </Routes>
      }
    </>
  );
}

export default App;