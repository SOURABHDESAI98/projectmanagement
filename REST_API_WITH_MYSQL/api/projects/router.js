const {createProject,loginUser,getProjects,updateProjectStatus,getChartsData,getCounts,getSearchedResults,getDropdownData}=require("./controller");
const router=require("express").Router();

let sort="abc";
let offsetValue=0;

router.post("/createProject",createProject);
router.get(`/:sort/:offsetValue`,getProjects);
router.get(`/getSearchResults/:text/:sort`,getSearchedResults);
router.post("/login",loginUser);
router.patch("/updateStatus",updateProjectStatus);
router.get("/getCharts",getChartsData);
router.get("/getCounts",getCounts);
router.get("/getDropdownData",getDropdownData);

module.exports=router;