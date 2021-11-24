import ws from "ws";

// todo: 해당 프로젝트 작업하기.
const webSocket: ws.WebSocket = new ws.WebSocket("ws://localhost:3000");

(() => {
  webSocket.onopen = (event: ws.Event): void => {
    webSocket.send("{SubScribe Server Name} Completely Connection");
  };

  webSocket.onmessage = (messageEvent: ws.MessageEvent): void => {
    console.log(`SubScribe Message ${messageEvent.data}`);
    webSocket.send("{SubScribe Server Name} Completely Get Message");
  };

  webSocket.onerror = (errorEvent: ws.ErrorEvent): void => {
    console.log(`ErrorEvent ${errorEvent.error}`);
    console.log(`ErrorEvent Message ${errorEvent.message}`);
    webSocket.send(`{SubScribe Server Name} Error ${errorEvent.message}`);
  };
})();