import type { Notice, FormType } from "~/types";


const classFromFormTypeCode = (formTypeCode: string): string => {
    if (formTypeCode === "competition") return "bg-green-200";
    if (formTypeCode === "result") return "bg-blue-200";
    if (formTypeCode === "change") return "bg-amber-200";
    if (formTypeCode === "cont-modif") return "bg-orange-200";
    if (formTypeCode === "planning") return "bg-fuchsia-200";
    if (formTypeCode === "dir-awa-pre") return "bg-red-200";
    
    return "bg-gray-200";
}

const descriptionFromFormType = (formType: FormType): string => {
    return formType.description ? formType.description : formType.code
}


const dateToString = (date: Date): string => {
    const dateValue = new Date(date);
    return dateValue.toDateString();
}
const NoticeCard = ({ noticeData: notice } : { noticeData: Notice }) => {
    return (<div className="bg-gray-100 p-2 m-2 rounded-2xl border-2">
                    <div className="flex flex-row">
                        <div className={`${classFromFormTypeCode(notice.formType.code)} p-2 m-2 rounded-2xl col-start-1 border-b-2`}>Notice: { notice.noticeNumber } - {  descriptionFromFormType(notice!.formType!) }
                        </div>
                     </div>
                    <div className="flex flex-row">
                        <div className="pl-2 pr-2 ml-2 italic text-sm col-start-1">{ dateToString(notice.publicationDate) }
                        </div>
                     </div>
                    <div className="flex flex-row">
                        <div className="p-2 m-2 rounded-2xl col-start-1">Total value: <span className="font-bold">{ notice.totalValue?.toLocaleString() }</span>
                        </div>
                     </div>
                    <div className="flex flex-row">
                        <div className="p-2 m-2 rounded-2xl col-start-1"> { notice.noticeTitle }
                        </div>
                     </div>
                      <div className="flex flex-row">
                        <div className="p-2 m-2 rounded-2xl text-blue-700 underline col-start-1"><a href={`${ notice.linkEngPDF }`}>PDF</a></div>
                        <div className="p-2 m-2 rounded-2xl text-blue-700 underline col-start-2"><a href={`${ notice.linkEngXML }`}>XML</a></div>
                        <div className="p-2 m-2 rounded-2xl text-blue-700 underline col-start-3"><a href={`${ notice.linkEngHtml }`}>Html</a></div>
                     </div>
                     { notice.originalNotice ? (
                        <div className="flex flex-row">
                            <div className="bg-gray-300 p-2 m-2 rounded-2xl col-start-1 border-b-2">Linked: { notice.originalNotice }
                            </div>
                        </div>
                     ) : ""}
                     </div> );
}
 
export default NoticeCard;