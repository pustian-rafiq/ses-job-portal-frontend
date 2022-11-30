import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import {Button, Col, Container, Row } from 'react-bootstrap'
import BannerImage from "../../public/images/bn1.png"
import style from "./Banner.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import JobSelect from '../Search/JobSelect'

const Demo = () => {

    const [openJobSelectModal, setOpenJobSelectModal] = useState(false)

    const clickHandler = () => {
       alert("True")
    }
  return (
    <>
 
  <div  className={'${style.bannerSection} container-fluid'}> 
    <div className="row">
        <div className="col-md-7">
        <div className={style.bannerText}>
            <p>Specialization x 15 years of achievements</p>
            <h2>Continue to propose IT engineer projects . Support stable income for freelancers .</h2>
        </div>
        </div>
        <div className="col-md-5">
        <Image src={BannerImage} alt="Banner"  />
        </div>

    </div>
    <div className="row">
        <div className="col-md-7">
        <div className={style.searchBox}>
                    <div className={style.searchItem} >
                        <p>Occupation</p>
                        <span onClick={clickHandler} >Select Job</span>
                    
                    </div>
                    <div className={style.searchItem}>
                        <p>Project unit price</p>
                        <span>Select the desired project unit price</span>
                    </div>
                    <div className={style.searchItem}>
                        <p>Area</p>
                        <span>Select work region</span>
                    </div>
                    <div className={style.seekButton}>
                        <p><FontAwesomeIcon icon={faCoffee}/></p>
                        <p >Seeek</p>
                    </div>
                    </div>
        </div>

    </div>
  </div>
         
 
     <JobSelect
              show={openJobSelectModal}
              onHide={() => setOpenJobSelectModal(false)}
            />
    </>
  )
}

export default Demo