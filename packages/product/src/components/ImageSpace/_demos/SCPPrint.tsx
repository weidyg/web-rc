import { Button, message } from "antd";
import wayBillPrint, { PrintContent, PrintDocument, WaybillType } from "./wayBillPrint";
export default () => {
    return (<>
        <Button onClick={async () => {
            //1、获取token
            const data = await getToken({
                partnerID: 'QCCXXF5088X0',
                secret: 'fYHGNCO6UBQyD5NsPZZGh6pajt14s2Ys'
            }, true);
            console.log(data);
            //2、获取CAINIAO打印数据
            const printData = await getSfPrintData_CAINIAO({
                partnerID: 'QCCXXF5088X0',
                templateCode: "fm_76130_standard_QCCXXF5088X0",
                customTemplateCode: "fm_76130_standard_custom_10030674830_1",
                accessToken: data?.accessToken,
                documents: [
                    {
                        masterWaybillNo: "SF7444488695775",
                        customData: {
                            GridNo: '<%=_data.OrderSort%>'
                        }
                    }
                ]
            }, true);
            console.log(printData);
            //3、发送打印请求
            if (printData.apiResultData?.success) {
                const { fileType, files } = printData.apiResultData?.obj;
                if (fileType == 'cainiao') {
                    const documents: PrintDocument[] = files.map((item) => {
                        const contents: PrintContent[] = item.contents || [];
                        contents.forEach((content: any) => {
                            content.data = {
                                OrderSort: "11"
                            };
                        })
                        return {
                            documentID: item.waybillNo,
                            contents: contents
                        }
                    });
                    caniaoPrint("Microsoft Print to PDF", documents)
                }
            }
        }}
        >
            COM_RECE_CLOUD_PRINT_CAINIAO
        </Button>

    </>);
};

function caniaoPrint(
    printer: string,
    documents: PrintDocument[]
) {
    wayBillPrint.doPrint({
        type: WaybillType.CaiNiao,
        data: {
            printer: printer,
            documents: documents,
        },
        onPrint: function (data) {
            console.log('onPrint', data);
        },
        onRendered: function (dataArr) {
            console.log('onRendered', dataArr);
        },
        onPrinted: function (dataArr) {
            console.log('onPrinted', dataArr);
        },
        onFailed: function (dataArr) {
            console.log('onFailed', dataArr);
        },
        onError: (error) => {
            console.log('onError', error);
        }
    });
}


type SfPrintDataRequest_CAINIAO = {
    partnerID: string, //顾客编码
    accessToken: string,//授权token
    requestID?: string,//请求唯一标识
    templateCode: string,
    documents: [
        {
            masterWaybillNo: string; // 主运单号
            branchWaybillNo?: string; // 子运单号
            backWaybillNo?: string; // 签回单号
            seq?: string; // 顺序号
            sum?: string; // 子母件运单总数
            isPrintLogo?: string; // 是否打印LOGO
            remark?: string; // 自定义区域备注
            waybillNoCheckType?: string; // 运单号权限校验类型
            waybillNoCheckValue?: string; // 运单号合法校验具体值
            customData?: any; // 使用自定义模板编码时，对应的变量字段
            printPageNum?: string; // 打印页码
            isPrintStub?: string; // 是否打印存根联
            flowIcon?: string; // 流向标识
        }
    ],
    customTemplateCode?: string,
    extJson?: {
        channel?: string; // 订单所属渠道
        encryptFlag?: string; // 自定义脱敏标识
    }
}
type SfPrintDataResonse_CAINIAO = SfApiBaseResonse & {
    apiResultData?: {
        requestId: string;
        success: boolean;
        errorMessage?: string;
        obj: {
            clientCode: string;
            fileType: string;
            files: Array<{
                contents: Array<{
                    areaNo: number;
                    pageNo: number;
                    templateURL: string;
                }>;
                seqNo: number;
                waybillNo: string;
            }>;
            templateCode: string;
        };
    }
}
function getSfPrintData_CAINIAO(data: SfPrintDataRequest_CAINIAO, sbox?: boolean)
    : Promise<SfPrintDataResonse_CAINIAO> {
    const url = sbox
        ? 'https://sfapi-sbox.sf-express.com/std/service'
        : 'https://bspgw.sf-express.com/std/service';
    const { partnerID, accessToken, requestID, ...restData } = data;
    const msgData = { version: "2.0", ...restData };
    const timestamp = `${new Date().getTime()}`;
    const random = Math.random();
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            partnerID: partnerID,
            accessToken: accessToken,
            requestID: requestID || `${timestamp}${random}`,
            serviceCode: 'COM_RECE_CLOUD_PRINT_CAINIAO',
            timestamp: timestamp,
            msgData: JSON.stringify(msgData),
        })
    };
    return fetch_SF(url, options);
}



type SfTokenRequestData = {
    partnerID: string, //顾客编码
    secret: string //校验码
}
type SfTokenResonse = SfApiBaseResonse & {
    accessToken: string,
    expiresIn?: number
}
function getToken(data: SfTokenRequestData, sbox?: boolean)
    : Promise<SfTokenResonse> {
    const url = sbox
        ? 'https://sfapi-sbox.sf-express.com/oauth2/accessToken'
        : 'https://sfapi.sf-express.com/oauth2/accessToken';
    const options = {
        method: 'POST',
        headers: { 'content-type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            partnerID: data?.partnerID,
            secret: data?.secret,
            grantType: 'password'
        })
    };
    return fetch_SF(url, options);
}

type SfApiBaseResonse = {
    apiResponseID: string,
    apiResultCode: string,
    apiErrorMsg: string,
}
function fetch_SF<SfTResonse extends SfApiBaseResonse>(
    url: string,
    options: RequestInit
): Promise<SfTResonse> {
    return new Promise((resolve, reject) => {
        fetch(url, options)
            .then(response => response.json())
            .then((response: SfApiBaseResonse) => {
                response = strDataToObj(response);
                if (response.apiResultCode == 'A1000') {
                    resolve(response as SfTResonse)
                } else {
                    reject(response);
                }
            })
            .catch(error => {
                reject(error);
            });
    });
}
const strDataToObj = (res: any) => {
    if (typeof res?.apiResultData == 'string') {
        res.apiResultData = JSON.parse(res?.apiResultData);
    }
    return res;
}