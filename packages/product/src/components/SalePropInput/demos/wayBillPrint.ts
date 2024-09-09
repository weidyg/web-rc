enum WaybillType {
    CaiNiao = 1,
    Taobao = 105,
    DouDian = 6,
    Pinduoduo = 4,
}

type PrintOptions = {
    type: WaybillType,
    data: {
        printer: string;
        preview?: boolean;
        firstDocumentNumber?: number,
        totalDocumentCount?: number,
        documents: PrintDocument[] | string,
    },
    onPrint: (data: PrintBaseResult) => void,
    onRendered: (data: PrintResult[]) => void,
    onPrinted: (data: PrintResult[]) => void,
    onFailed: (data: any) => void,
    onError: (data: any) => void,
}
type PrintBaseResult = {
    status: 'success' | 'failed',
    msg: string,
}
type PrintResult = {
    status: 'success' | 'canceled' | 'failed',
    msg: string,
    documentID: string,
    detail: string,
    printer: string,
}
export type PrintContent = string | {
    ver?: string;
    encryptedData?: string;
    signature?: string;
    data?: { [k: string]: any };
    templateURL: string;
    [k: string]: any;
}
export type PrintDocument = {
    documentID: string,
    contents: PrintContent[]
}
type GetPrintersOptions = {
    type: WaybillType,
    onSuccess: (data: any) => void,
    onError: (data: any) => void
}
interface IPrintService {
    getPrinters: (options: GetPrintersOptions) => void,
    doPrint: (options: PrintOptions) => void;
}

class PrintService implements IPrintService {
    private _eventBus: EventBus;
    private _sockets: { [key: number]: WebSocket | undefined };
    constructor() {
        this._eventBus = new EventBus();
        this._sockets = {};
    }

    public getPrinters(options: GetPrintersOptions) {
        const { type, onSuccess, onError } = options;
        const _type = typeof type == 'string' ? parseInt(type) : type;
        //console.log("getPrinters", _type, type);
        let request = this.getBaseRequest("getPrinters");
        const requestID = request.requestID;
        let errorFanc = (data: any) => {
            //console.log("getPrinters errorFanc", data);
            if (data?.requestID == requestID) {
                onError && onError(data);
                offEventBus();
            }
        }
        let getPrintersFanc = (data: { requestID: any; }) => {
            //console.log("getPrinters getPrintersFanc", data);
            if (data?.requestID == requestID) {
                onSuccess && onSuccess(data);
                offEventBus();
            }
        }

        let offEventBus = () => {
            this._eventBus.off("error", errorFanc);
            this._eventBus.off("getPrinters", getPrintersFanc);
        }

        this._eventBus.on("error", errorFanc);
        this._eventBus.on("getPrinters", getPrintersFanc);
        this.send(_type, request);
    }
    public doPrint(options: PrintOptions): void {
        const { type, data, onPrint, onRendered, onPrinted, onFailed, onError } = options;
        const _type = typeof type == 'string' ? parseInt(type) : type;
        let {
            preview = false,
            firstDocumentNumber = 1,
            totalDocumentCount,
            printer,
            documents = [],
        } = data || {};

        if (typeof documents == 'string') {
            documents = JSON.parse(documents) as PrintDocument[];
        }
        totalDocumentCount = totalDocumentCount || documents.length;

        let request = this.getBaseRequest("print");
        const requestID = request.requestID;
        const taskID = this.getUuid(8, 10);
        request.task = {
            taskID,
            preview,
            printer,
            firstDocumentNumber,
            totalDocumentCount,
            documents
        }

        let errorFanc = (data: any) => {
            if (data?.requestID == requestID) {
                onError && onError(data);
                offEventBus();
            }
        }
        let printFanc = (data: any) => {
            if (data?.requestID == requestID && data?.taskID == taskID) {
                onPrint && onPrint(data);
            }
        }
        let notifyPrintResultFanc = (data: any) => {
            if (/*data?.requestID == requestID &&*/data?.taskID == taskID) {
                const { printStatus = [] } = data;
                for (let i = 0; i < printStatus.length; i++) {
                    let item = printStatus[i];
                    item.msg = data.msg ? `${data.msg},${item.msg}` : item.msg;
                    if (item.msg) {
                        const { printSpooler, wsUrl } = this.getTypeObj(_type);
                        item.msg = `[${printSpooler}]${item.msg}`;
                    }
                    item.printer = data.printer || item.printer;
                }
                if (data?.taskStatus == 'rendered') {
                    onRendered && onRendered(printStatus);
                }
                if (data?.taskStatus == 'printed') {
                    onPrinted && onPrinted(printStatus);
                    offEventBus();
                }
                if (data?.taskStatus == 'failed') {
                    onFailed && onFailed(printStatus);
                    offEventBus();
                }
            }
        }
        var notifyPrintResultCmd = "notifyPrintResult";
        if (_type == WaybillType.Pinduoduo) {
            notifyPrintResultCmd = "PrintResultNotify";
        }
        let offEventBus = () => {
            this._eventBus.off("error", errorFanc);
            this._eventBus.off("print", printFanc);
            this._eventBus.off(notifyPrintResultCmd, notifyPrintResultFanc);
        }
        this._eventBus.on("error", errorFanc);
        this._eventBus.on("print", printFanc);
        this._eventBus.on(notifyPrintResultCmd, notifyPrintResultFanc);
        this.send(_type, request);
    }

    private send(type: WaybillType, data: any): any {
        const { requestID } = data;
        console.log("send", type, data);
        this.open(type, requestID, (socket: WebSocket) => {
            socket.send(JSON.stringify(data));
        });
    }
    private open(_type: WaybillType, requestID: string, callback: (socket: WebSocket) => void) {
        const { _sockets, _eventBus, getTypeObj } = this;
        let _socket = _sockets[_type];
        //console.log("open", _socket,_sockets, _eventBus);
        if (!_socket) {
            try {
                const { printSpooler, wsUrl } = getTypeObj(_type);
                //console.log("open wsUrl", wsUrl);
                if (!wsUrl) {
                    _eventBus.emit('error', { requestID, msg: `暂不支持打印类型[${_type}]!` });
                    return;
                }
                _socket = new WebSocket(wsUrl);
                _socket.onopen = function (event) {
                    _sockets[_type] = this;
                    callback && callback(this);
                    this.onmessage = (event) => {
                        console.log(`${wsUrl} Client received a message`, event);
                        const data = JSON.parse(event?.data) || {};
                        if (data.cmd) {
                            //console.log(data.cmd, data);
                            _eventBus.emit(data.cmd, data)
                        }
                    };
                    this.onclose = (event) => {
                        console.log(`${wsUrl} Client notified socket has closed`, event);
                        _sockets[_type] = undefined;
                    };
                };
                _socket.onerror = (event) => {
                    console.log(`${wsUrl} Client notified socket has error`, event);
                    _sockets[_type] = undefined;
                    _eventBus.emit('error', { requestID, msg: `连接${printSpooler}打印控件失败!` });
                };
            } catch (error) {
                console.log(`WebSocket open error`, error);
            }
        } else {
            callback && callback(_socket);
        }
    }
    private getBaseRequest(cmd: string): any {
        const request = {
            cmd: cmd,
            version: "1.0",
            requestID: this.getUuid(8, 16),
        };
        return request;
    }
    private getUuid = function (len: number, radix: number) {
        const chars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz".split("");
        let uuid: any[] = [], i: number;
        radix = radix || chars.length;
        if (len) {
            for (i = 0; i < len; i++) {
                uuid[i] = chars[0 | Math.random() * radix];
            }
        } else {
            var r: number;
            uuid[8] = uuid[13] = uuid[18] = uuid[23] = "-";
            uuid[14] = "4";
            for (i = 0; i < 36; i++) {
                if (!uuid[i]) {
                    r = 0 | Math.random() * 16;
                    uuid[i] = chars[(i == 19) ? (r & 0x3) | 0x8 : r];
                }
            }
        }
        return uuid.join("");
    };
    public getTypeObj(_type: WaybillType): { printSpooler: string, wsUrl: string } {
        let printSpooler = '';
        let wsUrl: string | null = null;
        switch (_type) {
            case WaybillType.CaiNiao:
            case WaybillType.Taobao:
                wsUrl = 'ws://127.0.0.1:13528';
                printSpooler = '菜鸟';
                break;
            case WaybillType.DouDian:
                wsUrl = 'ws://127.0.0.1:13888';
                printSpooler = '抖店';
                break;
            case WaybillType.Pinduoduo:
                wsUrl = 'ws://127.0.0.1:5000';
                printSpooler = '拼多多';
                break;
        }
        return { printSpooler, wsUrl };
    }
}

class EventBus {
    private events: any;
    constructor() {
        this.events = {};
    }

    public emit(eventName: string | number, data: any) {
        if (this.events[eventName]) {
            this.events[eventName].forEach(function (fn: (arg0: any) => void) {
                fn(data);
            });
        }
    }

    public on(eventName: string | number, fn: any) {
        this.events[eventName] = this.events[eventName] || [];
        this.events[eventName].push(fn);
    }

    public off(eventName: string | number, fn: any) {
        if (this.events[eventName]) {
            for (var i = 0; i < this.events[eventName].length; i++) {
                if (this.events[eventName][i] === fn) {
                    this.events[eventName].splice(i, 1);
                    break;
                }
            };
        }
    }
}

var wayBillPrint = new PrintService();
//npm install typescript -g
//tsc .\wayBillPrint.ts 

export { WaybillType }
export default wayBillPrint;