import {IOrderInfo} from "./types/IOrderInfo";

export async function getData():Promise<IOrderInfo[]> {
 const response = await fetch('opendata/7705851331-stat_library/data-2016-11-10T00-00-00-structure-2016-09-12T00-00-00.json')
    return await response.json()
}
