import type { Route } from "../entities/+types";
import type { Entity } from "~/types";
import { loadEntities } from "../../api/backendApi"
import { NavLink } from "react-router";

export async function loader({ params }: Route.LoaderArgs): Promise<Array<Entity>>{    
    var entity = await loadEntities();
    return entity;
}

const EntityPage = ({ loaderData }: Route.ComponentProps) => {    
    const entities = loaderData;    
    return (<>
    <div className="flex flex-col bg-gray-300 m-2 p-2 rounded-lg">    
        {entities.map(entity => (
            <div>{ entity.name }</div>        
        ))}
    </div>
    </> );
      
}
 
export default EntityPage;