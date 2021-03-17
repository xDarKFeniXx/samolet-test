import { Descriptions } from 'antd';
import React from 'react';
import {useParams} from 'react-router-dom';
import {IOrderInfo} from "../types/IOrderInfo";

export const DetailPage: React.FC<{ list: IOrderInfo[] }> = ({list}) => {
    const {order} = useParams<{ order: string }>()
    const showOrder = list.find(elem => elem.order === +order)

    return (
        <Descriptions title={showOrder?.fullname} bordered={true}>
            <Descriptions.Item label="Territory">{showOrder?.territory}</Descriptions.Item>
            <Descriptions.Item label="address">{showOrder?.address}</Descriptions.Item>
            <Descriptions.Item label="Libraries">{showOrder?.libraries}</Descriptions.Item>
            <Descriptions.Item label="Users">{showOrder?.users}</Descriptions.Item>
            <Descriptions.Item label="Employees">
                {showOrder?.employees}
            </Descriptions.Item>
        </Descriptions>
    );
};

