import React, {useEffect, useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
import {List, Input, Select} from 'antd';
import {IOrderInfo} from "../types/IOrderInfo";
import {useQuery} from "../hooks/use-query";


enum FilterEnum {
    NONE = "NONE",
    HEIGHT = "HEIGHT",
    LOW = 'LOW'
}

export const ListPage: React.FC<{ list: IOrderInfo[] , loading:boolean}> = ({list, loading}) => {
    const [search, setSearch] = useState<string | null>(null)
    const [filter, setFilter] = useState<FilterEnum | string | null>(FilterEnum.NONE)
    const [filteredList, setFilteredList] = useState<IOrderInfo[]>([...list])
    const dataListOptions=list.map(item=>{
        return <option value={item.territory} key={item.order}/>
    })
    const query = useQuery()
    const querySearch=query.get('search')
    const queryFilter=query.get('search')
    const history = useHistory()
    useEffect(() => {
        if (search !== querySearch || filter !== queryFilter) {
            setSearch(querySearch)
            setFilter(queryFilter)
        }
    }, [querySearch, queryFilter])

    useEffect(()=>{
         setFilteredList([...list.filter(order => order.territory.includes(search||''))])
    }, [search])
    useEffect(()=>{
        if(filter===FilterEnum.HEIGHT){
            setFilteredList([...filteredList.sort((a,b)=>a.libraries>b.libraries ? 1:-1)])
        }
        if(filter===FilterEnum.LOW){
            setFilteredList([...filteredList.sort((a,b)=>a.libraries<b.libraries ? 1:-1)])
        }
        if(filter===FilterEnum.NONE){
            setFilteredList([...filteredList])
        }
    }, [filter])
    const handleChangeQuery=(search:string|null, filter:FilterEnum|string)=>{
        history.push({search: `?search=${search}&filter=${filter}`})
    }
    const handleChangeSearch = (e: any) => {
        setSearch(e.target.value)
        handleChangeQuery(e.target.value, filter||FilterEnum.NONE)
     }
    const handleChangeFilter=(e:any)=>{
        setFilter(e)
        handleChangeQuery(search, e)

    }

    const showList =
        filteredList
            .map(order => {
                return <List.Item key={order.order}>
                    <Link to={`/${order.order}`}>
                        {order.order}. {order.territory}, {order.fullname} - {order.libraries} библиотек
                    </Link>
                </List.Item>
            })
    return (
        <>
            <div style={{display: "flex", flexDirection:"row", justifyContent:"space-between"}}>
                <Input
                    placeholder="Введите название области"
                    onChange={handleChangeSearch}
                    value={search||''}
                    list='datalist'/> {/*надо заменить на AutoComplete, но antd version 3.x в проекте*/}
                <datalist id='datalist'>
                    {dataListOptions}
                </datalist>
                <Select
                    defaultValue={FilterEnum.NONE}
                    onChange={handleChangeFilter}
                    value={filter}
                >
                    <Select.Option value={FilterEnum.NONE}>без фильтра</Select.Option>
                    <Select.Option value={FilterEnum.HEIGHT}>по возрастанию</Select.Option>
                    <Select.Option value={FilterEnum.LOW}>По убыванию</Select.Option>
                </Select>
            </div>

            <List loading={loading}> {/*как вариант было использовать Table с встроенным методом сортировки по колоннам*/}
                {showList}
            </List>
        </>
    );
};

