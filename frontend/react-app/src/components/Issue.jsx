import React from 'react';
import {Link} from "react-router-dom";

const Issue = ({
                 id,
                 summary,
                 details,
                 status,
                 reporter,
                 assignee,
                 deleteClicked,
                 statusFilter
               }) => {
  const isVisible = statusFilter.includes(status)
  const className = isVisible ? '' : 'hidden';
  return (
    <tr className={className}>
        <td className='issue-actions'>
          <Link to={`/issue/${id}`}>Edit</Link>
          <Link to={`/`} onClick={deleteClicked}>Delete</Link>
        </td>
        <td>{status}</td>
        <td>{assignee}</td>
        <td>{reporter}</td>
        <td>{summary}</td>
        <td>{details}</td>
    </tr>
)
}

export default Issue;