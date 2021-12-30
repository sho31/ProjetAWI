import React, {useState, useEffect} from "react";
import {Card,Descriptions, Divider, Statistic, Row, Col, Button } from "antd";
import CostService from "../../services/CostService"
import DatasheetService from "../../services/DataSheetService"
import CostT from "../../types/Cost"
interface Props {
    DatasheetId: number;
    nbCouverts : number;
}
interface State {
    cost : CostT
    totalProductionCost : number
    productionCostPerPortion : number
    totalSellingPrice : number
    SellingPricePerPortion : number
    totalBenefit : number
    BenefitPerPortion : number
    profitabilityTreshold : number
    chargescost : number | undefined
    materialscost : number | undefined
    chargescalculated : boolean
    coefwithcharges : number | undefined
    coefwithoutcharges :number | undefined
}
class Cost extends React.Component<Props, State> {
    state: State = {
        cost:  {
            chargescalculated: false,
            chargescost: 0,
            idCost: 0,
            idfichetechnique: 0,
            includedDatasheetsCost: 0,
            materialscost: 0,
            coefwithcharges : 0,
            coefwithoutcharges : 0
        },
        totalProductionCost : 0,
        productionCostPerPortion : 0,
        totalSellingPrice : 0,
        SellingPricePerPortion : 0,
        totalBenefit : 0,
        BenefitPerPortion : 0,
        profitabilityTreshold : 0,
        chargescost : 0,
        materialscost :0,
        chargescalculated : false,
        coefwithcharges : 0,
        coefwithoutcharges :0
    };
    async componentDidMount() {

        let cost : CostT = {
            chargescalculated: false,
            chargescost: 0,
            idCost: 0,
            idfichetechnique: 0,
            includedDatasheetsCost: 0,
            materialscost: 0,
            coefwithcharges : 0,
            coefwithoutcharges : 0
        }
        let totalProductionCost : number = 0
        let productionCostPerPortion : number = 0
        let totalSellingPrice : number = 0
        let SellingPricePerPortion : number = 0
        let totalBenefit : number = 0
        let BenefitPerPortion : number = 0
        let profitabilityTreshold : number = 0;


        cost = await CostService.getCostByDataSheet(this.props.DatasheetId)
        console.log("cost",cost)
        totalProductionCost = CostService.getTotalCost(cost)
        productionCostPerPortion =  CostService.getTotalCostPerPortion(cost,this.props.nbCouverts)
        totalSellingPrice =  CostService.getSellingPrice(cost)
        SellingPricePerPortion  =  CostService.getSellingPricePerPortion(cost, this.props.nbCouverts)
        totalBenefit =  CostService.getTotalBenefit(cost)
        BenefitPerPortion = CostService.getTotalBenefitPerPortion(cost, this.props.nbCouverts)
        profitabilityTreshold = CostService.getProfitabilityTreshold(cost, this.props.nbCouverts)
        this.setState({
            cost:  cost,
            totalProductionCost : totalProductionCost,
            productionCostPerPortion : productionCostPerPortion,
            totalSellingPrice : totalSellingPrice,
            SellingPricePerPortion : SellingPricePerPortion,
            totalBenefit : totalBenefit,
            BenefitPerPortion : BenefitPerPortion,
            profitabilityTreshold : profitabilityTreshold,
            chargescost : cost.chargescost,
            materialscost :cost.materialscost,
            chargescalculated : cost.chargescalculated,
            coefwithcharges : cost.coefwithcharges,
            coefwithoutcharges : cost.coefwithoutcharges
        })
    }
    render() {
        return (
            <div>
                <Card title = "Coûts">
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic title="Coût matière" suffix = " €"  value={this.state.materialscost} precision={2} />
                        </Col>
                        <Col span={6}>
                            {this.state.chargescalculated ?  <Statistic title="Coût des charges" suffix = " €"  value={this.state.chargescost} precision={2}  />
                                :  <Statistic title="Coût des charges" suffix = " €"  value={"Charges non calculées"} precision={2}  />}

                        </Col>
                    </Row>
                    <Row gutter={16}>
                        <Col span={6}>
                            <Statistic title="Coût de production total" suffix = " €"  value={this.state.totalProductionCost} precision={2} />
                        </Col>
                        <Col span={6}>
                            <Statistic title="Coût de production par portion" suffix = " €"  value={this.state.productionCostPerPortion} precision={2} />
                        </Col>

                    </Row>
                    <Divider></Divider>
                    <Row>
                        <Col span={12}>
                            {this.state.chargescalculated ?<Statistic title="Coefficient de calcul du prix de vente (en comptant les charges)" value={this.state.coefwithcharges} precision={2} />
                                : <Statistic title="Coefficient de calcul du prix de vente (sans compter les charges)" value={this.state.coefwithoutcharges} precision={2} />}

                        </Col>

                    </Row>
                    <Row>
                        <Col span={12}>
                            <Statistic title="Prix de vente total" value={this.state.totalSellingPrice} suffix = " €" precision={2} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Prix de vente par portion" value={this.state.SellingPricePerPortion} suffix = " €"  precision={2} />
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Row>
                        <Col span={12}>
                            <Statistic title="Bénéfice total" suffix = " €"  value={this.state.totalBenefit} precision={2} />
                        </Col>
                        <Col span={12}>
                            <Statistic title="Bénéfice par portion" suffix = " €"  value={this.state.BenefitPerPortion} precision={2} />
                        </Col>
                    </Row>
                    <Divider></Divider>
                    <Row>
                        <Col span={12}>
                            {this.state.profitabilityTreshold == -1 ?<Statistic title="Seuil de rentabilité" value={"Cette recette n'est pas rentable jusqu'au nombre de couverts prévu initialement"} precision={2} />
                            : <Statistic title="Seuil de rentabilité" suffix = " couverts"  value={this.state.profitabilityTreshold} />}

                        </Col>
                    </Row>
                </Card>

            </div>
        );
    }
}


export default Cost;
