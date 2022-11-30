import axios from "axios";
import { useRouter } from "next/router";
import React,{useState,useRef,useContext } from "react";

import SearchIcon from "../../public/icons/SearchIcon";
import {appContext} from "../../pages/_app"
import {japanCityJson} from "../../utils/japanCityJson"

function SearchBar({categoryData,placeData,searchData}) {
  const [searchContent, setSearchContent] = useState("");
  const [place, setPlace] = useState("");
  const [category, setCategory] = useState("");

  const inputElement = useRef(null);
  const router = useRouter()
 
  //Fetch category data
  const {categories}= useContext(appContext)


  const inputContentHandler = (e) => {
   setSearchContent(e.target.value);
   setPlace(place ? place : router.query.place);
   setCategory(category ? category : router.query.category);
   
  };

  const placeChangeHandler = (e) => {
    setSearchContent(searchData? searchData : router.query.place);
    setCategory(category ? category : router.query.category); 
    setPlace(e.target.value); 
  };

  const categoryChangetHandler = (e) => {
    setSearchContent(searchData? searchData : router.query.place); 
    setPlace(place ? place : router.query.place);
   setCategory(e.target.value);
  
  };
  const searchSubmitHandler = (e) => {
    e.preventDefault();
  
    if((category || categoryData) && (place || placeData) && (searchContent || searchData)){
      router.push({
        pathname: `/jobs/`,
        query:  {
          search:  searchContent ? searchContent : searchData,
          category: category ? category : categoryData,
          place: place ? place : placeData,
          },
    } ) 
    setSearchContent("")
    setCategory("")
    setPlace("")
    }else if(place && category){  
      router.push({
        pathname: `/jobs/`,
        query:  {
          place: place ? place : placeData,
          category: category ? category : categoryData,
        },
      } ) 
    }else if(place && searchContent){  
      router.push({
        pathname: `/jobs/`,
        query:  {
          place: place ? place : placeData,
          search:  searchContent ? searchContent : searchData,
        },
       } ) 
     }else if(searchContent && category){  
      router.push({
        pathname: `/jobs/`,
        query:  {
          search: searchContent ? searchContent : searchData,
          category: category ? category : categoryData,
        },
       } ) 
     }else if(place){  
      router.push({
        pathname: `/jobs/`,
        query:  {
          place: place ? place : placeData,
        },
    } ) 
    setPlace("")
    }else if(category){  
      router.push({
      pathname: `/jobs/`,
      query:  {
        category: category ? category : categoryData,
      },
  } ) 
  setCategory("")
  } else if(searchContent){  
          router.push({
            pathname: `/jobs/`,
            query:  {
              search: searchContent ? searchContent : searchData,
            },
        } ) 
        setSearchContent("")
    }else{ 

    }

  }

 
  return (
    <div
      className="form-find mt-40 wow animate__animated animate__fadeIn"
      data-wow-delay=".2s"
    >
      <form onSubmit={searchSubmitHandler}>
        <div className="box-industry">
          <select className="form-input mr-10 select-active input-industry" 
            name="category"
            onChange={categoryChangetHandler}
            defaultValue={categoryData? categoryData : category}
          >
            <option value="0">Category</option>
            {
              categories.map((category,index) =>{
                return (
                  <option key={index} value={category.name}>{category.name}</option>
                )
              })
            }
          </select>
        </div>

        <select className="form-input mr-10 select-active" 
          name="place"
          onChange={placeChangeHandler}
          defaultValue={placeData ? placeData :place}
          >
          <option value="0">Location</option>
          {
            japanCityJson.map((city,index) =>{
              return (
                <option key={index} value={city.city} >{city.city}</option>
              )
            })
          }
        
          
        </select>

        <input
          className="form-input input-keysearch mr-10"
          type="text"
          placeholder="Your keyword... "
          name="searchContent"
          onChange={inputContentHandler}
          // value={searchContent}
          defaultValue={searchData ? searchData :searchContent}
          ref={inputElement}
        />
        <button className="btn btn-default btn-find font-sm" >
          <SearchIcon color="white" /> Search
        </button>
      </form>
    </div>
  );
}

export default SearchBar;
