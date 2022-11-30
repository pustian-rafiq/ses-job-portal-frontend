import React, { useState, useEffect } from "react";
import ReactPaginate from "react-paginate";

import Meta from "../components/Meta/Meta";
import MasterLayout from "../Layouts/MasterLayout";
import SearchBar from "../components/Common/SearchBar";
import JobList from "../components/Job/JobList";
import AdvancedFilter from "../components/Job/AdvancedFilter";
import ScrollButton from "../components/Common/ScrollButton";
import { useRouter } from "next/router";
import publicApi from "../services/publicApi";
import { salaryJsonData } from "../utils/salaryJsonData";
import JobSkeleton from "../components/Job/JobSkeleton";
import MobileAdvancedFilter from "../components/Job/MobileAdvancedFilter";
import { FaFilter } from "react-icons/fa";

function Jobs(props) {
  const [jobList, setJobList] = useState([]);
  const router = useRouter();
  const [searchContent, setSearchContent] = useState("");
  const [search, setSearch] = useState("");
  const [isLoading, setIsloading] = useState(false);

  const [categoryData, setCategoryData] = useState("");
  const [salaryData, setSalaryData] = useState("");
  const [skillData, setSkillData] = useState("");
  const [searchData, setSearchData] = useState("");
  const [placeData, setPlaceData] = useState("");
  const [experienceData, setExperienceData] = useState("");
  const [periodData, setPeriodData] = useState("");

  const [totalJobs, setTotalJobs] = useState(0);
  const [totalSearchJobs, setTotalSearchJobs] = useState(-1);
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const jobsPerPage = 5;

  const [showAdvancedFilter, setShowAdvancedFilter] = useState(false);

  // const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  //filter jobs of own

  const FilterItems = async (
    categoryContent,
    placeContent,
    priceContent,
    searchContent,
    requiredSkillContent,
    requiredExpContent,
    periodContent
  ) => {
    // console.log(categoryContent,requiredSkillContent);
    // setFilterItems(filterItems)

    if (
      categoryContent ||
      placeContent ||
      priceContent ||
      searchContent ||
      requiredSkillContent ||
      requiredExpContent ||
      periodContent
    ) {
      const res = await publicApi.get(
        `/job-search/?start=${itemOffset}&length=${jobsPerPage}&search=${searchContent}&place=${placeContent}&category=${categoryContent}&unit_price=${priceContent}&required_skills=${requiredSkillContent}&required_experience=${requiredExpContent}&period=${periodContent}`
      );

      if (res.status === 200) {
        setSearchContent(res.data);
        setTotalSearchJobs(res.data.total_jobs);
        setIsloading(false);
      }
    }
  };

  useEffect(() => {
    fetchData();
    setPageCount(
      Math.ceil(
        totalSearchJobs >= 0
          ? totalSearchJobs / jobsPerPage
          : totalJobs / jobsPerPage
      )
    );
  }, [itemOffset, jobsPerPage, pageCount, totalJobs, totalSearchJobs, search]);

  //This useEffect is used for job searching and filtering
  useEffect(() => {
    setSearch(
      router.query.search ||
        router.query.place ||
        router.query.category ||
        router.query.required_skills ||
        router.query.unit_price ||
        router.query.required_experience ||
        router.query.period
    );
    fetchSearchData(
      router.query.search,
      router.query.place,
      router.query.category,
      router.query.required_skills,
      router.query.unit_price,
      router.query.required_experience,
      router.query.period
    );
    setCategoryData(router.query.category);
    setSalaryData(router.query.unit_price);
    setSkillData(router.query.required_skills);
    setSearchData(router.query.search);
    setPlaceData(router.query.place);
    setExperienceData(router.query.required_experience);
    setPeriodData(router.query.period);
  }, [
    router.query.search,
    router.query.place,
    router.query.category,
    router.query.required_skills,
    router.query.unit_price,
    router.query.required_experience,
    router.query.period,
  ]);

  //Fetch all jobs data
  const fetchData = async () => {
    // console.log("fetchData");
    setIsloading(true);
    const res = await publicApi.get(
      `/jobs?start=${itemOffset}&length=${jobsPerPage}`
    );
    if (res.status === 200) {
      setTotalJobs(res.data.total_jobs);
      setJobList(res.data);
      setIsloading(false);
    }
  };

  //Fetch search data
  const fetchSearchData = async (
    search = "",
    place = "",
    category = "",
    skill = "",
    salary = "",
    experience = "",
    period = ""
  ) => {
    // console.log("category",category);
    setIsloading(true);
    if (
      search ||
      category ||
      place ||
      skill ||
      salary ||
      experience ||
      period
    ) {
      const res = await publicApi.get(
        `/jobs/?start=${itemOffset}&length=${jobsPerPage}&search=${search}&place=${place}&category=${category}&unit_price=${salary}&required_skills=${skill}&required_experience=${experience}&period=${period}`
      );

      if (res.status === 200) {
        setSearchContent(res.data);
        setTotalSearchJobs(res.data.total_jobs);
        setIsloading(false);
        setShowAdvancedFilter(false)
      }
    }
  };

  const handlePageClick = (event) => {
    const newOffset = event.selected * jobsPerPage;
    setItemOffset(newOffset);
    fetchSearchData(
      router.query.search,
      router.query.place,
      router.query.category,
      router.query.required_skills,
      router.query.unit_price,
      router.query.required_experience,
      router.query.period
    );
    document.body.scrollTop = 300; // For Safari
    document.documentElement.scrollTop = 300; // For Chrome, Firefox, IE and Opera
  };

  // const showAdvancedFilter = () => {
  //    alert("ok")
  // };

  return (
    <>
      <Meta title="Jobs | SES Job portal" />
      <div className="container">
        <main className="main">
          <section className="section-box-2">
            <div className="container">
              <div className="banner-hero banner-single banner-single-bg">
                <div className="block-banner text-center">
                  <h3 className="wow animate__animated animate__fadeInUp">
                    <span className="color-brand-2">
                      {search && searchContent?.jobs?.length < 1
                        ? searchContent?.total_jobs
                        : search && searchContent?.jobs?.length > 0
                        ? searchContent?.total_jobs
                        : jobList.total_jobs}{" "}
                      Jobs
                    </span>{" "}
                    Available Now
                  </h3>
                  <div
                    className="font-sm color-text-paragraph-2 mt-10 wow animate__animated animate__fadeInUp"
                    data-wow-delay=".1s"
                  >
                    Lorem ipsum dolor sit amet consectetur adipisicing elit.
                    Vero repellendus magni, <br className="d-none d-xl-block" />
                    atque delectus molestias quis?
                  </div>
                  <SearchBar
                    categoryData={categoryData}
                    placeData={router.query.place}
                    searchData={router.query.search}
                  />
                </div>
              </div>
            </div>
          </section>
          <section className="section-box mt-30">
            <div className="container">
              <div className="row flex-row-reverse">
               
                <div className="col-lg-9 col-md-12 col-sm-12 col-12 float-right">
                  {/* <JobList jobs={ searchContent.length >0 ? searchContent : jobList} /> */}
                
                  {isLoading ? (
                    <JobSkeleton />
                  ) : (
                    
                    <>
                      <div className="float-end filter-show" style={{ cursor: "pointer"}} title="Filter Jobs"  onClick={()=> setShowAdvancedFilter(true)}>Filter <FaFilter className="filter-icon" /></div>
                      <JobList
                        jobs={jobList}
                        searchContent={searchContent}
                        search={search}
                        totalJobs={totalJobs}
                        totalSearchJobs={totalSearchJobs}
                        offset={itemOffset}
                        jobsPerPage={jobsPerPage}
                      />
                      <div className="paginations">
                        <ReactPaginate
                          breakLabel="..."
                          nextLabel=">"
                          onPageChange={handlePageClick}
                          pageRangeDisplayed={3}
                          pageCount={pageCount}
                          previousLabel="<"
                          renderOnZeroPageCount={null}
                          containerClassName="pager"
                          pageLinkClassName="page-number"
                          forcePage={itemOffset / jobsPerPage}
                          activeLinkClassName="active"
                        />
                      </div>
                    </>
                  )}
                 
                </div>
                <div className="col-lg-3 col-md-3 col-sm-12 col-12 filter-hide">
                  <AdvancedFilter
                    salaryJsonData={salaryJsonData}
                    categoryData={categoryData}
                    salaryData={salaryData}
                    skillData={skillData}
                    placeData={placeData}
                    searchData={searchData}
                    experienceData={experienceData}
                    periodData={periodData}
                    setCategoryData={setCategoryData}
                    setSalaryData={setSalaryData}
                    setSkillData={setSkillData}
                    setPlaceData={setPlaceData}
                    setSearchData={setSearchData}
                    setExperienceData={setExperienceData}
                    setPeriodData={setPeriodData}
                    filterItemSelection={FilterItems}
                  />
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    <MobileAdvancedFilter
      show={showAdvancedFilter}
      onHide={()=> setShowAdvancedFilter(false)}

      salaryJsonData={salaryJsonData}
      categoryData={categoryData}
      salaryData={salaryData}
      skillData={skillData}
      placeData={placeData}
      searchData={searchData}
      experienceData={experienceData}
      periodData={periodData}
      setCategoryData={setCategoryData}
      setSalaryData={setSalaryData}
      setSkillData={setSkillData}
      setPlaceData={setPlaceData}
      setSearchData={setSearchData}
      setExperienceData={setExperienceData}
      setPeriodData={setPeriodData}
      filterItemSelection={FilterItems}
    />
      <ScrollButton />
    </>
  );
}

Jobs.Layout = MasterLayout;

export default Jobs;
