const {createProject,loginUser,getProjects,updateProjectStatus,getChartsData,getCounts,getSearchedResults,getDropdownData}=require("./controller");
const router=require("express").Router();
const {checkToken}=require("../../auth/token_validation");

router.post("/createProject",checkToken, createProject);
router.get(`/:sort/:offsetValue`,getProjects);
router.get(`/getSearchResults/:text/:sort`,checkToken,getSearchedResults);
router.post("/login",loginUser);
router.patch("/updateStatus",checkToken,updateProjectStatus);
router.get("/getCharts",checkToken,getChartsData);
router.get("/getCounts",checkToken,getCounts);
router.get("/getDropdownData",checkToken,getDropdownData);

module.exports=router;