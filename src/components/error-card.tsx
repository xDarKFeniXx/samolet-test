import React from 'react';
import { Card } from 'antd';
import { Link } from 'react-router-dom';

export const ErrorCard:React.FC<{error:string}> = ({error}) => {
    return (
        <Card title="Ошибка!!!" extra={<Link to="/">Домой</Link>} style={{ width: 300 }}>
            <p>Упс... Что-то пошло не так</p>
            <p>{error}</p>
        </Card>
    );
};

