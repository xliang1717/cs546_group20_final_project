const mongoCollections = require('../config/mongoCollections');
const parkLot = mongoCollections.parklot;
const { ObjectId } = require('mongodb');
function distance(lat1, lng1, lat2, lng2) {
    var radLat1 = (lat1 * 3) / 180.0;
    var radLat2 = (lat2 * 3) / 180.0;
    var a = radLat1 - radLat2;
    var b = (lng1 * 3) / 180.0 - (lng2 * 3) / 180.0;
    var s =
        2 *
        Math.asin(
            Math.sqrt(
                Math.pow(Math.sin(a / 2), 2) + Math.cos(radLat1) * Math.cos(radLat2) * Math.pow(Math.sin(b / 2), 2)
            )
        );
    s = s * 6378.137;
    s = Math.round(s * 10000) / 10000;
    return s;
}
var ans = [];
module.exports = {
    async getFilterParkLot(filter) {
        let Location = [
            {
                Longitude: 40.743,
                Latitude: 74.026,
            },
            {
                Longitude: 40.74,
                Latitude: 74.025,
            },
            {
                Longitude: 40.758,
                Latitude: 74.023,
            },
            {
                Longitude: 40.735,
                Latitude: 74.029,
            },
        ];
        // 40.74119115392377, -74.02962195701149;
        const parkLotCollection = await parkLot();
        let filterArr = filter;
        filterArr[2] == 'Yes' ? (filterArr[2] = true) : (filterArr[2] = false);
        let nearBy = filterArr[3] ? parseInt(filterArr[3]) : null;
        let zipCode = filterArr[4] ? filterArr[4] : null;
        let parkLotList = null;
        if (filterArr[0] == 'No') {
            parkLotList = await parkLotCollection
                .find({
                    parkingChargeStandard: { $eq: {} },
                    suitableVehicleSize: filterArr[1],
                    disabilityFriendly: { $eq: filterArr[2] },
                })
                .toArray();
        } else {
            parkLotList = await parkLotCollection
                .find({
                    parkingChargeStandard: { $ne: {} },
                    suitableVehicleSize: filterArr[1],
                    disabilityFriendly: { $eq: filterArr[2] },
                })
                .toArray();
        }
        let result = [];
        if (zipCode != null) {
            for (let i = 0; i < parkLotList.length; i++) {
                let parkLot = parkLotList[i];
                if (parkLot.parklotLocationZipCode == zipCode) {
                    result.push(parkLot);
                }
            }
        } else if (zipCode == null) {
            result = parkLotList;
        }
        let answer = [];
        if (nearBy != null) {
            for (let i = 0; i < result.length; i++) {
                let parkLot = result[i];
                let Longitude1 = parkLot.parkingLotCoordinates.Longitude;
                let Latitude1 = parkLot.parkingLotCoordinates.Latitude;
                let Longitude2 = Location[nearBy].Longitude;
                let Latitude2 = Location[nearBy].Latitude;
                if (distance(Longitude1, Latitude1, Longitude2, Latitude2) <= 5) {
                    answer.push(parkLot);
                }
            }
        } else {
            answer = result;
        }
        for (let i = 0; i < answer.length; i++) {
            answer[i]._id = answer[i]._id.toString();
        }
        ans = answer;
        return answer;
    },
    async allPark() {
        return ans;
    },
};
