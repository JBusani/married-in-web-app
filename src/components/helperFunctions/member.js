export default function memberClass({firstName = "", families = [], id=""}){
    return {
        firstName : firstName,
        families: families,
        id: id
    }
}