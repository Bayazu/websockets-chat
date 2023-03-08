export interface newRoom {
    title : string,
    customId : string,
    imageId : number,
    filePath: string,
    originalFileName: string
}
export interface newRoomSchema {
    newRoom : newRoom,
    isLoading : boolean,
    error?:string,
}

export interface Image {
    id: number,
    filePath: string,
    originalFileName: string
}
