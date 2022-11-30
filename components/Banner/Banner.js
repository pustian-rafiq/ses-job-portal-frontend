import Image from 'next/image'
import React, { Fragment, useState } from 'react'
import {Button, Col, Container, Row } from 'react-bootstrap'
import BannerImage from "../../public/images/bn1.png"
import style from "./Banner.module.css"
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import JobSelect from '../Search/JobSelect'
import JobUnitPrice from '../Search/JobUnitPrice'
import JobArea from '../Search/JobArea'

const Banner = () => {

    const [openJobSelectModal, setOpenJobSelectModal] = useState(false)
    const [openJobUnitPriceModal, setOpenJobUnitPricetModal] = useState(false)
    const [openJobAreaModal, setOpenJobAreaModal] = useState(false)
 
  return (
    <>
   
  <div  className={`${style.bannerSection} container`}> 
    <div className="row">
        <div className="col-md-7">
        <div className={style.bannerText}>
            <p>Specialization x 15 years of achievements</p>
            <h2>Continue to propose IT engineer projects . Support stable income for freelancers .</h2>
        </div>
        </div>
        <div className={`${style.bannerImage} col-md-5`}>
           <Image src={BannerImage} alt="Banner"  />
        </div>

    </div>
    <div className="row">
        <div className="col-md-7">
            <div className={style.searchBox}>
                <div className={style.searchItem} onClick={()=> setOpenJobSelectModal(true)}>
                    <p>Occupation</p>
                    <span  >Select Job</span>
                
                </div>
                <div className={style.searchItem} onClick={()=> setOpenJobUnitPricetModal(true)}>
                    <p>Project unit price</p>
                    <span>Select the desired project unit price</span>
                </div>
                <div className={style.searchItem} onClick={()=> setOpenJobAreaModal(true)}>
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
     <JobUnitPrice
        show={openJobUnitPriceModal}
        onHide={() => setOpenJobUnitPricetModal(false)}
    />
     <JobArea
        show={openJobAreaModal}
        onHide={() => setOpenJobAreaModal(false)}
    />
    </>
  )
}

export default Banner