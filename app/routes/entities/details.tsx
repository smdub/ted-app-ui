import type { EntityDetails } from "~/types";
import type { Route } from "../entities/+types";
import { loadEntity } from "../../api/backendApi"
import { Link } from "react-router";
interface EntityProps {
  params: {
    id: string;
  }
};
interface EntityDetailsComponentProps {
    loaderData: EntityDetails
};

export async function loader({ params }: EntityProps): Promise<EntityDetails>{  
    const { id } = params;  
    var entity = await loadEntity(id);
    console.log("entity: " + entity.name);
    console.log("country: " + entity.country);
    console.log("city: " + entity.city);
    return entity;
}

const classFromFormType = (formType: string): string => {
    if (formType === "competition") return "bg-green-200";
    if (formType === "result") return "bg-blue-200";
    if (formType === "change") return "bg-amber-200";
    if (formType === "cont-modif") return "bg-orange-200";
    if (formType === "planning") return "bg-fuchsia-200";
    if (formType === "dir-awa-pre") return "bg-red-200";
    
    return "bg-gray-200";
}

const EntityDetailsPage = ({ loaderData }: EntityDetailsComponentProps) => {    
    const entity = loaderData;  
    return (<>
    <div className="flex flex-col bg-gray-300 bg- m-2 p-2 rounded-lg">
      <h1>{ entity?.name }</h1>
        <div className="flex flex-row">
            <div className="col-1 text-right"><h3> Country:</h3></div>
            <div className="col-2 "> &nbsp;</div>
            <div className="col-3"><h3>{ entity?.country }</h3></div>            
        </div>
        <div className="flex flex-row">
            <div className="col-1 text-right"><h3> City:</h3></div>
            <div className="col-2 "> &nbsp;</div>
            <div className="col-3"><h3>{ entity?.city }</h3></div>            
        </div>
        <div className="flex flex-row">
            <div className="col-1 text-right"><h3> Sector:</h3></div>
            <div className="col-2 "> &nbsp;</div>
            <div className="col-3"><h3>{ entity?.activityType }</h3></div>            
        </div>
        <div className="flex flex-row">
            <div className="col-1 text-right"><h3> Total Contracts:</h3></div>
            <div className="col-2 "> &nbsp;</div>
            <div className="col-3"><h3>{ entity?.noticeGroups?.length }</h3></div>            
        </div>
    </div>
<div className="flex flex-col bg-gray-300 m-2 p-2 rounded-lg flex-">
    
     {entity.noticeGroups!.map(noticeGroup => (
        <div className="flex flex-row">
            <div className="bg-gray-100 p-2 m-2 rounded-2xl col-1">Contract: { noticeGroup.id }
                { noticeGroup!.notices!.map(notice => (
                    <div className="bg-gray-100 p-2 m-2 rounded-2xl border-2" key={ notice.id }>
                    <div className="flex flex-row">
                        <div className={`${classFromFormType(notice.formType.code)} p-2 m-2 rounded-2xl col-start-1 border-b-2`}>Notice: { notice.noticeNumber } - { notice!.formType!.code}
                        </div>
                     </div>
                    <div className="flex flex-row">
                        <div className="p-2 m-2 rounded-2xl col-start-1">Total value: { notice.totalValue?.toLocaleString() }
                        </div>
                     </div>
                    <div className="flex flex-row">
                        <div className="p-2 m-2 rounded-2xl col-start-1"> { notice.noticeTitle }
                        </div>
                     </div>
                      <div className="flex flex-row">
                        <div className="p-2 m-2 rounded-2xl col-start-1"><a href={`${ notice.linkEngPdf }`}> PDF Link</a>
                        </div>
                     </div>
                </div>
                     
                ))}
            </div>        
        </div>
        ))}
        </div>
    </> );
      
}
 
export default EntityDetailsPage;