import Head from "next/head";
import React from "react";

import OGImage from "../../assets/images/logo/logo.png";

function Meta({ title, description, keywords }) {
  return (
    <Head>
      <title>{title}</title>
      <meta charSet="utf-8" />
      <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="author" content="Linkstaff" />
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      <link rel="canonical" href="https://bangla.linkstaff.co.jp/e/" />
      {/* <meta name="language" content="jp" /> */}
      <meta name="og:title" content={title} />
      <meta name="og:description" content={description} />
      <meta name="og:image" content={OGImage} />
      <meta name="og:type" content="website" />
      <meta name="og:url" content="https://bangla.linkstaff.co.jp/e/" />
      {/* <meta name="og:site_name" content="SES Job Portal" />
      <meta name="twitter:card" content="summary" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={OGImage} />
      <meta name="twitter:site" content="@example" />
      <meta name="twitter:creator" content="@example" /> */}
    </Head>
  );
}

Meta.defaultProps = {
  title: "SES Job Portal - LinkStaff",
  description:
    "SES Job Portal - LinkStaff is a job portal for SES employees. We are a growing community of SES employees who are looking for new opportunities.",
  keywords:
    "SES, LinkStaff, SES Job Portal, SES Job, SES Jobs, SES Jobs Portal,job,good job 意味, good job,job description,find job,job work 違い,job ギア,job title 意味,job work 違い,software engineer,branding engineer,engineer 意味,ジョブカン,ジョブレイバー,jobs near me,job interview,job application letter,job at free,a part time job,job 意味 日本語,ジョブ 異常終了",
  //   OGImage: "",
};

export default Meta;
