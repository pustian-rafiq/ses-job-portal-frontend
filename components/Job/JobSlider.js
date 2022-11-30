import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import NewJob from "./NewJob";
import RemoteOrHomeJob from "./RemoteOrHomeJob";
import SideOrDoubbleJob from "./SideOrDoubbleJob";

function JobSlider() {
  return (
    <div className="container">
      <Tabs
        defaultActiveKey="newjob"
        id="justify-tab-example"
        className="mb-3 mt-5"
        justify
        variant="pills"
      >
        <Tab eventKey="newjob" title="New Job">
          <NewJob />
        </Tab>
        <Tab eventKey="remote-job" title="Remote/Home job">
          <RemoteOrHomeJob />
        </Tab>
        <Tab eventKey="side-job" title="Side/Doubble Job">
          <SideOrDoubbleJob />
        </Tab>
      </Tabs>
    </div>
  );
}

export default JobSlider;
