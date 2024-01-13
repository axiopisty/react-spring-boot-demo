import React from "react";
import Issue from "../components/Issue.jsx";
import {Link} from "react-router-dom";
import SortableHeader from "../components/SortableHeader.jsx";
import StatusFilter from "../components/StatusFilter.jsx";

const IssueList = ({
                     issues,
                     setIssues,
                     deleteHandler,
                     statusOptions,
                     statusFilter,
                     setStatusFilter,
                     sortConfig,
                     setSortConfig
                   }) => {
  return (
    <>
      <Link to="/issue/new">Create New Issue</Link>
      {
        issues.length > 0 ?
          <div>
            {issues.length < 2 ? null :
              <StatusFilter
                issues={issues}
                setIssues={setIssues}
                statusOptions={statusOptions}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
              />
            }
            <h2>Issues</h2>
            <table>
              <thead>
              <tr>
                <th></th>
                <SortableHeader id={'status'} sortConfig={sortConfig} setSortConfig={setSortConfig}/>
                <SortableHeader id={'assignee'} sortConfig={sortConfig} setSortConfig={setSortConfig}/>
                <SortableHeader id={'reporter'} sortConfig={sortConfig} setSortConfig={setSortConfig}/>
                <SortableHeader id={'summary'} sortConfig={sortConfig} setSortConfig={setSortConfig}/>
                <SortableHeader id={'details'} sortConfig={sortConfig} setSortConfig={setSortConfig}/>
              </tr>
              </thead>
              <tbody>
              {issues.map((issue) => (
                <Issue
                  key={issue.id}
                  {...issue}
                  deleteClicked={() => deleteHandler(issue.id)}
                  statusFilter={statusFilter}
                />
              ))}
              </tbody>
            </table>
          </div>
          :
          <p>No bugs found!</p>
      }
    </>
  );
}

export default IssueList;