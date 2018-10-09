var utils = {};

utils.setClientID = function(that) {
    that.id = window.location.href.split("=")[1];
};

utils.getPlaneBufferGeometryVertexPosition = function(obj, index) {
    if (obj.type === "PlaneBufferGeometry") {
        var vertices = obj.attributes.position.array;

        var res = vertices.slice(index * 3, index * 3 + 3);
        return res;
    }
};

utils.setPlaneBufferGeometryVertexPosition = function(obj, index, position) {
    if (obj.type === "PlaneBufferGeometry" &&
        position.length === 3 &&
        index >= 0 &&
        index <= 3) {
        obj.attributes.position.array[index * 3] 		= position[0];
        obj.attributes.position.array[index * 3 + 1] 	= position[1];
        obj.attributes.position.array[index * 3 + 2] 	= position[2];
    }
};

module.exports = utils;