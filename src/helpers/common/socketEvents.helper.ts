class SocketEventEmitter {
   emitMessage<T>(eventName: string, data: T) {
      const globalVar: NodeJS.Global = global;
      globalVar.socket.emit(eventName, data);
   }
}

export default new SocketEventEmitter();
