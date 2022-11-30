import React from "react";

function JobTags({ tags }) {
  return (
    <div className="sidebar-border">
      <h6 className="f-18">Tags</h6>
      <div className="sidebar-list-job">
        {tags &&
          tags.map((tag, index) => (
            <a
              key={index}
              className="btn btn-grey-small bg-14 mb-10 mr-5"
              href={`jobs/${tag}`}
            >
              {tag}
            </a>
          ))}
      </div>
    </div>
  );
}

export default JobTags;
