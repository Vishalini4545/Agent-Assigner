import React , { useState }from 'react';
import { Navbar , 
        NavbarBrand,
        Container, 
        Row, 
        Col, 
        Button, 
        FormGroup,
        Input , 
        Alert } from "reactstrap";
import Agents from './Agents';
import './App.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [alertToggle, setAlertToggle]  = useState({open:false,message:''});
  const [toggle , setToggle ] = useState(false);

  const renderGrid = () => {
    if(count > 0){
      setToggle(true);
      setAlertToggle({message:'',open:false})    
    }
    else{
      setToggle(false);
      setAlertToggle({message:'Agent Strength can not be empty',open:true})    
    }
  }

  return (
    <div>
       <Navbar color="primary" dark expand="md">
          <NavbarBrand  href=""><span className="heading-2"> Agent Admin </span></NavbarBrand>
       </Navbar>
       <Container>
         <Container className="mt-5">
            <Alert color="danger" isOpen={alertToggle.open} toggle={()=>{setAlertToggle({message:'',open:false})}}>
              {alertToggle.message}
            </Alert>
          </Container>
          <Row>
            <Col className="col-md-3 p-3" style={{textAlign: "center"}}>
                <FormGroup>
                  <Input type="number" className="ml-2" onChange={(e)=>setCount(Number(e.target.value))} placeholder="Enter the total agents" min="1" />
                </FormGroup>
                <Button onClick={renderGrid}> Submit</Button>
            </Col>
            <Col className="col-md-9">
            {
            toggle ? 
              <Agents agentCount={count} alert={setAlertToggle} />
            :
            null
          }
            </Col>
          </Row>
      </Container>
    </div>
  );
}

export default App;

