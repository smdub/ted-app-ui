import type { EntityDetails, EntityResponse, EntitiesResponse } from "../types";

export const searchEntity = async (entity: string) => {
    console.debug('requested: ' + entity);
    
    const response = await fetch(`${import.meta.env.VITE_TEDAPI_URL}/agent/stream/${entity}`);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const json = await response.json();
    console.log(json)    
}

export const loadEntity = async (entityId: string): Promise<EntityDetails> => {
    console.log("Loading entity with ID: " + entityId);
    console.log("Reading from " + `${import.meta.env.VITE_TEDAPI_URL}/entitydetails/${entityId}`)
    const response = await fetch(`${import.meta.env.VITE_TEDAPI_URL}/entitydetails/${entityId}`);
    if (!response.ok){
        throw new Error(`HTTP error! status: ${response.status}`);        
    }
    const entityResponse: EntityResponse = await response.json();
    console.log (entityResponse);

    const entity:EntityDetails = { 

        id: entityResponse.id,
        name: entityResponse.name,
        activityType: entityResponse.activityType?.code,
        country: entityResponse.country?.name,
        city: entityResponse.city?.name ?? "",
        noticeGroups: entityResponse.noticeGroups
    }
    console.log(entity);
    return entity;
}   

export const loadEntities = async (): Promise<EntitiesResponse> => {
    try {
        const response = await fetch(`${import.meta.env.VITE_TEDAPI_URL}/entity`);        
        if (!response.ok){
            throw new Error(`HTTP error! status: ${response.status}`);        
        }
        const data: EntitiesResponse = await response.json();
        console.log (data);            
        return data;        
    } catch (err)
    {
        console.error(err);        
        return [];
    }
    
}   

