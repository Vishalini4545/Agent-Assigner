import React from 'react';
import {Button , Container, Row, Col} from "reactstrap";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faMale, faChevronRight, faChevronLeft} from "@fortawesome/free-solid-svg-icons"

interface AgentsProps {
    agentCount : number,
    alert : React.Dispatch<React.SetStateAction<{open : boolean , message : string}>>
}

interface AgentState {
    assignedAgents : number,
    agentColors : Array<string>
}

export default class Agents extends React.Component<AgentsProps, AgentState> {
    constructor(props:any){
        super(props);
        this.state = {
            assignedAgents: 0,
            agentColors : ['#16a085', "#d35400", "#3498db", "#34495e", "#82589F", "#182C61", "#ffb8b8",'#16a085', "#d35400", "#3498db", "#34495e", "#82589F", "#182C61", "#ffb8b8",'#16a085', "#d35400", "#3498db", "#34495e", "#82589F", "#182C61", "#ffb8b8"]
            
        };
    }
    
    renderIcons = (count : number) => {
        let iconsTray = [];
        let {agentColors} = this.state;
        for (let index = 0; index < count; index++) {
            iconsTray.push(<Col key={`icon-tray-${index}`} style={{padding:10,textAlign:'center'}} >
                <FontAwesomeIcon icon={faMale}  color={agentColors[Math.floor(Math.random()*agentColors.length)]} size="3x"/>
            </Col>)

        }
        return iconsTray;
    }

    onAssignClick = () => {
        let {assignedAgents} = this.state;
        if(assignedAgents < this.props.agentCount){
            this.setState({
                assignedAgents: assignedAgents+1
            })
        }
        else{
            this.props.alert({open:true,message : 'No more available agents'})
        }
    }

    onRevokeClick = () => {
        let {assignedAgents} = this.state;
        if(assignedAgents > 0){
            this.setState({
                assignedAgents: assignedAgents-1
            })
        }
        else{
            this.props.alert({open:true,message : 'No more assigned agents'})
        }
    }
    

    static getDerivedStateFromProps(props : AgentsProps, state : AgentState){
        if(props.agentCount >= state.assignedAgents)
            return state;
        else
            return {...state,...{assignedAgents:0}};
    }

    render(){
        const {agentCount} = this.props;
        let availableAgents = (agentCount-this.state.assignedAgents)  ;
        return(
            <Container>
                <Row>
                    <Col xs="4">
                        <strong className="mr-2 mb-2">Available Agents:</strong> {availableAgents}
                        <Col className="mt-2" style={{border:1,borderStyle:'solid',borderRadius:10}}>
                            <Row multiple={true} style={{alignItems:"center", height:'100%'}}>
                            { 
                                    this.renderIcons(availableAgents)
                            }
                            </Row>
                        </Col>
                    </Col>
                    <Col xs="4">
                        <Row style={{justifyContent: "center"}}>
                            <Button onClick={this.onAssignClick}>
                                <FontAwesomeIcon icon={faChevronRight} size="sm"/>
                            </Button>
                        </Row>
                        <Container style={{height: 20}}></Container>
                        <Row style={{justifyContent: "center"}}>
                            <Button onClick={this.onRevokeClick}>
                                <FontAwesomeIcon icon={faChevronLeft} size="sm"/>
                            </Button>
                        </Row>
                    </Col>
                    <Col xs="4">
                        <strong className="mr-2 mb-2">Assigned Agents:</strong> {this.state.assignedAgents}
                        <Col className="mt-2" style={{border:1,borderStyle:'solid',borderRadius:10}}>
                            <Row multiple={true} style={{alignItems:"center", height:'100%'}}>
                            { 
                                    this.renderIcons(this.state.assignedAgents)
                            }
                            </Row>
                        </Col>
                    </Col>
                </Row>
            </Container> 

        )
    }
}