import React, {useEffect, useState} from 'react';
import {Route, Switch} from "react-router-dom";
import './app.css';
import {ListPage} from "./pages/list-page";
import {DetailPage} from "./pages/detail-page";
import {IOrderInfo} from "./types/IOrderInfo";
import {getData} from "./api";
import {Layout} from "antd";
import {ErrorCard} from "./components/error-card";


export default function App() {
    const [list, setList] = useState<IOrderInfo[]>([]); //решил не выносить ни в Context, ни в Redux т.к. всего два компонента
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState<null | string>(null)
    useEffect(() => {
        setLoading(true)
        getData()
            .then(list => setList(list))
            .catch(e => {
                setError('Все сломалось!')
                console.log(e)
            })
            .finally(() => setLoading(false))
    }, []);
    if (error) return <ErrorCard error={error}/>
    if (list.length===0) return <div>Записей нет</div>
    return (
        <Layout >
            <Layout.Content style={{margin: '0 auto', maxWidth: '1200px', minHeight: '100vh'}}>
                <Switch>
                    <Route path='/:order'>
                        <DetailPage list={list} />
                    </Route>
                    <Route path='/'>
                        <ListPage list={list} loading={loading}/>
                    </Route>
                </Switch>
            </Layout.Content>
        </Layout>

    );
}
