import React, { useEffect } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { actions, selectors } from "../store/news";

const List: React.FC = () => {
    const data = useSelector(selectors.data);
    const loading = useSelector(selectors.loading);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(actions.getNews())
    }, [dispatch]);

    return loading ? (
        <div>loading</div>
    ) : <div>{JSON.stringify(data)}</div>;
};

export default List;
