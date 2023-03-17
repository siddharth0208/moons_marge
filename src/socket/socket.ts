import Zlib from '../zlib';
import SocketListener from './socket_listener';
import SocketStatus from './socket_status';

const C_S_CHANNEL_INTERACTIVE = 'Interactive';
const C_S_CHAR0 = '\u0000';
const C_S_CHAR2 = '\u0002';
const C_S_ON = 'ON';
const _selfSocCom = {
  SocketChannelId: 'Broadcast',
  CompressStatus: 'ON',
};

export default class Socket {
  socket?: any;
  mode;
  ip;
  port;
  listener;
  //OCParser: clsParser = clsParser.Instance;
  msgCodeKeyToCheck: string = '';
  private _HeaderLength: number = 6;
  private IsUncompress: boolean = false;
  private LogOffReceived: boolean = false;
  private isFirstMktStatusResponse = true;
  private isNWDisconnected: boolean = false;
  private connectInProgress: boolean = false;
  constructor(
    mode: string,
    ip: string,
    port: string,
    listener: SocketListener,
  ) {
    this.mode = mode;
    this.ip = ip;
    this.port = port;
    this.listener = listener;
    // listener.onMessage('ag');
    // this.listener = listener;
    // this.connect();
  }
  connect = () => {
    try {
      this.socket = undefined;
      const url = `${this.mode}://${this.ip}:${this.port}`;
      console.log('Connecting To Web Socket: ', url);

      this.socket = new WebSocket(url);
      console.log('Opening websocket . . .');
      this.socket.onopen = this.onOpen;
      this.socket.onclose = this.onClose;
      this.socket.onerror = this.onError;
      this.socket.onmessage = this.onMessage;
    } catch (ex: any) {
      console.log(
        'Failed to connect to server. Reason : ',
        ex.message,
        ' | Stack trace : ',
        ex.stack,
      );
    }
  };
  disconnect = () => {
    try {
      if (this.socket != null) {
        console.log('Disconnecting websocket');
        this.listener.onStatusChange(SocketStatus.DISCONNECTED);
        this.socket.close();
      } else {
        this.listener.onStatusChange(SocketStatus.DISCONNECTED);
      }
    } catch (ex: any) {
      console.log(
        'Failed to close socket. Reason : ',
        ex.message,
        ' | Stack trace : ',
        ex.stack,
      );
    }
  };

  onOpen = () => {
    console.log('onOpen');
    this.login();
  };

  private login = () => {
    var sUsedId = 'TEST';
    var sApiKey = '';
    var sLoginRequest = '';
    if (sApiKey === '') {
      sLoginRequest =
        '63=FT3.0|64=101|65=74|66=14:59:22|67=' +
        sUsedId +
        '|68=|4=|400=0|401=1|396=HO|51=4|395=127.0.0.1';
    } else {
      sLoginRequest =
        '63=FT3.0|64=101|65=74|66=14:59:22|67=' +
        sUsedId +
        '|68=' +
        sApiKey +
        '|4=|400=0|401=2|396=HO|51=4|395=127.0.0.1';
    }
    this.sendMessage(sLoginRequest);
    this.listener.onStatusChange(SocketStatus.CONNECTED);
  };

  sendMessage = (message: any) => {
    if (this.socket) {
      try {
        if (this.socket.readyState === 1) {
          let byteToSend = this.AddHTTPHeader(message) || '';
          this.socket.send(byteToSend);
          console.log('Message sent on socket successfully');
          console.log('Message: ' + message);
          //
        } else {
          console.log(
            'Websocket connection not open. Ready state : ',
            this.getReadyStateDescription(this.socket.readyState),
          );
        }
      } catch (ex: any) {
        console.log(ex);
      }
    }
  };

  getReadyStateDescription = (readyState: any) => {
    switch (readyState) {
      case 0:
        return '0 (Connection not yet established.)';
      case 1:
        return '1 (Websocket connection is established and ready for communication.)';
      case 2:
        return '2 (Connection going through closing handshake.)';
      case 3:
        return '3 (Connection has been closed or could not be opened.)';
      default:
        return '';
    }
  };

  AddHTTPHeader = (_requestPacket: any) => {
    try {
      var _strHead = String.fromCharCode(5); //5 comprression char

      var i;
      var _data = new ArrayBuffer(_strHead.length);
      var _headerBytes = new Uint8Array(_data);
      for (i = 0; i < _strHead.length; i += 1) {
        _headerBytes[i] = _strHead.charCodeAt(i);
      }
      var _baRequest;
      if (_selfSocCom?.CompressStatus === C_S_ON) {
        _baRequest = this.HandleCompressedData(_requestPacket);
      } else {
        _baRequest = this.HandleConvertToByteArray(_requestPacket);
      }
      var _length = _baRequest.length;
      // if (_selfSocCom.SocketChannelId !== C_S_CHANNEL_INTERACTIVE)
      //   _length += 4;
      var _lenLength = _length.toString().length;
      var _lengthString = '';
      for (i = 0; i < 5 - _lenLength; i++) {
        _lengthString += '0';
      }
      _lengthString += _length.toString();
      _data = new ArrayBuffer(_lengthString.length);
      var _lenBytes = new Uint8Array(_data);
      for (i = 0; i < _lengthString.length; i += 1) {
        _lenBytes[i] = _lengthString.charCodeAt(i);
      }
      var _baActualSend = new Uint8Array(5 + _length);
      _baActualSend.set(_lenBytes);
      _baActualSend.set(_baRequest, 5);
      var _outputStream = new Uint8Array(
        _headerBytes.length + _baActualSend.length,
      );
      _outputStream.set(_headerBytes);
      _outputStream.set(_baActualSend, 1);
      console.log('Final Data: ' + _outputStream.byteLength.toString());
      return _outputStream.buffer;
    } catch (e) {
      console.log(e);
    }
  };

  private HandleConvertToByteArray = (_data: any) => {
    try {
      var _arrbufData = new ArrayBuffer(_data.length);
      var _uint8buf = new Uint8Array(_arrbufData);
      for (var i = 0; i < _data.length; i += 1) {
        _uint8buf[i] = _data.charCodeAt(i) & 0xff;
      }
      var _baData = new Uint8Array(_arrbufData);
      return _baData;
    } catch (e) {
      console.log(e);
      return '';
    }
  };

  HandleCompressedData = (_rawData: any) => {
    try {
      var _data = new ArrayBuffer(_rawData.length);
      var _uint8buf = new Uint8Array(_data);
      for (var i = 0; i < _rawData.length; i += 1) {
        _uint8buf[i] = _rawData.charCodeAt(i) & 0xff;
      }
      //alert('CompressData');
      var _compData = Zlib.compress(new Uint8Array(_data), 6);
      //alert('CompressData - After Compress' );
      return _compData;
    } catch (e) {
      console.log(e);
      return '';
    }
  };

  onClose = (event: any) => {
    console.log('onClose');
    console.log(event);
  };

  onError = (error: any) => {
    console.log('onError');
    console.log(error);
    if (this.socket) {
      this.socket.onopen = null;
      this.socket.onclose = null;
      this.socket.onerror = null;
      this.socket.onmessage = null;
      this.socket = undefined;
    }
  };

  baOldData: any = null;
  onMessage = (_event: any) => {
    console.log('onMessage');
    this.listener.onMessage(_event);
    this.onSocketDataReceive(_event);
  };

  onSocketDataReceive = (_event: any) => {
    try {
      let fullMsg = this.defragPacket(_event.data);

      if (fullMsg !== undefined && fullMsg !== null && fullMsg.length > 0) {
        while (fullMsg.length > 0) {
          let msg: any = fullMsg.pop();
          let _response = String.fromCharCode.apply(null, msg);
          //remove End of response char
          if (_response.indexOf('|50=') === -1) {
            let intTmtrIndex = _response.indexOf(C_S_CHAR0);
            if (intTmtrIndex !== -1) {
              _response = _response.substr(0, intTmtrIndex);
            }
          }

          //split multi response packet with Start of response char C_S_CHAR2
          //this.bIsAppResumeBcastReceived = true;
          let arrData: any = [];
          if (_response.indexOf('|50=') === -1) {
            arrData = _response.split(C_S_CHAR2);
          } else {
            //console.log(_response);
            arrData = this.parseMessage(_response);
          }
          let intDataCount = arrData.length;
          //console.log('Split count: ',intDataCount);
          for (let intDataCntr = 0; intDataCntr < intDataCount; intDataCntr++) {
            if (arrData[intDataCntr] !== '') {
              //console.log('Split: ',arrData[intDataCntr]);
              this.ProcessPacketString(arrData[intDataCntr]);
            }
          }
        }
      }
    } catch (e) {
      //clsGlobal.logManager.writeLog(clsGlobal.ComId, clsConstants.C_S_LOGTYPE_APPERROR, undefined, clsGlobal.logManager.createLogPayload('clsWebSocket', 'onSocketDataReceive', e.Message, undefined, e.stack, undefined, undefined));
      console.log('SocketDataReceive: ', e);
    }
  };

  defragPacket = (data: any) => {
    if (data.byteLength === 0) {
      return null;
    }

    let dataReceived = null;
    let FullMessages = [];

    if (this.baOldData == null) {
      dataReceived = new Uint8Array(data);
    } else {
      dataReceived = this.appendOrCopyBuffer(this.baOldData, data);
      this.baOldData = null;
    }

    let IsDone = true;
    let MsgLength = 0;
    while (IsDone) {
      if (dataReceived.byteLength < this._HeaderLength) {
        this.baOldData = dataReceived;
        return FullMessages;
      }

      MsgLength = this.getMessageLength(dataReceived);
      if (MsgLength <= 0) {
        return null;
      }

      if (dataReceived.byteLength < MsgLength + this._HeaderLength) {
        this.baOldData = dataReceived;
        return FullMessages;
      } else {
        this.baOldData = null;
      }

      let CompressedMessage: any = new Uint8Array(
        dataReceived.subarray(
          this._HeaderLength,
          MsgLength + this._HeaderLength,
        ),
      );
      let UnCompressedByteMessage =
        this.getUncompressedMessage(CompressedMessage);
      if (UnCompressedByteMessage == null) {
        IsDone = false;
        break;
      }

      FullMessages.push(UnCompressedByteMessage);

      if (dataReceived.byteLength === MsgLength + this._HeaderLength) {
        IsDone = false;
        CompressedMessage = undefined;
        break;
      }

      let NewMessage: any = new Uint8Array(
        dataReceived.subarray(
          MsgLength + this._HeaderLength,
          dataReceived.byteLength,
        ),
      );
      dataReceived = NewMessage;
    } //end of while IsDone

    dataReceived = null;
    data = null;

    return FullMessages;
  };

  getMessageLength = (message: any) => {
    if (message[0] === 5) {
      this.IsUncompress = false;
    } else {
      this.IsUncompress = true;
    }

    try {
      let strPacketLength = String.fromCharCode.apply(
        null,
        message.subarray(1, this._HeaderLength),
      );
      return parseInt(strPacketLength, 10);
    } catch (e) {
      return 0;
    }
  };

  getUncompressedMessage = (compressedMessage: any) => {
    let uncompressedBytes = null;
    if (!this.IsUncompress) {
      let bytDecomp = null;
      bytDecomp = Zlib.uncompress(compressedMessage);
      uncompressedBytes = bytDecomp;
    } else {
      uncompressedBytes = new Uint8Array(compressedMessage);
    }
    return uncompressedBytes;
  };

  appendOrCopyBuffer = (buffer1: any, buffer2: any) => {
    let tmp = new Uint8Array(buffer1.byteLength + buffer2.byteLength);
    tmp.set(new Uint8Array(buffer1), 0);
    tmp.set(new Uint8Array(buffer2), buffer1.byteLength);
    return tmp;
  };

  parseMessage = (strMessage: any) => {
    try {
      let arrMsg = [];
      if (strMessage != undefined) {
        let index = 0;
        while (true) {
          let strMsgLen = strMessage.substr(0, 6);
          let msgLen = parseInt(strMsgLen.substr(1));
          index += 6;
          let strNewMsg = strMessage.substr(index, msgLen);
          //console.log('New Message: ', strNewMsg);
          strMessage = strMessage.substr(msgLen + 6);
          if (strMessage.length > 0) {
            //console.log('Rem Message: ', strMessage);
          }
          //index += msgLen;
          index = 0;
          //strMessage = strMessage.substr(index, msgLen);
          arrMsg.push(strNewMsg);
          if (strMessage == '' || strMessage == undefined) {
            break;
          }
        }
      }
      return arrMsg;
    } catch (e: any) {
      //clsGlobal.logManager.writeLog(clsGlobal.ComId, clsConstants.C_S_LOGTYPE_APPERROR, undefined, clsGlobal.logManager.createLogPayload('clsWebSocket', 'parseMessage', e.Message, undefined, e.stack, undefined, undefined));
      console.log('Error parsing message: ', e.message);
      return [];
    }
  };

  ProcessSocketMessage = (uncompData: any) => {
    let _response: any = this.DeCompressData(uncompData);

    if (_response == undefined) {
      console.log(_response);
    }
    //remove End of response char
    var intTmtrIndex = _response.indexOf(C_S_CHAR0);
    if (intTmtrIndex != -1) {
      _response = _response.substr(0, intTmtrIndex);
    }

    //split multi response packet with Start of response char C_S_CHAR2
    var arrData = _response.split(C_S_CHAR2);
    var intDataCount = arrData.length;

    for (var intDataCntr = 0; intDataCntr < intDataCount; intDataCntr++) {
      if (arrData[intDataCntr] != '') {
        this.ProcessPacketString(arrData[intDataCntr]);
      }
    }
  };

  ProcessPacketString = (data: any) => {
    console.log('Data From Server Latest : ' + data);
  };

  DeCompressData = (_pktData: any) => {
    /// <summary>
    /// Function to decompress the packet string using ZLib
    /// </summary>
    /// <param name="_pktData" type="Array" elementType="Number" elementInteger="true">
    /// Compressed packet byte[] as received on the socket
    /// </param>
    /// <returns type="String"></returns>
    try {
      var _compData = new Uint8Array(_pktData);
      //first 6 bytes will be special char and length of data
      //so need to take after it
      _compData = _compData.subarray(6, _compData.length);
      var _uncompData = Zlib.uncompress(new Uint8Array(_compData));
      var _sResp = [];
      for (let i = 0, len = _uncompData.length; i < len; i += 1) {
        _sResp.push(String.fromCharCode(_uncompData[i]));
      }
      return _sResp.join('');
    } catch (e) {
      console.log(e);
    }
  };
}
