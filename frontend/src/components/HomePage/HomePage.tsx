import React, {useState, useEffect, Fragment} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import {Avatar, Card, Carousel, Col, Row} from "antd";
import "../../tailwind.css";

import {
    FileDoneOutlined
} from '@ant-design/icons';

import Title from "antd/es/typography/Title";
import Meta from "antd/es/card/Meta";
import {Link} from "react-router-dom";
import Img from "../../images/burger.jpg"

const HomePage: React.FC = () => {
    const [dataSheets, setDataSheets] = useState<Array<DatasheetData>>([]);

    useEffect(() => {
        const retrieveIngredients = async () => {
            await DataSheetService.getAllDataSheets()
                .then((response: any) => {
                    setDataSheets(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
        retrieveIngredients().then( () => "ok");
    }, []);

    const contentStyle = {
        height: '160px',
        color: '#fff',
        lineHeight: '160px',
        textAlign: 'center',
        background: '#364d79',
    };
    return (
        <Fragment key={1}>
            <div key={1}>
                <Title level={2} key={1}>Accueil</Title>
            </div>
            <div key={2}>
                <Row gutter={16}>
                {dataSheets &&
                dataSheets.map((dataSheet,index) => (
                    <Fragment key={index}>
                        <Col span={8} key={index}>
                            <Link to={"/fichetechnique/"+dataSheet.idfichetechnique}>
                                <Card
                                    hoverable
                                    style={{ width: 300, height: 400 }}
                                    cover={
                                        <img
                                            alt={dataSheet.nomplat}
                                            src={dataSheet.image}
                                            style={{height: 300 }}
                                        />
                                    }
                                >
                                    <Meta
                                        avatar={<Avatar src={<FileDoneOutlined />} />}
                                        title={dataSheet.nomplat}
                                        description={"Pour "+dataSheet.nombrecouverts+" personnes"}
                                        key={index}
                                    />
                                </Card>
                            </Link>
                        </Col>
                        <Col span={0.5} key={index+1}/>
                    </Fragment>
                ))}
                </Row>
            </div>
            <Carousel autoplay>
                {dataSheets &&
                dataSheets.map((dataSheet,index) => (
                    ( index<3 &&
                        <Fragment key={index}>
                        <Link to={"/fichetechnique/"+dataSheet.idfichetechnique}>
                            <div>
                                <img
                                alt={dataSheet.nomplat}
                                src={dataSheet.image}
                                style={{height: 300 }}
                                />
                            </div>
                        </Link>
                        <Col span={0.5} key={index+1}/>
                    </Fragment>
                    )

                ))}

            </Carousel>,
        </Fragment>
        );
};

export default HomePage;
