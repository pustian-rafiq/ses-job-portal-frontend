import React from "react";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import ProfileSidebarTablist from "./ProfileSidebarTablist";

function ProfileSkeleton() {
  return (
    <>
      {/* <section className="section-box-2">
        <div className="container">
          <div className="box-company-profile">
            <div className="row mt-10">
              <div className="col-lg-2 col-md-6">
                  <Skeleton height={150} width={150}/>
              </div>
              <div className="col-lg-6 col-md-12">
                    <Skeleton height={50} count={5}/>
              </div>
              <div className="col-lg-4 col-md-12 text-lg-end">
                <Skeleton height={50} count={5}/>
              </div>
            </div>
          </div>

          <div className="box-company-profile">
            <div className="row mt-10">
                <Skeleton height={60} count={4}/>
            </div>
          </div>

        </div>
      </section> */}

      <section className="section-box">
        <div className="container">
          <div className="row">
            <div className="col-lg-3 col-md-4 col-sm-12 mt-30">
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
              <Skeleton height={60} />
            </div>
            <div className="col-lg-9 col-md-8 col-sm-12 col-12 mb-50">
              <div className="box-company-profile">
                <div className="row mt-10">
                  <div className="col-lg-2 col-md-6">
                    <Skeleton height={150} width={150} />
                  </div>
                  <div className="col-lg-6 col-md-12">
                    <Skeleton height={50} count={5} />
                  </div>
                  <div className="col-lg-4 col-md-12 text-lg-end">
                    <Skeleton height={50} count={5} />
                  </div>
                </div>
              </div>

              <div className="box-company-profile">
                <div className="row mt-10">
                  <Skeleton height={60} count={4} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default ProfileSkeleton;
