import React, {useState, useEffect, Fragment} from "react";
import DataSheetService from "../../services/DataSheetService";
import DatasheetData from "../../types/Datasheet";
import "../../tailwind.css";
import {Avatar, Card, Carousel, Col, Row, Select, Space, Tag} from 'antd';
import DataSheetCat from "../../types/DataSheetCat";
import DataSheetCatService from "../../services/DataSheetCatService";
import {Link} from "react-router-dom";
import Meta from "antd/es/card/Meta";
import Search from "antd/es/input/Search";
import ImgFT from "../../images/logo_ft.png"
import Title from "antd/es/typography/Title";

const HomePage: React.FC = () => {

    const [catDataSheets, setCatDataSheets] = useState<Array<DataSheetCat>>([]);
    const [dataSheets, setDataSheets] = useState<Array<DatasheetData>>([]);
    const [currentDataSheets,setCurrentDataSheets] = useState<Array<number>>([-1]);
    const [searchItem,setSearchItem] = useState("");
    const { Option } = Select;

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
    function tagRender(props: { label: any; closable: any; onClose: any; }) {
        const { label, closable, onClose } = props;
        const onPreventMouseDown = (event: { preventDefault: () => void; stopPropagation: () => void; }) => {
            event.preventDefault();
            event.stopPropagation();
        };
        return (
            <Tag
                color={"#FF9B00"}
                onMouseDown={onPreventMouseDown}
                closable={closable}
                onClose={onClose}
                style={{ marginRight: 3 }}
            >
                {label}
            </Tag>
        );
    }
    return (
        <Fragment key={1}>

            {/*
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
            */}
                <div key={1}>
                    <Title level={2} key={1} >Fiche techniques prêtes à être utilisées</Title>
                </div>
            <Card key={1}>
                <Select
                    mode="multiple"
                    allowClear
                    style={{ width: '30%'}}
                    tagRender={tagRender}
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
            </Card>
            <Card key={2} style={{marginTop: '30px',}}>
                <div key={2}>
                    <Row key={1}>
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
                            <Link to={"/fichetechnique/"+dataSheet.idfichetechnique} key={index}>
                                <Card
                                    style={{
                                        width: 300,
                                        height: 400,
                                        margin: "20px",
                                        borderRadius: "20px",
                                        overflow: "hidden"
                                    }}
                                    hoverable
                                    cover={
                                        <img
                                            alt={dataSheet.nomplat}
                                            src={dataSheet.image}
                                            style={{
                                                height: 300,
                                                borderRadius: "20px",
                                                overflow: "hidden"
                                            }}
                                        />
                                    }
                                    key={index}
                                >
                                    <Meta
                                        avatar={<Avatar src={ImgFT} />}
                                        title={dataSheet.nomplat}
                                        description={"Pour "+dataSheet.nombrecouverts+" personnes"}
                                        key={index}
                                    />
                                </Card>
                            </Link>
                ))}
                    </Row>
                </div>
            </Card>
        </Fragment>
    );
};

export default HomePage;
