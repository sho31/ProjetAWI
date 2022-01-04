import { Result, Button } from 'antd';
import React from "react";
import { Link } from 'react-router-dom';

const Error404 = () => {
        return (
            <Result
                status="404"
                title="404"
                subTitle="Désolé cette page n'existe pas."
                extra={<Link to={"/"}> <Button type="primary">Retourner à l'accueil</Button></Link>}
            />
        );
};
export default Error404;
