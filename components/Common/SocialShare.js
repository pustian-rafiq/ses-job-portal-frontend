import React,{useState} from "react";

import { FacebookIcon, FacebookShareButton, WhatsappIcon,WhatsappShareButton } from "react-share";


function SocialShare() {
  const [shareUrl, setShareUrl] = useState("")
 

  const shareSocialMedia = () => {
    const path = window.location.href;
    setShareUrl(path);
  }
  return (
    <>
      <h6 className="color-text-paragraph-2 d-inline-block d-baseline mr-10">
        Share this
      </h6>
      {/* </><a className="mr-5 d-inline-block d-middle share-icon" href="#"> */}
        {/* <Image src={fbLogo} alt="facebook logo" /> */}
        {/* <iframe id="jinu" src="" width="83" height="28" style="border:none;overflow:hidden" scrolling="no"  frameBorder="0" allowTransparency="true"></iframe>
      </a> */}
      <FacebookShareButton
     
        url={shareUrl}
        className="Demo__some-network__share-button"
      >
        <FacebookIcon  onClick={shareSocialMedia} size={32} round />
      </FacebookShareButton>

      <WhatsappShareButton
        url={shareUrl}
        className="Demo__some-network__share-button "
        style={{paddingLeft:'10px'}}
      >
        <WhatsappIcon  onClick={shareSocialMedia} size={32} round />
      </WhatsappShareButton>

      {/* <a className="d-inline-block d-middle share-icon" href="#">
        <Image src={whatsappLogo} alt="whatsapp logo" className="img-fluid" />
      </a> */}
    </>
  );
}

export default SocialShare;
