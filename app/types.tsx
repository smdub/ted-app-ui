export type EntityResponse = {
    id: string; 
    name: string;
    activityType: {
        id: string;
        code: string;
    }
    country: {
        id: string;
        name: string;
    }
    city: {
        id: string;
        name: string;
    }    
    noticeGroups: Array<NoticeGroup>;
}

export type EntitiesResponse = Array<Entity>;

export type Entity = {
    id: string; 
    name: string;
    activityType: string;
    country: string;
    city: string;    
}

export type EntityDetails = {
    id: string; 
    name: string;
    activityType: string;
    country: string;
    city: string;
    noticeGroups?: Array<NoticeGroup>;
}

export type NoticeGroup = {
    id: string;
    firstNotice: string
}

export type Notice = {
    id: string;
    noticeNumber: string;
    noticeIdentifier: string;
    originalNotice: string;
    internalIdentifierProc: string;
    ojsNumber: string;
    procedureIdentifier: string;
    noticeGroup: string;
    formType: string;
    entityId: string;
    noticeType: string;
    procedureDescription: string;
}
