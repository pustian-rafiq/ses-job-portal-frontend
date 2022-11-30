import React from "react";
import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import { appContext } from "../../pages/_app";
import {
  skillJsonData,
  salaryJsonData,
  experienceJsonData,
} from "../../utils/salaryJsonData";
import { FaAngleDoubleDown, FaAngleDoubleUp } from "react-icons/fa";

function AdvancedFilter({
  categoryData,
  salaryData,
  skillData,
  placeData,
  searchData,
  experienceData,
  periodData,
  setCategoryData,
  setSalaryData,
  setSkillData,
  setPlaceData,
  setSearchData,
  setExperienceData,
  setPeriodData,
}) {
  //Fetch category data
  const { categories } = useContext(appContext);
 

  const [salaryContent, setSalaryContent] = useState(salaryData);
  const [categoryContent, setCategoryContent] = useState(categoryData);
  // const [placeContent, setPlaceContent] = useState(placeData);
  // const [searchContent, setSearchContent] = useState(searchData);
  // const[skillContent,setSkillContent] = useState("");

  const [requiredSkillContent, setRequiredSkillContent] = useState(skillData);
  const [requiredExpContent, setRequiredExpContent] = useState(experienceData);
  const [periodContent, setPeriodContent] = useState(periodData);

  const [isOpenMoreSalary, setIsOpenMoreSalary] = useState(true);
  const [isOpenMoreSkill, setIsOpenMoreSkill] = useState(true);
  const [isOpenMoreExp, setIsOpenMoreExp] = useState(true);

  const router = useRouter();

  //This handler taks filter item and call jobs search api
  const filterItems = (e) => {
    let value = e.target.value;
    value = value.split(",");

    if (value[0] === "category" && value[1] != categoryContent) {
      setCategoryContent(value[1]);
      onchangeFilterItem(
        value[1],
        placeData,
        salaryData,
        searchData,
        skillData,
        experienceData,
        periodData
      );
    } else if (value[0] === "skill" && value[1] != requiredSkillContent) {
      setRequiredSkillContent(value[1]);
      onchangeFilterItem(
        categoryData,
        placeData,
        salaryData,
        searchData,
        value[1],
        experienceData,
        periodData
      );
    } else if (value[0] === "salary" && value[1] != salaryContent) {
      console.log("salary",salaryContent);
      setSalaryContent(value[1]);
      onchangeFilterItem(
        categoryData,
        placeData,
        value[1],
        searchData,
        skillData,
        experienceData,
        periodData
      );
    } else if (value[0] === "period" && value[1] != periodContent) {
      // console.log("periodContent");
      setPeriodContent(value[1]);
      onchangeFilterItem(
        categoryData,
        placeData,
        salaryData,
        searchData,
        skillData,
        experienceData,
        value[1]
      );
    } else if (value[0] === "experience" && value[1] != requiredExpContent) {
      setRequiredExpContent(value[1]);
      onchangeFilterItem(
        categoryData,
        placeData,
        salaryData,
        searchData,
        skillData,
        value[1],
        periodData
      );
    } else {
      if (value[0] === "salary") {
        setSalaryContent("");
        onchangeFilterItem(
          categoryData,
          placeData,
          "",
          searchData,
          skillData,
          experienceData,
          periodData
        );
      } else if (value[0] === "skill") {
        setRequiredSkillContent("");
        onchangeFilterItem(
          categoryData,
          placeData,
          salaryData,
          searchData,
          "",
          experienceData,
          periodData
        );
      } else if (value[0] === "category") {
        setCategoryContent("");
        onchangeFilterItem(
          "",
          placeData,
          salaryData,
          searchData,
          skillData,
          experienceData,
          periodData
        );
      } else if (value[0] === "period") {
        setPeriodContent("")
        onchangeFilterItem(
          categoryData,
          placeData,
          salaryData,
          searchData,
          skillData,
          experienceData,
          ""
        );
      } else if (value[0] === "experience") {
        setRequiredExpContent("")
        onchangeFilterItem(
          categoryData,
          placeData,
          salaryData,
          searchData,
          skillData,
          "",
          periodData
        );
      }
    }
  };

  //Fetch filters data
  const onchangeFilterItem = (
    categoryData,
    placeData,
    salaryData,
    searchData,
    skillData,
    experienceData,
    periodData
  ) => {
    if (
      categoryData &&
      placeData &&
      salaryData &&
      searchData &&
      skillData &&
      experienceData &&
      periodData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          required_skills: skillData ? skillData : "",
          required_experience: experienceData ? experienceData : "",
          period: periodData ? periodData : "",
        },
      });
    } else if (
      categoryData &&
      placeData &&
      salaryData &&
      searchData &&
      skillData &&
      experienceData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          required_skills: skillData ? skillData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (
      categoryData &&
      searchData &&
      placeData &&
      salaryData &&
      skillData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (
      categoryData &&
      searchData &&
      placeData &&
      salaryData &&
      periodData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          period: periodData ? periodData : "",
        },
      });
    } else if (
      categoryData &&
      searchData &&
      placeData &&
      salaryData &&
      experienceData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (
      categoryData &&
      searchData &&
      periodData &&
      salaryData &&
      skillData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          period: periodData ? periodData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (
      categoryData &&
      searchData &&
      placeData &&
      periodData &&
      skillData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          period: periodData ? periodData : "",
          search: searchData ? searchData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (
      categoryData &&
      periodData &&
      salaryData &&
      searchData &&
      experienceData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          period: periodData ? periodData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (
      categoryData &&
      periodData &&
      salaryData &&
      searchData &&
      experienceData
    ) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          period: periodData ? periodData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (categoryData && placeData && salaryData && searchData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
        },
      });
    } else if (categoryData && placeData && salaryData && experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (categoryData && placeData && periodData && experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          period: periodData ? periodData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (categoryData && placeData && skillData && experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          required_skills: skillData ? skillData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (categoryData && placeData && searchData && experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          search: searchData ? searchData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (categoryData && skillData && searchData && experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          required_skills: skillData ? skillData : "",
          search: searchData ? searchData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (categoryData && skillData && periodData && experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          required_skills: skillData ? skillData : "",
          period: periodData ? periodData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (skillData && placeData && salaryData && searchData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_skills: skillData ? skillData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
        },
      });
    } else if (categoryData && placeData && salaryData && searchData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          search: searchData ? searchData : "",
        },
      });
    } else if (categoryData && placeData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (categoryData && periodData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          period: periodData ? periodData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (searchData && placeData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (searchData && categoryData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          category: categoryData ? categoryData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (searchData && placeData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (searchData && periodData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          period: periodData ? periodData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    }else if (salaryData && skillData && periodData && placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
          period: periodData ? periodData : "",
          place: placeData ? placeData : "",
        },
      });
    } else if (categoryData && placeData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (categoryData && placeData && searchData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          search: searchData ? searchData : "",
        },
      });
    } else if (categoryData && placeData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (categoryData && placeData && experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else if (searchData && placeData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (searchData && categoryData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          category: categoryData ? categoryData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (searchData && categoryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          category: categoryData ? categoryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (searchData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (skillData && placeData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_skills: skillData ? skillData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (skillData && periodData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_skills: skillData ? skillData : "",
          period: periodData ? periodData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (experienceData && placeData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (experienceData && searchData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          search: searchData ? searchData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (experienceData && searchData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          search: searchData ? searchData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (experienceData && searchData && placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          search: searchData ? searchData : "",
          place: placeData ? placeData : "",
        },
      });
    } else if (experienceData && searchData && categoryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          search: searchData ? searchData : "",
          category: categoryData ? categoryData : "",
        },
      });
    } else if (experienceData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (categoryData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (categoryData && salaryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          unit_price: salaryData ? salaryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (periodData && salaryData && categoryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          period: periodData ? periodData : "",
          unit_price: salaryData ? salaryData : "",
          category: categoryData ? categoryData : "",
        },
      });
    } else if (placeData && salaryData && periodData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          place: placeData ? placeData : "",
          unit_price: salaryData ? salaryData : "",
          period: periodData ? periodData : "",
        },
      });
    } else if (categoryData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (categoryData && periodData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          period: periodData ? periodData : "",
        },
      });
    } else if (skillData && periodData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_skills: skillData ? skillData : "",
          period: periodData ? periodData : "",
        },
      });
    } else if (placeData && periodData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          place: placeData ? placeData : "",
          period: periodData ? periodData : "",
        },
      });
    } else if (categoryData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (skillData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_skills: skillData ? skillData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (searchData && placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          place: placeData ? placeData : "",
        },
      });
    } else if (searchData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (searchData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          search: searchData ? searchData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (categoryData && placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
          place: placeData ? placeData : "",
        },
      });
    } else if (salaryData && placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          unit_price: salaryData ? salaryData : "",
          place: placeData ? placeData : "",
        },
      });
    } else if (skillData && placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_skills: skillData ? skillData : "",
          place: placeData ? placeData : "",
        },
      });
    } else if (experienceData && placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          place: placeData ? placeData : "",
        },
      });
    } else if (experienceData && categoryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          category: categoryData ? categoryData : "",
        },
      });
    } else if (experienceData && skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (experienceData && salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (experienceData && searchData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
          search: searchData ? searchData : "",
        },
      });
    } else if (categoryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          category: categoryData ? categoryData : "",
        },
      });
    } else if (skillData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_skills: skillData ? skillData : "",
        },
      });
    } else if (salaryData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          unit_price: salaryData ? salaryData : "",
        },
      });
    } else if (placeData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          place: placeData ? placeData : "",
        },
      });
    } else if (periodData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          period: periodData ? periodData : "",
        },
      });
    } else if (experienceData) {
      router.push({
        pathname: `/jobs/`,
        query: {
          required_experience: experienceData ? experienceData : "",
        },
      });
    } else {
      router.push({
        pathname: `/jobs/`,
      });
    }
  };

 

  return (
    <div className="sidebar-shadow none-shadow mb-30 sticky-filter mb-hide">
      <div className="sidebar-filters">

        <div className="filter-block mb-20">
          <h5 className="medium-heading mb-10">Salary Range</h5>
          <div className="list-checkbox pb-10"></div>
          <div className="form-group mb-20">
            <ul className="list-checkbox">
              {salaryJsonData.slice(0, 3).map((data, index) => {
                return (
                  <li key={index}>
                    <label className="cb-container">
                      <input
                        value={["salary", data.salary_value]}
                        onChange={filterItems}
                        type="checkbox"
                        checked={
                          salaryContent === `${data.salary_value}` ||
                          data.salary_value === salaryData
                            ? true
                            : false
                        }
                      />
                      <span className="text-small">{data.salary_range}</span>
                      <span className="checkmark"></span>
                    </label>
                  </li>
                );
              })}
              {isOpenMoreSalary ? (
                <div
                  onClick={() => setIsOpenMoreSalary(!isOpenMoreSalary)}
                  className="viewMoreSection"
                >
                  <span> View More </span>
                  <FaAngleDoubleDown className="viewMoreSectionBtn" />
                </div>
              ) : (
                salaryJsonData.slice(3).map((data, index) => {
                  return (
                    <li key={index}>
                      <label className="cb-container">
                        <input
                          value={["salary", data.salary_value]}
                          onChange={filterItems}
                          type="checkbox"
                          checked={
                            salaryContent === `${data.salary_value}` ||
                            data.salary_value === salaryData
                              ? true
                              : false
                          }
                        />
                        <span className="text-small">{data.salary_range}</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  );
                })
              )}
              {!isOpenMoreSalary && (
                <div
                  onClick={() => setIsOpenMoreSalary(!isOpenMoreSalary)}
                  className="viewAngleDoubleUp"
                >
                  <span> View Less </span>
                  <FaAngleDoubleUp className="viewMoreSectionBtn" />
                </div>
              )}
            </ul>
          </div>
        </div>
        {/* Required Skill */}
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Required Skill</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              {skillJsonData.slice(0, 3).map((data, index) => {
                return (
                  <li key={index}>
                    <label className="cb-container">
                      <input
                        value={["skill", data.skill_name]}
                        onChange={filterItems}
                        type="checkbox"
                        checked={
                          requiredSkillContent === `${data.skill_name}` ||
                          data.skill_name === skillData
                            ? true
                            : false
                        }
                      />
                      <span className="text-small">{data.skill_value}</span>
                      <span className="checkmark"></span>
                    </label>
                  </li>
                );
              })}
              {isOpenMoreSkill ? (
                <div
                  onClick={() => setIsOpenMoreSkill(!isOpenMoreSkill)}
                  className="viewMoreSection"
                >
                  <span> View More </span>
                  <FaAngleDoubleDown className="viewMoreSectionBtn" />
                </div>
              ) : (
                skillJsonData.slice(3).map((data, index) => {
                  return (
                    <li key={index}>
                      <label className="cb-container">
                        <input
                          value={["skill", data.skill_name]}
                          onChange={filterItems}
                          type="checkbox"
                          checked={
                            requiredSkillContent === `${data.skill_name}` ||
                            data.skill_name === skillData
                              ? true
                              : false
                          }
                        />
                        <span className="text-small">{data.skill_value}</span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  );
                })
              )}
              {!isOpenMoreSkill && (
                <div
                  onClick={() => setIsOpenMoreSkill(!isOpenMoreSkill)}
                  className="viewAngleDoubleUp"
                >
                  <span> View Less </span>
                  <FaAngleDoubleUp className="viewMoreSectionBtn" />
                </div>
              )}
            </ul>
          </div>
        </div>
        {/* Period */}
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Employment Period</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              <li>
                <label className="cb-container">
                  <input
                    value={["period", "full time"]}
                    onChange={filterItems}
                    type="checkbox"
                    checked={
                      periodContent === "full time" ||
                      periodData === "full time"
                        ? true
                        : false
                    }
                  />
                  <span className="text-small">Full Time</span>
                  <span className="checkmark"></span>
                </label>
              </li>
              <li>
                <label className="cb-container">
                  <input
                    value={["period", "part time"]}
                    onChange={filterItems}
                    type="checkbox"
                    checked={
                      periodContent === "part time" ||
                      periodData === "part time"
                        ? true
                        : false
                    }
                  />
                  <span className="text-small">Part Time</span>
                  <span className="checkmark"></span>
                </label>
              </li>
            </ul>
          </div>
        </div>
        {/* Required Experience */}
        <div className="filter-block mb-30">
          <h5 className="medium-heading mb-10">Required Experience</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              {experienceJsonData.slice(0, 3).map((data, index) => {
                return (
                  <li key={index}>
                    <label className="cb-container">
                      <input
                        value={["experience", data.exp_year]}
                        onChange={filterItems}
                        type="checkbox"
                        checked={
                          requiredExpContent === `${data.exp_year}` ||
                          data.exp_year === experienceData
                            ? true
                            : false
                        }
                      />
                      <span className="text-small">{data.exp_year} Years</span>
                      <span className="checkmark"></span>
                    </label>
                  </li>
                );
              })}
              {isOpenMoreExp ? (
                <div
                  onClick={() => setIsOpenMoreExp(!isOpenMoreExp)}
                  className="viewMoreSection"
                >
                  <span> View More </span>
                  <FaAngleDoubleDown className="viewMoreSectionBtn" />
                </div>
              ) : (
                experienceJsonData.slice(3).map((data, index) => {
                  return (
                    <li key={index}>
                      <label className="cb-container">
                        <input
                          value={["experience", data.exp_year]}
                          onChange={filterItems}
                          type="checkbox"
                          checked={
                            requiredExpContent === `${data.exp_year}` ||
                            data.exp_year === experienceData
                              ? true
                              : false
                          }
                        />
                        <span className="text-small">
                          {data.exp_year} Years
                        </span>
                        <span className="checkmark"></span>
                      </label>
                    </li>
                  );
                })
              )}
              {!isOpenMoreExp && (
                <div
                  onClick={() => setIsOpenMoreExp(!isOpenMoreExp)}
                  className="viewAngleDoubleUp"
                >
                  <span> View Less </span>
                  <FaAngleDoubleUp className="viewMoreSectionBtn" />
                </div>
              )}
            </ul>
          </div>
        </div>

        <div className="filter-block mb-20">
          <h5 className="medium-heading mb-15">Job type</h5>
          <div className="form-group">
            <ul className="list-checkbox">
              {categories.map((category, index) => {
                return (
                  <li key={index}>
                    <label className="cb-container">
                      <input
                        value={["category", category.name]}
                        onChange={filterItems}
                        // onChange={categorySelection}
                        type="checkbox"
                        // checked={isCategory === true && category.name === categoryData ? true : false}
                        checked={
                          categoryContent === `${category.name}` ||
                          category.name === categoryData
                            ? true
                            : false
                        }
                      />
                      <span className="text-small">{category.name}</span>
                      <span className="checkmark"></span>
                    </label>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AdvancedFilter;
