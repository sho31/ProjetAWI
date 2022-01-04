import http from "../http-common";
import CostData from "../types/Cost";
import IngredientService from "../services/IngredientService";

const create = async (data:CostData) => {
    const tmp =  await http.post<CostData>("/cost", data);
    return  tmp.data
};
const createWithOtherDatasheetsCosts = async (primarySheetCost: CostData, otherSheetsCosts : Array<CostData> ) => {
    let newCost : CostData = primarySheetCost;
    newCost.includeddatasheetscost =0;
    for (const cost of otherSheetsCosts) {
        console.log(cost)
        if(cost.chargescost !== undefined) {
            newCost.includeddatasheetscost = +newCost.includeddatasheetscost + +cost.materialscost + +cost.chargescost
        } else {
            newCost.includeddatasheetscost = +newCost.includeddatasheetscost + +cost.materialscost
        }

    }
    await create(newCost)
    return newCost
};

const getIngredientsCost = async (ingredients : [{idingredient : number, quantite : number}]) => {
    let materialscost : number = 0
    let unitCost : number;
    try{
        for (const ing of ingredients) {
            unitCost = await IngredientService.getIngredientByID(ing.idingredient).then(value => value.prixunitaireingredient)
            materialscost = +materialscost + unitCost * ing.quantite
        }
    }catch(e) {
        console.log(e)
    }

    return materialscost;

}
const getMaterialsCost = (ingredientsCost : number, seasoning : number) => {
    let materialscost : number = 0
    if (seasoning === -1){
        materialscost = +ingredientsCost + ingredientsCost*0.05
    }else {
        materialscost = +ingredientsCost + +seasoning
    }
    return materialscost;

}
const getMaterialsCostPerNbCouverts = (cost : CostData, nbCouvertsTotal : number ,nbPortion : number) => {
    return cost.materialscost *(nbPortion/nbCouvertsTotal)
}

const getChargesCost = async (salaryCost : number,fluidCost : number, totalMinutes : number) =>{
    const totalHours : number = totalMinutes/60.0
    return salaryCost * totalHours + fluidCost*totalHours

}

const getCostByDataSheet = async (id: any) => {
    const tmp = await http.get<CostData>(`/cost/bydatasheet?id=${id}`);
    console.log(tmp,"tmp")
    return tmp.data;
};
const getCostForSeveralDataSheet = async (ids: [any]) => {
    let costs : Array<CostData>;
    costs = [];
    for (let i = 0; i< ids.length; i++) {
        costs[i] = await getCostByDataSheet(ids[i]).then((response: any) => {
            console.log(response, "resp")
            return response})
    }
    console.log("end sever", costs)
    return costs
};
const getTotalCost = (cost : CostData) => {
    if (cost.chargescost === undefined) {
        return cost.materialscost
    }else {
        return +cost.chargescost + +cost.materialscost
    }

}
const getTotalCostPerNbCouverts = (cost : CostData, nbCouvertsTotal : number, nbPortion : number = 1) => {
    if (cost.chargescost === undefined) {
        return cost.materialscost * (nbPortion/nbCouvertsTotal)
    }else {
        return +cost.chargescost + cost.materialscost * (nbPortion/nbCouvertsTotal)
    }
}
const getTotalCostPerPortion = (cost : CostData, nbCouvertsTotal : number, nbPortion : number = 1) => {
    return getTotalCostPerNbCouverts(cost, nbCouvertsTotal, nbPortion)/nbPortion
}

const getTotalBenefit  = (cost : CostData) : number =>  {
    return getSellingPrice(cost) * 0.9 - getTotalCost(cost)
}
const getTotalBenefitPerNbCouverts = (cost : CostData, nbCouvertsTotal : number, nbPortion : number = 1) : number => {
    return getSellingPricePerNbCouverts(cost, nbCouvertsTotal, nbPortion) * 0.9 - getTotalCostPerNbCouverts(cost, nbCouvertsTotal, nbPortion)
}
const getTotalBenefitPerPortion = (cost : CostData, nbCouvertsTotal : number, nbPortion : number = 1) : number => {
    return getTotalBenefitPerNbCouverts(cost,nbCouvertsTotal,nbPortion) /nbPortion
}
//Returns the selling price depending on if charges are calculated or not
const getSellingPrice = (cost : CostData) => {
    if (cost.chargescalculated && cost.coefwithcharges !== undefined) {
        return (getTotalCost(cost) * cost.coefwithcharges)* 1.1
    } else if (cost.coefwithoutcharges !== undefined){
        return (getTotalCost(cost) * cost.coefwithoutcharges)* 1.1
    } else {
        return (getTotalCost(cost))* 1.1
    }
}
const getSellingPricePerNbCouverts = (cost : CostData, nbCouvertsTotal : number, nbPortion : number = 1) => {
    if (cost.chargescalculated && cost.coefwithcharges !== undefined) {
        return (getTotalCostPerNbCouverts(cost, nbCouvertsTotal, nbPortion) * cost.coefwithcharges)* 1.1
    } else if (cost.coefwithoutcharges !== undefined){
        return (getTotalCostPerNbCouverts(cost, nbCouvertsTotal, nbPortion) * cost.coefwithoutcharges)* 1.1
    } else {
        return (getTotalCostPerNbCouverts(cost, nbCouvertsTotal, nbPortion) )* 1.1
    }
}
const getSellingPricePerPortion = (cost : CostData, nbCouvertsTotal : number, nbPortion : number = 1) : number => {
    return getSellingPricePerNbCouverts(cost,nbCouvertsTotal,nbPortion) /nbPortion
}
//returns the minimal nbPortion below nbCouvertsTotal where the benefit is positive. Returns -1 if there is no possible profitability below or equal the planned nbCouvertsTotal of the datasheet
const getProfitabilityTreshold = (cost : CostData, nbCouvertsTotal : number) => {
        for (let i : number = 1;i <= nbCouvertsTotal; i++ ) {
            console.log(i)
            if (i === nbCouvertsTotal) {
                if (getTotalBenefit(cost) > 0) {
                    return i
                }
            }
            if (getTotalBenefitPerPortion(cost,nbCouvertsTotal,i) > 0) {
                return i
            }
        }
        return 1
}



const CostService = {
    create,
    createWithOtherDatasheetsCosts,
    getCostByDataSheet,
    getCostForSeveralDataSheet,
    getChargesCost,
    getTotalBenefitPerNbCouverts,
    getProfitabilityTreshold,
    getMaterialsCost,
    getIngredientsCost,
    getTotalCost,
    getTotalCostPerNbCouverts,
    getSellingPricePerNbCouverts,
    getSellingPrice,
    getTotalBenefit,
    getTotalBenefitPerPortion,
    getTotalCostPerPortion,
    getMaterialsCostPerNbCouverts,
    getSellingPricePerPortion
};

export default CostService;