import Link from "next/link";
import React from "react";

function ApplySection() {
  return (
    <>
      <div className="section-box mb-30">
        <div className="container">
          <div className="box-we-hiring bg-light neomp1">
            <div className="text-1">
              <span className="text-we-are">We are</span>
              <span className="text-hiring">Hiring</span>
            </div>
            <div className="text-2">
              Let&rsquo;s <span className="color-brand-1">Work</span> Together
              <br /> &amp; <span className="color-brand-1">Explore</span>{" "}
              Opportunities
            </div>
            <div className="text-3">
              <Link href="/jobs">
                <button className="btn btn-apply-now px-5">Jobs</button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default ApplySection;
