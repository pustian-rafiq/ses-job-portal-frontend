import React from "react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function ProcessStep() {

  const iconArray= [{'icon':'/icons/envelope-circle-check-solid-white.png',"class":"process-sub-text-active"},{'icon':'/icons/clipboard-question-solid.png',"class":""},{'icon':'/icons/sheet-plastic-solid.png',"class":""},{'icon':'/icons/people-group-solid.png',"class":""},{'icon':'/icons/handshake-solid.png',"class":""},
  {'icon':"/icons/laptop-file-solid.png","class":""}];
  const[icons,setIcons]= useState(iconArray);

  const handleImageChange =({index,value})=>{
    const updatedData = [...iconArray];
    updatedData[0].className="";
    updatedData[0].icon='/icons/envelope-circle-check-solid.png';
    updatedData[index].icon= value;
    updatedData[index].className="process-sub-text-active";
    setIcons(updatedData);
  }
 
  return (
    <div className="row">
      <div className="steps-main">
        <div className="tabs">
          <div
            aria-label="Process Steps"
            role="group"
            className="btn-group w-100 steps-container"
          >
            <Link href="/auth/register">
              <button
                type="button"
                className={`arrow  process-sub-text ${icons[0].class} btn btn-secondary`}
                onMouseEnter={()=>handleImageChange({"index":0,"value":'/icons/envelope-circle-check-solid-white.png'})}
                data-node-index="0"
              >
                <Image
                  src={icons[0].icon}
                  alt="tab-icon"
                  width={42}
                  height={42}
                />
                <div>
                  <p className="step-no mt-3">Step 1</p>
                  <p className=" mt-2">Free Registeration</p>
                </div>
              </button>
            </Link>

            <button
              type="button"
              onMouseEnter={()=>handleImageChange({"index":1,"value":'/icons/clipboard-question-solid-white.png'})}
              // onMouseLeave={()=>handleImageChange({"index":1,"value":'/icons/clipboard-question-solid.png'})}
              className={`arrow  process-sub-text ${icons[1].class} btn btn-secondary`}
              data-node-index="1"
            >
              <Image
                src={icons[1].icon}
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div >
                <p className="step-no mt-3">Step 2</p>
                <p className=" mt-2">Preliminary Interview</p>
              </div>
            </button>
            <button
              type="button"
              onMouseEnter={()=>handleImageChange({"index":2,"value":'/icons/sheet-plastic-solid-white.png'})}
              className={`arrow   process-sub-text ${icons[2].class} btn btn-secondary`}
              data-node-index="2"
            >
              <Image
                src={icons[2].icon}
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div >
                <p className="step-no mt-3">Step 3</p>
                <p className="mt-2">Project Introduction</p>
              </div>
            </button>
            <button
              type="button"
              onMouseEnter={()=>handleImageChange({"index":3,"value":'/icons/people-group-solid-white.png'})}
              className={`arrow  process-sub-text ${icons[3].class} btn btn-secondary`}
              data-node-index="3"
            >
              <Image
                src={icons[3].icon}
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div >
                <p className="step-no mt-3">Step 4</p>
                <p className="mt-2">Client Interview</p>
              </div>
            </button>
            <button
              type="button"
              onMouseEnter={()=>handleImageChange({"index":4,"value":'/icons/handshake-solid-white.png'})}
              className={`arrow  process-sub-text ${icons[4].class} btn btn-secondary`}
              data-node-index="4"
            >
              <Image
                src={icons[4].icon}
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div >
                <p className="step-no mt-3">Step 5</p>
                <p className=" mt-2">Agreement</p>
              </div>
            </button>
            <button
              type="button"
              onMouseEnter={()=>handleImageChange({"index":5,"value":'/icons/laptop-file-solid-white.png'})}
              className={`arrow  process-sub-text ${icons[5].class} btn btn-secondary`}
              data-node-index="5"
            >
              <Image
                src={icons[5].icon}
                alt="tab-icon"
                width={42}
                height={42}
              />
              <div>
                <p className="step-no mt-3">Step 6</p>
                <p className=" mt-2">Business Starts</p>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProcessStep;
