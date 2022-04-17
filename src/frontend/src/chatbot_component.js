// https://github.com/AlexWang-16/react-lex-plus/blob/master/src/styles/chatbot.css
import React, { Component } from "react";
import PropTypes from "prop-types";
import merge from "lodash/merge";
import AWS from "aws-sdk";
import axios from 'axios';
import "./chatbot_component.css";

class MyLexChat extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      data: "",
      lexUserId: "chatbot" + Date.now(),
      sessionAttributes: this.props.sessionAttributes,
      visible: "open",
    };
    this.conversationDivRef = React.createRef();
    this.greetingMsgRef = React.createRef();
    this.handleChange = this.handleChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  componentDidMount() {
    document.getElementById("inputField").focus();

    let greetingNode = document.createElement("P");
    this.greetingMsgRef.current = greetingNode;
    greetingNode.className = "lexResponse";
    greetingNode.appendChild(document.createTextNode(this.props.greeting));
    greetingNode.appendChild(document.createElement("br"));
    this.conversationDivRef.current.appendChild(greetingNode);

    AWS.config.region = this.props.region || "us-east-1";
    AWS.config.credentials = new AWS.CognitoIdentityCredentials({
      IdentityPoolId: this.props.IdentityPoolId,
    });
    var lexruntime = new AWS.LexRuntime();
    this.lexruntime = lexruntime;
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.props.sessionAttributes &&
      this.props.sessionAttributes !== prevState.sessionAttributes
    ) {
      this.state.sessionAttributes = {
        ...this.state.sessionAttributes,
        ...this.props.sessionAttributes,
      };
    }

    if (this.props.greeting && this.props.greeting !== prevProps.greeting) {
      const greetingNodeRef = this.greetingMsgRef.current;
      if (greetingNodeRef) {
        greetingNodeRef.textContent = this.props.greeting;
      }
    }
  }

  handleClick() {
    // this.setState({
    //   visible: this.state.visible == "open" ? "closed" : "open",
    // });
    // if (this.props.debugMode === true) {
    //   console.log(this.state);
    // }
  }

  pushChat(event) {
    event.preventDefault();

    var inputFieldText = document.getElementById("inputField");

    if (
      inputFieldText &&
      inputFieldText.value &&
      inputFieldText.value.trim().length > 0
    ) {
      // disable input to show we're sending it
      var inputField = inputFieldText.value.trim();
      inputFieldText.value = "...";
      inputFieldText.locked = true;

      // send it to the Lex runtime
      var params = {
        botAlias: this.props.alias,
        botName: this.props.botName,
        inputText: inputField,
        userId: this.state.lexUserId,
        sessionAttributes: this.state.sessionAttributes,
      };

      if (this.props.debugMode === true) {
        console.log(JSON.stringify(params));
      }

      this.showRequest(inputField);
      var a = function (err, data) {
        if (err) {
          console.log(err, err.stack);
          this.showError(
            "Error:  " + err.message + " (see console for details)"
          );
        }
        if (data) {
          // capture the sessionAttributes for the next cycle
          this.setState({ sessionAttributes: data.sessionAttributes });
          // show response and/or error/dialog status
          this.showResponse(data);
        }
        // re-enable input
        inputFieldText.value = "";
        inputFieldText.locked = false;
      };

      this.lexruntime.postText(params, a.bind(this));
    }
    // we always cancel form submission
    return false;
  }

  showRequest(daText) {
    var conversationDiv = document.getElementById("conversation");
    var requestPara = document.createElement("P");
    requestPara.className = "userRequest";
    requestPara.appendChild(document.createTextNode(daText));
    var spacer = document.createElement("div");
    spacer.className = "convoSpacer";
    spacer.appendChild(requestPara);
    conversationDiv.appendChild(spacer);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showError(daText) {
    var conversationDiv = document.getElementById("conversation");
    var errorPara = document.createElement("P");
    errorPara.className = "lexError";
    errorPara.appendChild(document.createTextNode(daText));
    var spacer = document.createElement("div");
    spacer.className = "convoSpacer";
    spacer.appendChild(errorPara);
    conversationDiv.appendChild(spacer);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
  }

  showResponse(lexResponse) {
    // let lexmodelbuildingservice = new AWS.LexModelBuildingService();
    // let params = {
    //   maxResults: 1000000,
    //   nextToken: ""
    // }
    // lexmodelbuildingservice.getIntents(params, function(err,data){
    //   if (err) { console.log(err, err.stack);}
    //   else {
    //     console.log("data: " + data);
    //     console.log("data: " + JSON.stringify(data));
    //   }
    // })
    console.log("lexResponse: " + JSON.stringify(lexResponse));
    var conversationDiv = document.getElementById("conversation");
    var responsePara = document.createElement("P");
    responsePara.className = "lexResponse";
    if (lexResponse.message) {
      console.log("lexResponse.message: " + JSON.stringify(lexResponse.message));
      try{
        let lexResponseMessageJSON = JSON.parse(lexResponse.message);
        if(lexResponseMessageJSON.type == "random"){
          let randomResponseArray = lexResponseMessageJSON.message;
          let randomResponseNumber = Math.floor(Math.random()*randomResponseArray.length);
          let randomResponse = randomResponseArray[randomResponseNumber];
          let randomResponseDiv = document.createElement("div");
          randomResponseDiv.appendChild(document.createTextNode(randomResponse));
          let randomResponseLink = document.createElement("button");
          randomResponseLink.innerHTML = "see more";
          let randomResponseLinkDiv = document.createElement("div");
          randomResponseLinkDiv.appendChild(randomResponseLink);
          function lessResponse(){
            randomResponseDiv.innerHTML = "";
            randomResponseDiv.appendChild(document.createTextNode(randomResponse));
            randomResponseDiv.appendChild(randomResponseLinkDiv);
          }
          function fullResponse(){
            randomResponseDiv.innerHTML = "";
            let firstBulletPoint = document.createElement('li');
            firstBulletPoint.innerHTML = randomResponse;
            randomResponseDiv.appendChild(firstBulletPoint);
            for(let i = 0; i < randomResponseArray.length; i++){
              if(i == randomResponseNumber){
                continue;
              }
              let thisBulletPoint = document.createElement('li');
              thisBulletPoint.innerHTML = randomResponseArray[i];
              randomResponseDiv.appendChild(thisBulletPoint);
            }
            let seeLess = document.createElement("button");
            seeLess.innerHTML = "see less";
            seeLess.onclick = lessResponse;
            let seeLessDiv = document.createElement("div");
            seeLessDiv.appendChild(seeLess);
            randomResponseDiv.appendChild(seeLessDiv)
          }
          randomResponseLink.onclick = fullResponse;
          randomResponseDiv.appendChild(randomResponseLinkDiv);
          responsePara.appendChild(randomResponseDiv);
        } /*else if(lexResponseMessageJSON.type == "html"){
          
        }*/
      } catch (error){
        if(lexResponse.message[0] == "<"){
          let htmlString = lexResponse.message;
          let doc = new DOMParser().parseFromString(htmlString, "text/html");
          let body = doc.childNodes[0].childNodes[1];
          let bodyInnerHTML = body.innerHTML;
          responsePara.innerHTML = bodyInnerHTML;
        }
        else if("responseCard" in lexResponse){
          let genericAttachments = lexResponse["responseCard"]["genericAttachments"][0];
          let title = genericAttachments["title"];
          let subtitle = genericAttachments["subTitle"];
          let imageUrl = genericAttachments["imageUrl"];
          let buttons = genericAttachments["buttons"];
          let responseCardDiv = document.createElement("div");
          responseCardDiv.style.textAlign = "center";
          let responseCardImg = document.createElement("img");
          responseCardImg.src = imageUrl;
          responseCardImg.style.maxHeight = "20vh";
          responseCardImg.style.maxWidth = "20vw";
          responseCardDiv.appendChild(responseCardImg);
          let titleDiv = document.createElement("div");
          titleDiv.innerHTML = title;
          titleDiv.style.fontWeight = "bold";
          responseCardDiv.appendChild(titleDiv);
          let subTitleDiv = document.createElement("div");
          subTitleDiv.innerHTML = subtitle;
          subTitleDiv.style.color = "grey";
          responseCardDiv.appendChild(subTitleDiv);
          for(let i = 0; i < buttons.length; i++){
            let responseButtonDiv = document.createElement("div");
            let responseButtons = document.createElement("button");
            responseButtons.innerHTML = buttons[i].text;
            responseButtons.value = buttons[i].value;
            let thisAlias = this.props.alias;
            let thisBotName = this.props.botName;
            let thisLexUserId = this.state.lexUserId;
            let thisSessionAttributes = this.state.sessionAttributes;
            let thisDebugMode = this.props.debugMode;
            let myThis = this;
            responseButtons.addEventListener("click",function(){
                var inputField = responseButtons.value;

                  // send it to the Lex runtime
                  var params = {
                    botAlias: thisAlias,
                    botName: thisBotName,
                    inputText: inputField,
                    userId: thisLexUserId,
                    sessionAttributes: thisSessionAttributes,
                  };

                  if (thisDebugMode === true) {
                    console.log(JSON.stringify(params));
                  }

                  myThis.showRequest(inputField);
                  var a = function (err, data) {
                    if (err) {
                      console.log(err, err.stack);
                      myThis.showError(
                        "Error:  " + err.message + " (see console for details)"
                      );
                    }
                    if (data) {
                      // capture the sessionAttributes for the next cycle
                      myThis.setState({ sessionAttributes: data.sessionAttributes });
                      // show response and/or error/dialog status
                      myThis.showResponse(data);
                    }
                  };

                  myThis.lexruntime.postText(params, a.bind(this));
                  let inputFieldDOM = document.getElementById("inputField");
                  inputFieldDOM.innerHTML = "";
                  myThis.state.data = "";
            });
            responseButtonDiv.appendChild(responseButtons);
            responseButtonDiv.style.textAlign = "center";
            responseButtons.style.fontSize = "20px";
            responseCardDiv.appendChild(responseButtonDiv);
          }
          responsePara.appendChild(responseCardDiv);
        }else{
          responsePara.appendChild(document.createTextNode(lexResponse.message));
        }
      }
    }
    if (lexResponse.dialogState === "ReadyForFulfillment") {
      responsePara.appendChild(
        document.createTextNode("Ready for fulfillment")
      );
    }
    var spacer = document.createElement("div");
    spacer.className = "convoSpacer";
    spacer.appendChild(responsePara);
    conversationDiv.appendChild(spacer);
    conversationDiv.scrollTop = conversationDiv.scrollHeight;
    if(lexResponse.intentName == null){
      var responsePara2 = document.createElement("P");
      let userMessages = document.getElementsByClassName("userRequest");
      let lastUserMessageElement = userMessages[userMessages.length - 1];
      let lastUserMessage = lastUserMessageElement.innerHTML;
      let searchUrl = "https://case.edu/search-results/?q=" + lastUserMessage;
      let responseString = "<p>Perhaps you can find answers at this <a href=\"" + searchUrl + "\">link</a>.</p>"; 
      let wrapper = document.createElement('div');
      wrapper.innerHTML = responseString;
      let responseHTML = wrapper.firstChild;
      responseHTML.className = "lexResponse";
      responsePara2.className = "";
      responsePara2.appendChild(responseHTML);
      if (lexResponse.dialogState === "ReadyForFulfillment") {
        responsePara2.appendChild(
          document.createTextNode("Ready for fulfillment")
        );
      }
      var spacer = document.createElement("div");
      spacer.className = "convoSpacer";
      spacer.appendChild(responsePara2);
      conversationDiv.appendChild(spacer);
      conversationDiv.scrollTop = conversationDiv.scrollHeight;
    }
  }

  handleChange(event) {
    event.preventDefault();
    this.setState({ data: event.target.value });
  }

  render() {
    const inputStyle = {
      padding: "4px",
      fontSize: 24,
      width: "100%",
      height: "8vh",
      borderRadius: "1px",
      border: "10px",
    };

    const conversationStyle = {
      width: "100%",
      height: "80vh",
      border: "px solid #ccc",
      backgroundColor: this.props.backgroundColor,
      padding: "4px",
      overflow: "scroll",
      borderBottom: "thin ridge #bfbfbf",
    };

    const defaultHeaderRectStyle = {
      backgroundColor: "#000000",
      width: "100%",
      height: "8vh",
      textAlign: "center",
      paddingTop: 12,
      paddingBottom: 12,
      display: "flex",
      alignItems: "center",
      color: "#FFFFFF",
      fontSize: "24px",
      justifyContent: "space-between",
    };

    const headerReactStyle = merge(
      defaultHeaderRectStyle,
      this.props.headerStyle
    );

    const chatcontainerStyle = {
      backgroundColor: "#FFFFFF",
      width: "100%",
    };

    const chatFormStyle = {
      margin: "1px",
      padding: "2px",
    };
    const chatwrapperStyle = {
      bottom: 0,
      fontSize: "12px",
      right: 0,
      position: "fixed",
      width: this.props.width,
      height: "100vh",
      paddingBottom: "1px",
      marginBottom: "1%",
      marginLeft: this.props.margin,
      marginRight: this.props.margin,
    }
    return (
      <div id="chatwrapper" style = {chatwrapperStyle}>
        <div
          id="chat-header-rect"
          style={headerReactStyle}
          onClick={this.handleClick}
        >
          <span />
          <span
            style={{
              fontSize: headerReactStyle.fontSize,
              color: headerReactStyle.color,
            }}
          >
            {this.props.headerText}
          </span>

          {this.state.visible === "open" ? (
            <span className=""></span>
           ) : (
            <span className=""></span>
           )}

        </div>
        <div
          id="chatcontainer"
          className={this.state.visible}
          style={chatcontainerStyle}
        >
          <div
            id="conversation"
            ref={this.conversationDivRef}
            style={conversationStyle}
          />
          <form
            id="chatform"
            style={chatFormStyle}
            onSubmit={this.pushChat.bind(this)}
          >
            <input
              type="text"
              id="inputField"
              size="40"
              value={this.state.data}
              placeholder={this.props.placeholder}
              onChange={this.handleChange.bind(this)}
              style={inputStyle}
            />
          </form>
        </div>
      </div>
    );
  }
}

MyLexChat.propTypes = {
  alias: PropTypes.string,
  botName: PropTypes.string,
  IdentityPoolId: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
  backgroundColor: PropTypes.string,
  headerText: PropTypes.string,
  headerColor: PropTypes.string,
  headerBackgroundColor: PropTypes.string,
  headerFontSize: PropTypes.number,
  sessionAttributes: PropTypes.object,
  debugMode: PropTypes.bool,
  width: PropTypes.string,
  margin: PropTypes.string,
};

MyLexChat.defaultProps = {
  alias: "$LATEST",
  headerStyle: {},
  greeting: "",
  sessionAttributes: {},
  debugMode: false,
};

export default MyLexChat;
