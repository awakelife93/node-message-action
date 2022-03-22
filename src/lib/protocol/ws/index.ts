import _ from "lodash";
import ws from "ws";
import actionController from "../../action";
import config from "../../config";

class WebSocket {
  private ws!: ws.WebSocket;

  connect = async (): Promise<void> => {
    await this.connectWs();
    await this.openWs();
  };

  connectWs = () => {
    this.ws = new ws.WebSocket(`ws://${config.SQS_SERVER_END_POINT}`);
  };

  openWs = (): void => {
    if (!_.isEmpty(this.ws)) {
      this.ws.onopen = (event: ws.Event): void => {
        this.sendMessage("{SubScribe Server Name} Completely Connection");

        // * connection하면 listener 등록.
        this.onMessage();
        this.onError();
      };
    }
  };

  onMessage = (): void => {
    if (!_.isEmpty(this.ws)) {
      this.ws.onmessage = (messageEvent: ws.MessageEvent): void => {
        // type ws.Data to string
        const message: string = String(messageEvent.data);
        console.log(`SubScribe Message ${message}`);
        this.sendMessage("{SubScribe Server Name} Completely Get Message");

        actionController({
          action: message,
        });
      };
    }
  };

  onError = (): void => {
    if (!_.isEmpty(this.ws)) {
      this.ws.onerror = (errorEvent: ws.ErrorEvent): void => {
        console.log(`ErrorEvent ${errorEvent.error}`);
        console.log(`ErrorEvent Message ${errorEvent.message}`);
        this.sendMessage(`{SubScribe Server Name} Error ${errorEvent.message}`);
      };
    }
  };

  sendMessage = (message: string): void => {
    if (!_.isEmpty(this.ws)) {
      this.ws.send(message);
    }
  };
}

export default new WebSocket();
