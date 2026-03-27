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
    firstNotice: string;
    notices?: Array<Notice>;
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
    formType: FormType;
    entityId: string;
    noticeType: string;
    procedureDescription: string;
    noticeTitle: string;
    linkEngPDF: string;
    linkEngXML: string;
    linkEngHtml: string;
    totalValue: number;
    publicationDate: Date;
}

export type FormType = {
    id: string; 
    code: string;
    description?: string;
}
