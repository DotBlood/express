export interface ITag {
    id?: string,
    name: string,
    data: string,
}

export type ITagRespone = Promise<ITag[] | Error>

export interface IUpdateTag {
    name?: string,
    data?: string,
}

export type TQuery = string;