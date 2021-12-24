import React, {useState, useEffect, Fragment} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import "../../tailwind.css";
import {Avatar, Card, Carousel, Col, Row, Select} from 'antd';
import DataSheetCat from "../../types/DataSheetCat";
import DataSheetCatService from "../../services/DataSheetCatService";
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import {FileDoneOutlined} from "@ant-design/icons";
import Search from "antd/es/input/Search";


const HomePage: React.FC = () => {

    const [catDataSheets, setCatDataSheets] = useState<Array<DataSheetCat>>([]);
    const [dataSheets, setDataSheets] = useState<Array<DatasheetData>>([]);
    const [currentDataSheets,setCurrentDataSheets] = useState<Array<number>>([-1]);
    const [searchItem,setSearchItem] = useState("");

    useEffect(() => {
        const getAllergenCatsList = async () => {
            await DataSheetCatService.getAllDataSheetCat()
                .then((response: any) => {
                    setCatDataSheets(response);
                })
                .catch((e: Error) => {
                    console.log(e);
                });
        };
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
        getAllergenCatsList().then( () => "ok");
    }, []);

    const { Option } = Select;

    function handleChange(value: any) {
        if(value.length>0){
            setCurrentDataSheets(value);
        }
        else{
            setCurrentDataSheets([-1]);
        }
    }

    const children = [];

    for(let j=0; j<catDataSheets.length;j++){
        children.push(<Option value={catDataSheets[j].idcategoriefichetechnique} key={catDataSheets[j].idcategoriefichetechnique}>{catDataSheets[j].nomcategoriefichetechnique}</Option>);
    }

    return (
        <Fragment key={1}>
            {
             <Carousel autoplay style={{width: '50%'}}>
                {dataSheets &&
                dataSheets.map((dataSheet,index) => (
                    ( index<3 &&
                        <Fragment key={index}>
                        <Link to={"/fichetechnique/"+dataSheet.idfichetechnique}>
                            <div>
                                <img
                                alt={dataSheet.nomplat}
                                src={dataSheet.image}
                                style={{height: 200}}
                                />
                            </div>
                        </Link>
                        <Col span={0.5} key={index+1}/>
                    </Fragment>
                    )

                ))}
            </Carousel>
            }
            <Select
                mode="multiple"
                allowClear
                style={{ width: '30%' }}
                placeholder="Choisissez une catégorie"
                defaultValue={[]}
                onChange={handleChange}
            >{children}
            </Select>
            <h2>
                <Search
                    placeholder="Quel plat cherchez vous ?"
                    allowClear
                    onChange={(event)=> {
                        setSearchItem(event.target.value)
                    }}
                    style={{ width: '30%' }} />
            </h2>

                <div key={2}>
                    <Row justify="space-between">
            {dataSheets &&
                dataSheets.filter((dataSheet)=> {
                    if(searchItem === ""){
                        if (currentDataSheets[0] === -1) {
                            return dataSheet;
                        } else {
                            for (let i = 0; i < currentDataSheets.length; i++) {
                                if (dataSheet.idcategoriefichetechnique === currentDataSheets[i]) {
                                    return dataSheet
                                }
                            }
                        }
                    }
                    else if(dataSheet.nomplat.toLowerCase().includes(searchItem.toLowerCase())){
                        if (currentDataSheets[0] === -1) {
                            return dataSheet;
                        } else {
                            for (let i = 0; i < currentDataSheets.length; i++) {
                                if (dataSheet.idcategoriefichetechnique === currentDataSheets[i]) {
                                    return dataSheet
                                }
                            }
                        }
                    }
                    return null;
                }
                ).map((dataSheet,index) => (
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
                    </Fragment>
                ))}
                    </Row>
                </div>
        </Fragment>
    );
};

export default HomePage;
