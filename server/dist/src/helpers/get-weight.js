"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWeightWithoutProject = getWeightWithoutProject;
exports.getWeightWithProject = getWeightWithProject;
function getWeightWithoutProject(type) {
    const percentageMap = {
        recitation: 5,
        activity: 8,
        quiz: 12,
        project: 0,
        summative: 25,
        exam: 50
    };
    return percentageMap[type];
}
function getWeightWithProject(type) {
    const percentageMap = {
        recitation: 3,
        activity: 5,
        quiz: 7,
        project: 10,
        summative: 25,
        exam: 50
    };
    return percentageMap[type];
}
//# sourceMappingURL=get-weight.js.map