const {createProject,loginUser,getProjects,updateProjectStatus,getChartsData,getCounts}=require("./controller");
const router=require("express").Router();

router.post("/createProject",createProject);
router.get("/getProjects",getProjects);
router.post("/login",loginUser);
router.patch("/updateStatus",updateProjectStatus);
router.get("/getCharts",getChartsData);
router.get("/getCounts",getCounts);

module.exports=router;