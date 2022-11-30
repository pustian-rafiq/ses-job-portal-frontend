import React from 'react'
import style from "./Banner/Banner.module.css"
import Image from 'next/image'
import Profile from "../public/images/profile2.jpg"


const UserVoice = () => {

    
  return (
    <>
    <div className="container">
        <div className="row mt-4">
         <h1 style={{textAlign: 'center'}}>User Voice</h1>
             <div className="col-md-6">  
                 <div className={style.userVoiceSection}>  
                    <div className={style.topContent}>
                       <div className={style.userImage}>
                          <Image src={Profile} width="70" height="70" alt="Footer" />
                       </div>
                       <div className={style.userName}>
                        <p>Md. Rafiqul Islam</p>
                        <p> <span>Age 28 | Male | Php</span> </p>
                      </div>
                    </div>
                    <div className={style.bottomContent}>
                       <p>Font Awesome is the internets icon library and toolkit used by millions of designers, developers, and content creators.Font Awesome is the internet icon library and toolkit used by millions of designers, developers, and content creators.</p>
                    </div>
                </div>
            </div>    
             <div className="col-md-6">  
                 <div className={style.userVoiceSection}>  
                    <div className={style.topContent}>
                       <div className={style.userImage}>
                          <Image src={Profile} width="70" height="70" alt="Footer" />
                       </div>
                       <div className={style.userName}>
                        <p>Md. Rafiqul Islam</p>
                        <p> Age 28 | Male | Php </p>
                      </div>
                    </div>
                    <div className={style.bottomContent}>
                       <p>Font Awesome is the internets icon library and toolkit used by millions of designers, developers, and content creators.Font Awesome is the internet icon library and toolkit used by millions of designers, developers, and content creators.</p>
                    </div>
                </div>
            </div>    
             <div className="col-md-6">  
                 <div className={style.userVoiceSection}>  
                    <div className={style.topContent}>
                       <div className={style.userImage}>
                          <Image src={Profile} width="70" height="70" alt="Footer" />
                       </div>
                       <div className={style.userName}>
                        <p>Md. Rafiqul Islam</p>
                        <p> <span>Age 28 | Male | Php</span> </p>
                      </div>
                    </div>
                    <div className={style.bottomContent}>
                       <p>Font Awesome is the internets icon library and toolkit used by millions of designers, developers, and content creators.Font Awesome is the internet icon library and toolkit used by millions of designers, developers, and content creators.</p>
                    </div>
                </div>
            </div>    
             <div className="col-md-6">  
                 <div className={style.userVoiceSection}>  
                    <div className={style.topContent}>
                       <div className={style.userImage}>
                          <Image src={Profile} width="70" height="70" alt="Footer" />
                       </div>
                       <div className={style.userName}>
                        <p>Md. Rafiqul Islam</p>
                        <p> <span>Age 28 | Male | Php</span> </p>
                      </div>
                    </div>
                    <div className={style.bottomContent}>
                       <p>Font Awesome is the internets icon library and toolkit used by millions of designers, developers, and content creators.Font Awesome is the internet icon library and toolkit used by millions of designers, developers, and content creators.</p>
                    </div>
                </div>
            </div>    
             
        </div>
    </div>

    </>
  )
}

export default UserVoice