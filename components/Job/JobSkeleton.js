import React from 'react'
import Skeleton, { SkeletonTheme } from 'react-loading-skeleton'

function JobSkeleton() {
  return (
    <>
      <section className="section-box-2">
        <div className="container-fluid">
          <div className="">
            <div className="row">
              <div className="col-lg-12 col-md-12">
                    <Skeleton height={220} count={5}/>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default JobSkeleton